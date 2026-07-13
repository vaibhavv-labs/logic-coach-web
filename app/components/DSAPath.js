"use client";

import React, { useState, useEffect } from "react";
import { DSA_TOPICS } from "../data/dsaData";
import { t } from "../data/translations";

export default function DSAPath({ progress, onSelectTopic, language = "English" }) {
  const [activeNode, setActiveNode] = useState(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      setTimeout(() => setAnimate(true), 100);
    } else {
      setAnimate(true); // immediate
    }
  }, []);

  let previousTopicUnlocked = true;

  return (
    <div className="dsa-path-wrapper">
      <div className="dsa-path-header">
        <h2 className="dsa-path-title">{t("dsa_title", language)}</h2>
        <p className="dsa-path-subtitle">{t("dsa_subtitle", language)}</p>
      </div>

      <div className="dsa-graph-container">
        {DSA_TOPICS.map((topic, index) => {
          const topicProgress = progress?.[topic.id];
          const isUnlocked = index === 0 || previousTopicUnlocked;
          const isCompleted = topicProgress?.level > 0;
          const isCurrent = isUnlocked && !isCompleted;
          
          let statusText = t("locked", language);
          if (isUnlocked) {
            if (!topicProgress) statusText = t("start_teaching", language);
            else if (topicProgress.level === 0) statusText = t("teaching_step", language, { X: topicProgress.step + 1, Y: topic.teachingSteps.length });
            else if (topicProgress.level === 1) statusText = t("level_1", language);
            else statusText = t("level_2", language);
          }

          previousTopicUnlocked = isCompleted;

          const isExpanded = activeNode === topic.id;

          return (
            <div key={topic.id} className={`dsa-node-group ${animate ? 'animate-in' : ''}`} style={{ animationDelay: `${index * 100}ms` }}>
              <div 
                className={`dsa-graph-node ${isUnlocked ? 'unlocked' : 'locked'} ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                onClick={() => {
                  if (isUnlocked) {
                    setActiveNode(isExpanded ? null : topic.id);
                  }
                }}
              >
                <div className="node-icon">{topic.icon}</div>
                <div className="node-label">{topic.title}</div>
                {isCompleted && <div className="node-check">✓</div>}
              </div>

              {isExpanded && (
                <div className="node-detail-card">
                  <h3>{topic.title}</h3>
                  <p>{topic.description}</p>
                  <div className="node-status">{statusText}</div>
                  <button 
                    className="start-learning-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTopic(topic);
                    }}
                  >
                    {isCompleted ? 'Review Topic' : 'Start Learning'}
                  </button>
                </div>
              )}

              {index < DSA_TOPICS.length - 1 && (
                <div className={`dsa-edge ${isCompleted ? 'completed-edge' : ''}`}>
                  <div className="edge-line" style={{ transitionDelay: `${(index + 1) * 100}ms` }}></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
