import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { enforceRateLimit } from "../../../lib/rateLimit";

export async function POST(request) {
  try {
    const apiKey = process.env.GROQ_API_KEY || process.env.GEMINI_API_KEY;
    const fbApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing or invalid authorization token" }, { status: 401 });
    }
    const token = authHeader.split("Bearer ")[1];

    // Verify token using Firebase REST API (with support for local Auth Emulator)
    const verifyUrl = process.env.FIREBASE_AUTH_EMULATOR_HOST
      ? `http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}/identitytoolkit.googleapis.com/v1/accounts:lookup?key=${fbApiKey}`
      : process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.startsWith('demo-')
        ? `http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/accounts:lookup?key=${fbApiKey}`
        : `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${fbApiKey}`;

    const verifyRes = await fetch(verifyUrl, {
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
    
    // Check if user is anonymous (providerUserInfo is empty) - allow guests in development/emulator
    const isEmulator = process.env.FIREBASE_AUTH_EMULATOR_HOST || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.startsWith('demo-');
    if (!isEmulator && (!userInfo || !userInfo.providerUserInfo || userInfo.providerUserInfo.length === 0)) {
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

    const mockProblems = {
      "Beginner": {
        "title": "Even or Odd",
        "category": dsaTopic || "Variables & Conditions",
        "difficulty": "Beginner",
        "description": "Write a program that reads an integer N from standard input. If N is even, print 'Even'. If N is odd, print 'Odd'. Ensure your output matches exactly.",
        "testCases": [
          { "input": "4", "expectedOutput": "Even" },
          { "input": "7", "expectedOutput": "Odd" },
          { "input": "0", "expectedOutput": "Even" }
        ]
      },
      "Easy": {
        "title": "Sum of N Numbers",
        "category": dsaTopic || "Loops",
        "difficulty": "Easy",
        "description": "Write a program that reads an integer N from standard input, followed by N integers. Print the sum of these N integers to standard output.",
        "testCases": [
          { "input": "3\n1 2 3", "expectedOutput": "6" },
          { "input": "5\n10 -2 3 0 1", "expectedOutput": "12" },
          { "input": "1\n5", "expectedOutput": "5" }
        ]
      },
      "Medium": {
        "title": "Second Largest Element",
        "category": dsaTopic || "Arrays",
        "difficulty": "Medium",
        "description": "Write a program that reads an integer N (the size of the array, N >= 2) followed by N integers. Print the second largest unique element in the array. If no such element exists, print -1.",
        "testCases": [
          { "input": "5\n2 4 5 6 6", "expectedOutput": "5" },
          { "input": "3\n10 10 10", "expectedOutput": "-1" },
          { "input": "4\n1 2 3 4", "expectedOutput": "3" }
        ]
      },
      "Hard": {
        "title": "Palindrome Check",
        "category": dsaTopic || "Strings",
        "difficulty": "Hard",
        "description": "Write a program that reads a string S from standard input. If S is a palindrome (reads the same backwards and forwards), print 'YES', otherwise print 'NO'.",
        "testCases": [
          { "input": "racecar", "expectedOutput": "YES" },
          { "input": "hello", "expectedOutput": "NO" },
          { "input": "a", "expectedOutput": "YES" }
        ]
      },
      "Advanced": {
        "title": "Merge Sorted Lists",
        "category": dsaTopic || "Arrays & Logic",
        "difficulty": "Advanced",
        "description": "Write a program that reads two lines. The first line contains N followed by N sorted integers. The second line contains M followed by M sorted integers. Print the merged sorted list of all N+M integers separated by spaces.",
        "testCases": [
          { "input": "3\n1 3 5\n3\n2 4 6", "expectedOutput": "1 2 3 4 5 6" },
          { "input": "2\n1 2\n0", "expectedOutput": "1 2" },
          { "input": "1\n5\n1\n3", "expectedOutput": "3 5" }
        ]
      }
    };

    const isMockMode = !apiKey || apiKey.startsWith("your_") || apiKey.includes("dummy");
    if (isMockMode) {
      const p = mockProblems[level] || mockProblems["Beginner"];
      return NextResponse.json(p);
    }

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

    try {
      const groqApiKey = process.env.GROQ_API_KEY;
      if (groqApiKey) {
        try {
          const Groq = (await import("groq-sdk")).default;
          const groq = new Groq({ apiKey: groqApiKey });

          const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
              { role: "system", content: "You are a programming problem author. Respond strictly with valid JSON." },
              { role: "user", content: prompt }
            ],
            response_format: { type: "json_object" },
            temperature: 0.7,
          });

          const responseText = completion.choices[0]?.message?.content || "";
          const problemData = JSON.parse(responseText.trim());
          return NextResponse.json(problemData);
        } catch (groqErr) {
          console.warn("Groq API error in generate-problem, falling back to Gemini:", groqErr);
          if (!process.env.GEMINI_API_KEY) throw groqErr;
        }
      }

      // Gemini Fallback
      const geminiApiKey = process.env.GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(geminiApiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      let result;
      let retries = 3;
      let delay = 3000;

      while (retries > 0) {
        try {
          result = await model.generateContent(prompt);
          break;
        } catch (err) {
          if (err.status === 429 || err.message?.includes('429') || err.message?.includes('quota')) {
            retries--;
            if (retries === 0) {
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
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2;
          } else {
            throw err;
          }
        }
      }
      const responseText = result.response.text();

      // Clean up potential markdown formatting
      let cleanJson = responseText.trim();
      if (cleanJson.startsWith('```json')) {
        cleanJson = cleanJson.substring(7);
      }
      if (cleanJson.startsWith('```')) {
        cleanJson = cleanJson.substring(3);
      }
      if (cleanJson.endsWith('```')) {
        cleanJson = cleanJson.substring(0, cleanJson.length - 3);
      }

      const problemData = JSON.parse(cleanJson.trim());

      return NextResponse.json(problemData);
    } catch (apiErr) {
      console.warn("AI generation failed or keys invalid, falling back to mock problem:", apiErr);
      const p = mockProblems[level] || mockProblems["Beginner"];
      return NextResponse.json(p);
    }
  } catch (error) {
    console.error("Gemini API error (generate-problem):", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    
    if (error.status === 429 || error.message?.includes('429') || error.message?.includes('quota')) {
      return NextResponse.json(
        { error: "I'm generating an awesome problem for you! Just give me a few seconds to gather my thoughts and try clicking again. 💡" },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: `Generation Error: ${errorMessage}` },
      { status: 500 }
    );
  }
}
