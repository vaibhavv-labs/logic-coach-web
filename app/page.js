"use client";
import toast from 'react-hot-toast';
import { t } from './data/translations';
import { DSA_TOPICS } from './data/dsaData';
import { LANGUAGE_TOPICS } from './data/languageData';
import { useState, useRef, useEffect } from "react";
import * as Diff from 'diff';
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, signOut, deleteUser } from "firebase/auth";
import { collection, query, where, getDocs, addDoc, serverTimestamp, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import dynamic from 'next/dynamic';
import LoadingSpinner from './components/LoadingSpinner';
import EmptyState from './components/EmptyState';

const AuthModal = dynamic(() => import('./components/AuthModal'), { loading: () => <LoadingSpinner /> });

const LeaderboardModal = dynamic(() => import('./components/LeaderboardModal'), { loading: () => <LoadingSpinner /> });
const CustomProblemModal = dynamic(() => import('./components/CustomProblemModal'), { loading: () => <LoadingSpinner /> });
const Footer = dynamic(() => import('./components/Footer'));
const ProgressScreen = dynamic(() => import('./components/ProgressScreen'), { loading: () => <LoadingSpinner /> });
const CodeEditor = dynamic(() => import('./components/CodeEditor'), { loading: () => <LoadingSpinner /> });
const VoiceChat = dynamic(() => import('./components/VoiceChat'), { loading: () => <LoadingSpinner /> });
const DSAPath = dynamic(() => import('./components/DSAPath'), { loading: () => <LoadingSpinner /> });
const DSATeachingPhase = dynamic(() => import('./components/DSATeachingPhase'), { loading: () => <LoadingSpinner /> });
const LanguagePath = dynamic(() => import('./components/LanguagePath'), { loading: () => <LoadingSpinner /> });
const OnboardingScreen = dynamic(() => import('./components/OnboardingScreen'), { loading: () => <LoadingSpinner /> });
const PracticeCompilerPanel = dynamic(() => import('./components/PracticeCompilerPanel'), { loading: () => <LoadingSpinner /> });
const LandingPage = dynamic(() => import('./components/LandingPage'), { loading: () => <LoadingSpinner /> });
const LearnDashboard = dynamic(() => import('./components/LearnDashboard'), { loading: () => <LoadingSpinner /> });
const ProgressDashboard = dynamic(() => import('./components/ProgressDashboard'), { loading: () => <LoadingSpinner /> });
const ProfileDashboard = dynamic(() => import('./components/ProfileDashboard'), { loading: () => <LoadingSpinner /> });
const SettingsDashboard = dynamic(() => import('./components/SettingsDashboard'), { loading: () => <LoadingSpinner /> });
const LeaderboardDashboard = dynamic(() => import('./components/LeaderboardDashboard'), { loading: () => <LoadingSpinner /> });
const FeedbackDashboard = dynamic(() => import('./components/FeedbackDashboard'), { loading: () => <LoadingSpinner /> });
const PracticeDashboard = dynamic(() => import('./components/PracticeDashboard'), { loading: () => <LoadingSpinner /> });

// Visualizers
const ArrayVisualizer = dynamic(() => import('./components/visualizers/ArrayVisualizer'), { loading: () => <LoadingSpinner /> });
const StackVisualizer = dynamic(() => import('./components/visualizers/StackVisualizer'), { loading: () => <LoadingSpinner /> });
const QueueVisualizer = dynamic(() => import('./components/visualizers/QueueVisualizer'), { loading: () => <LoadingSpinner /> });
const LinkedListVisualizer = dynamic(() => import('./components/visualizers/LinkedListVisualizer'), { loading: () => <LoadingSpinner /> });
const TreeVisualizer = dynamic(() => import('./components/visualizers/TreeVisualizer'), { loading: () => <LoadingSpinner /> });
const BarsVisualizer = dynamic(() => import('./components/visualizers/BarsVisualizer'), { loading: () => <LoadingSpinner /> });
const GraphVisualizer = dynamic(() => import('./components/visualizers/GraphVisualizer'), { loading: () => <LoadingSpinner /> });
const StringVisualizer = dynamic(() => import('./components/visualizers/StringVisualizer'), { loading: () => <LoadingSpinner /> });
const RecursionVisualizer = dynamic(() => import('./components/visualizers/RecursionVisualizer'), { loading: () => <LoadingSpinner /> });
const DPVisualizer = dynamic(() => import('./components/visualizers/DPVisualizer'), { loading: () => <LoadingSpinner /> });
const SearchVisualizer = dynamic(() => import('./components/visualizers/SearchVisualizer'), { loading: () => <LoadingSpinner /> });
const SortingVisualizer = dynamic(() => import('./components/visualizers/SortingVisualizer'), { loading: () => <LoadingSpinner /> });
const HeapVisualizer = dynamic(() => import('./components/visualizers/HeapVisualizer'), { loading: () => <LoadingSpinner /> });
const HashtableVisualizer = dynamic(() => import('./components/visualizers/HashtableVisualizer'), { loading: () => <LoadingSpinner /> });
const TrieVisualizer = dynamic(() => import('./components/visualizers/TrieVisualizer'), { loading: () => <LoadingSpinner /> });

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
  const [viewMode, setViewMode] = useState("dashboard"); // 'dashboard' | 'dsa' | 'language'
  const [activeDsaTopic, setActiveDsaTopic] = useState(null);
  const [activeLanguageTopic, setActiveLanguageTopic] = useState(null);
  const [problemVisualState, setProblemVisualState] = useState(null);
  
  // Level 2 Timer states
  const [timeLeft, setTimeLeft] = useState(1200);
  const [timerActive, setTimerActive] = useState(false);
  
  // Auth & DB states
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(true);
  const [showLanding, setShowLanding] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [appBooting, setAppBooting] = useState(true);
  const [fadeSplash, setFadeSplash] = useState(false);
  const [splashText, setSplashText] = useState("");
  
  useEffect(() => {
    // Typing effect for the splash screen text
    const text = "Initializing Logic Core...";
    let i = 0;
    const typeInterval = setInterval(() => {
      setSplashText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(typeInterval);
    }, 50);

    // Start fade out after 2.5s (longer to be unmissable)
    const fadeTimer = setTimeout(() => {
      setFadeSplash(true);
    }, 2500);

    // Unmount completely after 3.2s
    const bootTimer = setTimeout(() => {
      setAppBooting(false);
    }, 3200);
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowAuthModal(false);
        setShowLeaderboard(false);
        setShowCustomModal(false);
        setShowTestPanel(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(typeInterval);
      clearTimeout(bootTimer);
      clearTimeout(fadeTimer);
    };
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
  const [theme, setTheme] = useState("dark");

  // Execution Engine States
  const [isExecuting, setIsExecuting] = useState(false);
  const [isAnalyzingBigO, setIsAnalyzingBigO] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [showTestPanel, setShowTestPanel] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
    const savedLang = localStorage.getItem("language");
    if (savedLang) setLanguage(savedLang);
  }, []);

  // --- Internal State-Based Navigation History ---
  // We completely detach from window.history to prevent any browser conflicts
  const [internalHistory, setInternalHistory] = useState([]);
  
  // Track previous state to know when we've moved forward
  const stateSignature = `${viewMode}-${activeProblem?.id || 'none'}-${activeDsaTopic?.id || 'none'}-${activeLanguageTopic?.id || 'none'}`;
  const prevSigRef = useRef(stateSignature);
  const prevStateObjRef = useRef({ viewMode, activeProblem, activeDsaTopic, activeLanguageTopic });
  const isPopping = useRef(false);

  useEffect(() => {
    // Ignore intermediate transitional states from cluttering the history
    if (fetchingProblem) return;

    if (stateSignature !== prevSigRef.current) {
      if (!isPopping.current) {
        // Forward navigation: push the exact previous state onto the history stack
        // Filter out identical consecutive states to prevent the "stuck back button" issue
        setInternalHistory(prev => {
          if (prev.length > 0) {
            const last = prev[prev.length - 1];
            if (last.viewMode === prevStateObjRef.current.viewMode &&
                last.activeProblem?.id === prevStateObjRef.current.activeProblem?.id &&
                last.activeDsaTopic?.id === prevStateObjRef.current.activeDsaTopic?.id &&
                last.activeLanguageTopic?.id === prevStateObjRef.current.activeLanguageTopic?.id) {
              return prev; // Do not push duplicate
            }
          }
          return [...prev, prevStateObjRef.current];
        });
      }
      prevSigRef.current = stateSignature;
      prevStateObjRef.current = { viewMode, activeProblem, activeDsaTopic, activeLanguageTopic };
      isPopping.current = false;
    }
  }, [stateSignature, viewMode, activeProblem, activeDsaTopic, activeLanguageTopic, fetchingProblem]);

  const handleUiBack = () => {
     if (internalHistory.length > 0) {
         // Pop the most recent previous state
         const prevState = internalHistory[internalHistory.length - 1];
         setInternalHistory(stack => stack.slice(0, -1));
         
         // Set flag so we don't accidentally push this backwards movement onto the stack
         isPopping.current = true;
         
         setViewMode(prevState.viewMode);
         setActiveProblem(prevState.activeProblem);
         setActiveDsaTopic(prevState.activeDsaTopic);
         setActiveLanguageTopic(prevState.activeLanguageTopic);
     } else {
         isPopping.current = true;
         setViewMode('dashboard');
         setActiveProblem(null);
         setActiveDsaTopic(null);
         setActiveLanguageTopic(null);
     }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  useEffect(() => {
    let interval = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(interval);
            setTimerActive(false);
            toast.error(t("toast_time_up", language));
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, language]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        setShowLanding(false);
        await loadUserProgress(u.uid);
      } else {
        setShowLanding(true);
        setScreen("landing");
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, [userStats.totalAttempted]);

  const notifyTelegramLogin = (uid, email, displayName, roadmapData) => {
    if (!uid || sessionStorage.getItem(`telegram_notified_${uid}`)) return;
    sessionStorage.setItem(`telegram_notified_${uid}`, 'true');
    fetch('/api/telegram-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid, email, displayName, roadmap: roadmapData })
    }).catch(e => console.error(e));
  };

  const loadUserProgress = async (uid) => {
    try {
      const progressRef = doc(db, "user_progress", uid);
      const profileRef = doc(db, "user_profiles", uid);
      
      const [progressSnap, profileSnap] = await Promise.all([
        getDoc(progressRef),
        getDoc(profileRef)
      ]);
      
      if (progressSnap.exists()) {
        const data = progressSnap.data();
        const profileData = profileSnap.exists() ? profileSnap.data() : (data.roadmap || null);

        setSolvedProblems(new Set(data.solved || []));
        setUserStats({
          totalAttempted: data.totalAttempted || 0,
          streak: data.streak || 0,
          levelCounts: data.levelCounts || {},
          solved: data.solved || []
        });
        setDsaProgress(data.dsaProgress || {});
        setLanguageProgress(data.languageProgress || {});
        
        if (data.onboardingCompleted !== undefined) {
          if (profileData && !profileData.username) {
            setOnboardingCompleted(false);
          } else {
            setOnboardingCompleted(data.onboardingCompleted);
            if (data.onboardingCompleted) {
              notifyTelegramLogin(uid, auth.currentUser?.email, auth.currentUser?.displayName, profileData);
            }
          }
          setUserRoadmap(profileData);
        } else {
          // If field doesn't exist on old users, force onboarding or default to true
          setOnboardingCompleted(false);
        }
      } else {
        setOnboardingCompleted(false);
      }
    } catch (error) {
      console.error("Error loading progress:", error);
      toast.error(t("error_generic", language));
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

      const unsolvedProblems = availableProblems.filter(p => !solvedProblems.has(p.id) && (!activeProblem || p.id !== activeProblem.id));

      let selectedProblem;

      if (unsolvedProblems.length > 0) {
        selectedProblem = unsolvedProblems[Math.floor(Math.random() * unsolvedProblems.length)];
      } else {
        const token = auth.currentUser ? await auth.currentUser.getIdToken() : null;
        const headers = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const response = await fetch("/api/generate-problem", {
          method: "POST",
          headers: headers,
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
      toast.error(t("error_generic", language));
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
    let pId = problem.id;
    if (viewMode === 'dsa' && activeDsaTopic && !pId.startsWith(`dsa_${activeDsaTopic.id}_`)) {
      pId = `dsa_${activeDsaTopic.id}_${pId}`;
    } else if (viewMode === 'language' && activeLanguageTopic && !pId.startsWith(`lang_${activeLanguageTopic.id}_`)) {
      pId = `lang_${activeLanguageTopic.id}_${pId}`;
    }
    
    setActiveProblem({ ...problem, id: pId });
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
      toast.error(t("error_generic", language));
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
           toast.success(t("toast_mastery", language));
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
        toast.success(t("toast_all_tests_passed", language));
      } else {
        toast.success(t("toast_all_tests_passed", language));
      }
    }
  };

  const handleAnalyzeBigO = () => {
    handleSend("Please analyze the Time and Space Complexity (Big O) of my current code.");
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

      const token = auth.currentUser ? await auth.currentUser.getIdToken() : null;
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: headers,
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

      if (!response.ok) {
        let errorText = "Failed to get response";
        try {
          const errData = await response.json();
          errorText = errData.error || errorText;
        } catch(e) {}
        throw new Error(errorText);
      }

      setMessages((prev) => ({
        ...prev,
        [activeProblem.id]: [
          ...prev[activeProblem.id],
          { role: "coach", content: "" },
        ],
      }));

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let accumulatedText = "";
      let displayText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulatedText += decoder.decode(value, { stream: true });
        
        displayText = accumulatedText;
        const stateMatch = accumulatedText.match(/:::state=(.*?):::/);
        if (stateMatch) {
          setProblemVisualState(stateMatch[1]);
          displayText = accumulatedText.replace(stateMatch[0], "").trim();
        }

        setMessages((prev) => {
          const currentMsgs = prev[activeProblem.id] || [];
          const updatedMsgs = [...currentMsgs];
          updatedMsgs[updatedMsgs.length - 1] = { role: "coach", content: displayText };
          return { ...prev, [activeProblem.id]: updatedMsgs };
        });
      }

      if (fromVoice) {
        setLatestAiMessage(displayText);
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

  // Unified Landing Page logic is now handled in the main return statement.

  if (user && !onboardingCompleted) {
    return (
      <OnboardingScreen 
        user={user} 
        onComplete={(roadmapData) => {
          setOnboardingCompleted(true);
          setUserRoadmap(roadmapData);
          notifyTelegramLogin(user.uid, user.email, user.displayName, roadmapData);
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
        <div style={{ padding: '8px 16px', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--accent)' }}>⚡</span> Visual Debugger: {activeDsaTopic.title}
        </div>
        <div style={{ padding: '16px', background: 'var(--bg-surface-raised)', minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
            backgroundColor: part.added ? 'rgba(239, 68, 68, 0.3)' : part.removed ? 'var(--accent-light)' : 'transparent',
            color: part.added ? '#fca5a5' : part.removed ? 'var(--accent)' : '#f3f4f6',
            textDecoration: 'none'
          }}>
            {part.value}
          </span>
        ))}
      </pre>
    );
  };

  const handleNav = (mode) => {
    setViewMode(mode);
    setActiveProblem(null);
    setActiveDsaTopic(null);
    setActiveLanguageTopic(null);
    setSidebarOpen(false);
  };

  const SidebarButton = ({ icon, label, id }) => {
    let active = false;
    if (id === 'practice') {
      active = viewMode === 'practice' || activeProblem;
    } else if (id === 'learn') {
      active = (viewMode === 'learn' || viewMode === 'dsa' || viewMode === 'language') && !activeProblem;
    } else {
      active = viewMode === id && !activeProblem;
    }

    return (
      <button 
        className={`action-btn ${active ? 'active' : ''}`} 
        onClick={() => handleNav(id)}
        style={{ 
          width: '100%', padding: '12px', 
          background: active ? 'var(--bg-surface)' : 'transparent', 
          textAlign: 'left', display: 'flex', gap: '12px', 
          alignItems: 'center', marginBottom: '4px', border: 'none', 
          color: 'var(--text-primary)', borderRadius: 'var(--radius-md)',
          cursor: 'pointer'
        }}
      >
        <span style={{ fontSize: '18px' }}>{icon}</span> 
        <span style={{ fontWeight: active ? 600 : 500 }}>{label}</span>
      </button>
    );
  };

  return (
    <>
      {(authLoading || appBooting) && (
        <div className={`splash-screen ${fadeSplash ? 'fade-out' : ''}`}>
          <div className="splash-symbol" style={{ left: '10%', animationDuration: '15s', fontSize: '32px' }}>{`{ }`}</div>
          <div className="splash-symbol" style={{ left: '25%', animationDuration: '18s', animationDelay: '2s', fontSize: '48px' }}>∑</div>
          <div className="splash-symbol" style={{ left: '40%', animationDuration: '22s', animationDelay: '1s', fontSize: '28px' }}>λ</div>
          <div className="splash-symbol" style={{ left: '60%', animationDuration: '16s', animationDelay: '3s', fontSize: '40px' }}>{`< />`}</div>
          <div className="splash-symbol" style={{ left: '75%', animationDuration: '20s', animationDelay: '0.5s', fontSize: '36px' }}>O(n)</div>
          <div className="splash-symbol" style={{ left: '85%', animationDuration: '19s', animationDelay: '4s', fontSize: '50px' }}>∀</div>
          <div className="splash-symbol" style={{ left: '50%', animationDuration: '25s', animationDelay: '5s', fontSize: '32px' }}>∃</div>
          
          <div className="splash-logo-container splash-pulse-effect">
            <div className="splash-brain splash-spin">🧠</div>
            <div className="splash-text">Logic Coach</div>
            <div className="splash-typing">{splashText}<span className="cursor-blink">|</span></div>
          </div>
        </div>
      )}

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} onSuccess={() => setShowAuthModal(false)} />
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

      {(screen === "landing" || (!user && showLanding)) ? (
        <LandingPage 
          user={user}
          onStart={() => {
            if (user) {
              setScreen("app");
              setShowLanding(false);
            } else {
              setShowAuthModal(true);
            }
          }}
          onLogin={() => setShowAuthModal(true)}
        />
      ) : (
        <>
          {/* Main App Content starts here */}
      
      {(!showLanding || user) && (
        <>
          <div className="app-header">
            <button className="menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Toggle sidebar menu">☰</button>
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

          <div className="sidebar-problems" style={{ marginTop: '8px', padding: '0 16px', flex: 1, overflowY: 'auto' }}>
            <h3 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px', paddingLeft: '4px', letterSpacing: '0.5px' }}>Menu</h3>
            <SidebarButton icon="🏠" label="Dashboard" id="dashboard" />
            <SidebarButton icon="📚" label="Learn" id="learn" />
            <SidebarButton icon="💻" label="Practice" id="practice" />
            <SidebarButton icon="📊" label="Progress" id="progress" />
            <SidebarButton icon="🏆" label="Leaderboard" id="leaderboard" />

            <h3 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '24px 0 8px', paddingLeft: '4px', letterSpacing: '0.5px' }}>Account</h3>
            <SidebarButton icon="👤" label="Profile" id="profile" />
            <SidebarButton icon="⚙️" label="Settings" id="settings" />
            <SidebarButton icon="💬" label="Feedback" id="feedback" />
            
            <div style={{ marginTop: '32px', padding: '0 8px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '12px' }}>
                <a href="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>Privacy</a>
                <a href="/terms" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>Terms</a>
                <a href="https://github.com/vaibhavv-labs" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>GitHub</a>
                <a href="https://linkedin.com/in/vaibhav-bhoyate-6328802a9/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>LinkedIn</a>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                © {new Date().getFullYear()} Logic Coach.<br/>
                Created by Vaibhav Bhoyate
              </div>
            </div>
          </div>

          <div className="sidebar-user-bottom" style={{ marginTop: 'auto', padding: '16px', borderTop: '1px solid var(--border-light)', background: 'var(--bg-surface)' }}>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '16px', flexShrink: 0 }}>
                  {(userRoadmap?.username || user.email || "U")[0].toUpperCase()}
                </div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', color: 'var(--text-primary)' }}>
                    {user.isAnonymous ? "Guest User" : (userRoadmap?.username || user.email?.split('@')[0])}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Pro Member</div>
                </div>
                <button className="action-btn theme-toggle" onClick={toggleTheme} title="Toggle Theme" aria-label="Toggle dark/light theme" style={{ padding: '6px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {theme === "light" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                  )}
                </button>
                <button className="action-btn" onClick={async () => {
                  await signOut(auth);
                  setShowLanding(true);
                  handleNav('dashboard');
                }} title="Sign Out" style={{ padding: '6px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                </button>
              </div>
            ) : (
              <button className="start-btn" onClick={() => setShowAuthModal(true)} style={{ width: '100%', padding: '12px', fontSize: '15px' }}>Sign In</button>
            )}
          </div>
        </aside>

        <main className="main-content">
          {(viewMode !== 'dashboard' || activeProblem || activeLanguageTopic) && !activeDsaTopic && (
             <div style={{ padding: '20px 20px 0 20px', maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex' }}>
               <button 
                 onClick={handleUiBack} 
                 className="action-btn" 
                 title="Back"
                 style={{ fontSize: '18px', padding: '4px 12px', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
               >
                 ←
               </button>
             </div>
          )}
          {viewMode === 'dsa' && !activeProblem && !activeDsaTopic ? (
             <DSAPath progress={dsaProgress} userStats={userStats} roadmap={userRoadmap} userId={user?.uid} onSelectTopic={(t) => { if (requireAuth()) setActiveDsaTopic(t); }} />
          ) : viewMode === 'dsa' && activeDsaTopic && (!dsaProgress[activeDsaTopic.id] || dsaProgress[activeDsaTopic.id].level === 0) ? (
             <DSATeachingPhase 
               topic={activeDsaTopic} 
               initialStep={dsaProgress[activeDsaTopic.id]?.step || 0}
               progLanguage={userRoadmap?.language || 'Python'}
               language={language}
               onLanguageChange={handleLanguageChange}
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
                 toast.success(t("topic_complete", language));
               }}
               onTopicUnlock={(topicTitle) => toast.success(t("toast_topic_unlocked", language, { TOPIC: topicTitle }))}
             />
          ) : viewMode === 'language' && !activeProblem && !activeLanguageTopic ? (
             <LanguagePath progress={languageProgress} userStats={userStats} roadmap={userRoadmap} userId={user?.uid} onSelectTopic={(t) => { if (requireAuth()) setActiveLanguageTopic(t); }} />
          ) : viewMode === 'language' && activeLanguageTopic && (!languageProgress[activeLanguageTopic.id] || languageProgress[activeLanguageTopic.id].level === 0) ? (
             <DSATeachingPhase 
               topic={activeLanguageTopic} 
               initialStep={languageProgress[activeLanguageTopic.id]?.step || 0}
               progLanguage={userRoadmap?.language || 'Python'}
               language={language}
               onLanguageChange={handleLanguageChange}
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
                 toast.success(t("topic_complete", language));
               }}
               onTopicUnlock={(topicTitle) => toast.success(t("toast_topic_unlocked", language, { TOPIC: topicTitle }))}
             />
          ) : (!activeProblem && !fetchingProblem && viewMode === 'dsa' && activeDsaTopic) || (!activeProblem && !fetchingProblem && viewMode === 'language' && activeLanguageTopic) ? (
              <div className="landing-container" style={{ background: 'none' }}>
                <div className="landing-icon" style={{ boxShadow: 'none', background: 'var(--accent-light)', color: 'var(--accent)' }}>🎯</div>
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
                    style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
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
            ) : viewMode === 'dashboard' ? (
              <div className="bento-container">
                <div className="bento-header">
                  <h1>Welcome back, {userRoadmap?.username || user?.displayName?.split(' ')[0] || 'Developer'}!</h1>
                  <p>What would you like to learn today?</p>
                </div>
                
                <div className="bento-grid">
                  <div className="bento-card bento-span-6 bento-roadmap" onClick={() => {
                    const recentDsa = DSA_TOPICS.find(t => dsaProgress[t.id] && dsaProgress[t.id].level === 0);
                    if (recentDsa) {
                      setActiveDsaTopic(recentDsa);
                    }
                    setViewMode('dsa');
                  }}>
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

                  <div className="bento-card bento-span-6 bento-roadmap" style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)', borderColor: 'rgba(168, 85, 247, 0.2)' }} onClick={() => {
                    const recentLang = LANGUAGE_TOPICS.find(t => languageProgress[t.id] && languageProgress[t.id].level === 0);
                    if (recentLang) {
                      setActiveLanguageTopic(recentLang);
                    }
                    setViewMode('language');
                  }}>
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


                  <div className="bento-card bento-span-6 bento-roadmap" style={{ background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%)', borderColor: 'rgba(234, 179, 8, 0.2)' }} onClick={() => setViewMode('practice')}>
                    <div className="bento-roadmap-content" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '24px' }}>
                      <div>
                        <h2 style={{ background: 'linear-gradient(135deg, #eab308 0%, #f97316 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                          Logic Problems
                        </h2>
                        <p>Raw problem-solving without syntax overhead.</p>
                      </div>
                      <button className="bento-btn">
                        Start Practice <span>→</span>
                      </button>
                    </div>
                  </div>
                  
                  <div 
                    className="bento-card bento-span-6 bento-custom"
                    onClick={() => { if (requireAuth()) setShowCustomModal(true); }}
                  >
                    <div className="bento-practice-icon" style={{ background: 'transparent', fontSize: '40px', marginBottom: '8px' }}>🎯</div>
                    <h3>Have a specific problem?</h3>
                    <p style={{ opacity: 0.8 }}>Click here to paste your own custom problem and get started</p>
                  </div>
                </div>
              </div>
            ) : viewMode === 'practice' ? (
              <PracticeDashboard 
                onSelectLevel={(level) => {
                  setActiveLevel(level);
                  setActiveProblem(null);
                  getProblemForLevel(level);
                }}
                onCustomProblem={() => {
                  if (requireAuth()) setShowCustomModal(true);
                }}
              />
            ) : viewMode === 'learn' ? (
              <LearnDashboard 
                dsaProgress={dsaProgress} 
                languageProgress={languageProgress} 
                solvedProblems={solvedProblems} 
                userRoadmap={userRoadmap} 
                handleNav={handleNav} 
                onSelectDsa={(topic) => { setActiveDsaTopic(topic); setViewMode('dsa'); setSidebarOpen(false); }}
                onSelectLanguage={(topic) => { setActiveLanguageTopic(topic); setViewMode('language'); setSidebarOpen(false); }}
              />
            ) : viewMode === 'progress' ? (
              <ProgressDashboard 
                dsaProgress={dsaProgress} 
                userStats={userStats} 
                solvedProblems={solvedProblems} 
              />
            ) : viewMode === 'profile' ? (
              <ProfileDashboard 
                user={user} 
                userRoadmap={userRoadmap} 
                userStats={userStats} 
                dsaProgress={dsaProgress} 
                onUpdateProfile={async (updates) => {
                  if (!user) return;
                  const newRoadmap = { ...userRoadmap, ...updates };
                  setUserRoadmap(newRoadmap);
                  const { doc, setDoc } = require('firebase/firestore');
                  await setDoc(doc(db, "user_progress", user.uid), { roadmap: newRoadmap }, { merge: true });
                }}
              />
            ) : viewMode === 'settings' ? (
              <SettingsDashboard 
                language={language}
                setLanguage={handleLanguageChange}
                theme={theme}
                toggleTheme={toggleTheme}
                user={user}
                onSignOut={async () => { await signOut(auth); }}
                onDeleteAccount={async () => {
                  if (window.confirm("Are you sure you want to permanently delete your account? This action cannot be undone.")) {
                    try {
                      if (user) await deleteUser(user);
                    } catch (e) {
                      toast.error("Failed to delete account. Please sign out and sign back in to verify your identity before trying again.");
                    }
                  }
                }}
              />
            ) : viewMode === 'leaderboard' ? (
              <LeaderboardDashboard user={user} />
            ) : viewMode === 'feedback' ? (
              <FeedbackDashboard user={user} />
            ) : (
              <div className="landing-container" style={{ background: 'none', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div className="landing-icon" style={{ boxShadow: 'none', background: 'var(--bg-surface)', color: 'var(--text-muted)' }}>🚧</div>
                <h2 style={{ fontSize: '28px', fontWeight: 700, margin: '24px 0 12px', color: 'var(--text-primary)' }}>Coming Soon</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>This section ({viewMode}) is currently under development.</p>
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
                    style={{ fontSize: '18px', padding: '4px 12px', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
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
                  {solvedProblems.has(activeProblem?.id) && ((viewMode === 'dsa' && activeDsaTopic) || (viewMode === 'language' && activeLanguageTopic)) && (
                    <button 
                      className="action-btn"
                      onClick={() => {
                        if (viewMode === 'dsa' && activeDsaTopic) {
                          const currentIndex = DSA_TOPICS.findIndex(t => t.id === activeDsaTopic.id);
                          if (currentIndex !== -1 && currentIndex < DSA_TOPICS.length - 1) {
                            setActiveDsaTopic(DSA_TOPICS[currentIndex + 1]);
                            setActiveProblem(null);
                          }
                        } else if (viewMode === 'language' && activeLanguageTopic) {
                          const currentIndex = LANGUAGE_TOPICS.findIndex(t => t.id === activeLanguageTopic.id);
                          if (currentIndex !== -1 && currentIndex < LANGUAGE_TOPICS.length - 1) {
                            setActiveLanguageTopic(LANGUAGE_TOPICS[currentIndex + 1]);
                            setActiveProblem(null);
                          }
                        }
                      }}
                      title="Jump to Next Topic"
                      style={{ background: 'var(--accent)', color: '#fff', border: '1px solid var(--accent)' }}
                    >
                      Next Topic ⏭
                    </button>
                  )}
                  <button 
                    className="action-btn" 
                    onClick={() => {
                      if (activeProblem?.difficulty === 'Custom') {
                        setShowCustomModal(true);
                      } else {
                        getProblemForLevel(activeLevel || 'Beginner');
                      }
                    }} 
                    title={activeProblem?.difficulty === 'Custom' ? "New Custom Problem" : "Next Problem"}
                    style={{ background: 'var(--bg-surface-raised)', border: '1px solid var(--border)' }}
                  >
                    {
                      (activeProblem?.difficulty === 'Custom') ? (solvedProblems.has(activeProblem?.id) ? "New Custom ⏭" : "↻ Skip") : 
                      (solvedProblems.has(activeProblem?.id) ? "Next Problem ⏭" : "↻ Skip")
                    }
                  </button>
                  <select className="lang-select" value={progLanguage} onChange={(e) => setProgLanguage(e.target.value)}>
                    <option value="Python">Python</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Java">Java</option>
                    <option value="C++">C++</option>
                  </select>
                  {/* Theme toggle moved to sidebar */}
                  <button className={`mark-solved-btn ${solvedProblems.has(activeProblem.id) ? 'solved' : ''}`} onClick={toggleSolved}>
                    {solvedProblems.has(activeProblem.id) ? '✓ Solved' : 'Mark Solved'}
                  </button>
                </div>
              </div>

              <div className="chat-messages">
                {currentMessages.length === 0 && !isLoading && (
                  <EmptyState 
                    icon="💬" 
                    title="empty_chat_title" 
                    description="empty_chat_desc" 
                    language={language}
                  />
                )}
                {currentMessages.map((msg, idx) => (
                  <div key={idx} className={`message ${msg.role === "error" ? "error" : msg.role}`}>
                    <div className="message-avatar">{msg.role === "user" ? "👤" : msg.role === "error" ? "⚠️" : "🤖"}</div>
                    <div className="message-bubble">
                      {msg.content}
                      {msg.role === "error" && msg.retryMessage && (
                        <button 
                          onClick={() => handleSend(msg.retryMessage)}
                          style={{ display: 'block', marginTop: '8px', padding: '6px 12px', background: 'var(--error, #f43f5e)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                        >
                          ↻ Try Again
                        </button>
                      )}
                    </div>
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
                       onTouchStart={(e) => {
                         const startY = e.touches[0].clientY;
                         const startHeight = terminalHeight;
                         const onTouchMove = (moveEvent) => {
                           const newHeight = startHeight - (moveEvent.touches[0].clientY - startY);
                           setTerminalHeight(Math.max(100, Math.min(newHeight, window.innerHeight * 0.8)));
                         };
                         const onTouchEnd = () => {
                           document.removeEventListener("touchmove", onTouchMove);
                           document.removeEventListener("touchend", onTouchEnd);
                         };
                         document.addEventListener("touchmove", onTouchMove);
                         document.addEventListener("touchend", onTouchEnd);
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
                      style={{ flex: 1, minWidth: '140px', background: 'var(--bg-surface)', color: 'var(--accent)', border: '1px solid var(--accent)' }}
                    >
                      {isAnalyzingBigO ? "Analyzing..." : "⚡ Analyze Big-O"}
                    </button>
                    <button 
                      className="review-btn" 
                      onClick={handleRunTests}
                      disabled={isExecuting || isAnalyzingBigO || !code.trim()}
                      style={{ flex: 1, minWidth: '140px', background: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
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
      )}
    </>
  );
}
