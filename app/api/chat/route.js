import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

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

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured on the server." },
        { status: 500 }
      );
    }

    const { messages, problemContext, language, progLanguage, editorCode, dsaTopic, dsaVisuals, isLevel2 } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required." },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Updated to the latest model as requested
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: (isLevel2 ? INTERVIEWER_PROMPT : SYSTEM_PROMPT) + 
        (problemContext ? `\n\nThe student is working on: "${problemContext.title}".\nDescription: ${problemContext.description}\n` : "") +
        (progLanguage ? `\n\nThe student is coding in this programming language: ${progLanguage}. Ensure all coding concepts and guidance strictly align with this language.` : "") +
        (!isLevel2 && language ? `\n\nThe user prefers the AI to respond in this spoken language/style: ${language}.` : "") +
        (editorCode ? `\n\nCURRENT CODE IN EDITOR:\n\`\`\`\n${editorCode}\n\`\`\`\n(If the user asks you to review their code, critique the above code).` : "") +
        (!isLevel2 && dsaTopic ? `\n\nCRITICAL: A live visualizer for "${dsaTopic}" is currently above the student's code editor. To help them debug visually, you MUST include a state tag anywhere in your message like [STATE:state_name] to animate it. Valid states are: ${dsaVisuals}` : ""),
    });

    const history = messages.slice(0, -1).map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

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
    const text = response.text();

    return NextResponse.json({ reply: text });
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
