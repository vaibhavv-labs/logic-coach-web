"use client";

import React from "react";
import { DSA_TOPICS } from "../data/dsaData";
import { t } from "../data/translations";

export default function DSAPath({ progress, onSelectTopic, language = "English" }) {
  // progress format expected:
  // {
  //   "arrays": { level: 1 }, // meaning Level 0 done, on Level 1
  //   "strings": { level: 0, step: 2 } // currently on Level 0, step 2
  // }
  // Topic unlocks if previous topic's Level 0 is complete (level >= 1)

  let previousTopicUnlocked = true;

  return (
    <div className="dsa-path-container">
      <h2 className="dsa-path-title">{t("dsa_title", language)}</h2>
      <p className="dsa-path-subtitle">{t("dsa_subtitle", language)}</p>

      <div className="dsa-circuit-board">
        {DSA_TOPICS.map((topic, index) => {
          const topicProgress = progress?.[topic.id];
          const isUnlocked = index === 0 || previousTopicUnlocked;
          
          let statusText = t("locked", language);
          let nodeState = 'locked'; // 'locked' | 'active' | 'completed'
          
          if (isUnlocked) {
            if (!topicProgress || topicProgress.level === 0) {
              statusText = topicProgress ? t("teaching_step", language, { X: topicProgress.step + 1, Y: topic.teachingSteps.length }) : t("start_teaching", language);
              nodeState = 'active';
            } else {
              statusText = topicProgress.level === 1 ? t("level_1", language) : t("level_2", language);
              nodeState = 'completed';
            }
          }

          const isCompleted = topicProgress?.level > 0;
          previousTopicUnlocked = isCompleted;

          // Determine horizontal position for winding path (0: left, 1: right, 2: left ...)
          const positionClass = index % 2 === 0 ? 'circuit-left' : 'circuit-right';

          return (
            <div key={topic.id} className={`circuit-node-wrapper ${positionClass}`}>
              <div 
                className={`circuit-node ${nodeState}`}
                onClick={() => isUnlocked && onSelectTopic(topic)}
              >
                <div className="circuit-icon-ring">
                  <div className="circuit-icon">{topic.icon}</div>
                </div>
                <div className="circuit-info">
                  <h3>{topic.title}</h3>
                  <span className="circuit-status">{statusText}</span>
                </div>
              </div>
              {index < DSA_TOPICS.length - 1 && (
                <div className="circuit-wire-wrapper">
                   <div className={`circuit-wire ${isCompleted ? 'wire-lit' : ''}`}></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
