"use client";

import React, { useState, useEffect } from "react";
import CodeEditor from "./CodeEditor";

export default function PracticeCompilerPanel({ language = "Python", isOpen, onClose }) {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [isError, setIsError] = useState(false);

  // Set default code when language changes
  useEffect(() => {
    switch (language.toLowerCase()) {
      case "python":
        setCode("print('Hello World!')");
        break;
      case "java":
        setCode("public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World!\");\n    }\n}");
        break;
      case "c++":
      case "cpp":
        setCode("#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello World!\";\n    return 0;\n}");
        break;
      case "javascript":
        setCode("console.log('Hello World!');");
        break;
      default:
        setCode("");
    }
  }, [language]);

  const handleRunCode = async () => {
    if (!code.trim()) return;
    setIsExecuting(true);
    setOutput("Executing...");
    setIsError(false);
    
    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code, stdin: "" })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setIsError(true);
        setOutput(data.error || "Execution failed.");
      } else if (data.stderr || data.code !== 0) {
        setIsError(true);
        setOutput(data.stderr || data.output || "Runtime Error");
      } else {
        setIsError(false);
        setOutput(data.stdout || "Success (No output)");
      }
    } catch (err) {
      setIsError(true);
      setOutput("Error connecting to compilation server.");
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <>
      <div 
        className={`compiler-panel-overlay ${isOpen ? "open" : ""}`} 
        onClick={onClose}
      ></div>

      <div className={`compiler-panel-drawer ${isOpen ? "open" : ""}`}>
        <div className="compiler-panel-header">
           <h3 style={{ margin: 0, fontSize: '16px', color: 'var(--text-primary)' }}>{language} Compiler</h3>
           <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '20px', cursor: 'pointer' }}>×</button>
        </div>

        <div className="compiler-panel-content">
          <div className="compiler-editor-section">
             <CodeEditor 
               language={language}
               value={code}
               onChange={setCode}
             />
          </div>
          
          <div className="compiler-terminal-section">
            <div className="terminal-header">
              <span>Terminal</span>
              <button 
                className={`run-code-btn ${isExecuting ? 'loading' : ''}`} 
                onClick={handleRunCode}
                disabled={isExecuting}
              >
                {isExecuting ? "Running..." : "▶ Run Code"}
              </button>
            </div>
            <div className="terminal-body">
              <pre className={`terminal-output ${isError ? 'error-text' : 'success-text'}`}>
                {output || "Output will appear here..."}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
