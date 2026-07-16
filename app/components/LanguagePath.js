"use client";

import React from "react";
import { LANGUAGE_TOPICS } from "../data/languageData";
import { t } from "../data/translations";

export default function LanguagePath({ progress, roadmap, onSelectTopic, language = "English" }) {
  let previousTopicUnlocked = true;

  return (
    <div className="dsa-path-container">
      <h2 className="dsa-path-title">
        {roadmap && roadmap.language 
          ? `Your ${roadmap.language} Mastery Roadmap` 
          : "Language Mastery Roadmap"}
      </h2>
      <p className="dsa-path-subtitle">
        {roadmap && roadmap.goal 
          ? `Goal: ${roadmap.goal} • Focus: Syntax & Core Concepts`
          : "Master the fundamentals of your chosen language."}
      </p>

      <div className="dsa-roadmap">
        {LANGUAGE_TOPICS.map((topic, index) => {
          const topicProgress = progress?.[topic.id];
          const isUnlocked = index === 0 || previousTopicUnlocked;
          
          let statusText = t("locked", language);
          if (isUnlocked) {
            if (!topicProgress) statusText = t("start_teaching", language);
            else if (topicProgress.level === 0) statusText = t("teaching_step", language, { X: topicProgress.step + 1, Y: topic.teachingSteps.length });
            else if (topicProgress.level === 1) statusText = t("level_1", language);
            else if (topicProgress.level === 2) statusText = "👑 Mastery Mode";
            else statusText = "✅ Fully Mastered";
          }

          const isCompleted = topicProgress?.level > 0;
          
          previousTopicUnlocked = isCompleted;

          return (
            <div key={topic.id} className="dsa-node-wrapper">
              <div 
                className={`dsa-node ${isUnlocked ? 'unlocked' : 'locked'} ${isCompleted ? 'completed' : ''}`}
                onClick={() => isUnlocked && onSelectTopic(topic)}
              >
                <div className="dsa-node-icon">{topic.icon}</div>
                <div className="dsa-node-info">
                  <h3>
                    {topic.title}
                  </h3>
                  <span className="dsa-status">{statusText}</span>
                </div>
                {isCompleted && <div className="dsa-checkmark">✓</div>}
              </div>
              {index < LANGUAGE_TOPICS.length - 1 && (
                <div className={`dsa-connector ${isCompleted ? 'active-connector' : ''}`}></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
