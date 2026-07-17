"use client";

import React, { useEffect, useRef } from "react";
import { DSA_TOPICS } from "../data/dsaData";
import { t } from "../data/translations";

export default function DSAPath({ progress, userStats, roadmap, onSelectTopic, language = "English", userId }) {
  const scrollRef = useRef(null);

  // Auto-scroll to current topic
  useEffect(() => {
    if (scrollRef.current) {
      const currentElement = scrollRef.current.querySelector('.pro-timeline-item.current');
      if (currentElement) {
        currentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [progress]);

  let previousTopicUnlocked = true;
  const allCompleted = DSA_TOPICS.every(topic => {
    const isCompleted = progress?.[topic.id]?.level > 0 && userStats?.solved?.some(id => id.startsWith(topic.id + '-'));
    return isCompleted;
  });

  const getTopicState = (topic, index) => {
    const topicProgress = progress?.[topic.id];
    const isUnlocked = index === 0 || previousTopicUnlocked;
    
    let stateClass = "locked";
    let btnText = "Locked";
    let badgeText = "Locked";
    
    const teachingComplete = topicProgress?.level > 0;
    const hasSolvedProblem = userStats?.solved?.some(id => id.startsWith(topic.id + '-')) || false;
    const isCompleted = teachingComplete && hasSolvedProblem;

    if (isCompleted) {
      stateClass = "completed";
      btnText = "Review Module";
      badgeText = "Mastered";
    } else if (isUnlocked) {
      if (!topicProgress) {
        btnText = "Start Learning";
        badgeText = "Up Next";
      } else if (topicProgress.level === 0) {
        btnText = "Continue";
        badgeText = `Step ${topicProgress.step + 1}/${topic.teachingSteps.length}`;
      } else if (teachingComplete && !hasSolvedProblem) {
        btnText = "Practice to Master";
        badgeText = "Practice Required";
      }
      stateClass = "current";
    }
    
    previousTopicUnlocked = isCompleted;
    return { stateClass, isUnlocked, isCompleted, btnText, badgeText };
  };

  return (
    <div className="dsa-path-container" style={{ paddingBottom: '60px' }} ref={scrollRef}>
      <h2 className="dsa-path-title" style={{ textAlign: 'center', marginBottom: '10px' }}>
        {roadmap && roadmap.language 
          ? `Your ${roadmap.language} Roadmap` 
          : t("dsa_title", language)}
      </h2>
      <p className="dsa-path-subtitle" style={{ textAlign: 'center', marginBottom: '40px' }}>
        {roadmap && roadmap.goal 
          ? `Goal: ${roadmap.goal} • Focus: ${roadmap.interest}`
          : t("dsa_subtitle", language)}
      </p>

      <div className="pro-timeline">
        {/* Reset unlock state for rendering loop */}
        {(() => { previousTopicUnlocked = true; return null; })()}
        
        {DSA_TOPICS.map((topic, index) => {
          const { stateClass, isUnlocked, btnText, badgeText } = getTopicState(topic, index);

          return (
            <div key={topic.id} className={`pro-timeline-item ${stateClass}`}>
              <div className="pro-timeline-icon">
                {topic.icon}
              </div>
              
              <div 
                className="pro-timeline-card"
                onClick={() => isUnlocked && onSelectTopic(topic)}
              >
                <div className="pro-timeline-header">
                  <h3 className="pro-timeline-title">{topic.title}</h3>
                  <span className="pro-timeline-badge">{badgeText}</span>
                </div>
                
                <p className="pro-timeline-desc">
                  {topic.description || "Master this core concept to build a strong foundation in logic and algorithms."}
                </p>
                
                <button className="pro-timeline-btn">
                  {btnText}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
