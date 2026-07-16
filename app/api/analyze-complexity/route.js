import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
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

    const { code, language } = await request.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: "Code is required for analysis." },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: "You are an expert software engineer analyzing code complexity. You must evaluate the provided code and return the Time Complexity (Big O) and Space Complexity (Big O). Provide a very brief (1-2 sentences) explanation for each. Be precise.",
    });

    const responseSchema = {
      type: SchemaType.OBJECT,
      properties: {
        timeComplexity: {
          type: SchemaType.STRING,
          description: "The Big O time complexity, e.g. O(N) or O(N log N)",
        },
        timeExplanation: {
          type: SchemaType.STRING,
          description: "1-2 sentence explanation of why this time complexity applies.",
        },
        spaceComplexity: {
          type: SchemaType.STRING,
          description: "The Big O space complexity, e.g. O(1) or O(N)",
        },
        spaceExplanation: {
          type: SchemaType.STRING,
          description: "1-2 sentence explanation of why this space complexity applies.",
        },
      },
      required: ["timeComplexity", "timeExplanation", "spaceComplexity", "spaceExplanation"],
    };

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `Analyze the complexity of this ${language || 'code'}:\n\n${code}` }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = result.response.text();
    const analysis = JSON.parse(jsonText);

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Complexity analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze code complexity." },
      { status: 500 }
    );
  }
}
