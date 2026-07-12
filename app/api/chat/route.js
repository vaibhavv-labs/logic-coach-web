import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are "Logic Coach", a friendly, patient, and highly skilled Socratic tutor who helps beginner programming students develop strong computational thinking and problem-solving skills. Your goal is NOT to give away answers but to guide the student to discover the solution themselves through carefully crafted questions and hints.

CORE RULES:
1. NEVER give the direct solution or complete code.
2. Ask ONE guiding question at a time.
3. If the student is stuck, give a small hint, then ask another guiding question.
4. Celebrate small wins and progress.
5. Use simple language — the student may be a complete beginner.
6. If the student asks in Hindi, Marathi, or Hinglish, respond in the same language.
7. Keep responses concise (2-4 sentences max).
8. Use analogies from daily life to explain abstract concepts.
9. If the student gives a wrong answer, don't say "wrong" — instead, ask a question that helps them see the flaw in their reasoning.
10. Focus on building the student's LOGIC and THINKING PROCESS, not just getting the right answer.

TEACHING APPROACH:
- Break complex problems into tiny steps
- Start with "What do you think would happen if...?"
- Use examples: "Imagine you have a basket of 10 apples..."
- Guide them to think about: Input → Process → Output
- Help them identify patterns before writing code`;

export async function POST(request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const { messages, problemContext } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_PROMPT + (problemContext ? `\n\nThe student has selected the problem: "${problemContext.title}".\nDescription:\n${problemContext.description}\n` : ""),
    });

    const history = messages.slice(0, -1).map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({ history });
    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "Failed to get response from AI. Please try again." },
      { status: 500 }
    );
  }
}
