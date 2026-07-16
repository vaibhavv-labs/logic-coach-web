export default function ProgressScreen({ onClose, solvedCount, totalAttempted, stats }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content progress-modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>My Progress</h2>
        
        <div className="progress-stats">
          <div className="stat-card">
            <h3>{solvedCount}</h3>
            <p>Problems Solved</p>
          </div>
          <div className="stat-card">
            <h3>{totalAttempted}</h3>
            <p>Total Attempted</p>
          </div>
          <div className="stat-card">
            <h3>{stats?.streak || 0}</h3>
            <p>Day Streak 🔥</p>
          </div>
        </div>

        {totalAttempted === 0 ? (
          <div className="empty-state" style={{ textAlign: 'center', margin: '40px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌱</div>
            <h3 style={{ marginBottom: '8px' }}>You haven't tried any problems yet</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Pick a difficulty level from the sidebar to get started!</p>
          </div>
        ) : (
          <>
            <div className="level-progress">
              <h3>Level Completion</h3>
              {['Beginner', 'Easy', 'Medium', 'Hard', 'Advanced'].map(level => {
                const count = stats?.levelCounts?.[level] || 0;
                return (
                  <div key={level} className="level-bar-row">
                    <span className="level-name">{level}</span>
                    <div className="progress-bar-container">
                      <div className="progress-bar-fill" style={{ width: `${Math.min(count * 10, 100)}%` }}></div>
                    </div>
                    <span className="level-count">{count}</span>
                  </div>
                );
              })}
            </div>
            
            <div style={{ marginTop: '32px' }}>
              <h3 style={{ marginBottom: '16px', fontSize: '16px' }}>Activity Heatmap</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(20, 1fr)', gap: '4px' }}>
                {Array.from({ length: 140 }).map((_, i) => {
                  const today = new Date();
                  const d = new Date(today);
                  d.setDate(today.getDate() - (139 - i));
                  const dateStr = d.toISOString().split('T')[0];
                  const count = stats?.activity?.[dateStr] || 0;
                  
                  let bgColor = 'var(--bg-subtle)';
                  if (count === 1) bgColor = '#064e3b';
                  if (count === 2) bgColor = '#047857';
                  if (count === 3) bgColor = '#10b981';
                  if (count >= 4) bgColor = '#34d399';
                  
                  return (
                    <div 
                      key={dateStr} 
                      title={`${count} problems on ${dateStr}`}
                      style={{ 
                        width: '100%', 
                        paddingBottom: '100%', 
                        backgroundColor: bgColor, 
                        borderRadius: '4px',
                        border: '1px solid rgba(255,255,255,0.05)'
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
