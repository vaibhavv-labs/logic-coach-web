"use client";

import { useState, useRef, useEffect } from "react";
import { problems } from "./data/problems";

const MAX_CHARS = 2000;

export default function Home() {
  const [user, setUser] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [activeProblem, setActiveProblem] = useState(null);
  const [messages, setMessages] = useState({});
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeProblem, isLoading]);

  useEffect(() => {
    if (activeProblem) inputRef.current?.focus();
  }, [activeProblem]);

  const handleLogin = (name) => {
    if (!name.trim()) return;
    setUser({ name: name.trim() });
  };

  const handleGuestLogin = () => {
    setUser({ name: "Guest Student", isGuest: true });
  };

  const handleLogout = () => {
    setUser(null);
    setActiveProblem(null);
    setMessages({});
    setShowUserMenu(false);
  };

  const handleSelectProblem = (problem) => {
    setActiveProblem(problem);
    setSidebarOpen(false);
    if (!messages[problem.id]) {
      setMessages((prev) => ({
        ...prev,
        [problem.id]: [
          {
            role: "coach",
            content: `Welcome! 🎯 You've selected **"${problem.title}"**.\n\n${problem.description}\n\nLet's work through this together! Before we start coding, tell me — what do you think is the very first thing we need to figure out to solve this problem?`,
          },
        ],
      }));
    }
  };

  const handleSend = async () => {
    if (!inputText.trim() || isLoading || !activeProblem) return;
    if (inputText.length > MAX_CHARS) return;

    const userMessage = inputText.trim();
    setInputText("");
    setIsLoading(true);

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
            content:
              "Oops! Something went wrong. Please check your internet connection and try again.",
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

  // ==================== LOGIN SCREEN ====================
  if (!user) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-logo">🧠</div>
          <h1 className="login-title">Logic Coach</h1>
          <p className="login-subtitle">
            Learn to think like a programmer. Build coding logic step-by-step
            through interactive Socratic dialogue.
          </p>

          <div className="login-features">
            <div className="login-feature">
              <div className="login-feature-icon">💬</div>
              <div className="login-feature-text">
                <h4>Socratic Conversations</h4>
                <p>Guided with clues, never direct answers</p>
              </div>
            </div>
            <div className="login-feature">
              <div className="login-feature-icon">🌐</div>
              <div className="login-feature-text">
                <h4>Multi-Lingual Support</h4>
                <p>English, Hindi, Marathi, or Hinglish</p>
              </div>
            </div>
            <div className="login-feature">
              <div className="login-feature-icon">🧩</div>
              <div className="login-feature-text">
                <h4>Curated Logic Challenges</h4>
                <p>Master core computing fundamentals</p>
              </div>
            </div>
          </div>

          <div className="login-input-group">
            <input
              className="login-input"
              type="text"
              placeholder="Enter your name to begin..."
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin(nameInput)}
              maxLength={50}
              id="name-input"
            />
          </div>

          <button
            className="login-btn"
            onClick={() => handleLogin(nameInput)}
            disabled={!nameInput.trim()}
            id="login-button"
          >
            Start Learning →
          </button>

          <button
            className="login-guest"
            onClick={handleGuestLogin}
            id="guest-button"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    );
  }

  // ==================== MAIN APP ====================
  const currentMessages = activeProblem
    ? messages[activeProblem.id] || []
    : [];

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
          <div className="sidebar-logo">🧠</div>
          <h2>Logic Coach</h2>
        </div>
        <button
          className="sidebar-user-btn"
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          {user.name[0].toUpperCase()}
        </button>
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
            <button
              className="sidebar-user-btn"
              onClick={() => setShowUserMenu(!showUserMenu)}
              id="user-menu-btn"
            >
              {user.name[0].toUpperCase()}
            </button>
          </div>

          {showUserMenu && (
            <div className="user-dropdown">
              <div className="user-dropdown-name">
                <p>{user.name}</p>
                <span>{user.isGuest ? "Guest Mode" : "Student"}</span>
              </div>
              <button
                className="user-dropdown-item danger"
                onClick={handleLogout}
                id="logout-btn"
              >
                🚪 Sign Out
              </button>
            </div>
          )}

          <div className="sidebar-section-title">Logic Problems</div>

          <div className="sidebar-problems">
            {problems.map((problem) => (
              <div
                key={problem.id}
                className={`problem-card ${
                  activeProblem?.id === problem.id ? "active" : ""
                }`}
                onClick={() => handleSelectProblem(problem)}
                id={`problem-${problem.id}`}
              >
                <div className="problem-icon">{problem.icon}</div>
                <div className="problem-info">
                  <h4>{problem.title}</h4>
                  <div className="problem-meta">
                    <span
                      className={`problem-difficulty ${problem.difficulty.toLowerCase()}`}
                    >
                      {problem.difficulty}
                    </span>
                    <span className="problem-category">
                      {problem.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="sidebar-footer">
            <button className="logout-btn" onClick={handleLogout} id="sidebar-logout">
              🚪 Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content" onClick={() => setShowUserMenu(false)}>
          {!activeProblem ? (
            <div className="empty-state">
              <div className="empty-icon">🎯</div>
              <h2>Ready to Think?</h2>
              <p>
                Select a logic problem from the sidebar to start your Socratic
                learning journey. Your AI coach will guide you step-by-step!
              </p>
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
                <span className="chat-header-badge">
                  {activeProblem.difficulty}
                </span>
              </div>

              {/* Messages */}
              <div className="chat-messages" id="chat-messages">
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
                  <div className="typing-indicator">
                    <div className="message-avatar" style={{
                      width: 32, height: 32, minWidth: 32,
                      borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: "linear-gradient(135deg, #8b5cf6, #3b82f6, #06b6d4)",
                      fontSize: 14
                    }}>
                      🤖
                    </div>
                    <div className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="chat-input-area">
                <div className="chat-input-wrapper">
                  <textarea
                    ref={inputRef}
                    className="chat-input"
                    placeholder="Type your answer or ask a question..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    maxLength={MAX_CHARS}
                    disabled={isLoading}
                    id="chat-input"
                  />
                  <button
                    className="send-btn"
                    onClick={handleSend}
                    disabled={!inputText.trim() || isLoading}
                    id="send-btn"
                  >
                    ➤
                  </button>
                </div>
                {inputText.length > MAX_CHARS * 0.8 && (
                  <div
                    className={`char-counter ${
                      inputText.length > MAX_CHARS * 0.95
                        ? "danger"
                        : "warning"
                    }`}
                  >
                    {inputText.length}/{MAX_CHARS}
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}
