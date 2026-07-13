import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { language, code, stdin } = await request.json();

    if (!code || !language) {
      return NextResponse.json({ error: "Code and language are required" }, { status: 400 });
    }

    // Map frontend language strings to Piston language strings
    let pistonLang = language.toLowerCase();
    if (pistonLang === "c++") pistonLang = "cpp";
    if (pistonLang === "c#") pistonLang = "csharp";

    // 1. Fetch available runtimes to get the correct version
    const runtimesRes = await fetch("https://emkc.org/api/v2/piston/runtimes");
    if (!runtimesRes.ok) {
      return NextResponse.json({ error: "Failed to fetch runtimes from execution engine." }, { status: 500 });
    }
    const runtimes = await runtimesRes.json();
    
    const runtime = runtimes.find(r => r.language === pistonLang || r.aliases.includes(pistonLang));
    if (!runtime) {
      return NextResponse.json({ error: `Language ${language} not supported by execution engine.` }, { status: 400 });
    }

    // 2. Execute code
    const executeRes = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: runtime.language,
        version: runtime.version,
        files: [{ content: code }],
        stdin: stdin || "",
      })
    });

    const data = await executeRes.json();
    
    if (data.message) {
       return NextResponse.json({ error: data.message }, { status: 500 });
    }

    return NextResponse.json({
      stdout: data.run?.stdout || "",
      stderr: data.run?.stderr || "",
      output: data.run?.output || "",
      code: data.run?.code || 0 // exit code
    });

  } catch (error) {
    console.error("Execution error:", error);
    return NextResponse.json({ error: "Failed to execute code" }, { status: 500 });
  }
}
