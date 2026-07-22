import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { language, code, stdin } = await request.json();

    if (!code || !language) {
      return NextResponse.json({ error: "Code and language are required" }, { status: 400 });
    }

    let gbLang = language.toLowerCase();
    let compiler = "";
    if (gbLang === "python") { gbLang = "python"; compiler = "python311"; }
    else if (gbLang === "javascript") { gbLang = "v8"; compiler = "v8trunk"; }
    else if (gbLang === "java") { gbLang = "java"; compiler = "java2100"; }
    else if (gbLang === "c++" || gbLang === "cpp") { gbLang = "c++"; compiler = "g141"; }
    else {
      return NextResponse.json({ error: `Language ${language} not supported by execution engine.` }, { status: 400 });
    }

    // Fix Java execution for Godbolt which requires filename for public classes
    let sourceCode = code;
    if (gbLang === "java") {
      sourceCode = sourceCode.replace(/public\s+class/g, 'class');
    }

    // Execute code using Godbolt Compiler Explorer API
    const executeRes = await fetch(`https://godbolt.org/api/compiler/${compiler}/compile`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        source: sourceCode,
        lang: gbLang,
        options: {
            userArguments: "",
            executeParameters: { args: "", stdin: stdin || "" },
            compilerOptions: { executorRequest: true }
        },
        allowStoreCodeDebug: true
      })
    });

    const data = await executeRes.json();
    
    // Check for build/compile errors
    if (data.buildResult && data.buildResult.code !== 0) {
      const buildErr = data.buildResult.stderr.map(e => e.text).join('\n');
      return NextResponse.json({
        stdout: "",
        stderr: buildErr,
        output: buildErr,
        code: data.buildResult.code
      });
    }

    // Combine stdout arrays
    const stdoutArr = data.stdout ? data.stdout.map(e => e.text).join('\n') : "";
    const stderrArr = data.stderr ? data.stderr.map(e => e.text).join('\n') : "";

    return NextResponse.json({
      stdout: stdoutArr,
      stderr: stderrArr,
      output: stderrArr || stdoutArr,
      code: parseInt(data.code || "0", 10)
    });

  } catch (error) {
    console.error("Execution error:", error);
    return NextResponse.json({ error: "Failed to execute code" }, { status: 500 });
  }
}
