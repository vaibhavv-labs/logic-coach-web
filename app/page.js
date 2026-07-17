"use client";

import { useState, useRef, useEffect } from "react";
import * as Diff from 'diff';
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, getDocs, addDoc, serverTimestamp, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import AuthModal from "./components/AuthModal";
import GuestUpgradeModal from "./components/GuestUpgradeModal";
import LeaderboardModal from "./components/LeaderboardModal";
import CustomProblemModal from "./components/CustomProblemModal";
import ProgressScreen from "./components/ProgressScreen";
import CodeEditor from "./components/CodeEditor";
import VoiceChat from "./components/VoiceChat";
import DSAPath from "./components/DSAPath";
import DSATeachingPhase from "./components/DSATeachingPhase";
import LanguagePath from "./components/LanguagePath";
import OnboardingScreen from "./components/OnboardingScreen";
import PracticeCompilerPanel from "./components/PracticeCompilerPanel";
import LandingPage from "./components/LandingPage";

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
  const [customInput, setCustomInput] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [terminalHeight, setTerminalHeight] = useState(250);
  
  // DSA states
  const [dsaProgress, setDsaProgress] = useState({});
  const [languageProgress, setLanguageProgress] = useState({});
  const [viewMode, setViewMode] = useState("logic"); // 'logic' | 'dsa' | 'language'
  const [activeDsaTopic, setActiveDsaTopic] = useState(null);
  const [activeLanguageTopic, setActiveLanguageTopic] = useState(null);
  const [problemVisualState, setProblemVisualState] = useState(null);
  
  // Level 2 Timer states
  const [timeLeft, setTimeLeft] = useState(1200);
  const [timerActive, setTimerActive] = useState(false);
  
  // Auth & DB states
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showGuestUpgradeModal, setShowGuestUpgradeModal] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(true);
  const [showLanding, setShowLanding] = useState(true);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowAuthModal(false);
        setShowGuestUpgradeModal(false);
        setShowLeaderboard(false);
        setShowCustomModal(false);
        setShowTestPanel(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  const [userRoadmap, setUserRoadmap] = useState(null);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  
  // Progress states
  const [solvedProblems, setSolvedProblems] = useState(new Set());
  const [userStats, setUserStats] = useState({ totalAttempted: 0, streak: 0, levelCounts: {} });
  
  const [fetchingProblem, setFetchingProblem] = useState(false);
  const [problemFetchError, setProblemFetchError] = useState(null);
  const [activeLevel, setActiveLevel] = useState('Beginner');
  const [theme, setTheme] = useState("light");

  // Execution Engine States
  const [isExecuting, setIsExecuting] = useState(false);
  const [isAnalyzingBigO, setIsAnalyzingBigO] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [showTestPanel, setShowTestPanel] = useState(false);

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
    let interval = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
      alert("Time is up! The interview simulation is over. Please try again.");
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        setShowLanding(false);
        if (u.isAnonymous && userStats.totalAttempted >= 3) {
          setShowGuestUpgradeModal(true);
        }
        await loadUserProgress(u.uid);
      } else {
        setShowLanding(true);
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
        setLanguageProgress(data.languageProgress || {});
        
        if (data.onboardingCompleted !== undefined) {
          if (data.roadmap && !data.roadmap.username) {
            setOnboardingCompleted(false);
          } else {
            setOnboardingCompleted(data.onboardingCompleted);
          }
          setUserRoadmap(data.roadmap || null);
        } else {
          // If field doesn't exist on old users, force onboarding or default to true
          setOnboardingCompleted(false);
        }
      } else {
        setOnboardingCompleted(false);
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
      const q = query(collection(db, "problems"), where("difficulty", "==", level));
      const querySnapshot = await getDocs(q);
      
      let availableProblems = [];
      querySnapshot.forEach((doc) => {
        availableProblems.push({ id: doc.id, ...doc.data() });
      });

      const unsolvedProblems = availableProblems.filter(p => !solvedProblems.has(p.id));

      let selectedProblem;

      if (unsolvedProblems.length > 0) {
        selectedProblem = unsolvedProblems[0];
      } else {
        const response = await fetch("/api/generate-problem", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ level, dsaTopic: activeDsaTopic?.title || null, language })
        });
        
        if (!response.ok) throw new Error("Failed to generate problem");
        
        const generatedData = await response.json();
        
        const docRef = await addDoc(collection(db, "problems"), {
          ...generatedData,
          createdAt: serverTimestamp()
        });
        
        selectedProblem = { id: docRef.id, ...generatedData };
      }

      selectedProblem.icon = "🧩";
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
    setCode(""); 
    setIsAiSpeaking(false);
    setProblemVisualState(null);
    setTestResults(null);
    setShowTestPanel(false);
    
    if (viewMode === 'dsa' && activeDsaTopic && dsaProgress[activeDsaTopic.id]?.level >= 2) {
      setTimeLeft(1200);
      setTimerActive(true);
    } else {
      setTimerActive(false);
    }

    if (!messages[problem.id]) {
      const isLevel2 = viewMode === 'dsa' && activeDsaTopic && dsaProgress[activeDsaTopic.id]?.level >= 2;
      setMessages((prev) => ({
        ...prev,
        [problem.id]: [
          {
            role: "coach",
            content: isLevel2 ? `Hello. We have 20 minutes for this technical interview. Please solve **"${problem.title}"**.\n\nDescription: ${problem.description}\n\nYou must provide a fully working solution and analyze the exact Big O Time and Space complexity before we finish. Let's begin.` 
            : `Hi! Let's solve **"${problem.title}"** together.\n\nHere is the problem: ${problem.description}\n\nWhat do you think is the first logical step to approach this?`,
          },
        ],
      }));
    }
    
    if (user && !solvedProblems.has(problem.id)) {
      const newTotal = userStats.totalAttempted + 1;
      updateUserStats(user.uid, { totalAttempted: newTotal });
      if (user.isAnonymous && newTotal === 3) {
        setShowGuestUpgradeModal(true);
      }
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

    const level = activeProblem.difficulty;
    const currentCount = userStats.levelCounts[level] || 0;
    const newCount = isNowSolved ? currentCount + 1 : Math.max(0, currentCount - 1);
    
    const todayStr = new Date().toISOString().split('T')[0];
    const newActivity = { ...(userStats.activity || {}) };
    if (isNowSolved) {
      newActivity[todayStr] = (newActivity[todayStr] || 0) + 1;
    }

    const newStats = {
      levelCounts: { ...userStats.levelCounts, [level]: newCount },
      solved: Array.from(newSet),
      activity: newActivity
    };
    
    await updateUserStats(user.uid, newStats);

    if (isNowSolved && viewMode === 'dsa' && activeDsaTopic) {
      const currentLevel = dsaProgress[activeDsaTopic.id]?.level || 0;
      if (currentLevel === 1 || currentLevel === 2) {
        const newLevel = currentLevel === 1 ? 2 : 3;
        const newProg = { ...dsaProgress, [activeDsaTopic.id]: { ...dsaProgress[activeDsaTopic.id], level: newLevel } };
        setDsaProgress(newProg);
        await setDoc(doc(db, "user_progress", user.uid), { dsaProgress: newProg }, { merge: true });
        
        if (currentLevel === 2) {
           alert("Mastery Achieved! You successfully passed the Interview Simulation!");
           setTimerActive(false);
        }
      }
    }
  };

  const playSuccessSound = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.1); // C6
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {
      // Ignore if AudioContext is not supported or blocked
    }
  };

  const handleRunTests = async () => {
    if (!code.trim()) return;
    setIsExecuting(true);
    setShowTestPanel(true);
    if (terminalHeight < 100) setTerminalHeight(250);
    setTestResults([{ passed: true, isManual: true, actualOutput: "Executing code on server..." }]);
    
    let results = [];
    let allPassed = true;

    if (!activeProblem?.testCases || activeProblem.testCases.length === 0 || showCustomInput) {
      try {
        const res = await fetch("/api/execute", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ language: progLanguage, code: code, stdin: customInput })
        });
        const data = await res.json();
        
        if (!res.ok) {
           results.push({ passed: false, error: data.error, isManual: true });
        } else {
           let stderr = data.stderr || "";
           if (stderr.includes("EOFError: EOF when reading a line")) {
             stderr = "🚨 INTERACTIVE INPUT ERROR:\nYou tried to use `input()` (or cin, Scanner) but didn't provide any input!\n\nPlease check the 'Use Custom Input' box above the code editor and type your inputs there before clicking Run.\n\n" + stderr;
           }
           results.push({
             passed: data.code === 0,
             actualOutput: (data.stdout || "").trim(),
             stderr: stderr,
             exitCode: data.code,
             isManual: true
           });
        }
      } catch (err) {
        results.push({ passed: false, error: err.message, isManual: true });
      }
      
      setTestResults(results);
      setIsExecuting(false);
      return;
    }

    for (let i = 0; i < activeProblem.testCases.length; i++) {
      const tc = activeProblem.testCases[i];
      try {
        const res = await fetch("/api/execute", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            language: progLanguage,
            code: code,
            stdin: tc.input
          })
        });
        const data = await res.json();
        
        if (!res.ok) {
           results.push({ passed: false, error: data.error });
           allPassed = false;
           continue;
        }

        const actualOutput = (data.stdout || "").trim();
        const expectedOutput = (tc.expectedOutput || "").trim();
        const passed = actualOutput === expectedOutput && data.code === 0;
        
        if (!passed) allPassed = false;
        
        results.push({
          passed,
          actualOutput,
          expectedOutput: tc.expectedOutput,
          input: tc.input,
          stderr: data.stderr || "",
          exitCode: data.code
        });

      } catch (err) {
        results.push({ passed: false, error: err.message });
        allPassed = false;
      }
    }

    setTestResults(results);
    setIsExecuting(false);

    if (allPassed) {
      playSuccessSound();
      if (!solvedProblems.has(activeProblem.id)) {
        await toggleSolved(); 
        alert("🎉 All test cases passed! Problem marked as solved.");
      } else {
        alert("🎉 All test cases passed!");
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
          dsaVisuals: viewMode === 'dsa' && activeDsaTopic ? activeDsaTopic.teachingSteps.map(s => s.visualState).join(', ') : null,
          isLevel2: viewMode === 'dsa' && activeDsaTopic && dsaProgress[activeDsaTopic.id]?.level >= 2
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

  if (screen === "landing") {
    return (
      <div className="landing-layout">
        {showAuthModal && (
          <AuthModal 
            onClose={() => setShowAuthModal(false)} 
            onSuccess={() => { setShowAuthModal(false); setScreen("app"); }} 
          />
        )}
        <div className="landing-bg-orb orb-1"></div>
        <div className="landing-bg-orb orb-2"></div>
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
          <div className="landing-icon-wrapper">
            <div className="landing-icon-glow"></div>
            <div className="landing-icon">🧠</div>
          </div>
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

  if (user && !onboardingCompleted) {
    return (
      <OnboardingScreen 
        user={user} 
        onComplete={(roadmapData) => {
          setOnboardingCompleted(true);
          setUserRoadmap(roadmapData);
        }} 
      />
    );
  }

  const currentMessages = activeProblem ? messages[activeProblem.id] || [] : [];

  const renderProblemVisualizer = () => {
    if (viewMode !== 'dsa' || !activeDsaTopic) return null;
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

  const renderDiff = (expected, actual) => {
    if (!expected || !actual) return <pre style={{ background: '#2d2d2d', color: '#f3f4f6', padding: '8px', borderRadius: '4px', fontSize: '12px', margin: '0 0 8px 0', whiteSpace: 'pre-wrap' }}>{actual || "(No output)"}</pre>;
    let diff = [];
    try {
      diff = Diff.diffChars(expected, actual);
    } catch (e) {
      return <pre style={{ background: '#2d2d2d', color: '#f3f4f6', padding: '8px', borderRadius: '4px', fontSize: '12px', margin: '0 0 8px 0', whiteSpace: 'pre-wrap' }}>{actual}</pre>;
    }
    return (
      <pre style={{ background: '#2d2d2d', padding: '8px', borderRadius: '4px', fontSize: '12px', margin: '0 0 8px 0', whiteSpace: 'pre-wrap' }}>
        {diff.map((part, i) => (
          <span key={i} style={{ 
            backgroundColor: part.added ? 'rgba(239, 68, 68, 0.3)' : part.removed ? 'rgba(10, 185, 129, 0.3)' : 'transparent',
            color: part.added ? '#fca5a5' : part.removed ? '#6ee7b7' : '#f3f4f6',
            textDecoration: part.removed ? 'line-through' : 'none'
          }}>
            {part.value}
          </span>
        ))}
      </pre>
    );
  };

  return (
    <>
      {!user && showLanding ? (
        <LandingPage onStart={() => setShowLanding(false)} />
      ) : null}
      
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} onSuccess={() => setShowAuthModal(false)} />
      )}
      {showGuestUpgradeModal && (
        <GuestUpgradeModal onClose={() => setShowGuestUpgradeModal(false)} onSuccess={() => setShowGuestUpgradeModal(false)} />
      )}
      {showLeaderboard && (
        <LeaderboardModal onClose={() => setShowLeaderboard(false)} />
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

      {(!showLanding || user) && (
        <>
          <div className="app-header">
            <button className="menu-btn" onClick={() => setSidebarOpen(true)}>☰</button>
            <div className="sidebar-brand"><h2>Logic Coach</h2></div>
            <div style={{ width: 24 }}></div>
          </div>
          <div className="app-layout">
        <div className={`sidebar-overlay ${sidebarOpen ? "visible" : ""}`} onClick={() => setSidebarOpen(false)} />

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
                <span style={{ fontSize: '14px', fontWeight: 600 }}>👤 {user.isAnonymous ? "Guest" : (userRoadmap?.username || user.email?.split('@')[0] || "User")}</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="action-btn" onClick={() => setShowProgress(true)} style={{ flex: 1, padding: '4px' }}>Progress</button>
                  <button className="action-btn" onClick={() => setShowLeaderboard(true)} style={{ flex: 1, padding: '4px', background: 'var(--accent-orange-light)', color: 'var(--accent-orange)', border: '1px solid var(--accent-orange)' }}>🏆 Rank</button>
                  <button className="action-btn" onClick={() => signOut(auth)} style={{ flex: 1, padding: '4px', background: 'transparent', border: '1px solid var(--border-light)', color: 'var(--text-secondary)' }}>Sign Out</button>
                </div>
              </div>
            ) : (
              <button className="start-btn" onClick={() => setShowAuthModal(true)} style={{ width: '100%', padding: '8px', fontSize: '14px' }}>Sign In</button>
            )}
          </div>

          <div className="sidebar-problems" style={{ marginTop: '16px', padding: '0 16px' }}>
            <h3 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px', paddingLeft: '4px' }}>Navigation</h3>
            <button 
              className={`action-btn ${viewMode === 'logic' && !activeProblem ? 'active' : ''}`} 
              onClick={() => { setViewMode('logic'); setActiveProblem(null); setActiveDsaTopic(null); setActiveLanguageTopic(null); setSidebarOpen(false); }}
              style={{ width: '100%', padding: '12px', background: viewMode === 'logic' && !activeProblem ? 'var(--bg-subtle)' : 'transparent', textAlign: 'left', display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px', border: 'none', color: 'var(--text-primary)' }}
            >
              <span style={{ fontSize: '18px' }}>🏠</span> Dashboard Home
            </button>
            <button 
              className={`action-btn ${viewMode === 'dsa' ? 'active' : ''}`} 
              onClick={() => { setViewMode('dsa'); setActiveProblem(null); setActiveDsaTopic(null); setActiveLanguageTopic(null); setSidebarOpen(false); }}
              style={{ width: '100%', padding: '12px', background: viewMode === 'dsa' ? 'var(--bg-subtle)' : 'transparent', textAlign: 'left', display: 'flex', gap: '12px', alignItems: 'center', border: 'none', color: 'var(--text-primary)' }}
            >
              <span style={{ fontSize: '18px' }}>🗺️</span> DSA Roadmap
            </button>
            <button 
              className={`action-btn ${viewMode === 'language' ? 'active' : ''}`} 
              onClick={() => { setViewMode('language'); setActiveProblem(null); setActiveDsaTopic(null); setActiveLanguageTopic(null); setSidebarOpen(false); }}
              style={{ width: '100%', padding: '12px', background: viewMode === 'language' ? 'var(--bg-subtle)' : 'transparent', textAlign: 'left', display: 'flex', gap: '12px', alignItems: 'center', border: 'none', color: 'var(--text-primary)', marginTop: '8px' }}
            >
              <span style={{ fontSize: '18px' }}>🚀</span> Language Roadmap
            </button>
          </div>
        </aside>

        <main className="main-content">
          {viewMode === 'dsa' && !activeProblem && !activeDsaTopic ? (
             <DSAPath progress={dsaProgress} userStats={userStats} roadmap={userRoadmap} userId={user?.uid} onSelectTopic={(t) => { if (requireAuth()) setActiveDsaTopic(t); }} />
          ) : viewMode === 'dsa' && activeDsaTopic && (!dsaProgress[activeDsaTopic.id] || dsaProgress[activeDsaTopic.id].level === 0) ? (
             <DSATeachingPhase 
               topic={activeDsaTopic} 
               initialStep={dsaProgress[activeDsaTopic.id]?.step || 0}
               progLanguage={userRoadmap?.language || 'Python'}
               language={language}
               onLanguageChange={setLanguage}
               onBack={() => setActiveDsaTopic(null)}
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
          ) : viewMode === 'language' && !activeProblem && !activeLanguageTopic ? (
             <LanguagePath progress={languageProgress} userStats={userStats} roadmap={userRoadmap} userId={user?.uid} onSelectTopic={(t) => { if (requireAuth()) setActiveLanguageTopic(t); }} />
          ) : viewMode === 'language' && activeLanguageTopic && (!languageProgress[activeLanguageTopic.id] || languageProgress[activeLanguageTopic.id].level === 0) ? (
             <DSATeachingPhase 
               topic={activeLanguageTopic} 
               initialStep={languageProgress[activeLanguageTopic.id]?.step || 0}
               progLanguage={userRoadmap?.language || 'Python'}
               language={language}
               onLanguageChange={setLanguage}
               onBack={() => setActiveLanguageTopic(null)}
               onProgressUpdate={async (step) => {
                 const newProg = { ...languageProgress, [activeLanguageTopic.id]: { level: 0, step } };
                 setLanguageProgress(newProg);
                 if (user) await setDoc(doc(db, "user_progress", user.uid), { languageProgress: newProg }, { merge: true });
               }}
               onComplete={async () => {
                 const newProg = { ...languageProgress, [activeLanguageTopic.id]: { level: 1, step: 0 } };
                 setLanguageProgress(newProg);
                 if (user) await setDoc(doc(db, "user_progress", user.uid), { languageProgress: newProg }, { merge: true });
                 alert("Topic Teaching Complete! You can now practice.");
               }}
             />
          ) : (!activeProblem && !fetchingProblem && viewMode === 'dsa' && activeDsaTopic) || (!activeProblem && !fetchingProblem && viewMode === 'language' && activeLanguageTopic) ? (
              <div className="landing-container" style={{ background: 'none' }}>
                <div className="landing-icon" style={{ boxShadow: 'none', background: 'var(--accent-teal-light)', color: 'var(--accent-teal)' }}>🎯</div>
                 <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>
                  {activeDsaTopic ? activeDsaTopic.title : activeLanguageTopic.title} - Tutorial Completed!
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px' }}>
                  You have already completed the interactive AI teaching phase for this topic. Would you like to review the tutorial, or challenge yourself with practice problems?
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '32px' }}>
                  <button 
                    className="start-btn" 
                    onClick={() => {
                      // Reset the topic progress so they can replay the teaching phase
                      if (activeDsaTopic) {
                        setDsaProgress(prev => ({ ...prev, [activeDsaTopic.id]: { level: 0, step: 0 } }));
                      } else {
                        setLanguageProgress(prev => ({ ...prev, [activeLanguageTopic.id]: { level: 0, step: 0 } }));
                      }
                    }}
                    style={{ background: 'var(--bg-subtle)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                  >
                    ↺ Replay Tutorial
                  </button>
                </div>
                <h3 style={{ marginBottom: '16px', fontSize: '18px', color: 'var(--text-secondary)' }}>Practice Mode</h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {[1, 2, 3, 4, 5].map(lvl => (
                    <button 
                      key={lvl}
                      className="start-btn-small" 
                      onClick={() => { setActiveLevel(lvl); setActiveProblem(null); getProblemForLevel(lvl); }}
                      style={{ padding: '10px 24px' }}
                    >
                      Level {lvl}
                    </button>
                  ))}
                </div>
              </div>
          ) : !activeProblem ? (
            fetchingProblem ? (
              <div className="landing-container" style={{ background: 'none' }}>
                <div className="typing-dots" style={{ margin: 'auto', background: 'transparent', border: 'none', boxShadow: 'none' }}>
                  <span></span><span></span><span></span>
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: '20px' }}>Generating Problem...</h2>
              </div>
            ) : problemFetchError ? (
              <div className="landing-container" style={{ background: 'none' }}>
                <div className="landing-icon" style={{ boxShadow: 'none', background: '#fef2f2', color: '#991b1b' }}>⚠️</div>
                <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', color: '#991b1b' }}>Failed to Load</h2>
                <button className="start-btn-small" onClick={() => getProblemForLevel(activeLevel)}>↻ Try Again</button>
              </div>
            ) : (
              <div className="bento-container">
                <div className="bento-header">
                  <h1>Welcome back, {userRoadmap?.username || user?.displayName?.split(' ')[0] || 'Developer'}!</h1>
                  <p>What would you like to learn today?</p>
                </div>
                
                <div className="bento-grid">
                  <div className="bento-card bento-span-6 bento-roadmap" onClick={() => setViewMode('dsa')}>
                    <div className="bento-roadmap-content" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '24px' }}>
                      <div>
                        <h2>Data Structures & Algorithms</h2>
                        <p>Master core algorithms and data structures.</p>
                      </div>
                      <button className="bento-btn">
                        Start DSA <span>→</span>
                      </button>
                    </div>
                  </div>

                  <div className="bento-card bento-span-6 bento-roadmap" style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)', borderColor: 'rgba(168, 85, 247, 0.2)' }} onClick={() => setViewMode('language')}>
                    <div className="bento-roadmap-content" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '24px' }}>
                      <div>
                        <h2 style={{ background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                          {userRoadmap?.language ? `${userRoadmap.language} Mastery` : 'Language Mastery'}
                        </h2>
                        <p>Level up your syntax and language-specific logic.</p>
                      </div>
                      <button className="bento-btn">
                        Start Language <span>→</span>
                      </button>
                    </div>
                  </div>


                  
                  <div 
                    className="bento-card bento-span-12 bento-custom"
                    onClick={() => { if (requireAuth()) setShowCustomModal(true); }}
                  >
                    <div className="bento-practice-icon" style={{ background: 'transparent', fontSize: '40px', marginBottom: '8px' }}>🎯</div>
                    <h3>Have a specific problem?</h3>
                    <p style={{ opacity: 0.8 }}>Click here to paste your own custom problem and get started</p>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="split-layout">
              <div className="chat-pane">
              <div className="chat-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button 
                    className="action-btn" 
                    onClick={() => setActiveProblem(null)} 
                    title="Back to Dashboard"
                    style={{ fontSize: '18px', padding: '4px 12px', background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                  >
                    ←
                  </button>
                  <div className="chat-header-info">
                    <div className="chat-header-icon">{activeProblem.icon || "🧩"}</div>
                    <div className="chat-header-text">
                      <h3>{activeProblem.title}</h3>
                      <p>{activeProblem.category}</p>
                    </div>
                  </div>
                </div>
                <div className="header-actions">
                  <button 
                    className="action-btn" 
                    onClick={() => getProblemForLevel(activeLevel || 'Beginner')} 
                    title="Next Problem"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                  >
                    Next ⏭
                  </button>
                  <select className="lang-select" value={progLanguage} onChange={(e) => setProgLanguage(e.target.value)}>
                    <option value="Python">Python</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Java">Java</option>
                    <option value="C++">C++</option>
                  </select>
                  <button className="action-btn theme-toggle" onClick={toggleTheme} title="Toggle Theme">
                    {theme === "light" ? "🌙" : "☀️"}
                  </button>
                  <button className={`mark-solved-btn ${solvedProblems.has(activeProblem.id) ? 'solved' : ''}`} onClick={toggleSolved}>
                    {solvedProblems.has(activeProblem.id) ? '✓ Solved' : 'Mark Solved'}
                  </button>
                </div>
              </div>

              <div className="chat-messages">
                {currentMessages.map((msg, idx) => (
                  <div key={idx} className={`message ${msg.role}`}>
                    <div className="message-avatar">{msg.role === "user" ? "👤" : "🤖"}</div>
                    <div className="message-bubble">{msg.content}</div>
                  </div>
                ))}
                {isLoading && <div className="message coach"><div className="typing-dots"><span></span><span></span><span></span></div></div>}
                <div ref={messagesEndRef} />
              </div>

              <div className="chat-bottom">
                <div className="chat-input-wrapper">
                  <textarea ref={inputRef} className="chat-input" value={inputText} onChange={(e) => setInputText(e.target.value)} onKeyDown={handleKeyDown} />
                  <VoiceChat onTranscript={(text) => handleSend(text, true)} />
                  <button className="send-btn" onClick={() => handleSend()} disabled={!inputText.trim() || isLoading}>➤</button>
                </div>
              </div>
            </div>

              <div className="editor-pane" style={{ display: 'flex', flexDirection: 'column' }}>
                 {(viewMode === 'dsa' && activeDsaTopic && dsaProgress[activeDsaTopic.id]?.level >= 2) && (

                   <div style={{ background: '#1e1e1e', color: '#ff4d4f', padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>
                     ⏱️ {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
                   </div>
                 )}
                 {renderProblemVisualizer()}
                 <div style={{ padding: '8px', borderBottom: '1px solid var(--border)' }}>
                   <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', cursor: 'pointer' }}>
                     <input type="checkbox" checked={showCustomInput} onChange={(e) => setShowCustomInput(e.target.checked)} />
                     Use Custom Input
                   </label>
                   {showCustomInput && (
                     <textarea className="chat-input" value={customInput} onChange={(e) => setCustomInput(e.target.value)} placeholder="Enter input (stdin) here..." style={{ marginTop: '8px', height: '60px' }} />
                   )}
                 </div>
                 <CodeEditor language={progLanguage} value={code} onChange={setCode} onRun={handleRunTests} onAnalyze={handleAnalyzeBigO} />
                 
                 {showTestPanel && (
                   <>
                     <div 
                       onMouseDown={(e) => {
                         e.preventDefault();
                         const startY = e.clientY;
                         const startHeight = terminalHeight;
                         const onMouseMove = (moveEvent) => {
                           const newHeight = startHeight - (moveEvent.clientY - startY);
                           setTerminalHeight(Math.max(100, Math.min(newHeight, window.innerHeight * 0.8)));
                         };
                         const onMouseUp = () => {
                           document.removeEventListener("mousemove", onMouseMove);
                           document.removeEventListener("mouseup", onMouseUp);
                         };
                         document.addEventListener("mousemove", onMouseMove);
                         document.addEventListener("mouseup", onMouseUp);
                       }}
                       style={{ height: '8px', background: '#333', cursor: 'row-resize', width: '100%', borderTop: '1px solid #444', borderBottom: '1px solid #444' }}
                     />
                     <div style={{ background: '#1e1e1e', height: `${terminalHeight}px`, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                       <h3 style={{ margin: 0, color: '#e5e7eb', fontSize: '14px' }}>Test Results</h3>
                       <button onClick={() => setShowTestPanel(false)} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>✕</button>
                     </div>
                     
                     {isExecuting || isAnalyzingBigO ? (
                       <div style={{ color: '#9ca3af', fontSize: '14px' }}>{isExecuting ? "Executing code on server..." : "Analyzing complexity..."} ⏳</div>
                     ) : testResults ? (
                       testResults.map((tr, idx) => (
                         <div key={idx} style={{ background: tr.passed ? 'rgba(10, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', border: `1px solid ${tr.passed ? '#10b981' : '#ef4444'}`, padding: '12px', borderRadius: '6px' }}>
                           <div style={{ fontWeight: 'bold', color: tr.passed ? '#10b981' : '#ef4444', marginBottom: '8px' }}>
                             {tr.isManual ? (tr.passed ? "SUCCESS ✅" : "FAILED ❌") : `Test Case ${idx + 1}: ${tr.passed ? "PASSED ✅" : "FAILED ❌"}`}
                           </div>
                           {tr.error ? (
                             <div style={{ color: '#ef4444', fontFamily: 'monospace', fontSize: '12px', whiteSpace: 'pre-wrap' }}>{tr.error}</div>
                           ) : (
                             <>
                               {tr.isManual && (
                                 <>
                                   <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Actual Output:</div>
                                   <pre style={{ background: '#2d2d2d', color: '#f3f4f6', padding: '8px', borderRadius: '4px', fontSize: '12px', margin: '0 0 8px 0', whiteSpace: 'pre-wrap' }}>{tr.actualOutput || "(No output)"}</pre>
                                 </>
                               )}
                               {!tr.isManual && (
                                 <>
                                   <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Input (stdin):</div>
                                   <pre style={{ background: '#2d2d2d', color: '#f3f4f6', padding: '8px', borderRadius: '4px', fontSize: '12px', margin: '0 0 8px 0', whiteSpace: 'pre-wrap' }}>{tr.input}</pre>
                                   
                                   <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Output Diff (Red=Actual, Green=Expected):</div>
                                   {!tr.passed ? renderDiff(tr.expectedOutput, tr.actualOutput) : <pre style={{ background: '#2d2d2d', color: '#f3f4f6', padding: '8px', borderRadius: '4px', fontSize: '12px', margin: '0 0 8px 0', whiteSpace: 'pre-wrap' }}>{tr.actualOutput || "(No output)"}</pre>}
                                 </>
                               )}
                               
                               {tr.stderr && (
                                 <>
                                   <div style={{ fontSize: '12px', color: '#ef4444', marginBottom: '4px' }}>Error (stderr):</div>
                                   <pre style={{ background: '#2d2d2d', padding: '8px', borderRadius: '4px', fontSize: '12px', color: '#ef4444', margin: '0', whiteSpace: 'pre-wrap' }}>{tr.stderr}</pre>
                                 </>
                               )}
                             </>
                           )}
                         </div>
                       ))
                     ) : null}
                   </div>
                   </>
                 )}

                 <div className="editor-actions-mobile-fix" style={{ display: 'flex', gap: '8px', padding: '8px', flexWrap: 'wrap' }}>
                    <button 
                      className="review-btn" 
                      onClick={handleAnalyzeBigO}
                      disabled={isAnalyzingBigO || isExecuting || !code.trim()}
                      style={{ flex: 1, minWidth: '140px', background: 'var(--bg-subtle)', color: 'var(--accent-teal)', border: '1px solid var(--accent-teal)' }}
                    >
                      {isAnalyzingBigO ? "Analyzing..." : "⚡ Analyze Big-O"}
                    </button>
                    <button 
                      className="review-btn" 
                      onClick={handleRunTests}
                      disabled={isExecuting || isAnalyzingBigO || !code.trim()}
                      style={{ flex: 1, minWidth: '140px', background: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                    >
                      {isExecuting ? "Executing..." : (!activeProblem?.testCases || activeProblem.testCases.length === 0 ? "▶ Run Code" : "▶ Run Tests")}
                    </button>
                    <button 
                      className="review-btn" 
                      onClick={() => handleSend("Please review the code I have written in the editor.")}
                      disabled={isLoading || isExecuting || isAnalyzingBigO || !code.trim()}
                      style={{ flex: '1 1 100%', minWidth: '200px' }}
                    >
                      Ask AI to Review Code
                    </button>
                  </div>
              </div>
            </div>
          )}
        </main>
      </div>
      </>
      )}
      <PracticeCompilerPanel language={userRoadmap?.language || 'Python'} />
    </>
  );
}
