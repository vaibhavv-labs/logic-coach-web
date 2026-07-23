"use client";

import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import dynamic from 'next/dynamic';
import LoadingSpinner from './LoadingSpinner';

const ArrayVisualizer = dynamic(() => import('./visualizers/ArrayVisualizer'), { loading: () => <LoadingSpinner /> });
const StackVisualizer = dynamic(() => import('./visualizers/StackVisualizer'), { loading: () => <LoadingSpinner /> });
const QueueVisualizer = dynamic(() => import('./visualizers/QueueVisualizer'), { loading: () => <LoadingSpinner /> });
const LinkedListVisualizer = dynamic(() => import('./visualizers/LinkedListVisualizer'), { loading: () => <LoadingSpinner /> });
const TreeVisualizer = dynamic(() => import('./visualizers/TreeVisualizer'), { loading: () => <LoadingSpinner /> });
const BarsVisualizer = dynamic(() => import('./visualizers/BarsVisualizer'), { loading: () => <LoadingSpinner /> });
const GraphVisualizer = dynamic(() => import('./visualizers/GraphVisualizer'), { loading: () => <LoadingSpinner /> });
const StringVisualizer = dynamic(() => import('./visualizers/StringVisualizer'), { loading: () => <LoadingSpinner /> });
const RecursionVisualizer = dynamic(() => import('./visualizers/RecursionVisualizer'), { loading: () => <LoadingSpinner /> });
const DPVisualizer = dynamic(() => import('./visualizers/DPVisualizer'), { loading: () => <LoadingSpinner /> });
const SearchVisualizer = dynamic(() => import('./visualizers/SearchVisualizer'), { loading: () => <LoadingSpinner /> });
const SortingVisualizer = dynamic(() => import('./visualizers/SortingVisualizer'), { loading: () => <LoadingSpinner /> });
const HeapVisualizer = dynamic(() => import('./visualizers/HeapVisualizer'), { loading: () => <LoadingSpinner /> });
const HashtableVisualizer = dynamic(() => import('./visualizers/HashtableVisualizer'), { loading: () => <LoadingSpinner /> });
const TrieVisualizer = dynamic(() => import('./visualizers/TrieVisualizer'), { loading: () => <LoadingSpinner /> });
import { t } from "../data/translations";
import VoiceChat from "./VoiceChat";
import PracticeCompilerPanel from "./PracticeCompilerPanel";
import { auth } from "../../lib/firebase";

