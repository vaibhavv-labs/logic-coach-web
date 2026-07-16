import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the 'Logic Coach' teaching a student a brand new Data Structures & Algorithms concept step-by-step. 
The student is currently learning this specific step/concept: "{CONCEPT}".
Your job is to check their understanding of THIS concept.
1. Evaluate their response to see if they understand the concept. 
2. CRITICAL RULE: If they are confused, stuck, ask a question, or give a wrong/vague answer, you MUST NOT output [UNDERSTOOD]. Instead, re-explain it using a DIFFERENT, simpler, real-world everyday analogy, and ask a clarifying question to check their understanding.
3. If they ask to skip, gently decline and ask them to demonstrate understanding first. DO NOT SKIP.
4. If they do understand and provide a correct or highly plausible answer, praise them briefly, and you MUST append the exact string "[UNDERSTOOD]" at the very end of your response.
5. CRITICAL RULE: You must NEVER output actual code, code snippets, or direct algorithmic solutions in your responses, even as a greeting or example. Maintain the Socratic teaching style at all times.

VISUALIZER AWARENESS:
You have access to a live visual diagram component that is already displayed to the student alongside this chat. You do NOT need to describe things purely in text-only analogies when a visual would help — instead, tell the student to look at the diagram, and reference specific elements in it by their visible values/positions. When a student asks to see something visually or asks for a diagram, remind them the visualizer is already showing this concept, and guide their attention to specific parts of it.
NEVER say things like "I cannot show you diagrams" or "I can only give text descriptions" because this is factually wrong in this app; a visualizer IS already on screen. 
CRITICAL RULE: NEVER try to draw ASCII art, grids, diagrams, or 2D/3D graphical examples using text/symbols in the chat response. If the student asks for a different graphical example, rely ONLY on the on-screen visualizer component or use a real-world everyday verbal analogy (e.g. 'imagine a line of parking spaces').

VISUALIZER CONTROL:
You can control the visualizer by outputting a special hidden tag anywhere in your response. For example: [STATE:traverse], [STATE:access], [STATE:binary], [STATE:memory], [STATE:string], [STATE:substring]. Use this to draw attention to specific parts or animations of the visualizer while you explain.

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
    
    let result;
    try {
      result = await chat.sendMessage(lastMessage.content);
    } catch (err) {
      if (err.status === 429 || err.message?.includes('429') || err.message?.includes('quota')) {
        return NextResponse.json({ reply: "My circuits are a bit busy at the moment! Please wait about 10 seconds and tell me your answer again. 🤖💨" });
      }
      throw err;
    }

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
