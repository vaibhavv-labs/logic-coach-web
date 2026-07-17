import React from 'react';

export default function LandingPage({ onStart }) {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0d1117',
      color: '#c9d1d9',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '80px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Floating Symbols */}
      <div className="splash-symbol" style={{ left: '10%', animationDuration: '15s', fontSize: '32px' }}>{`{ }`}</div>
      <div className="splash-symbol" style={{ left: '25%', animationDuration: '18s', animationDelay: '2s', fontSize: '48px' }}>∑</div>
      <div className="splash-symbol" style={{ left: '40%', animationDuration: '22s', animationDelay: '1s', fontSize: '28px' }}>λ</div>
      <div className="splash-symbol" style={{ left: '60%', animationDuration: '16s', animationDelay: '3s', fontSize: '40px' }}>{`< />`}</div>
      <div className="splash-symbol" style={{ left: '75%', animationDuration: '20s', animationDelay: '0.5s', fontSize: '36px' }}>O(n)</div>
      <div className="splash-symbol" style={{ left: '85%', animationDuration: '19s', animationDelay: '4s', fontSize: '50px' }}>∀</div>
      <div className="splash-symbol" style={{ left: '50%', animationDuration: '25s', animationDelay: '5s', fontSize: '32px' }}>∃</div>

      {/* Hero Section */}
      <div style={{ maxWidth: '800px', textAlign: 'center', marginBottom: '80px' }}>
        <div style={{ fontSize: '72px', marginBottom: '24px' }}>🧠</div>
        <h1 style={{ 
          fontSize: '64px', 
          fontWeight: 800, 
          color: '#ffffff', 
          marginBottom: '24px',
          background: 'linear-gradient(to right, #10b981, #3b82f6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Logic Coach
        </h1>
        <p style={{ fontSize: '24px', color: '#8b949e', marginBottom: '48px', lineHeight: 1.5 }}>
          Your personal AI-powered coding mentor. Master Data Structures, Algorithms, and System Design with real-time feedback.
        </p>
        <button 
          onClick={onStart}
          style={{
            background: 'linear-gradient(to right, #10b981, #059669)',
            color: '#fff',
            border: 'none',
            padding: '20px 48px',
            fontSize: '20px',
            fontWeight: 'bold',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.2)',
            transition: 'transform 0.2s'
          }}
          onMouseOver={e => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={e => e.target.style.transform = 'translateY(0)'}
        >
          Start Hacking for Free
        </button>
      </div>

      {/* Feature Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', maxWidth: '1000px', width: '100%' }}>
        
        <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '32px' }}>
          <div style={{ fontSize: '32px', marginBottom: '16px' }}>🤖</div>
          <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '12px' }}>AI Code Review</h3>
          <p style={{ color: '#8b949e', lineHeight: 1.5 }}>Get instant feedback on your code. The AI coach points out edge cases, syntax errors, and logic flaws before you even run your tests.</p>
        </div>

        <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '32px' }}>
          <div style={{ fontSize: '32px', marginBottom: '16px' }}>⚡</div>
          <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '12px' }}>Big-O Analyzer</h3>
          <p style={{ color: '#8b949e', lineHeight: 1.5 }}>Not sure if your solution is optimal? Click a button to instantly analyze the Time and Space complexity of your exact code.</p>
        </div>

        <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '12px', padding: '32px' }}>
          <div style={{ fontSize: '32px', marginBottom: '16px' }}>🏆</div>
          <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '12px' }}>Global Leaderboards</h3>
          <p style={{ color: '#8b949e', lineHeight: 1.5 }}>Compete with developers worldwide. Build your streak, solve daily challenges, and climb to the top of the global ranks.</p>
        </div>

      </div>
    </div>
  );
}
