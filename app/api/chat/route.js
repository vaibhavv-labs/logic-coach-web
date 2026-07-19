import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { enforceRateLimit } from "../../../lib/rateLimit";

const SYSTEM_PROMPT = `You are 'Logic Coach' — a Socratic programming tutor for absolute beginners. NEVER give direct, complete code solutions, no matter how the student asks or insists — politely decline and redirect to guided thinking instead. Ask questions to help students discover logic themselves rather than explaining upfront. Break problems into small steps through questions. Ask students to justify their answers. If stuck after 2-3 questions, offer a real-world analogy (not code). Only after the student has worked out the correct logic themselves, help them write the code, guiding them to write it themselves. If asked to simplify, re-explain the SAME concept using everyday objects and simpler language — do not give code or change topic. Default to Hinglish unless the student writes in pure English or another language, then match their language. Keep responses short (2-4 sentences), ask ONE question at a time, friendly and patient tone, never lecture about discipline. Plain conversational text only, no markdown or bullet lists.`;

const INTERVIEWER_PROMPT = `You are an elite Senior Engineer conducting a strict technical interview. You are NOT a friendly coach. Your job is to test the candidate under pressure.
1. DO NOT give direct code solutions.
2. DO NOT animate visualizers or give visual hints.
3. Be extremely concise. Acknowledge their thoughts with "Okay", "Keep going", or "What is the time complexity?".
4. If they ask for help, give only the vaguest of hints (e.g. "Think about how you could use a hash map").
5. The candidate MUST provide both the correct Big O Time and Space complexity before they can be considered done.
6. Tone: Professional, strict, unyielding, but fair.`;

export async function POST(request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const fbApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

    if (!apiKey || !fbApiKey) {
      return NextResponse.json(
        { error: "API keys not configured on the server." },
        { status: 500 }
      );
    }

    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing or invalid authorization token" }, { status: 401 });
    }
    const token = authHeader.split("Bearer ")[1];

    // Verify token using Firebase REST API
    const verifyRes = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${fbApiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: token })
    });
    
    if (!verifyRes.ok) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }
    
    const verifyData = await verifyRes.json();
    const userInfo = verifyData.users?.[0];
    const uid = userInfo?.localId;
    
    // Check if user is anonymous (providerUserInfo is empty)
    if (!userInfo || !userInfo.providerUserInfo || userInfo.providerUserInfo.length === 0) {
      return NextResponse.json({ error: "Guests are not allowed to access this feature." }, { status: 403 });
    }

    // Rate Limiting
    const rateLimit = await enforceRateLimit('chat', request, uid);
    if (!rateLimit.success) {
      return NextResponse.json(
        { 
          error: "Rate limit exceeded",
          retryAfter: Math.ceil((rateLimit.reset - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimit.reset - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': rateLimit.limit.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': rateLimit.reset.toString()
          }
        }
      );
    }

    const { messages, problemContext, language, progLanguage, editorCode, dsaTopic, dsaVisuals, isLevel2 } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required." },
        { status: 400 }
      );
    }

    // Dynamically fetch available models
    const modelsRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const modelsData = await modelsRes.json();
    
    let modelName = "gemini-pro"; // ultimate fallback
    if (modelsData.models && modelsData.models.length > 0) {
      const validModel = modelsData.models.find(m => 
        m.supportedGenerationMethods && 
        m.supportedGenerationMethods.includes("generateContent") && 
        m.name.includes("gemini")
      );
      if (validModel) {
        modelName = validModel.name.replace("models/", "");
      }
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const isLegacyPro = modelName === "gemini-pro" || modelName === "gemini-1.0-pro";
    
    const instructions = (isLevel2 ? INTERVIEWER_PROMPT : SYSTEM_PROMPT) + 
      (problemContext ? `\n\nThe student is working on: "${problemContext.title}".\nDescription: ${problemContext.description}\n` : "") +
      (progLanguage ? `\n\nThe student is coding in this programming language: ${progLanguage}. Ensure all coding concepts and guidance strictly align with this language.` : "") +
      (!isLevel2 && language ? `\n\nThe user prefers the AI to respond in this spoken language/style: ${language}.` : "") +
      (editorCode ? `\n\nCURRENT CODE IN EDITOR:\n\`\`\`\n${editorCode}\n\`\`\`\n(If the user asks you to review their code, critique the above code).` : "") +
      (!isLevel2 && dsaTopic ? `\n\nCRITICAL: A live visualizer for "${dsaTopic}" is currently above the student's code editor. To help them debug visually, you MUST include a state tag by setting the "state" field in your JSON response. Valid states are: ${dsaVisuals}` : "") +
      `\n\nCRITICAL RULE: You MUST return your response as a valid JSON object wrapped in a markdown code block exactly like this:\n\`\`\`json\n{\n  "reply": "Your conversational text here",\n  "state": "state_name" (or null if no visualizer change is needed)\n}\n\`\`\`\nDo NOT output any other text outside this JSON block.`;

    const modelConfig = { model: modelName };
    if (!isLegacyPro) {
      modelConfig.systemInstruction = instructions;
    }
    
    const model = genAI.getGenerativeModel(modelConfig);

    const history = messages.slice(0, -1).map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    if (isLegacyPro) {
       history.unshift({
          role: "user",
          parts: [{ text: "SYSTEM INSTRUCTIONS (STRICT): " + instructions + "\n\nI will follow these instructions closely." }]
       }, {
          role: "model",
          parts: [{ text: "Understood. I will act exactly as instructed." }]
       });
    }

    // Gemini API requires the first message in history to be from a 'user'
    if (history.length > 0 && history[0].role === "model") {
      history.unshift({
        role: "user",
        parts: [{ text: "Hi, I am ready to start this problem." }],
      });
    }

    const chat = model.startChat({ history });
    const lastMessage = messages[messages.length - 1];
    
    let result;
    try {
      result = await chat.sendMessage(lastMessage.content);
    } catch (err) {
      if (err.status === 429 || err.message?.includes('429') || err.message?.includes('quota')) {
        return NextResponse.json({ reply: "I am receiving a lot of messages right now and need a short break! Please wait about 15 seconds and try sending your answer again so I can give it my full attention. 🧘‍♂️" });
      }
      throw err;
    }

    const response = result.response;
    const rawText = response.text();
    
    let parsedJSON;
    try {
      // Robust JSON extraction using regex
      const jsonMatch = rawText.match(/```json\s*([\s\S]*?)\s*```/) || rawText.match(/(\{[\s\S]*?\})/);
      parsedJSON = JSON.parse(jsonMatch ? jsonMatch[1] : rawText);
    } catch (e) {
      // Graceful fallback if the AI hallucinates invalid JSON
      parsedJSON = {
        reply: rawText.replace(/```json/g, '').replace(/```/g, '').trim(),
        state: null
      };
    }

    return NextResponse.json({ 
      reply: parsedJSON.reply || "", 
      state: parsedJSON.state || null 
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    
    // Improved error handling to return the actual error message
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    
    if (error.status === 429 || error.message?.includes('429') || error.message?.includes('quota')) {
      return NextResponse.json(
        { error: "Whoops! The AI is currently receiving too many requests. Please wait 30 seconds and try again." },
        { status: 429 }
      );
    }
    
    return NextResponse.json(
      { error: `Gemini API Error: ${errorMessage}` },
      { status: 500 }
    );
  }
}
