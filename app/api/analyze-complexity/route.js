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

    // Dynamically fetch available models to prevent 404 errors on restricted API keys
    const modelsRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const modelsData = await modelsRes.json();
    
    if (!modelsData.models || modelsData.models.length === 0) {
        return NextResponse.json({ error: "No models available for this API key. Check billing or quota." }, { status: 500 });
    }

    // Find the first valid gemini text model
    const validModel = modelsData.models.find(m => 
      m.supportedGenerationMethods && 
      m.supportedGenerationMethods.includes("generateContent") && 
      m.name.includes("gemini")
    );

    if (!validModel) {
       return NextResponse.json({ error: "No compatible Gemini text models found for this API key." }, { status: 500 });
    }

    const modelName = validModel.name.replace("models/", "");
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });

    const prompt = `You are an expert software engineer analyzing code complexity. 
You must evaluate the provided code and return ONLY a raw JSON object with the following keys exactly:
- "timeComplexity" (string: The Big O time complexity, e.g. O(N))
- "timeExplanation" (string: 1-2 sentence explanation)
- "spaceComplexity" (string: The Big O space complexity, e.g. O(1))
- "spaceExplanation" (string: 1-2 sentence explanation)

Do not wrap in markdown or backticks. Return valid JSON only.

Analyze the complexity of this ${language || 'code'}:
${code}`;

    const result = await model.generateContent(prompt);
    
    let jsonText = result.response.text().trim();
    // Strip markdown formatting if the model accidentally included it
    if (jsonText.startsWith('```json')) jsonText = jsonText.replace(/^```json/, '');
    if (jsonText.startsWith('```')) jsonText = jsonText.replace(/^```/, '');
    if (jsonText.endsWith('```')) jsonText = jsonText.replace(/```$/, '');
    
    const analysis = JSON.parse(jsonText.trim());

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Complexity analysis error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze code complexity." },
      { status: 500 }
    );
  }
}
