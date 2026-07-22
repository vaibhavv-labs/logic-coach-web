import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ 
      borderTop: '1px solid var(--border-light)', 
      padding: '40px 20px', 
      marginTop: 'auto', 
      backgroundColor: 'transparent',
      width: '100%',
      fontFamily: 'var(--font)'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '24px' 
      }}>
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/privacy" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>Privacy</Link>
          <Link href="/terms" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>Terms</Link>
          <a href="https://github.com/vaibhavv-labs" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>GitHub</a>
          <a href="https://linkedin.com/in/vaibhav-bhoyate" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}>LinkedIn</a>
        </div>
        
        <div style={{ color: 'var(--text-muted)', fontSize: '13px', textAlign: 'center', letterSpacing: '0.5px' }}>
          © {new Date().getFullYear()} Logic Coach. Designed & Developed by Vaibhav Bhoyate.
        </div>
      </div>
    </footer>
  );
}
