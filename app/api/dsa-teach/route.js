import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { enforceRateLimit } from "../../../lib/rateLimit";

const SYSTEM_PROMPT = `You are the 'Logic Coach' teaching a student a brand new Data Structures & Algorithms concept step-by-step. 
The student is currently learning this specific step/concept: "{CONCEPT}".
Your job is to check their understanding of THIS concept.
1. Evaluate their response to see if they understand the concept. 
2. CRITICAL RULE: If they are confused, stuck, ask a question, or give a genuine wrong answer, you MUST append :::understood=false::: at the end of your response. Instead, re-explain it using a DIFFERENT, simpler, real-world everyday analogy, and ask a clarifying question to check their understanding.
3. CRITICAL RULE: If the student's input is gibberish, too short, unclear, or doesn't attempt to engage with the question, you MUST append :::understood=false:::. DO NOT offer a new analogy. Instead, gently ask them to clarify or attempt a real answer.
4. If they ask to skip, gently decline and ask them to demonstrate understanding first. DO NOT SKIP.
5. If they do understand and provide a correct or highly plausible answer, praise them briefly, and you MUST append :::understood=true::: at the end of your response.
6. CRITICAL RULE: You must NEVER output actual code, code snippets, or direct algorithmic solutions in your responses, even as a greeting or example. Maintain the Socratic teaching style at all times.

VISUALIZER AWARENESS:
You have access to a live visual diagram component that is already displayed to the student alongside this chat. You do NOT need to describe things purely in text-only analogies when a visual would help — instead, tell the student to look at the diagram.

VISUALIZER CONTROL:
You can control the visualizer by appending a state tag at the end of your response. For example: :::state=traverse:::. Leave it out if no state change is needed.

Do not ask them questions about other topics. Keep your response under 4 sentences. Tone should be extremely encouraging.

CRITICAL RULE: DO NOT use JSON output. Return plain conversational text. You MUST include :::understood=true::: or :::understood=false::: at the very end of your response. If a visualizer state change is needed, also append :::state=state_name::: at the very end.`;

export async function POST(request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const fbApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

    if (!apiKey || !fbApiKey) {
      return NextResponse.json({ error: "API keys not configured." }, { status: 500 });
    }

    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing or invalid authorization token" }, { status: 401 });
    }
    const token = authHeader.split("Bearer ")[1];

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
    
    if (!userInfo || !userInfo.providerUserInfo || userInfo.providerUserInfo.length === 0) {
      return NextResponse.json({ error: "Guests are not allowed to access this feature." }, { status: 403 });
    }

    // Rate Limiting
    const rateLimit = await enforceRateLimit('dsa', request, uid);
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

    const { messages, concept, language } = await request.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "Messages array cannot be empty." }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT.replace("{CONCEPT}", concept) + 
        (language ? `\nRespond in this spoken language: ${language}.` : ""),
    });

    const history = messages.slice(0, -1).map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    if (history.length > 0 && history[0].role === "model") {
      history.unshift({ role: "user", parts: [{ text: "Hello, let's start the lesson." }] });
    }

    const chat = model.startChat({ history });
    const lastMessage = messages[messages.length - 1];
    
    let result;
    let retries = 3;
    let delay = 3000;

    while (retries > 0) {
      try {
        result = await chat.sendMessageStream(lastMessage.content);
        break;
      } catch (err) {
        if (err.status === 429 || err.message?.includes('429') || err.message?.includes('quota')) {
          retries--;
          if (retries === 0) {
            return NextResponse.json({ error: "I'm analyzing your approach! Give me just a few seconds to process this, and then click 'Try Again'. 🧠" }, { status: 429 });
          }
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2;
        } else {
          throw err;
        }
      }
    }

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            controller.enqueue(new TextEncoder().encode(chunkText));
          }
          controller.close();
        } catch (e) {
          controller.error(e);
        }
      }
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  } catch (error) {
    console.error("DSA Teach API error:", error);
    if (error.status === 429 || error.message?.includes('429')) {
      return NextResponse.json({ error: "Too many requests. Please wait." }, { status: 429 });
    }
    return NextResponse.json({ error: "Teaching Error" }, { status: 500 });
  }
}
