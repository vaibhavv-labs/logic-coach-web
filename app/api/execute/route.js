import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { language, code, stdin } = await request.json();

    if (!code || !language) {
      return NextResponse.json({ error: "Code and language are required" }, { status: 400 });
    }

    let pistonLang = language.toLowerCase();
    let version = "*";
    if (pistonLang === "python") version = "3.10.0";
    else if (pistonLang === "javascript") version = "18.15.0";
    else if (pistonLang === "java") version = "15.0.2";
    else if (pistonLang === "c++" || pistonLang === "cpp") { pistonLang = "c++"; version = "10.2.0"; }
    else {
      return NextResponse.json({ error: `Language ${language} not supported by execution engine.` }, { status: 400 });
    }

    // Execute code using Piston API
    const executeRes = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: pistonLang,
        version: version,
        files: [{ content: code }],
        stdin: stdin || ""
      })
    });

    const data = await executeRes.json();
    
    if (data.message) {
       return NextResponse.json({ error: data.message }, { status: 500 });
    }
    
    // Compilation error
    if (data.compile && data.compile.code !== 0) {
      return NextResponse.json({
        stdout: "",
        stderr: data.compile.stderr || data.compile.output,
        output: data.compile.output,
        code: data.compile.code
      });
    }

    return NextResponse.json({
      stdout: data.run.stdout || "",
      stderr: data.run.stderr || "",
      output: data.run.output || "",
      code: data.run.code || 0
    });

  } catch (error) {
    console.error("Execution error:", error);
    return NextResponse.json({ error: "Failed to execute code" }, { status: 500 });
  }
}
