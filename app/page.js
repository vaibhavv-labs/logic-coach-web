"use client";

import { useState, useRef, useEffect } from "react";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, getDocs, addDoc, serverTimestamp, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import AuthModal from "./components/AuthModal";
import CustomProblemModal from "./components/CustomProblemModal";
import ProgressScreen from "./components/ProgressScreen";
import CodeEditor from "./components/CodeEditor";
import VoiceChat from "./components/VoiceChat";
import DSAPath from "./components/DSAPath";
import DSATeachingPhase from "./components/DSATeachingPhase";

// Visualizers
import ArrayVisualizer from "./components/visualizers/ArrayVisualizer";
import StackVisualizer from "./components/visualizers/StackVisualizer";
import QueueVisualizer from "./components/visualizers/QueueVisualizer";
import LinkedListVisualizer from "./components/visualizers/LinkedListVisualizer";
import TreeVisualizer from "./components/visualizers/TreeVisualizer";
import BarsVisualizer from "./components/visualizers/BarsVisualizer";
import GraphVisualizer from "./components/visualizers/GraphVisualizer";
import StringVisualizer from "./components/visualizers/StringVisualizer";
import RecursionVisualizer from "./components/visualizers/RecursionVisualizer";
import DPVisualizer from "./components/visualizers/DPVisualizer";
import SearchVisualizer from "./components/visualizers/SearchVisualizer";
import SortingVisualizer from "./components/visualizers/SortingVisualizer";
import HeapVisualizer from "./components/visualizers/HeapVisualizer";
import HashtableVisualizer from "./components/visualizers/HashtableVisualizer";
import TrieVisualizer from "./components/visualizers/TrieVisualizer";

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
  const [code, setCode] = useState("");
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [latestAiMessage, setLatestAiMessage] = useState("");
  
  // DSA states
  const [dsaProgress, setDsaProgress] = useState({});
  const [viewMode, setViewMode] = useState("logic"); // 'logic' | 'dsa'
  const [activeDsaTopic, setActiveDsaTopic] = useState(null);
  const [problemVisualState, setProblemVisualState] = useState(null);
  
  // Auth & DB states
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  
  // Progress states
  const [solvedProblems, setSolvedProblems] = useState(new Set());
  const [userStats, setUserStats] = useState({ totalAttempted: 0, streak: 0, levelCounts: {} });
  
  const [fetchingProblem, setFetchingProblem] = useState(false);
  const [problemFetchError, setProblemFetchError] = useState(null);
  const [activeLevel, setActiveLevel] = useState('Beginner');
  const [theme, setTheme] = useState("light");

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

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
        setDsaProgress(data.dsaProgress || {});
      }
    } catch (error) {
      console.error("Error loading progress:", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 10);
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
          body: JSON.stringify({ level, dsaTopic: activeDsaTopic?.title || null, language })
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
      setProblemFetchError(error.message);
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
    setProblemFetchError(null);
    setCode(""); // clear code editor for new problem
    setIsAiSpeaking(false);
    setProblemVisualState(null);
    
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

    if (isNowSolved && viewMode === 'dsa' && activeDsaTopic) {
      const currentLevel = dsaProgress[activeDsaTopic.id]?.level || 0;
      if (currentLevel === 1) {
        const newProg = { ...dsaProgress, [activeDsaTopic.id]: { ...dsaProgress[activeDsaTopic.id], level: 2 } };
        setDsaProgress(newProg);
        await setDoc(doc(db, "user_progress", user.uid), { dsaProgress: newProg }, { merge: true });
      }
    }
  };

  const handleSend = async (overrideText = null, fromVoice = false, retryMessage = null) => {
    const textToSend = retryMessage || overrideText || inputText;
    
    if (!textToSend.trim() || isLoading || !activeProblem) return;
    if (textToSend.length > MAX_CHARS) return;

    if (!user) {
       setShowAuthModal(true);
       return;
    }

    if (!overrideText && !retryMessage) setInputText("");
    setIsLoading(true);

    const userMessage = textToSend.trim();
    const currentMessages = messages[activeProblem.id] || [];
    const filteredMessages = retryMessage ? currentMessages.filter(m => m.role !== "error") : currentMessages;
    
    const updatedMessages = retryMessage ? filteredMessages : [
      ...filteredMessages,
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
          progLanguage: progLanguage,
          editorCode: code,
          dsaTopic: viewMode === 'dsa' && activeDsaTopic ? activeDsaTopic.title : null,
          dsaVisuals: viewMode === 'dsa' && activeDsaTopic ? activeDsaTopic.teachingSteps.map(s => s.visualState).join(', ') : null
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      let replyText = data.reply;
      const stateMatch = replyText.match(/\[STATE:(.+?)\]/);
      if (stateMatch) {
        setProblemVisualState(stateMatch[1]);
        replyText = replyText.replace(/\[STATE:(.+?)\]/g, "").trim();
      }

      setMessages((prev) => ({
        ...prev,
        [activeProblem.id]: [
          ...prev[activeProblem.id],
          { role: "coach", content: replyText },
        ],
      }));
      if (fromVoice) {
        setLatestAiMessage(replyText);
        setIsAiSpeaking(true);
      }
    } catch (error) {
      setMessages((prev) => ({
        ...prev,
        [activeProblem.id]: [
          ...(prev[activeProblem.id]?.filter(m => m.role !== "error") || []),
          {
            role: "error",
            content: `Error: ${error.message}`,
            retryMessage: userMessage
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

  const renderProblemVisualizer = () => {
    if (viewMode !== 'dsa' || !activeDsaTopic) return null;
    
    // activeDsaTopic has teachingSteps which have visualType and visualState.
    // We just need the visualType from step 0 to know which component to render.
    const visualType = activeDsaTopic.teachingSteps[0]?.visualType;
    if (!visualType || visualType === 'text') return null;

    const stateToPass = problemVisualState || "empty";

    const visualizerContent = (() => {
      switch(visualType) {
        case "array": return <ArrayVisualizer state={stateToPass} />;
        case "stack": return <StackVisualizer state={stateToPass} />;
        case "queue": return <QueueVisualizer state={stateToPass} />;
        case "linkedlist": return <LinkedListVisualizer state={stateToPass} />;
        case "tree": return <TreeVisualizer state={stateToPass} />;
        case "bars": return <BarsVisualizer state={stateToPass} />;
        case "graph": return <GraphVisualizer state={stateToPass} />;
        case "string": return <StringVisualizer state={stateToPass} />;
        case "recursion": return <RecursionVisualizer state={stateToPass} />;
        case "dp": return <DPVisualizer state={stateToPass} />;
        case "search": return <SearchVisualizer state={stateToPass} />;
        case "sorting": return <SortingVisualizer state={stateToPass} />;
        case "heap": return <HeapVisualizer state={stateToPass} />;
        case "hashtable": return <HashtableVisualizer state={stateToPass} />;
        case "trie": return <TrieVisualizer state={stateToPass} />;
        default: return null;
      }
    })();

    if (!visualizerContent) return null;

    return (
      <div className="problem-visualizer-wrapper" style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid var(--border)' }}>
        <div style={{ padding: '8px 16px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--accent-blue)' }}>⚡</span> Visual Debugger: {activeDsaTopic.title}
        </div>
        <div style={{ padding: '16px', background: 'var(--bg-card)', minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {visualizerContent}
        </div>
      </div>
    );
  };

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
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <button 
                className={`action-btn ${viewMode === 'logic' ? 'active' : ''}`} 
                onClick={() => { setViewMode('logic'); setActiveProblem(null); setActiveDsaTopic(null); }}
                style={{ flex: 1, padding: '8px', background: viewMode === 'logic' ? 'var(--accent-blue)' : 'var(--bg-card)' }}
              >Logic</button>
              <button 
                className={`action-btn ${viewMode === 'dsa' ? 'active' : ''}`} 
                onClick={() => { setViewMode('dsa'); setActiveProblem(null); setActiveDsaTopic(null); }}
                style={{ flex: 1, padding: '8px', background: viewMode === 'dsa' ? 'var(--accent-orange)' : 'var(--bg-card)' }}
              >DSA Path</button>
            </div>

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
          {viewMode === 'dsa' && !activeProblem && !activeDsaTopic ? (
             <DSAPath progress={dsaProgress} onSelectTopic={(t) => {
               if (requireAuth()) {
                 setActiveDsaTopic(t);
               }
             }} />
          ) : viewMode === 'dsa' && activeDsaTopic && (!dsaProgress[activeDsaTopic.id] || dsaProgress[activeDsaTopic.id].level === 0) ? (
             <DSATeachingPhase 
               topic={activeDsaTopic} 
               initialStep={dsaProgress[activeDsaTopic.id]?.step || 0}
               language={language}
               onLanguageChange={setLanguage}
               onProgressUpdate={async (step) => {
                 const newProg = { ...dsaProgress, [activeDsaTopic.id]: { level: 0, step } };
                 setDsaProgress(newProg);
                 if (user) await setDoc(doc(db, "user_progress", user.uid), { dsaProgress: newProg }, { merge: true });
               }}
               onComplete={async () => {
                 const newProg = { ...dsaProgress, [activeDsaTopic.id]: { level: 1, step: 0 } };
                 setDsaProgress(newProg);
                 if (user) await setDoc(doc(db, "user_progress", user.uid), { dsaProgress: newProg }, { merge: true });
                 alert("Topic Teaching Complete! You can now select a problem level to practice.");
               }}
             />
          ) : !activeProblem ? (
            fetchingProblem ? (
              <div className="landing-container" style={{ background: 'none' }}>
                <div className="typing-dots" style={{ margin: 'auto', background: 'transparent', border: 'none', boxShadow: 'none' }}>
                  <span></span><span></span><span></span>
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '20px' }}>Generating Problem...</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Our AI coach is crafting a unique logic challenge just for you.</p>
              </div>
            ) : problemFetchError ? (
              <div className="landing-container" style={{ background: 'none' }}>
                <div className="landing-icon" style={{ boxShadow: 'none', background: '#fef2f2', color: '#991b1b' }}>⚠️</div>
                <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', color: '#991b1b' }}>Failed to Load</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>{problemFetchError}</p>
                <button className="start-btn-small" onClick={() => getProblemForLevel(activeLevel)}>↻ Try Again</button>
              </div>
            ) : (
              <div className="landing-container" style={{ background: 'none' }}>
                <div className="landing-icon" style={{ boxShadow: 'none' }}>🎯</div>
                <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>Pick a Difficulty</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Select a level from the sidebar to generate a problem.</p>
              </div>
            )
          ) : (
            <div className="split-layout">
              {/* Chat Pane */}
              <div className="chat-pane">
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
                  
                  <button className="action-btn theme-toggle" onClick={toggleTheme} title="Toggle Theme" style={{ fontSize: '18px', padding: '6px 10px' }}>
                    {theme === "light" ? "🌙" : "☀️"}
                  </button>

                  <button 
                    className={`mark-solved-btn ${solvedProblems.has(activeProblem.id) ? 'solved pop-celebrate' : ''}`}
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
                      {msg.role === "error" && msg.retryMessage && (
                        <button 
                          onClick={() => handleSend(null, false, msg.retryMessage)}
                          style={{ display: 'block', marginTop: '8px', padding: '6px 12px', background: '#f87171', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                        >
                          ↻ Try Again
                        </button>
                      )}
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
                  <VoiceChat 
                    onTranscript={(text) => handleSend(text, true)} 
                    isAiSpeaking={isAiSpeaking} 
                    aiMessage={latestAiMessage}
                    onAiSpeechEnd={() => setIsAiSpeaking(false)}
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

              {/* Code Editor Pane */}
              <div className="editor-pane" style={{ display: 'flex', flexDirection: 'column' }}>
                 {renderProblemVisualizer()}
                 <CodeEditor 
                   language={progLanguage} 
                   value={code} 
                   onChange={setCode} 
                 />
                 <button 
                   className="review-btn" 
                   onClick={() => handleSend("Please review the code I have written in the editor.")}
                   disabled={isLoading || !code.trim()}
                 >
                   ✨ Review My Code
                 </button>
              </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
