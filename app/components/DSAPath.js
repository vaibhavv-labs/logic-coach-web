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

      {/* Daily Challenge Card */}
      {(() => {
        // Find the first topic the user hasn't mastered yet (their current learning phase)
        const currentTopicIndex = DSA_TOPICS.findIndex((topic, idx) => {
          const isCompleted = progress?.[topic.id]?.level > 0;
          return !isCompleted;
        });
        
        // If all completed, use the last one for review
        const challengeIndex = currentTopicIndex === -1 ? DSA_TOPICS.length - 1 : currentTopicIndex;
        const challengeTopic = DSA_TOPICS[challengeIndex];

        return (
          <div style={{
            margin: '0 auto 40px auto',
            maxWidth: '600px',
            background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(16, 185, 129, 0.1))',
            border: '1px solid var(--accent-orange)',
            borderRadius: '12px',
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          className="daily-challenge-card"
          onClick={() => onSelectTopic(challengeTopic)}
          >
            <div style={{ fontSize: '40px' }}>🔥</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--accent-orange)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                Your Next Challenge
              </div>
              <h3 style={{ margin: '0 0 4px 0', color: 'var(--text-primary)' }}>
                {challengeTopic.title}
              </h3>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px' }}>
                Based on your current learning phase, here is your recommended puzzle for today!
              </p>
            </div>
            <button style={{ background: 'var(--accent-orange)', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
              Solve
            </button>
          </div>
        );
      })()}

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

      {allCompleted && userId && (
        <div style={{ textAlign: 'center', marginTop: '60px', padding: '40px', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--accent-orange)' }}>
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>🎉 Roadmap Completed!</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>You have mastered all Data Structures and Algorithms modules.</p>
          <a 
            href={`/certificate/${userId}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              display: 'inline-block',
              background: 'var(--accent-orange)', 
              color: '#fff', 
              padding: '16px 32px', 
              borderRadius: '8px', 
              fontSize: '18px', 
              fontWeight: 'bold', 
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)'
            }}
          >
            🎓 Claim Mastery Certificate
          </a>
        </div>
      )}
    </div>
  );
}
