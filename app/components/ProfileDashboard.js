import React, { useState } from 'react';
import ActivityHeatmap from './ActivityHeatmap';

export default function ProfileDashboard({ user, userRoadmap, userStats, dsaProgress, onUpdateProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(userRoadmap?.username || user?.displayName || user?.email?.split('@')[0] || "Developer");
  const [editGoal, setEditGoal] = useState(userRoadmap?.goal || "General Logic Mastery");

  const username = userRoadmap?.username || user?.displayName || user?.email?.split('@')[0] || "Developer";
  const track = userRoadmap?.goal || "General Logic Mastery";
  const language = userRoadmap?.language || "Any Language";
  
  // If the user has a Google photo, use it. Otherwise, use a fixed, cute avatar for everyone.
  const photoUrl = user?.photoURL || `https://api.dicebear.com/9.x/avataaars/svg?seed=LogicCoachUser123`;

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
          fontSize: '40px', fontWeight: 800, marginBottom: '24px', boxShadow: '0 8px 24px rgba(59, 130, 246, 0.25)',
          overflow: 'hidden', position: 'relative'
        }}>
          <img src={photoUrl} alt="Profile Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>{username}</h1>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '16px' }}>{track} • {language}</p>
        
        <button 
          onClick={() => setIsEditing(true)}
          style={{ background: 'var(--bg-surface-raised)', color: 'var(--text-primary)', border: '1px solid var(--border)', padding: '8px 16px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }}
        >
          ✎ Edit Profile
        </button>
        
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

      <ActivityHeatmap activity={userStats?.activity || {}} />

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

      {/* Edit Profile Modal */}
      {isEditing && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: 'var(--bg-base)', padding: '32px', borderRadius: '16px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <h2 style={{ marginBottom: '24px', color: 'var(--text-primary)' }}>Edit Profile</h2>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>Display Name</label>
              <input 
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>Learning Goal</label>
              <input 
                value={editGoal}
                onChange={(e) => setEditGoal(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setIsEditing(false)}
                style={{ padding: '10px 16px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-primary)', borderRadius: '8px', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  onUpdateProfile && onUpdateProfile({ username: editName, goal: editGoal });
                  setIsEditing(false);
                }}
                style={{ padding: '10px 24px', background: 'var(--accent)', border: 'none', color: '#fff', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
