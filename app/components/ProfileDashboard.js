import React from 'react';

export default function ProfileDashboard({ user, userRoadmap, userStats, dsaProgress }) {
  const username = userRoadmap?.username || user?.displayName || user?.email?.split('@')[0] || "Developer";
  const initial = username.charAt(0).toUpperCase();
  const track = userRoadmap?.goal || "General Logic Mastery";
  const language = userRoadmap?.language || "Any Language";

  // Determine Badges
  const badges = [];

  // Streak Badges
  if (userStats.streak >= 3) {
    badges.push({ icon: '🔥', title: '3-Day Streak', desc: 'Consistent learner' });
  }
  if (userStats.streak >= 7) {
    badges.push({ icon: '⚡', title: '7-Day Streak', desc: 'Unstoppable!' });
  }

  // Activity Badges
  if (userStats.totalAttempted >= 1) {
    badges.push({ icon: '🌱', title: 'First Steps', desc: 'Attempted a problem' });
  }
  if (userStats.totalAttempted >= 10) {
    badges.push({ icon: '🛠️', title: 'Builder', desc: '10+ problems attempted' });
  }

  // Topic Badges (Arrays, Strings, etc.)
  if (dsaProgress['arrays']?.level === 1) {
    badges.push({ icon: '📦', title: 'Array Master', desc: 'Completed Arrays' });
  }
  if (dsaProgress['strings']?.level === 1) {
    badges.push({ icon: '🔤', title: 'String Weaver', desc: 'Completed Strings' });
  }

  return (
    <div style={{ padding: 'clamp(20px, 5vw, 40px)', maxWidth: '800px', margin: '0 auto', width: '100%', height: '100%', overflowY: 'auto' }}>
      
      {/* Profile Header */}
      <div style={{ background: 'var(--bg-surface)', padding: '40px', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ 
          width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)', 
          color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', 
          fontSize: '40px', fontWeight: 800, marginBottom: '24px', boxShadow: '0 8px 24px rgba(59, 130, 246, 0.25)' 
        }}>
          {initial}
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>{username}</h1>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '16px' }}>{track} • {language}</p>
        
        <div style={{ display: 'flex', gap: '24px', marginTop: '16px' }}>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>{userStats.streak}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Day Streak</div>
          </div>
          <div style={{ width: '1px', background: 'var(--border)' }}></div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>{userStats.totalAttempted}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Attempted</div>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px', color: 'var(--text-primary)' }}>Achievements & Badges</h2>
        
        {badges.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
            {badges.map((badge, idx) => (
              <div key={idx} style={{ 
                background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '12px', 
                padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'
              }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{badge.icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>{badge.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{badge.desc}</p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: '32px', textAlign: 'center', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '12px', color: 'var(--text-muted)' }}>
            Complete topics and maintain a streak to earn badges!
          </div>
        )}
      </div>

    </div>
  );
}
