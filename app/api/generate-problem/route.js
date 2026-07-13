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

    const { level, dsaTopic, language } = await request.json();

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

    let prompt = `
Generate a single programming logic problem for a student at the "${level}" level. 
The levels progress as: Beginner (variables, simple if/else) -> Easy (loops) -> Medium (arrays/lists) -> Hard (nested logic, simple functions) -> Advanced (combining concepts).
Make sure it builds on the previous level conceptually.
Problem statements must be clear, unambiguous, and solvable with basic programming constructs (no obscure trivia).`;

    if (dsaTopic) {
      prompt += `\n\nCRITICAL CONSTRAINT: This problem MUST be specifically about the Data Structure/Algorithm topic: "${dsaTopic}". The problem should focus on applying this concept appropriately for the requested difficulty level. Do not require knowledge of advanced DSA topics beyond "${dsaTopic}".`;
    }

    if (language) {
      prompt += `\n\nTRANSLATION REQUIREMENT: The user prefers the AI to respond in this spoken language: ${language}. Ensure the problem title and description are written in ${language}.`;
    }

    prompt += `

CRITICAL TESTING INSTRUCTION:
Because the user's code will be executed in a sandboxed environment, they MUST read input from Standard Input (stdin) and print to Standard Output (stdout). 
The problem description MUST clearly explain the input format (e.g. "The first line contains an integer N...") and the expected output format.

Respond ONLY with a valid JSON object in this exact format, with no markdown formatting or backticks around it:
{
  "title": "Short descriptive title",
  "category": "${dsaTopic ? dsaTopic : 'The main concept (e.g. Loops, Arrays)'}",
  "difficulty": "${level}",
  "description": "The detailed problem description. Must explicitly instruct the user to read from standard input and print the result to standard output.",
  "testCases": [
    {
      "input": "The raw string to be passed via stdin (e.g. '5\\n1 2 3 4 5')",
      "expectedOutput": "The exact string that the program should print to stdout. No extra spaces or words."
    }
  ] // generate exactly 3 test cases
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
    
    if (error.status === 429 || error.message?.includes('429') || error.message?.includes('quota')) {
      return NextResponse.json(
        { error: "Whoops! The AI is currently receiving too many requests. Please wait 30 seconds and try again." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: `Generation Error: ${errorMessage}` },
      { status: 500 }
    );
  }
}
