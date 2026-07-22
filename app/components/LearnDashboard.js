import React from 'react';
import { DSA_TOPICS } from '../data/dsaData';
import { LANGUAGE_TOPICS } from '../data/languageData';

const ProgressBar = ({ percent }) => (
  <div style={{ width: '100%', height: '8px', background: 'var(--border-light)', borderRadius: '4px', overflow: 'hidden', marginTop: '16px', marginBottom: '8px' }}>
    <div style={{ width: `${percent}%`, height: '100%', background: 'var(--accent)', borderRadius: '4px', transition: 'width 0.3s ease' }} />
  </div>
);

export default function LearnDashboard({ 
  dsaProgress = {}, 
  languageProgress = {}, 
  solvedProblems = new Set(), 
  userRoadmap, 
  handleNav,
  onSelectDsa,
  onSelectLanguage
}) {
  const dsaTotal = DSA_TOPICS.length || 1;
  const dsaCompleted = Object.values(dsaProgress).filter(p => p.level === 1).length;
  const dsaPercent = Math.round((dsaCompleted / dsaTotal) * 100);

  const langTotal = LANGUAGE_TOPICS.length || 1;
  const langCompleted = Object.values(languageProgress).filter(p => p.level === 1).length;
  const langPercent = Math.round((langCompleted / langTotal) * 100);

  const logicTotal = 50; 
  const logicCompleted = solvedProblems.size || 0;
  const logicPercent = Math.min(100, Math.round((logicCompleted / logicTotal) * 100));

  // Determine recently opened items
  const recentItems = [];
  
  DSA_TOPICS.forEach(topic => {
    if (dsaProgress[topic.id] && dsaProgress[topic.id].level === 0) {
      recentItems.push({ type: 'dsa', topic, step: dsaProgress[topic.id].step || 0, title: topic.title, icon: '🗺️', desc: 'DSA Roadmap' });
    }
  });

  LANGUAGE_TOPICS.forEach(topic => {
    if (languageProgress[topic.id] && languageProgress[topic.id].level === 0) {
      recentItems.push({ type: 'language', topic, step: languageProgress[topic.id].step || 0, title: topic.title, icon: '🚀', desc: 'Language Mastery' });
    }
  });

  // If no "in-progress" items, find the first uncompleted topics to suggest
  if (recentItems.length === 0) {
    const nextDsa = DSA_TOPICS.find(t => !dsaProgress[t.id] || dsaProgress[t.id].level === 0);
    if (nextDsa) recentItems.push({ type: 'dsa', topic: nextDsa, step: 0, title: nextDsa.title, icon: '🗺️', desc: 'DSA Roadmap' });

    const nextLang = LANGUAGE_TOPICS.find(t => !languageProgress[t.id] || languageProgress[t.id].level === 0);
    if (nextLang) recentItems.push({ type: 'language', topic: nextLang, step: 0, title: nextLang.title, icon: '🚀', desc: 'Language Mastery' });
  }

  const displayRecent = recentItems.slice(0, 2);

  const handleDsaContinue = () => {
    const recentDsa = DSA_TOPICS.find(t => dsaProgress[t.id] && dsaProgress[t.id].level === 0);
    if (recentDsa) {
      onSelectDsa(recentDsa);
    } else {
      const nextDsa = DSA_TOPICS.find(t => !dsaProgress[t.id] || dsaProgress[t.id].level === 0);
      if (nextDsa) {
        onSelectDsa(nextDsa);
      } else {
        handleNav('dsa');
      }
    }
  };

  const handleLanguageContinue = () => {
    const recentLang = LANGUAGE_TOPICS.find(t => languageProgress[t.id] && languageProgress[t.id].level === 0);
    if (recentLang) {
      onSelectLanguage(recentLang);
    } else {
      const nextLang = LANGUAGE_TOPICS.find(t => !languageProgress[t.id] || languageProgress[t.id].level === 0);
      if (nextLang) {
        onSelectLanguage(nextLang);
      } else {
        handleNav('language');
      }
    }
  };

  return (
    <div style={{ padding: 'clamp(20px, 5vw, 40px)', maxWidth: '1200px', margin: '0 auto', width: '100%', height: '100%', overflowY: 'auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>Learning Center</h1>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>Pick up where you left off or start a new module.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '24px', marginBottom: '48px' }}>
        
        {/* DSA Card */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ fontSize: '32px', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)', borderRadius: '12px' }}>🗺️</div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>DSA Path</h2>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Master core algorithms</p>
            </div>
          </div>
          <ProgressBar percent={dsaPercent} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '24px' }}>
            <span>{dsaCompleted} / {dsaTotal} Topics</span>
            <span>{dsaPercent}% Complete</span>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
            <button 
              className="start-btn-small" 
              style={{ flex: 1, padding: '12px' }}
              onClick={handleDsaContinue}
            >
              Continue <span>→</span>
            </button>
            <button 
              className="start-btn-small" 
              style={{ padding: '12px', background: 'var(--bg-base)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
              onClick={() => handleNav('dsa')}
              title="View full roadmap"
            >
              🗺️
            </button>
          </div>
        </div>

        {/* Logic Problems Card */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ fontSize: '32px', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)', borderRadius: '12px' }}>🧠</div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>Logic Problems</h2>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Raw problem-solving</p>
            </div>
          </div>
          <ProgressBar percent={logicPercent} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '24px' }}>
            <span>{logicCompleted} Solved</span>
            <span>{logicPercent}% Complete</span>
          </div>
          <button 
            className="start-btn-small" 
            style={{ width: '100%', marginTop: 'auto', padding: '12px', background: 'var(--bg-base)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
            onClick={() => handleNav('practice')}
          >
            Start Practice <span>→</span>
          </button>
        </div>

        {/* Language Mastery Card */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <div style={{ fontSize: '32px', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)', borderRadius: '12px' }}>🚀</div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>{userRoadmap?.language || 'Language'} Mastery</h2>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Syntax & fundamentals</p>
            </div>
          </div>
          <ProgressBar percent={langPercent} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '24px' }}>
            <span>{langCompleted} / {langTotal} Topics</span>
            <span>{langPercent}% Complete</span>
          </div>
          <button 
            className="start-btn-small" 
            style={{ width: '100%', marginTop: 'auto', padding: '12px', background: 'var(--bg-base)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
            onClick={handleLanguageContinue}
          >
            Continue <span>→</span>
          </button>
        </div>
      </div>

      {/* Recently Opened Section */}
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: 'var(--text-primary)' }}>Recently Opened</h2>
        
        {displayRecent.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {displayRecent.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => {
                  if (item.type === 'dsa') {
                    onSelectDsa(item.topic);
                  } else {
                    onSelectLanguage(item.topic);
                  }
                }}
                style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px',
                  padding: '16px 24px', background: 'var(--bg-surface)', border: '1px solid var(--border)', 
                  borderRadius: '12px', cursor: 'pointer', transition: 'transform 0.2s, border-color 0.2s'
                }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ fontSize: '24px' }}>{item.icon}</div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>{item.title}</h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{item.desc}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <span style={{ fontSize: '14px', color: 'var(--text-muted)', background: 'var(--bg-base)', padding: '4px 12px', borderRadius: '12px' }}>
                    Step {item.step}
                  </span>
                  <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Resume →</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: '32px', textAlign: 'center', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '12px', color: 'var(--text-muted)' }}>
            No recent activity found. Start a module above!
          </div>
        )}
      </div>

    </div>
  );
}
