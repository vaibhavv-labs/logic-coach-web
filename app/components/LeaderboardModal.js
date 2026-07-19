import React, { useState, useEffect } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import EmptyState from "./EmptyState";

export default function LeaderboardModal({ onClose }) {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const q = query(
          collection(db, "user_progress"),
          orderBy("totalAttempted", "desc"),
          limit(20)
        );
        
        const querySnapshot = await getDocs(q);
        const fetchedLeaders = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.totalAttempted > 0) {
            fetchedLeaders.push({
              id: doc.id,
              username: data.username || data.roadmap?.username || "Anonymous Developer",
              totalAttempted: data.totalAttempted || 0,
              streak: data.streak || 0,
            });
          }
        });
        
        setLeaders(fetchedLeaders);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
        setError("Failed to load leaderboard. Firestore might require an index.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchLeaderboard();
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-content auth-modal" style={{ maxWidth: '500px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>🏆 Global Leaderboard</h2>
          <button className="modal-close" onClick={onClose} style={{ position: 'relative', top: '0', right: '0' }} aria-label="Close modal">×</button>
        </div>
        
        <p className="auth-subtitle" style={{ marginBottom: '24px' }}>
          Top developers ranked by total problems attempted.
        </p>
        
        {error && <div className="auth-error">{error}</div>}
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
            Loading top developers... ⏳
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px', overflowY: 'auto', paddingRight: '8px' }}>
            {leaders.length === 0 ? (
              <EmptyState 
                icon="🏆"
                title="No active users yet"
                description="Be the first developer to start solving problems and claim the top spot!"
              />
            ) : (
              leaders.map((user, idx) => (
                <div key={user.id} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '16px',
                  padding: '12px 16px', 
                  background: idx === 0 ? 'var(--accent-light)' : (idx === 1 ? 'var(--bg-surface-raised)' : 'var(--bg-surface)'),
                  border: idx === 0 ? '1px solid var(--accent)' : '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-lg)'
                }}>
                  <div style={{ 
                    width: '32px', height: '32px', borderRadius: '50%', 
                    background: idx === 0 ? '#fbbf24' : (idx === 1 ? '#9ca3af' : (idx === 2 ? '#b45309' : 'var(--bg-surface)')),
                    color: idx < 3 ? '#000' : 'var(--text-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                  }}>
                    {idx + 1}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{user.username}</div>
                  </div>
                  
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 'bold', color: 'var(--accent)' }}>{user.totalAttempted} solved</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>🔥 {user.streak} day streak</div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
