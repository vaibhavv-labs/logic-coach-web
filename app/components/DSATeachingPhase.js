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
import { t } from "../data/translations";

export default function DSATeachingPhase({ topic, initialStep = 0, onComplete, onProgressUpdate, language = "English" }) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [chatHistory, setChatHistory] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const messagesEndRef = useRef(null);

  const stepData = topic.teachingSteps[currentStep];

  // STRICT BOUNDARY: Skip logic applies ONLY to Level 0 teaching phase. 
  // Level 1/2 problem solving MUST NOT allow skipping.
  useEffect(() => {
    setFailedAttempts(0);
  }, [currentStep]);

  useEffect(() => {
    let mounted = true;
    const fetchGreeting = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/dsa-teach", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "user", content: `I am starting the topic "${topic.title}", step: "${stepData.text}". Please give me a brief 1-2 sentence introduction to this step and ask if I understand it.` }],
            concept: stepData.text,
            language: language
          })
        });
        const data = await response.json();
        if (mounted && response.ok) {
           setChatHistory([{ role: "coach", content: data.reply.replace("[UNDERSTOOD]", "").trim() }]);
        } else if (mounted) {
           setChatHistory([{ role: "coach", content: `Let's talk about **${topic.title}**. \n\n${stepData.text}\n\nDoes this make sense so far?` }]);
        }
      } catch (err) {
        if (mounted) {
          setChatHistory([{ role: "coach", content: `Let's talk about **${topic.title}**. \n\n${stepData.text}\n\nDoes this make sense so far?` }]);
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    
    setChatHistory([]); 
    fetchGreeting();

    return () => { mounted = false; };
  }, [currentStep, topic, stepData, language]);

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

  const handleSend = async (retryMessage = null) => {
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

      if (data.reply.includes("[UNDERSTOOD]")) {
        const cleanReply = data.reply.replace("[UNDERSTOOD]", "").trim();
        setChatHistory(prev => [...prev, { role: "coach", content: cleanReply }]);

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
        setChatHistory(prev => [...prev, { role: "coach", content: data.reply }]);
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
    switch(visualType) {
      case "array": return <ArrayVisualizer state={visualState} />;
      case "stack": return <StackVisualizer state={visualState} />;
      case "queue": return <QueueVisualizer state={visualState} />;
      case "linkedlist": return <LinkedListVisualizer state={visualState} />;
      case "tree": return <TreeVisualizer state={visualState} />;
      case "bars": return <BarsVisualizer state={visualState} />;
      case "graph": return <GraphVisualizer state={visualState} />;
      case "string": return <StringVisualizer state={visualState} />;
      case "recursion": return <RecursionVisualizer state={visualState} />;
      case "dp": return <DPVisualizer state={visualState} />;
      case "search": return <SearchVisualizer state={visualState} />;
      case "sorting": return <SortingVisualizer state={visualState} />;
      default: return <div className="placeholder-visualizer">{t("visualizer_not_found", language)}</div>;
    }
  };

  return (
    <div className="dsa-teaching-phase">
      <div className="teaching-header">
        <h3>{topic.title}</h3>
        <div className="step-indicator">
          {t("step_of", language, { X: currentStep + 1, Y: topic.teachingSteps.length })}
        </div>
      </div>

      <div className="teaching-content-split">
        <div className="teaching-visualizer scroll-fade-wrapper">
          <div className="visualizer-scroll-container">
            <div className="visual-title">{stepData.text}</div>
            <div style={{ minWidth: 'fit-content', width: '100%', display: 'flex', justifyContent: 'center' }}>
              {renderVisualizer()}
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
            <button className="send-btn" onClick={handleSend} disabled={!inputText.trim() || isLoading}>➤</button>
          </div>
        </div>
      </div>
    </div>
  );
}
