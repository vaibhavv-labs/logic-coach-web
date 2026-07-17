import React from "react";

export default function ActivityHeatmap({ stats }) {
  return (
    <div style={{ marginBottom: '40px', padding: '24px', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border)' }}>
      <h3 style={{ marginBottom: '16px', fontSize: '16px', color: 'var(--text-primary)' }}>GitHub-Style Progress Heatmap</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(20, 1fr)', gap: '6px' }}>
        {Array.from({ length: 140 }).map((_, i) => {
          const today = new Date();
          const d = new Date(today);
          d.setDate(today.getDate() - (139 - i));
          const dateStr = d.toISOString().split('T')[0];
          const count = stats?.activity?.[dateStr] || 0;
          
          let bgColor = 'var(--bg-subtle)';
          if (count === 1) bgColor = '#064e3b'; // Very dark green
          if (count === 2) bgColor = '#047857'; // Dark green
          if (count === 3) bgColor = '#10b981'; // Green
          if (count >= 4) bgColor = '#34d399';  // Light green
          
          return (
            <div 
              key={dateStr} 
              title={`${count} problems solved on ${dateStr}`}
              style={{ 
                width: '100%', 
                paddingBottom: '100%', 
                backgroundColor: bgColor, 
                borderRadius: '4px',
                border: '1px solid rgba(255,255,255,0.02)',
                transition: 'transform 0.1s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          );
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '12px', gap: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
        <span>Less</span>
        <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--bg-subtle)', borderRadius: '2px' }}></div>
        <div style={{ width: '12px', height: '12px', backgroundColor: '#064e3b', borderRadius: '2px' }}></div>
        <div style={{ width: '12px', height: '12px', backgroundColor: '#047857', borderRadius: '2px' }}></div>
        <div style={{ width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '2px' }}></div>
        <div style={{ width: '12px', height: '12px', backgroundColor: '#34d399', borderRadius: '2px' }}></div>
        <span>More</span>
      </div>
    </div>
  );
}