export default function DSATeachingPhase({ topic, initialStep = 0, onComplete, onProgressUpdate, language = "English", progLanguage = "Python", onLanguageChange, onBack }) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [chatHistory, setChatHistory] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [theme, setTheme] = useState("dark");
  const [aiVisualState, setAiVisualState] = useState(null);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [latestAiMessage, setLatestAiMessage] = useState("");
  const [isCompilerOpen, setIsCompilerOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const stepData = topic.teachingSteps[currentStep];

  // STRICT BOUNDARY: Skip logic applies ONLY to Level 0 teaching phase. 
  // Level 1/2 problem solving MUST NOT allow skipping.
  useEffect(() => {
    setFailedAttempts(0);
    setAiVisualState(null);
  }, [currentStep]);

  useEffect(() => {
    let mounted = true;
    
    // CRITICAL QUOTA SAVER: Do not burn 1 Gemini API request just to say hello on every step load.
    // Instead, immediately render a local greeting. The API will only be queried when the user actually sends an answer.
    const fallbackMsg = `Let's talk about **${topic.title}**. \n\n${stepData.text}\n\nDoes this make sense so far?`;
    setChatHistory([{ role: "coach", content: fallbackMsg }]);
    setLatestAiMessage(fallbackMsg);
    setIsLoading(false);

    return () => { mounted = false; };
  }, [currentStep, topic, stepData]);

  useEffect(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 10);
  }, [chatHistory, isLoading]);

  const handleSkip = () => {
    if (window.confirm(t("skip_confirm", language))) {
      if (currentStep < topic.teachingSteps.length - 1) {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        onProgressUpdate(nextStep);
      } else {
        onComplete();
      }
    }
  };

  const handleSend = async (retryMessage = null, fromVoice = false) => {
    const messageToSend = retryMessage || inputText;
    if (!messageToSend.trim() || isLoading) return;
    
    if (!retryMessage) {
      setInputText("");
    }
    setIsLoading(true);

    // If retrying, we don't append a new user message. Otherwise, we do.
    const updatedHistory = retryMessage 
      ? chatHistory.filter(m => m.role !== "error") // strip old errors before retry
      : [...chatHistory, { role: "user", content: messageToSend.trim() }];
      
    setChatHistory(updatedHistory);

    try {
      const token = auth.currentUser ? await auth.currentUser.getIdToken() : null;
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const response = await fetch("/api/dsa-teach", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          messages: updatedHistory.map(m => ({ role: m.role === "coach" ? "model" : "user", content: m.content })),
          concept: stepData.text,
          language: language
        })
      });

      if (!response.ok) {
        let errorText = t("error_failed", language);
        try {
          const data = await response.json();
          if (data.error?.includes("Too many")) errorText = t("error_rate_limit", language);
          else if (data.error?.includes("API key")) errorText = t("error_api_key", language);
          else if (data.error) errorText = data.error;
        } catch(e) {}
        throw new Error(errorText);
      }

      setChatHistory(prev => [...prev, { role: "coach", content: "" }]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let accumulatedText = "";
      let displayText = "";
      let isUnderstood = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulatedText += decoder.decode(value, { stream: true });
        
        displayText = accumulatedText;
        
        const stateMatch = accumulatedText.match(/:::state=(.*?):::/);
        if (stateMatch) {
          setAiVisualState(stateMatch[1]);
          displayText = displayText.replace(stateMatch[0], "").trim();
        }

        const understoodTrueMatch = accumulatedText.match(/:::understood=true:::/);
        if (understoodTrueMatch) {
          isUnderstood = true;
          displayText = displayText.replace(understoodTrueMatch[0], "").trim();
        }

        const understoodFalseMatch = accumulatedText.match(/:::understood=false:::/);
        if (understoodFalseMatch) {
          isUnderstood = false;
          displayText = displayText.replace(understoodFalseMatch[0], "").trim();
        }

        setChatHistory((prev) => {
          const updatedMsgs = [...prev];
          updatedMsgs[updatedMsgs.length - 1] = { role: "coach", content: displayText };
          return updatedMsgs;
        });
      }

      setLatestAiMessage(displayText);
      if (fromVoice) setIsAiSpeaking(true);

      if (isUnderstood) {
        // Add a class for celebration on the container or UI
        const indicator = document.querySelector('.step-indicator');
        if (indicator) indicator.classList.add('pop-celebrate');
        
        setTimeout(() => {
          if (indicator) indicator.classList.remove('pop-celebrate');
          if (currentStep < topic.teachingSteps.length - 1) {
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);
            onProgressUpdate(nextStep);
          } else {
            onComplete();
          }
          setIsLoading(false);
        }, 2500);
      } else {
        setFailedAttempts(prev => prev + 1);
        setIsLoading(false);
      }
    } catch (error) {
      setChatHistory(prev => [...prev, { role: "error", content: error.message, retryMessage: messageToSend.trim() }]);
      setFailedAttempts(prev => prev + 1);
      setIsLoading(false);
    }
  };

  const renderVisualizer = () => {
    const { visualType, visualState } = stepData;
    const activeState = aiVisualState || visualState;
    switch(visualType) {
      case "array": return <ArrayVisualizer state={activeState} />;
      case "stack": return <StackVisualizer state={activeState} />;
      case "queue": return <QueueVisualizer state={activeState} />;
      case "linkedlist": return <LinkedListVisualizer state={activeState} />;
      case "tree": return <TreeVisualizer state={activeState} />;
      case "bars": return <BarsVisualizer state={activeState} />;
      case "graph": return <GraphVisualizer state={activeState} />;
      case "string": return <StringVisualizer state={activeState} />;
      case "recursion": return <RecursionVisualizer state={activeState} />;
      case "dp": return <DPVisualizer state={activeState} />;
      case "search": return <SearchVisualizer state={activeState} />;
      case "sorting": return <SortingVisualizer state={activeState} />;
      case "heap": return <HeapVisualizer state={activeState} />;
      case "hashtable": return <HashtableVisualizer state={activeState} />;
      case "trie": return <TrieVisualizer state={activeState} />;
      case "text":
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px', opacity: 0.8 }}>{activeState === 'math' ? '🧮' : activeState === 'time' ? '📈' : '📝'}</div>
            <p style={{ fontSize: '14px', fontWeight: 500 }}>Follow the chat for concepts</p>
          </div>
        );
      default: return <div className="placeholder-visualizer">{t("visualizer_not_found", language)}</div>;
    }
  };

  return (
    <div className="dsa-teaching-phase">
      <div className="teaching-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {onBack && (
            <button 
              className="action-btn" 
              onClick={onBack} 
              title="Back to Roadmap"
              style={{ fontSize: '18px', padding: '4px 12px', background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
            >
              ←
            </button>
          )}
          <div className="teaching-header-info">
            <h3>{topic.title}</h3>
            <div className="step-indicator">
              {t("step_of", language, { X: currentStep + 1, Y: topic.teachingSteps.length })}
            </div>
          </div>
        </div>
        <div className="header-actions">
          {onLanguageChange && (
            <select 
              className="lang-select" 
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
              title="Spoken Language"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Marathi">Marathi</option>
              <option value="Hinglish">Hinglish</option>
            </select>
          )}
          <button 
            className="practice-code-btn" 
            onClick={() => setIsCompilerOpen(true)} 
            title="Practice Code"
          >
            💻 Practice Code
          </button>
                  {/* Theme toggle moved to sidebar */}
        </div>
      </div>

      <div className="teaching-content-split">
        <div className="teaching-visual scroll-fade-wrapper">
          <div className="visualizer-scroll-container">
            <div className="visual-card">
              <div className="visual-title">{stepData.text}</div>
              {stepData.visualType !== 'text' && (
                <div className="visual-content">
                  {renderVisualizer()}
                </div>
              )}
              {stepData.codeSnippets ? (
                <div className="dsa-code-example">
                  <h4>Example ({progLanguage}):</h4>
                  <pre><code>{stepData.codeSnippets[progLanguage] || stepData.codeSnippets['Python']}</code></pre>
                </div>
              ) : stepData.codeSnippet && (
                <div className="dsa-code-example">
                  <h4>Example ({stepData.codeLanguage || 'Code'}):</h4>
                  <pre><code>{stepData.codeSnippet}</code></pre>
                </div>
              )}
              {(stepData.explanation || "Detailed explanation coming soon for this concept...") && (
                <div className="dsa-explanation-section">
                  <h4>Concept Explanation</h4>
                  <div className="explanation-markdown-body">
                    <ReactMarkdown>{stepData.explanation || "*Detailed text explanation for this step will be added here shortly...*"}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="teaching-chat">
          <div className="chat-messages dsa-chat-messages">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role === "user" ? "user" : msg.role === "error" ? "error" : "coach"}`}>
                <div className="message-avatar">{msg.role === "user" ? "👤" : msg.role === "error" ? "⚠️" : "🤖"}</div>
                <div className="message-bubble">
                  {msg.role === "coach" ? <ReactMarkdown>{msg.content}</ReactMarkdown> : msg.content}
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
            {isLoading && (
              <div className="message coach">
                <div className="message-avatar">🤖</div>
                <div className="typing-dots"><span></span><span></span><span></span></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {failedAttempts >= 3 && (
            <div style={{ padding: '0 24px', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
              <button 
                className="action-btn" 
                onClick={handleSkip}
                aria-label={t("skip_step", language)}
                style={{ background: 'var(--error-light)', color: 'var(--error)', borderColor: 'var(--error)' }}
              >
                {t("skip_step", language)}
              </button>
            </div>
          )}

          <div className="chat-bottom">
            <div className="quick-actions">
              <button className="action-btn" onClick={() => handleSend("Explain simpler please")} aria-label="Explain simpler">
                🧸 Explain simpler
              </button>
              <button className="action-btn" onClick={() => handleSend("I am completely stuck")} aria-label="I'm stuck">
                😵 I'm stuck
              </button>
              <button className="action-btn" onClick={() => handleSend("Is my answer correct?")} aria-label="Check my answer">
                ✅ Check my answer
              </button>
            </div>
            <div className="chat-input-wrapper">
              <input
                type="text"
                className="chat-input dsa-chat-input"
                placeholder={t("your_answer", language)}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                disabled={isLoading}
              />
              <VoiceChat 
                onTranscript={(text) => handleSend(text, true)} 
                isAiSpeaking={isAiSpeaking} 
                aiMessage={latestAiMessage}
                onAiSpeechEnd={() => setIsAiSpeaking(false)}
              />
              <button className="send-btn" onClick={() => handleSend(null)} disabled={!inputText.trim() || isLoading} aria-label="Send message">➤</button>
            </div>
          </div>
        </div>
      </div>
      
      <PracticeCompilerPanel 
        language={progLanguage} 
        isOpen={isCompilerOpen} 
        onClose={() => setIsCompilerOpen(false)} 
      />
    </div>
  );
}
