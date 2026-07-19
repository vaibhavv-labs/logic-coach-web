import React from 'react';

export default function LoadingSpinner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px', width: '100%' }}>
      <div className="splash-logo-container splash-pulse-effect" style={{ transform: 'scale(0.5)' }}>
        <div className="splash-brain splash-spin">🧠</div>
      </div>
    </div>
  );
}
