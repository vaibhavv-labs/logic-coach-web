"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { t } from './data/translations';

export default function NotFound() {
  const [language, setLanguage] = useState("English");

  useEffect(() => {
    // If we have a user preference stored locally, use it
    const storedLang = localStorage.getItem("preferred_language");
    if (storedLang) {
      setLanguage(storedLang);
    }
  }, []);

  return (
    <div style={{
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-surface-raised)',
      color: 'var(--text-primary)',
      textAlign: 'center',
      padding: '24px'
    }}>
      <div style={{
        position: 'relative',
        marginBottom: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Background glowing effect */}
        <div style={{
          position: 'absolute',
          width: '150px',
          height: '150px',
          background: 'var(--accent)',
          filter: 'blur(80px)',
          opacity: '0.4',
          borderRadius: '50%',
          zIndex: 0
        }} />
        
        {/* Disconnected Node SVG */}
        <svg 
          width="120" 
          height="120" 
          viewBox="0 0 100 100" 
          fill="none" 
          stroke="var(--accent)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(0 0 10px rgba(255,107,0,0.5))' }}
        >
          <circle cx="20" cy="50" r="10" />
          <circle cx="80" cy="50" r="10" />
          
          {/* Broken connection line */}
          <path d="M 30 50 L 45 50" strokeDasharray="5 5" />
          <path d="M 55 50 L 70 50" strokeDasharray="5 5" />
          
          <path d="M 45 40 L 55 60" stroke="var(--text-secondary)" strokeWidth="6" />
        </svg>
      </div>

      <h2 style={{ fontSize: '2rem', marginBottom: '16px', fontWeight: '600' }}>
        {t("404_title", language)}
      </h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', marginBottom: '40px', lineHeight: '1.6' }}>
        {t("404_desc", language)}
      </p>

      <Link href="/" style={{
        background: 'var(--accent)',
        color: '#000',
        padding: '16px 32px',
        borderRadius: 'var(--radius-lg)',
        fontWeight: '600',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'transform 0.2s',
        boxShadow: '0 4px 14px rgba(255,107,0,0.3)'
      }}>
        <span>←</span> {t("404_btn", language)}
      </Link>
    </div>
  );
}
