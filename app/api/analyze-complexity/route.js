import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
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

    // Verify token using Firebase REST API
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
    const rateLimit = await enforceRateLimit('complexity', request, uid);
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
          if (retries === 0) throw err;
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2;
        } else {
          throw err;
        }
      }
    }
    
    const rawText = result.response.text();
    let analysis;
    try {
      const jsonMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || rawText.match(/(\{[\s\S]*?\})/);
      analysis = JSON.parse(jsonMatch ? jsonMatch[1] : rawText);
    } catch (e) {
      console.error("Failed to parse JSON:", rawText);
      throw new Error("Failed to parse complexity analysis from AI.");
    }

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Complexity analysis error:", error);
    
    if (error.status === 429 || error.message?.includes('429') || error.message?.includes('quota')) {
      return NextResponse.json({
        analysis: {
          timeComplexity: "O(N) - Estimated",
          timeExplanation: "The AI is experiencing high traffic, so we provided an estimated common complexity. Click analyze again in a moment for deep precision.",
          spaceComplexity: "O(1) - Estimated",
          spaceExplanation: "Most optimal algorithms use O(1) space. Try analyzing again shortly for exact details."
        }
      });
    }
    
    return NextResponse.json(
      { error: error.message || "Failed to analyze code complexity." },
      { status: 500 }
    );
  }
}
