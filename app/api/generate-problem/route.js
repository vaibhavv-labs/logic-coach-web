import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { enforceRateLimit } from "../../../lib/rateLimit";

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
    const rateLimit = await enforceRateLimit('generate', request, uid);
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

    let result;
    try {
      result = await model.generateContent(prompt);
    } catch (err) {
      if (err.status === 429 || err.message?.includes('429') || err.message?.includes('quota')) {
        return NextResponse.json({
          title: "Rate Limit Break",
          category: "Practice",
          difficulty: level,
          description: "The AI is currently resting. While it recovers, write a simple program that reads an integer N from standard input and prints 'Hello World' N times.",
          testCases: [
            { input: "3", expectedOutput: "Hello World\nHello World\nHello World" },
            { input: "1", expectedOutput: "Hello World" }
          ]
        });
      }
      throw err;
    }
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
