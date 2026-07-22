import React from 'react';

export default function ActivityHeatmap({ activity = {} }) {
  // Generate the last 365 days + current week padding
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sun) to 6 (Sat)
  
  // Start from Sunday of the week 52 weeks ago
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - (52 * 7 + dayOfWeek));

  const days = [];
  const currentDate = new Date(startDate);
  
  // Create an array of Date objects up to today
  while (currentDate <= today) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Format YYYY-MM-DD local time correctly
  const formatDate = (date) => {
    const d = new Date(date);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();
    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
  };

  const getIntensityLevel = (count) => {
    if (!count) return 0;
    if (count === 1) return 1;
    if (count <= 3) return 2;
    if (count <= 6) return 3;
    return 4;
  };

  const getColor = (level) => {
    const colors = {
      0: 'var(--bg-surface-raised, #f1f5f9)',
      1: '#9be9a8',
      2: '#40c463',
      3: '#30a14e',
      4: '#216e39'
    };
    return colors[level];
  };

  // Ensure tooltips show above
  const Tooltip = ({ count, dateStr }) => (
    <div className="heatmap-tooltip">
      {count ? `${count} problems` : 'No activity'} on {dateStr}
    </div>
  );

  return (
    <div className="activity-heatmap-container">
      <style dangerouslySetInnerHTML={{__html: `
        .activity-heatmap-container {
          overflow-x: auto;
          padding: 24px;
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          margin-bottom: 48px;
        }
        .heatmap-scroll-wrapper {
          min-width: max-content;
        }
        .heatmap-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .heatmap-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
        }
        .heatmap-grid {
          display: grid;
          grid-template-rows: repeat(7, 12px);
          grid-auto-flow: column;
          grid-auto-columns: 12px;
          gap: 4px;
          margin-bottom: 16px;
        }
        .heatmap-cell {
          width: 12px;
          height: 12px;
          border-radius: 2px;
          position: relative;
          cursor: crosshair;
        }
        .heatmap-cell[data-theme='dark'] {
          background-color: #161b22;
        }
        .heatmap-cell .heatmap-tooltip {
          visibility: hidden;
          background-color: var(--text-primary);
          color: var(--bg-base);
          text-align: center;
          border-radius: 4px;
          padding: 4px 8px;
          position: absolute;
          z-index: 10;
          bottom: 150%;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          font-size: 12px;
          font-weight: 500;
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
        }
        .heatmap-cell:hover .heatmap-tooltip {
          visibility: visible;
          opacity: 1;
        }
        .heatmap-legend {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 6px;
          font-size: 12px;
          color: var(--text-secondary);
        }
        .legend-box {
          width: 12px;
          height: 12px;
          border-radius: 2px;
        }
      `}} />
      
      <div className="heatmap-scroll-wrapper">
        <div className="heatmap-header">
          <div className="heatmap-title">365 Days of Code</div>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            {Object.values(activity).reduce((a, b) => a + b, 0)} contributions in the last year
          </div>
        </div>

        <div className="heatmap-grid" dir="ltr">
          {days.map((date, idx) => {
            const dateStr = formatDate(date);
            const count = activity[dateStr] || 0;
            const level = getIntensityLevel(count);
            
            // Adjust colors based on theme if dark mode uses different colors
            const isDark = typeof window !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'dark';
            let bg = getColor(level);
            if (isDark && level === 0) bg = '#161b22'; // github dark mode empty cell
            if (isDark && level === 1) bg = '#0e4429';
            if (isDark && level === 2) bg = '#006d32';
            if (isDark && level === 3) bg = '#26a641';
            if (isDark && level === 4) bg = '#39d353';

            return (
              <div 
                key={idx} 
                className="heatmap-cell"
                style={{ backgroundColor: bg }}
              >
                <Tooltip count={count} dateStr={dateStr} />
              </div>
            );
          })}
        </div>

        <div className="heatmap-legend">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map(level => {
            const isDark = typeof window !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'dark';
            let bg = getColor(level);
            if (isDark && level === 0) bg = '#161b22';
            if (isDark && level === 1) bg = '#0e4429';
            if (isDark && level === 2) bg = '#006d32';
            if (isDark && level === 3) bg = '#26a641';
            if (isDark && level === 4) bg = '#39d353';
            return <div key={level} className="legend-box" style={{ backgroundColor: bg }} />
          })}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
