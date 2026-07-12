"use client";

import { useState, useRef, useEffect } from "react";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, getDocs, addDoc, serverTimestamp, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import AuthModal from "./components/AuthModal";
import CustomProblemModal from "./components/CustomProblemModal";
import ProgressScreen from "./components/ProgressScreen";

const MAX_CHARS = 2000;
const LEVELS = ['Beginner', 'Easy', 'Medium', 'Hard', 'Advanced'];

export default function Home() {
  const [screen, setScreen] = useState("landing"); // 'landing' | 'app'
  const [activeProblem, setActiveProblem] = useState(null);
  const [messages, setMessages] = useState({});
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  const [progLanguage, setProgLanguage] = useState("Python");
  
  // Auth & DB states
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  
  // Progress states
  const [solvedProblems, setSolvedProblems] = useState(new Set());
  const [userStats, setUserStats] = useState({ totalAttempted: 0, streak: 0, levelCounts: {} });
  
  const [fetchingProblem, setFetchingProblem] = useState(false);
  const [activeLevel, setActiveLevel] = useState('Beginner');

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setShowAuthModal(false);
        await loadUserProgress(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const loadUserProgress = async (uid) => {
    try {
      const docRef = doc(db, "user_progress", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSolvedProblems(new Set(data.solved || []));
        setUserStats({
          totalAttempted: data.totalAttempted || 0,
          streak: data.streak || 0,
          levelCounts: data.levelCounts || {}
        });
      }
    } catch (error) {
      console.error("Error loading progress:", error);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeProblem, isLoading]);

  useEffect(() => {
    if (activeProblem && screen === "app") {
      inputRef.current?.focus();
    }
  }, [activeProblem, screen]);

  const requireAuth = () => {
    if (!user) {
      setShowAuthModal(true);
      return false;
    }
    return true;
  };

  const getProblemForLevel = async (level) => {
    if (!requireAuth()) return;
    
    setFetchingProblem(true);
    setActiveLevel(level);
    setSidebarOpen(false);
    
    try {
      // 1. Check firestore for problems of this level
      const q = query(collection(db, "problems"), where("difficulty", "==", level));
      const querySnapshot = await getDocs(q);
      
      let availableProblems = [];
      querySnapshot.forEach((doc) => {
        availableProblems.push({ id: doc.id, ...doc.data() });
      });

      // Filter out solved problems
      const unsolvedProblems = availableProblems.filter(p => !solvedProblems.has(p.id));

      let selectedProblem;

      if (unsolvedProblems.length > 0) {
        // Pick the first unsolved one
        selectedProblem = unsolvedProblems[0];
      } else {
        // 2. If no unsolved problems exist, generate a new one
        const response = await fetch("/api/generate-problem", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ level })
        });
        
        if (!response.ok) throw new Error("Failed to generate problem");
        
        const generatedData = await response.json();
        
        // Save to Firestore
        const docRef = await addDoc(collection(db, "problems"), {
          ...generatedData,
          createdAt: serverTimestamp()
        });
        
        selectedProblem = { id: docRef.id, ...generatedData };
      }

      selectedProblem.icon = "🧩"; // Add a default icon
      setupProblem(selectedProblem);

    } catch (error) {
      console.error("Error fetching problem:", error);
      alert("Failed to load a problem. Please try again.");
    } finally {
      setFetchingProblem(false);
    }
  };

  const handleCustomProblem = (problem) => {
    setupProblem(problem);
    setShowCustomModal(false);
  };

  const setupProblem = (problem) => {
    setActiveProblem(problem);
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
    
    // Update total attempted if user is logged in
    if (user && !solvedProblems.has(problem.id)) {
      updateUserStats(user.uid, { totalAttempted: userStats.totalAttempted + 1 });
    }
  };

  const updateUserStats = async (uid, newStats) => {
    try {
      const docRef = doc(db, "user_progress", uid);
      const updated = { ...userStats, ...newStats };
      setUserStats(updated);
      await setDoc(docRef, updated, { merge: true });
    } catch (err) {
      console.error("Failed to update stats", err);
    }
  };

  const toggleSolved = async () => {
    if (!activeProblem) return;
    
    // Require auth to save permanently
    if (!user) {
       setShowAuthModal(true);
       return;
    }

    const newSet = new Set(solvedProblems);
    const isNowSolved = !newSet.has(activeProblem.id);
    
    if (isNowSolved) {
      newSet.add(activeProblem.id);
    } else {
      newSet.delete(activeProblem.id);
    }
    
    setSolvedProblems(newSet);

    // Update level counts
    const level = activeProblem.difficulty;
    const currentCount = userStats.levelCounts[level] || 0;
    const newCount = isNowSolved ? currentCount + 1 : Math.max(0, currentCount - 1);
    
    const newStats = {
      levelCounts: { ...userStats.levelCounts, [level]: newCount },
      solved: Array.from(newSet)
    };
    
    await updateUserStats(user.uid, newStats);
  };

  const handleSend = async (overrideText = null) => {
    const textToSend = overrideText || inputText;
    
    if (!textToSend.trim() || isLoading || !activeProblem) return;
    if (textToSend.length > MAX_CHARS) return;

    if (!user) {
       setShowAuthModal(true);
       return;
    }

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
          language: language,
          progLanguage: progLanguage
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
            content: `Error: ${error.message}`,
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
      <div className="landing-layout">
        {showAuthModal && (
          <AuthModal 
            onClose={() => setShowAuthModal(false)} 
            onSuccess={() => { setShowAuthModal(false); setScreen("app"); }} 
          />
        )}
        <nav className="landing-nav">
          <div className="landing-nav-logo">
            <span className="logo-icon">🧠</span>
            <span className="logo-text">Logic Coach</span>
          </div>
          <div className="landing-nav-actions">
            {user ? (
              <button className="start-btn-small" onClick={() => setScreen("app")}>
                Go to Dashboard
              </button>
            ) : (
              <button className="start-btn-small" onClick={() => setShowAuthModal(true)}>
                Sign In
              </button>
            )}
          </div>
        </nav>
        
        <div className="landing-container">
          <div className="landing-icon">🧠</div>
          <h1 className="landing-title">Logic Coach</h1>
          <h2 className="landing-tagline">Learn by thinking, not by copy-pasting</h2>
          <p className="landing-desc">
            Your personal Socratic AI tutor. We never give direct code answers — instead we guide you through questions so you discover the logic yourself.
          </p>
          <button className="start-btn" onClick={() => { if (user) setScreen("app"); else setShowAuthModal(true); }}>
            {user ? "Resume Learning" : "Start Learning for Free"}
          </button>
        </div>
      </div>
    );
  }

  // ==================== MAIN APP ====================
  const currentMessages = activeProblem ? messages[activeProblem.id] || [] : [];

  return (
    <>
      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)} 
          onSuccess={() => setShowAuthModal(false)} 
        />
      )}
      
      {showCustomModal && (
        <CustomProblemModal 
          onClose={() => setShowCustomModal(false)} 
          onSubmit={handleCustomProblem} 
          user={user}
        />
      )}

      {showProgress && (
        <ProgressScreen 
          onClose={() => setShowProgress(false)} 
          solvedCount={solvedProblems.size}
          totalAttempted={userStats.totalAttempted}
          stats={userStats}
        />
      )}

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
        <div style={{ width: 24 }}></div>
      </div>

      <div className="app-layout">
        {/* Sidebar Overlay */}
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

          <div className="sidebar-user-section" style={{ padding: '16px', borderBottom: '1px solid var(--border-light)' }}>
            {user ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>👤 {user.email.split('@')[0]}</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="action-btn" onClick={() => setShowProgress(true)} style={{ flex: 1, padding: '4px' }}>Progress</button>
                  <button className="action-btn" onClick={() => signOut(auth)} style={{ flex: 1, padding: '4px', background: 'transparent', border: '1px solid var(--border-light)', color: 'var(--text-secondary)' }}>Sign Out</button>
                </div>
              </div>
            ) : (
              <button className="start-btn" onClick={() => setShowAuthModal(true)} style={{ width: '100%', padding: '8px', fontSize: '14px' }}>
                Sign In
              </button>
            )}
          </div>

          <div className="sidebar-problems">
            <button 
              className="start-btn" 
              style={{ width: '100%', marginBottom: '16px', background: 'var(--accent-orange)', padding: '10px' }}
              onClick={() => {
                if (requireAuth()) setShowCustomModal(true);
              }}
            >
              + Custom Problem
            </button>
            
            <h3 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', paddingLeft: '4px' }}>Difficulty Levels</h3>
            
            {LEVELS.map((level) => (
              <div
                key={level}
                className={`problem-card ${activeLevel === level ? "active" : ""}`}
                onClick={() => getProblemForLevel(level)}
                style={{ opacity: fetchingProblem && activeLevel === level ? 0.5 : 1 }}
              >
                <div className="problem-icon">📚</div>
                <div className="problem-info">
                  <h4>{level} {fetchingProblem && activeLevel === level && '...'}</h4>
                  <div className="problem-meta">
                    <span className={`problem-difficulty ${level.toLowerCase()}`}>
                      Generate Next
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
              <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Pick a Difficulty</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Select a level from the sidebar to generate a problem.</p>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="chat-header">
                <div className="chat-header-info">
                  <div className="chat-header-icon">
                    {activeProblem.icon || "🧩"}
                  </div>
                  <div className="chat-header-text">
                    <h3>{activeProblem.title}</h3>
                    <p>{activeProblem.category}</p>
                  </div>
                </div>
                
                <div className="header-actions">
                  <select 
                    className="lang-select" 
                    value={progLanguage}
                    onChange={(e) => setProgLanguage(e.target.value)}
                    title="Programming Language"
                  >
                    <option value="Python">Python</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Java">Java</option>
                    <option value="C++">C++</option>
                    <option value="C#">C#</option>
                    <option value="Ruby">Ruby</option>
                    <option value="Any Language">Any Language</option>
                  </select>
                  
                  <select 
                    className="lang-select" 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    title="Spoken Language"
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Marathi">Marathi</option>
                    <option value="Hinglish">Hinglish</option>
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
                      {msg.role === "user" ? "👤" : msg.role === "error" ? "⚠️" : "🤖"}
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
                          {i < msg.content.split("\n").length - 1 && <br />}
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
                  <button className="action-btn" onClick={() => handleSend("Explain simpler please")}>
                    Explain simpler please
                  </button>
                  <button className="action-btn" onClick={() => handleSend("I am completely stuck")}>
                    I am completely stuck
                  </button>
                  <button className="action-btn" onClick={() => handleSend("Is my logic correct so far?")}>
                    Is my logic correct so far?
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
