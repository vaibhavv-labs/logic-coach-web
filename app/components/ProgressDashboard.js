import React from 'react';
import { DSA_TOPICS } from '../data/dsaData';

export default function ProgressDashboard({ dsaProgress, userStats, solvedProblems }) {
  const masteryPercent = userStats.totalAttempted > 0 
    ? Math.round((solvedProblems.size / userStats.totalAttempted) * 100) 
    : 0;

  return (
    <div style={{ padding: 'clamp(20px, 5vw, 40px)', maxWidth: '1200px', margin: '0 auto', width: '100%', height: '100%', overflowY: 'auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>Your Progress</h1>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>Track your mastery and review completed topics.</p>
      </div>

      {/* Row of 4 Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '48px' }}>
        <div style={{ background: 'var(--bg-surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎯</div>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Mastery Rating</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px' }}>{masteryPercent}%</div>
        </div>

        <div style={{ background: 'var(--bg-surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔥</div>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Current Streak</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px' }}>{userStats.streak}</div>
        </div>

        <div style={{ background: 'var(--bg-surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>✅</div>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Problems Solved</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px' }}>{solvedProblems.size}</div>
        </div>

        <div style={{ background: 'var(--bg-surface)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>📝</div>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Total Attempted</div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px' }}>{userStats.totalAttempted}</div>
        </div>
      </div>

      {/* Topics Completed Checklist */}
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: 'var(--text-primary)' }}>DSA Topics Checklist</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {DSA_TOPICS.map(topic => {
            const status = dsaProgress[topic.id]?.level;
            const isCompleted = status === 1;
            const isInProgress = status === 0;

            let statusEl = null;
            if (isCompleted) {
              statusEl = <span style={{ color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ fontSize: '18px' }}>✓</div> Done</span>;
            } else if (isInProgress) {
              statusEl = <span style={{ color: '#f59e0b', fontWeight: 600, fontSize: '14px' }}>In Progress</span>;
            } else {
              statusEl = <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Pending</span>;
            }

            return (
              <div key={topic.id} style={{ 
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                padding: '16px', background: 'var(--bg-surface)', border: `1px solid ${isCompleted ? 'rgba(16, 185, 129, 0.3)' : 'var(--border)'}`, 
                borderRadius: '12px',
                opacity: (isCompleted || isInProgress) ? 1 : 0.6
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ fontSize: '20px', width: '32px', height: '32px', background: 'var(--bg-base)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {topic.icon}
                  </div>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{topic.title}</span>
                </div>
                {statusEl}
              </div>
            )
          })}
        </div>
      </div>

    </div>
  );
}
