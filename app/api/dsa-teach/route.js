import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the 'Logic Coach' teaching a student a brand new Data Structures & Algorithms concept step-by-step. 
The student is currently learning this specific step/concept: "{CONCEPT}".
Your job is to check their understanding of THIS concept.
1. Evaluate their response to see if they understand the concept. DO NOT output [UNDERSTOOD] if their answer is vague, wrong, or they say they are confused.
2. If they are confused or wrong, re-explain it using a DIFFERENT, simpler, real-world everyday analogy. Ask a clarifying question.
3. If they ask to skip, gently decline and ask them to demonstrate understanding first. DO NOT SKIP.
4. If they do understand and provide a correct or highly plausible answer, praise them briefly, and you MUST append the exact string "[UNDERSTOOD]" at the very end of your response.
5. CRITICAL RULE: You must NEVER output actual code, code snippets, or direct algorithmic solutions in your responses, even as a greeting or example. Maintain the Socratic teaching style at all times.
Do not ask them questions about other topics. Keep your response under 4 sentences. Tone should be extremely encouraging.`;

export async function POST(request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured." }, { status: 500 });
    }

    const { messages, concept, language } = await request.json();

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
    
    const result = await chat.sendMessage(lastMessage.content);
    const text = result.response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("DSA Teach API error:", error);
    if (error.status === 429 || error.message?.includes('429')) {
      return NextResponse.json({ error: "Too many requests. Please wait." }, { status: 429 });
    }
    return NextResponse.json({ error: "Teaching Error" }, { status: 500 });
  }
}
