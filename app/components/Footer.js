import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <div className="footer-links">
          <Link href="/privacy" className="footer-link">Privacy Policy</Link>
          <span className="footer-separator">•</span>
          <Link href="/terms" className="footer-link">Terms of Service</Link>
        </div>
        <div className="footer-credit" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Built with ❤️ by <strong>Vaibhav Bhoyate</strong>
        </div>
        <div className="footer-socials" style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
          <a href="https://github.com/vaibhavv-labs" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
          <a href="https://linkedin.com/in/vaibhav-bhoyate" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
          <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="footer-link">WhatsApp</a>
        </div>
        <div className="footer-copyright" style={{ fontSize: '12px', marginTop: '8px', color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} Logic Coach. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
