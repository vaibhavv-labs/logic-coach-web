"use client";

import React, { useState, useEffect, useRef } from "react";
import ArrayVisualizer from "./visualizers/ArrayVisualizer";
import StackVisualizer from "./visualizers/StackVisualizer";
import QueueVisualizer from "./visualizers/QueueVisualizer";
import LinkedListVisualizer from "./visualizers/LinkedListVisualizer";
import TreeVisualizer from "./visualizers/TreeVisualizer";
import BarsVisualizer from "./visualizers/BarsVisualizer";
import GraphVisualizer from "./visualizers/GraphVisualizer";
import StringVisualizer from "./visualizers/StringVisualizer";
import RecursionVisualizer from "./visualizers/RecursionVisualizer";
import DPVisualizer from "./visualizers/DPVisualizer";
import SearchVisualizer from "./visualizers/SearchVisualizer";
import SortingVisualizer from "./visualizers/SortingVisualizer";
import HeapVisualizer from "./visualizers/HeapVisualizer";
import HashtableVisualizer from "./visualizers/HashtableVisualizer";
import TrieVisualizer from "./visualizers/TrieVisualizer";
import { t } from "../data/translations";
import VoiceChat from "./VoiceChat";

export default function DSATeachingPhase({ topic, initialStep = 0, onComplete, onProgressUpdate, language = "English", onLanguageChange }) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [chatHistory, setChatHistory] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [theme, setTheme] = useState("light");
  const [aiVisualState, setAiVisualState] = useState(null);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [latestAiMessage, setLatestAiMessage] = useState("");
  const messagesEndRef = useRef(null);

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
      const response = await fetch("/api/dsa-teach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedHistory.map(m => ({ role: m.role === "coach" ? "model" : "user", content: m.content })),
          concept: stepData.text,
          language: language
        })
      });

      const data = await response.json();
      if (!response.ok) {
        let errorKey = "error_failed";
        if (data.error?.includes("Too many")) errorKey = "error_rate_limit";
        else if (data.error?.includes("API key")) errorKey = "error_api_key";
        else if (data.error) errorKey = "error_generic";
        throw new Error(t(errorKey, language));
      }

      let cleanReply = data.reply;
      const tagRegex = /\[STATE:([^\]]+)\]/g;
      const tags = [...cleanReply.matchAll(tagRegex)];
      if (tags.length > 0) {
        setAiVisualState(tags[tags.length - 1][1]);
      }
      cleanReply = cleanReply.replace(tagRegex, "").trim();

      if (cleanReply.includes("[UNDERSTOOD]")) {
        const finalReply = cleanReply.replace("[UNDERSTOOD]", "").trim();
        setChatHistory(prev => [...prev, { role: "coach", content: finalReply }]);
        setLatestAiMessage(finalReply);
        if (fromVoice) setIsAiSpeaking(true);

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
        }, 2500);
      } else {
        setChatHistory(prev => [...prev, { role: "coach", content: cleanReply }]);
        setLatestAiMessage(cleanReply);
        if (fromVoice) setIsAiSpeaking(true);
        setFailedAttempts(prev => prev + 1);
      }
    } catch (error) {
      setChatHistory(prev => [...prev, { role: "error", content: error.message, retryMessage: messageToSend.trim() }]);
      setFailedAttempts(prev => prev + 1);
    } finally {
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
        <div className="teaching-header-info">
          <h3>{topic.title}</h3>
          <div className="step-indicator">
            {t("step_of", language, { X: currentStep + 1, Y: topic.teachingSteps.length })}
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
          <button className="action-btn theme-toggle" onClick={toggleTheme} title="Toggle Theme" style={{ fontSize: '18px', padding: '6px 10px' }}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </div>

      <div className="teaching-content-split">
        <div className="teaching-visual scroll-fade-wrapper">
          <div className="visualizer-scroll-container">
            <div className="visual-card">
              <div className="visual-title">{stepData.text}</div>
              <div className="visual-content">
                {renderVisualizer()}
              </div>
            </div>
          </div>
        </div>

        <div className="teaching-chat">
          <div className="chat-messages dsa-chat-messages">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role === "user" ? "user" : msg.role === "error" ? "error" : "coach"}`}>
                <div className="message-avatar">{msg.role === "user" ? "👤" : msg.role === "error" ? "⚠️" : "🤖"}</div>
                <div className="message-bubble">
                  {msg.content}
                  {msg.role === "error" && msg.retryMessage && (
                    <button 
                      onClick={() => handleSend(msg.retryMessage)}
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
                style={{ background: '#fef2f2', color: '#dc2626', borderColor: '#fca5a5' }}
              >
                {t("skip_step", language)}
              </button>
            </div>
          )}

          <div className="chat-bottom">
            <div className="quick-actions">
              <button className="action-btn" onClick={() => handleSend("Explain simpler please")}>
                🧸 Explain simpler
              </button>
              <button className="action-btn" onClick={() => handleSend("I am completely stuck")}>
                😵 I'm stuck
              </button>
              <button className="action-btn" onClick={() => handleSend("Is my answer correct?")}>
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
              <button className="send-btn" onClick={() => handleSend(null)} disabled={!inputText.trim() || isLoading}>➤</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
