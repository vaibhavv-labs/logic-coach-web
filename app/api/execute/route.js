import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { language, code, stdin } = await request.json();

    if (!code || !language) {
      return NextResponse.json({ error: "Code and language are required" }, { status: 400 });
    }

    // Map frontend language strings to Wandbox compiler strings
    let wandboxLang = language.toLowerCase();
    let compiler = "";
    if (wandboxLang === "python") compiler = "cpython-3.14.0";
    else if (wandboxLang === "javascript") compiler = "nodejs-20.17.0";
    else if (wandboxLang === "java") compiler = "openjdk-jdk-22+36";
    else if (wandboxLang === "c++" || wandboxLang === "cpp") compiler = "gcc-head";
    else {
      return NextResponse.json({ error: `Language ${language} not supported by execution engine.` }, { status: 400 });
    }

    // Execute code using Wandbox API
    const executeRes = await fetch("https://wandbox.org/api/compile.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        compiler: compiler,
        code: code,
        stdin: stdin || ""
      })
    });

    const data = await executeRes.json();
    
    if (data.error) {
       return NextResponse.json({ error: data.error }, { status: 500 });
    }
    
    // Compilation error (e.g. C++ syntax error before runtime)
    if (data.compiler_error) {
      return NextResponse.json({
        stdout: "",
        stderr: data.compiler_error,
        output: data.compiler_error,
        code: 1
      });
    }

    return NextResponse.json({
      stdout: data.program_output || data.program_message || "",
      stderr: data.program_error || "",
      output: data.program_message || "",
      code: parseInt(data.status || "0", 10)
    });

  } catch (error) {
    console.error("Execution error:", error);
    return NextResponse.json({ error: "Failed to execute code" }, { status: 500 });
  }
}
