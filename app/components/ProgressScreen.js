import ActivityHeatmap from "./ActivityHeatmap";
import EmptyState from "./EmptyState";

export default function ProgressScreen({ onClose, solvedCount, totalAttempted, stats, language = "English" }) {
  const isZeroState = solvedCount === 0 && totalAttempted === 0;

  return (
    <div className="modal-overlay">
      <div className="modal-content progress-modal">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        <h2>My Progress</h2>
        
        {isZeroState ? (
          <EmptyState 
            icon="📈" 
            title="empty_progress_title" 
            description="empty_progress_desc" 
            language={language}
          />
        ) : (
          <>
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

            <div className="level-progress" style={{ marginBottom: '32px', marginTop: '32px' }}>
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

            <div style={{ marginTop: '20px' }}>
              <ActivityHeatmap stats={stats} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
