import React from 'react';

export default function LandingPage({ user, onStart, onLogin }) {
  return (
    <div className="landing-layout">
      {/* Background Floating Symbols */}
      <div className="splash-symbol" style={{ left: '10%', animationDuration: '15s', fontSize: '32px' }}>{`{ }`}</div>
      <div className="splash-symbol" style={{ left: '25%', animationDuration: '18s', animationDelay: '2s', fontSize: '48px' }}>∑</div>
      <div className="splash-symbol" style={{ left: '40%', animationDuration: '22s', animationDelay: '1s', fontSize: '28px' }}>λ</div>
      <div className="splash-symbol" style={{ left: '60%', animationDuration: '16s', animationDelay: '3s', fontSize: '40px' }}>{`< />`}</div>
      <div className="splash-symbol" style={{ left: '75%', animationDuration: '20s', animationDelay: '0.5s', fontSize: '36px' }}>O(n)</div>
      <div className="splash-symbol" style={{ left: '85%', animationDuration: '19s', animationDelay: '4s', fontSize: '50px' }}>∀</div>
      <div className="splash-symbol" style={{ left: '50%', animationDuration: '25s', animationDelay: '5s', fontSize: '32px' }}>∃</div>

      <div className="landing-bg-orb orb-1"></div>
      <div className="landing-bg-orb orb-2"></div>
      
      <nav className="landing-nav">
        <div className="landing-nav-logo">
          <span className="logo-icon">🧠</span>
          <span className="logo-text">Logic Coach</span>
        </div>
        <div className="landing-nav-actions">
          {user ? (
            <button className="start-btn-small" onClick={onStart}>
              Go to Dashboard
            </button>
          ) : (
            <button className="start-btn-small" onClick={onLogin}>
              Sign In
            </button>
          )}
        </div>
      </nav>
      
      <div className="landing-container">
        <div className="landing-icon-wrapper">
          <div className="landing-icon-glow"></div>
          <div className="landing-icon">🧠</div>
        </div>
        <h1 className="landing-title">Logic Coach</h1>
        <h2 className="landing-tagline">Learn by thinking, not by copy-pasting</h2>
        <p className="landing-desc">
          Your personal Socratic AI tutor. We never give direct code answers — instead we guide you through questions so you discover the logic yourself.
        </p>
        <button className="start-btn" onClick={user ? onStart : onLogin}>
          {user ? "Resume Learning" : "Start Learning for Free"}
        </button>
      </div>
    </div>
  );
}
