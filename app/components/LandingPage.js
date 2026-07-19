import React from 'react';
import Footer from './Footer';

export default function LandingPage({ onStart }) {
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

      <div className="landing-container" style={{ paddingTop: '80px', paddingBottom: '80px', flex: 1 }}>
        {/* Hero Section */}
        <div style={{ maxWidth: '800px', textAlign: 'center', marginBottom: '80px' }}>
          <div className="landing-icon-wrapper" style={{ margin: '0 auto 24px auto', width: '120px', height: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="landing-icon-glow"></div>
            <div className="landing-icon" style={{ fontSize: '72px' }}>🧠</div>
          </div>
          
          <h1 style={{ fontSize: '64px', fontWeight: 800, marginBottom: '24px' }}>
            <span className="gradient-text-title">Logic</span> <span className="gradient-text">Coach</span>
          </h1>
          
          <p style={{ fontSize: '24px', color: 'var(--text-secondary)', marginBottom: '48px', lineHeight: 1.5 }}>
            Your personal AI-powered coding mentor. Master Data Structures, Algorithms, and System Design with real-time feedback.
          </p>
          
          <button className="premium-btn" onClick={onStart} style={{ padding: '20px 48px', fontSize: '20px' }}>
            Start Hacking for Free 🚀
          </button>
        </div>

        {/* Feature Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', maxWidth: '1000px', width: '100%', padding: '0 20px' }}>
          
          <div className="glass-panel" style={{ padding: '32px', textAlign: 'left' }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>🤖</div>
            <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginBottom: '12px' }}>AI Code Review</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Get instant feedback on your code. The AI coach points out edge cases, syntax errors, and logic flaws before you even run your tests.</p>
          </div>

          <div className="glass-panel" style={{ padding: '32px', textAlign: 'left' }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>⚡</div>
            <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginBottom: '12px' }}>Big-O Analyzer</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Not sure if your solution is optimal? Click a button to instantly analyze the Time and Space complexity of your exact code.</p>
          </div>

          <div className="glass-panel" style={{ padding: '32px', textAlign: 'left' }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>🏆</div>
            <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginBottom: '12px' }}>Global Leaderboards</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>Compete with developers worldwide. Build your streak, solve daily challenges, and climb to the top of the global ranks.</p>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
