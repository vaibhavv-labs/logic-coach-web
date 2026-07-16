import Editor from '@monaco-editor/react';

export default function CodeEditor({ language, value, onChange, onRun, onAnalyze }) {
  
  const handleEditorChange = (val) => {
    onChange(val || "");
  };

  const getMonacoLanguage = (lang) => {
    if (!lang) return 'plaintext';
    switch(lang.toLowerCase()) {
      case 'c++': return 'cpp';
      case 'c#': return 'csharp';
      case 'javascript': return 'javascript';
      case 'java': return 'java';
      case 'python': return 'python';
      case 'ruby': return 'ruby';
      default: return 'plaintext';
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    // Ctrl/Cmd + Enter to Run
    editor.addAction({
      id: 'run-code',
      label: 'Run Code/Tests',
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter
      ],
      run: () => {
        if (onRun) onRun();
      }
    });

    // Ctrl/Cmd + Shift + Enter to Analyze
    editor.addAction({
      id: 'analyze-complexity',
      label: 'Analyze Big-O Complexity',
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter
      ],
      run: () => {
        if (onAnalyze) onAnalyze();
      }
    });
  };

  return (
    <div className="code-editor-wrapper">
      <div className="code-editor-header">
        <span>{language} Workspace</span>
      </div>
      <div className="code-editor-inner">
        <Editor
          height="100%"
          language={getMonacoLanguage(language)}
          theme="vs-dark"
          value={value}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 15,
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 16 }
          }}
        />
      </div>
    </div>
  );
}
