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
        )}
      </div>
    </div>
  );
}
