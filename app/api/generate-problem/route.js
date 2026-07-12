import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured on the server." },
        { status: 500 }
      );
    }

    const { level } = await request.json();

    if (!level) {
      return NextResponse.json(
        { error: "Level is required." },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
Generate a single programming logic problem for a student at the "${level}" level. 
The levels progress as: Beginner (variables, simple if/else) -> Easy (loops) -> Medium (arrays/lists) -> Hard (nested logic, simple functions) -> Advanced (combining concepts).
Make sure it builds on the previous level conceptually.
Problem statements must be clear, unambiguous, and solvable with basic programming constructs (no obscure trivia).

Respond ONLY with a valid JSON object in this exact format, with no markdown formatting or backticks around it:
{
  "title": "Short descriptive title",
  "category": "The main concept (e.g. Loops, Arrays)",
  "difficulty": "${level}",
  "description": "The detailed problem description"
}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean up potential markdown formatting
    let cleanJson = responseText.trim();
    if (cleanJson.startsWith('\`\`\`json')) {
      cleanJson = cleanJson.substring(7);
    }
    if (cleanJson.startsWith('\`\`\`')) {
      cleanJson = cleanJson.substring(3);
    }
    if (cleanJson.endsWith('\`\`\`')) {
      cleanJson = cleanJson.substring(0, cleanJson.length - 3);
    }

    const problemData = JSON.parse(cleanJson.trim());

    return NextResponse.json(problemData);
  } catch (error) {
    console.error("Gemini API error (generate-problem):", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: `Generation Error: ${errorMessage}` },
      { status: 500 }
    );
  }
}
