export default function ProgressScreen({ onClose, solvedCount, totalAttempted, stats }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content progress-modal">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Neural Progress</h2>
        
        <div className="circuit-stats-grid">
          <div className="circuit-stat-card">
            <div className="stat-value text-accent">{solvedCount}</div>
            <div className="stat-label">Circuits Completed</div>
          </div>
          <div className="circuit-stat-card">
            <div className="stat-value">{totalAttempted}</div>
            <div className="stat-label">Total Attempted</div>
          </div>
          <div className="circuit-stat-card">
            <div className="stat-value text-success">{stats?.streak || 0}</div>
            <div className="stat-label">Day Streak</div>
          </div>
        </div>

        {totalAttempted === 0 ? (
          <div className="empty-state" style={{ textAlign: 'center', margin: '40px 0' }}>
            <div className="empty-icon" style={{ fontSize: '48px', marginBottom: '16px', color: 'var(--accent-locked)' }}>⚡</div>
            <h3 style={{ marginBottom: '8px', color: 'var(--text-primary)' }}>Your first circuit is waiting to be built.</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Select a problem level or start the DSA path to get the current flowing.</p>
          </div>
        ) : (
          <div className="level-progress">
            <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>Node Analysis by Level</h3>
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
