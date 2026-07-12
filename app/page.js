"use client";

import { useState, useRef, useEffect } from "react";
import { problems } from "./data/problems";

const MAX_CHARS = 2000;

export default function Home() {
  const [screen, setScreen] = useState("landing"); // 'landing' | 'app'
  const [activeProblem, setActiveProblem] = useState(null);
  const [messages, setMessages] = useState({});
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState("Hinglish (Default)");
  const [solvedProblems, setSolvedProblems] = useState(new Set()); // Session-based solved tracking
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeProblem, isLoading]);

  useEffect(() => {
    if (activeProblem && screen === "app") {
      inputRef.current?.focus();
    }
  }, [activeProblem, screen]);

  const handleSelectProblem = (problem) => {
    setActiveProblem(problem);
    setSidebarOpen(false);
    if (!messages[problem.id]) {
      setMessages((prev) => ({
        ...prev,
        [problem.id]: [
          {
            role: "coach",
            content: `Hi! Let's solve **"${problem.title}"** together.\n\nHere is the problem: ${problem.description}\n\nWhat do you think is the first logical step to approach this?`,
          },
        ],
      }));
    }
  };

  const toggleSolved = () => {
    if (!activeProblem) return;
    setSolvedProblems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(activeProblem.id)) {
        newSet.delete(activeProblem.id);
      } else {
        newSet.add(activeProblem.id);
      }
      return newSet;
    });
  };

  const handleSend = async (overrideText = null) => {
    const textToSend = overrideText || inputText;
    
    if (!textToSend.trim() || isLoading || !activeProblem) return;
    if (textToSend.length > MAX_CHARS) return;

    if (!overrideText) setInputText("");
    setIsLoading(true);

    const userMessage = textToSend.trim();
    const currentMessages = messages[activeProblem.id] || [];
    const updatedMessages = [
      ...currentMessages,
      { role: "user", content: userMessage },
    ];

    setMessages((prev) => ({
      ...prev,
      [activeProblem.id]: updatedMessages,
    }));

    try {
      const apiMessages = updatedMessages.map((msg) => ({
        role: msg.role === "coach" ? "model" : "user",
        content: msg.content,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
          problemContext: {
            title: activeProblem.title,
            description: activeProblem.description,
          },
          language: language
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      setMessages((prev) => ({
        ...prev,
        [activeProblem.id]: [
          ...prev[activeProblem.id],
          { role: "coach", content: data.reply },
        ],
      }));
    } catch (error) {
      setMessages((prev) => ({
        ...prev,
        [activeProblem.id]: [
          ...prev[activeProblem.id],
          {
            role: "error",
            content: `Error: ${error.message}`, // Exposing real error
          },
        ],
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ==================== LANDING PAGE ====================
  if (screen === "landing") {
    return (
      <div className="landing-container">
        <div className="landing-icon">🧠</div>
        <h1 className="landing-title">Logic Coach</h1>
        <h2 className="landing-tagline">Seekho khud sochke, copy-paste karke nahi</h2>
        <p className="landing-desc">
          Your personal Socratic AI tutor. We never give you the direct code answers. 
          Instead, we guide you through questions to help you discover the logic yourself.
        </p>
        <button className="start-btn" onClick={() => setScreen("app")}>
          Start Learning →
        </button>
      </div>
    );
  }

  // ==================== MAIN APP ====================
  const currentMessages = activeProblem ? messages[activeProblem.id] || [] : [];

  return (
    <>
      {/* Mobile Header */}
      <div className="mobile-header">
        <button
          className="mobile-menu-btn"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>
        <div className="sidebar-brand">
          <h2>Logic Coach</h2>
        </div>
        <div style={{ width: 24 }}></div> {/* Spacer */}
      </div>

      <div className="app-layout">
        {/* Sidebar Overlay (mobile) */}
        <div
          className={`sidebar-overlay ${sidebarOpen ? "visible" : ""}`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="sidebar-header">
            <div className="sidebar-brand">
              <div className="sidebar-logo">🧠</div>
              <h2>Logic Coach</h2>
            </div>
          </div>

          <div className="sidebar-problems">
            {problems.map((problem) => (
              <div
                key={problem.id}
                className={`problem-card ${
                  activeProblem?.id === problem.id ? "active" : ""
                }`}
                onClick={() => handleSelectProblem(problem)}
              >
                <div className="problem-icon">{problem.icon}</div>
                <div className="problem-info">
                  <h4>
                    {problem.title}
                    {solvedProblems.has(problem.id) && (
                      <span className="problem-status-icon" title="Solved">✅</span>
                    )}
                  </h4>
                  <div className="problem-meta">
                    <span
                      className={`problem-difficulty ${problem.difficulty.toLowerCase()}`}
                    >
                      {problem.difficulty}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {!activeProblem ? (
            <div className="landing-container" style={{ background: 'none' }}>
              <div className="landing-icon" style={{ boxShadow: 'none' }}>🎯</div>
              <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Pick a Challenge</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Select a problem from the sidebar to begin.</p>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="chat-header">
                <div className="chat-header-info">
                  <div className="chat-header-icon">
                    {activeProblem.icon}
                  </div>
                  <div className="chat-header-text">
                    <h3>{activeProblem.title}</h3>
                    <p>{activeProblem.category}</p>
                  </div>
                </div>
                
                <div className="header-actions">
                  <select 
                    className="lang-select" 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="Hinglish (Default)">Hinglish</option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Marathi">Marathi</option>
                  </select>
                  
                  <button 
                    className={`mark-solved-btn ${solvedProblems.has(activeProblem.id) ? 'solved' : ''}`}
                    onClick={toggleSolved}
                  >
                    {solvedProblems.has(activeProblem.id) ? '✓ Solved' : 'Mark Solved'}
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="chat-messages">
                {currentMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`message ${
                      msg.role === "user"
                        ? "user"
                        : msg.role === "error"
                        ? "error"
                        : "coach"
                    }`}
                  >
                    <div className="message-avatar">
                      {msg.role === "user"
                        ? "👤"
                        : msg.role === "error"
                        ? "⚠️"
                        : "🤖"}
                    </div>
                    <div className="message-bubble">
                      {msg.content.split("\n").map((line, i) => (
                        <span key={i}>
                          {line
                            .split(/(\*\*.*?\*\*)/)
                            .map((part, j) =>
                              part.startsWith("**") && part.endsWith("**") ? (
                                <strong key={j}>
                                  {part.slice(2, -2)}
                                </strong>
                              ) : (
                                part
                              )
                            )}
                          {i <
                            msg.content.split("\n").length - 1 && <br />}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="message coach">
                    <div className="message-avatar">🤖</div>
                    <div className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="chat-bottom">
                <div className="quick-actions">
                  <button className="action-btn" onClick={() => handleSend("Aur simple samjhao")}>
                    Aur simple samjhao
                  </button>
                  <button className="action-btn" onClick={() => handleSend("Bilkul atak gaya")}>
                    Bilkul atak gaya
                  </button>
                  <button className="action-btn" onClick={() => handleSend("Ye sahi hai kya?")}>
                    Ye sahi hai kya?
                  </button>
                </div>

                <div className="chat-input-wrapper">
                  <textarea
                    ref={inputRef}
                    className="chat-input"
                    placeholder="Type your answer..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    maxLength={MAX_CHARS}
                    disabled={isLoading}
                  />
                  <button
                    className="send-btn"
                    onClick={() => handleSend()}
                    disabled={!inputText.trim() || isLoading}
                  >
                    ➤
                  </button>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}
