import React, { useState, useEffect } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import EmptyState from "./EmptyState";

export default function LeaderboardDashboard({ user }) {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const q = query(
          collection(db, "user_progress"),
          orderBy("totalAttempted", "desc"),
          limit(50) // Showing top 50 on dashboard
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
    <div style={{ padding: 'clamp(20px, 5vw, 40px)', maxWidth: '800px', margin: '0 auto', width: '100%', height: '100%', overflowY: 'auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>Global Leaderboard</h1>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>See how you stack up against the top developers.</p>
      </div>

      {error && <div className="auth-error" style={{ marginBottom: '24px' }}>{error}</div>}

      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
            Loading top developers... ⏳
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {leaders.length === 0 ? (
              <EmptyState 
                icon="🏆"
                title="No active users yet"
                description="Be the first developer to start solving problems and claim the top spot!"
              />
            ) : (
              leaders.map((leaderUser, idx) => {
                const isCurrentUser = user && user.uid === leaderUser.id;
                return (
                  <div key={leaderUser.id} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '16px',
                    padding: '16px 24px', 
                    background: isCurrentUser ? 'var(--accent-light)' : (idx === 0 ? 'rgba(251, 191, 36, 0.1)' : 'var(--bg-base)'),
                    border: isCurrentUser ? '1px solid var(--accent)' : '1px solid var(--border-light)',
                    borderRadius: '12px'
                  }}>
                    <div style={{ 
                      width: '40px', height: '40px', borderRadius: '50%', 
                      background: idx === 0 ? '#fbbf24' : (idx === 1 ? '#9ca3af' : (idx === 2 ? '#b45309' : 'var(--bg-surface)')),
                      color: idx < 3 ? '#000' : 'var(--text-primary)',
                      border: idx >= 3 ? '1px solid var(--border)' : 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '16px'
                    }}>
                      {idx + 1}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '16px' }}>
                        {leaderUser.username} {isCurrentUser && <span style={{ fontSize: '12px', background: 'var(--accent)', color: 'white', padding: '2px 8px', borderRadius: '12px', marginLeft: '8px' }}>You</span>}
                      </div>
                    </div>
                    
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 800, color: 'var(--accent)', fontSize: '18px' }}>{leaderUser.totalAttempted}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Solved</div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
