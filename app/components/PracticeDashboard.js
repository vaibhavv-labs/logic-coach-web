import React from 'react';

export default function PracticeDashboard({ onSelectLevel, onCustomProblem }) {
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  
  return (
    <div style={{ padding: 'clamp(20px, 5vw, 40px)', maxWidth: '1200px', margin: '0 auto', width: '100%', height: '100%', overflowY: 'auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>Practice Logic</h1>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>Challenge your mind with pure problem-solving without syntax getting in the way.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        {levels.map(level => (
          <div 
            key={level} 
            className="bento-card" 
            onClick={() => onSelectLevel(level)} 
            style={{ 
              cursor: 'pointer', 
              background: 'var(--bg-surface)', 
              border: '1px solid var(--border)', 
              borderRadius: '16px', 
              padding: '24px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>{level}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
              Random {level.toLowerCase()} logic problem to test your skills.
            </p>
            <button className="start-btn-small" style={{ width: '100%', marginTop: 'auto' }}>Start Practice →</button>
          </div>
        ))}
      </div>

      <div 
        className="bento-card bento-custom" 
        onClick={onCustomProblem} 
        style={{ cursor: 'pointer', borderRadius: '16px' }}
      >
        <div className="bento-practice-icon" style={{ background: 'transparent', fontSize: '40px', marginBottom: '8px' }}>🎯</div>
        <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Have a specific problem?</h3>
        <p style={{ opacity: 0.9 }}>Paste your own custom problem from LeetCode or a textbook and we'll help you solve it step by step.</p>
      </div>
    </div>
  );
}
