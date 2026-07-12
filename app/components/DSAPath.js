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

      <div className="dsa-roadmap">
        {DSA_TOPICS.map((topic, index) => {
          const topicProgress = progress?.[topic.id];
          const isUnlocked = index === 0 || previousTopicUnlocked;
          
          let statusText = t("locked", language);
          if (isUnlocked) {
            if (!topicProgress) statusText = t("start_teaching", language);
            else if (topicProgress.level === 0) statusText = t("teaching_step", language, { X: topicProgress.step + 1, Y: topic.teachingSteps.length });
            else if (topicProgress.level === 1) statusText = t("level_1", language);
            else statusText = t("level_2", language);
          }

          const isCompleted = topicProgress?.level > 0;
          
          // Determine next topic unlock status
          previousTopicUnlocked = isCompleted;

          return (
            <div key={topic.id} className="dsa-node-wrapper">
              <div 
                className={`dsa-node ${isUnlocked ? 'unlocked' : 'locked'} ${isCompleted ? 'completed' : ''}`}
                onClick={() => isUnlocked && onSelectTopic(topic)}
              >
                <div className="dsa-node-icon">{topic.icon}</div>
                <div className="dsa-node-info">
                  <h3>{topic.title}</h3>
                  <span className="dsa-status">{statusText}</span>
                </div>
                {isCompleted && <div className="dsa-checkmark">✓</div>}
              </div>
              {index < DSA_TOPICS.length - 1 && (
                <div className={`dsa-connector ${isCompleted ? 'active-connector' : ''}`}></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
