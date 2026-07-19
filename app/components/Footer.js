import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link href="/privacy" className="footer-link">Privacy Policy</Link>
          <span className="footer-separator">•</span>
          <Link href="/terms" className="footer-link">Terms of Service</Link>
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()} Logic Coach. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
