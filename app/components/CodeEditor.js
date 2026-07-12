import Editor from '@monaco-editor/react';

export default function CodeEditor({ language, value, onChange }) {
  
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
