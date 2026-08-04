"use client";
import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const CodeEditor = dynamic(() => import('./CodeEditor'), { ssr: false });

export default function StitchWorkspace({
  user,
  activeProblem,
  messages = [],
  onSendMessage,
  editorCode,
  setEditorCode,
  progLanguage,
  setProgLanguage,
  isLevel2,
  setIsLevel2,
  language,
  setLanguage,
  dsaTopic,
  dsaState,
  visualizerComponent,
  onRunCode,
  onAnalyzeComplexity,
  onGenerateProblem,
  stdinInput,
  setStdinInput,
  stdoutOutput,
  complexityAnalysis,
  isAnalyzing,
  isExecuting,
  isChatLoading,
  onBackToDashboard,
  solvedProblems = new Set(),
  onToggleSolved
}) {
  const [chatInput, setChatInput] = useState('');
  const [activeTab, setActiveTab] = useState('editor');
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isChatLoading]);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;
    const text = chatInput;
    setChatInput('');
    onSendMessage(text);
  };

  const handleQuickAction = (actionText) => {
    onSendMessage(actionText);
  };

  const isSolved = activeProblem?.id && solvedProblems.has(activeProblem.id);

  return (
    <div className="bg-[#0F172A] text-[#f2effc] h-screen w-screen overflow-hidden font-sans flex flex-col relative select-none">
      {/* Animated WebGL-style Canvas Glow Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-[#0F172A] to-[#0F172A]"></div>

      {/* Top Navigation Bar */}
      <header className="flex justify-between items-center px-4 md:px-6 h-16 bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/10 z-30 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBackToDashboard}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            title="Back to Dashboard"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-600/30 border border-indigo-400/50 flex items-center justify-center font-bold text-indigo-400 text-sm shadow-[0_0_10px_rgba(99,102,241,0.4)]">
                LC
              </div>
              <span className="font-bold text-base bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-white hidden sm:inline-block">
                Logic Coach AI
              </span>
            </div>
          </button>

          {activeProblem && (
            <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-white/10 text-xs">
              <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
                {activeProblem.category || 'DSA'}
              </span>
              <span className="font-semibold text-white/90 truncate max-w-[220px]">
                {activeProblem.title}
              </span>
              {isSolved && (
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  ✓ Solved
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Mode Switcher */}
          <button
            onClick={() => setIsLevel2(!isLevel2)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              isLevel2
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 shadow-[0_0_12px_rgba(99,102,241,0.3)]'
            }`}
          >
            <span className="material-symbols-outlined text-sm">
              {isLevel2 ? 'psychology_alt' : 'school'}
            </span>
            <span className="hidden sm:inline">{isLevel2 ? 'Interviewer Mode' : 'Socratic Mode'}</span>
          </button>

          {/* Programming Language Dropdown */}
          <select
            value={progLanguage || 'Python'}
            onChange={(e) => setProgLanguage(e.target.value)}
            className="bg-[#171F33] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="Python">Python</option>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
            <option value="JavaScript">JavaScript</option>
          </select>

          {/* New Problem Button */}
          <button
            onClick={onGenerateProblem}
            className="hidden sm:flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-indigo-400/30 transition-all shadow-[0_0_10px_rgba(99,102,241,0.3)]"
          >
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
            <span>New Problem</span>
          </button>

          {onToggleSolved && activeProblem?.id && (
            <button
              onClick={onToggleSolved}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isSolved 
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
                  : 'bg-white/5 text-white/70 border-white/10 hover:text-white'
              }`}
            >
              {isSolved ? '✓ Solved' : 'Mark Solved'}
            </button>
          )}
        </div>
      </header>

      {/* Main Workspace Body */}
      <div className="flex-1 flex flex-col p-2 sm:p-4 gap-3 overflow-hidden min-h-0 z-10">
        
        {/* Top Live Visualizer Panel (If present) */}
        {visualizerComponent && (
          <div className="w-full h-32 sm:h-44 bg-[#171F33]/70 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex flex-col relative overflow-hidden shrink-0 shadow-xl">
            <div className="flex justify-between items-center mb-1 z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <h2 className="text-xs sm:text-sm font-semibold text-cyan-300">
                  {dsaTopic || 'Algorithm Visualizer'}
                </h2>
              </div>
              <span className="text-[10px] text-white/50 font-mono">
                State: <span className="text-indigo-400 font-bold">{dsaState || 'active'}</span>
              </span>
            </div>
            <div className="flex-1 flex items-center justify-center overflow-hidden">
              {visualizerComponent}
            </div>
          </div>
        )}

        {/* Split View */}
        <div className="flex-1 flex flex-col md:flex-row gap-3 overflow-hidden min-h-0">
          
          {/* Left Panel: Socratic AI Chat (40% Width) */}
          <div className={`md:w-[40%] flex flex-col bg-[#171F33]/70 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-xl ${
            activeTab === 'chat' ? 'flex' : 'hidden md:flex'
          }`}>
            <div className="p-2.5 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-400 text-base">forum</span>
                <span className="text-xs font-semibold text-white/90">Socratic AI Guide</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                Groq Llama 3.3 70B
              </span>
            </div>

            {/* Chat History Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 flex flex-col gap-3">
              {messages.length === 0 ? (
                <div className="my-auto text-center p-4 text-white/50 text-xs">
                  <span className="material-symbols-outlined text-3xl mb-2 text-indigo-400">smart_toy</span>
                  <p className="font-semibold mb-1">Welcome to Logic Coach AI!</p>
                  <p>Ask a question, ask for a hint, or share your thoughts to discover the logic step-by-step.</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex gap-2.5 max-w-[90%] ${
                      msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                      msg.role === 'user'
                        ? 'bg-cyan-600/30 text-cyan-300 border border-cyan-400/40'
                        : 'bg-indigo-600/30 text-indigo-300 border border-indigo-400/40'
                    }`}>
                      {msg.role === 'user' ? 'U' : 'AI'}
                    </div>
                    <div className={`p-3 rounded-xl text-xs sm:text-sm leading-relaxed border ${
                      msg.role === 'user'
                        ? 'bg-cyan-950/40 border-cyan-500/30 text-cyan-100 rounded-tr-none'
                        : 'bg-indigo-950/40 border-indigo-500/30 text-indigo-100 rounded-tl-none'
                    }`}>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))
              )}

              {isChatLoading && (
                <div className="flex gap-2.5 max-w-[80%] self-start">
                  <div className="w-7 h-7 rounded-full bg-indigo-600/30 text-indigo-300 border border-indigo-400/40 flex items-center justify-center text-xs font-bold animate-pulse">
                    AI
                  </div>
                  <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Quick Action Chips & Input Form */}
            <div className="p-3 border-t border-white/10 bg-[#0F172A]/80">
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                <button
                  onClick={() => handleQuickAction("Can you explain this concept using a simple everyday analogy?")}
                  className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 text-[10px] hover:bg-indigo-500/20 transition-colors"
                >
                  Analogy 💡
                </button>
                <button
                  onClick={() => handleQuickAction("Give me a subtle hint to point me in the right direction.")}
                  className="px-2 py-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-[10px] hover:bg-cyan-500/20 transition-colors"
                >
                  Hint 🔍
                </button>
                <button
                  onClick={() => handleQuickAction("Ask me a question to test my understanding of this logic.")}
                  className="px-2 py-1 rounded bg-rose-500/10 text-rose-300 border border-rose-500/30 text-[10px] hover:bg-rose-500/20 transition-colors"
                >
                  Test Me 🎯
                </button>
              </div>

              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type your response..."
                  className="w-full bg-[#020617] border border-white/10 rounded-lg pl-3 pr-10 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || isChatLoading}
                  className="absolute right-2 text-cyan-400 hover:text-cyan-300 disabled:text-white/20 transition-colors"
                >
                  <span className="material-symbols-outlined text-base">send</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Panel: Code Editor & Output (60% Width) */}
          <div className={`md:w-[60%] flex flex-col bg-[#171F33]/70 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden relative shadow-xl ${
            activeTab === 'editor' ? 'flex' : 'hidden md:flex'
          }`}>
            
            {/* Complexity Badge Floating Overlay */}
            {complexityAnalysis && (
              <div className="absolute top-12 right-3 bg-[#0F172A]/90 border border-cyan-500/40 rounded-lg p-2 text-xs flex items-center gap-2 z-20 shadow-lg animate-fade-in">
                <span className="text-cyan-400 font-mono font-bold">
                  {complexityAnalysis.timeComplexity || 'O(N)'} Time
                </span>
                <span className="w-px h-3 bg-white/20"></span>
                <span className="text-indigo-400 font-mono font-bold">
                  {complexityAnalysis.spaceComplexity || 'O(1)'} Space
                </span>
              </div>
            )}

            {/* Code Editor Header */}
            <div className="p-2 border-b border-white/10 bg-white/5 flex justify-between items-center">
              <div className="flex items-center gap-2 pl-2">
                <span className="material-symbols-outlined text-sm text-cyan-400">code</span>
                <span className="font-mono text-xs text-white/80">solution.{progLanguage?.toLowerCase() || 'py'}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onAnalyzeComplexity}
                  disabled={isAnalyzing}
                  className="px-3 py-1 rounded bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 border border-indigo-500/40 text-xs font-semibold transition-all flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-xs">analytics</span>
                  <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Big-O'}</span>
                </button>

                <button
                  onClick={onRunCode}
                  disabled={isExecuting}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-1 rounded font-semibold text-xs transition-all shadow-[0_0_12px_rgba(6,182,212,0.4)] flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-xs">play_arrow</span>
                  <span>{isExecuting ? 'Running...' : 'Run Code'}</span>
                </button>
              </div>
            </div>

            {/* Monaco Code Editor Container */}
            <div className="flex-1 min-h-[220px] relative bg-[#020617]">
              <CodeEditor
                language={progLanguage}
                value={editorCode}
                onChange={setEditorCode}
                onRun={onRunCode}
                onAnalyze={onAnalyzeComplexity}
              />
            </div>

            {/* Terminal Console Output */}
            <div className="h-32 sm:h-36 border-t border-white/10 bg-[#060e20] p-2.5 flex flex-col font-mono text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-white/50 uppercase tracking-wider">Terminal Execution Output</span>
                <span className="text-[10px] text-cyan-400">Standard Input / Output</span>
              </div>

              <div className="flex-1 overflow-y-auto bg-[#020617] border border-white/5 rounded p-2 text-white/80 whitespace-pre-wrap leading-relaxed font-mono">
                {stdoutOutput ? (
                  stdoutOutput
                ) : (
                  <span className="text-white/30 italic">&gt; Click "Run Code" to execute solution in sandbox environment...</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Tabs */}
      <nav className="flex md:hidden justify-around items-center p-2 bg-[#171F33] border-t border-white/10 shrink-0">
        <button
          onClick={() => setActiveTab('editor')}
          className={`flex flex-col items-center p-1.5 rounded-lg text-xs ${
            activeTab === 'editor' ? 'text-cyan-400 bg-cyan-500/10' : 'text-white/60'
          }`}
        >
          <span className="material-symbols-outlined text-lg">code</span>
          <span className="text-[10px]">Editor</span>
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex flex-col items-center p-1.5 rounded-lg text-xs ${
            activeTab === 'chat' ? 'text-indigo-400 bg-indigo-500/10' : 'text-white/60'
          }`}
        >
          <span className="material-symbols-outlined text-lg">forum</span>
          <span className="text-[10px]">Chat</span>
        </button>
      </nav>
    </div>
  );
}