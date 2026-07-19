import React from 'react';
import { t } from '../data/translations';

export default function EmptyState({ icon = "🌟", title = "No data found", description = "We couldn't find anything to show here.", language = "English", actionButton = null }) {
  const translatedTitle = t(title, language) === title && title !== "No data found" ? title : t(title, language);
  const translatedDesc = t(description, language) === description && description !== "We couldn't find anything to show here." ? description : t(description, language);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
      textAlign: 'center',
      background: 'var(--bg-surface)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-light)',
      margin: '16px 0'
    }}>
      <div style={{
        fontSize: '48px',
        marginBottom: '16px',
        background: 'var(--bg-surface-raised)',
        width: '80px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        boxShadow: '0 0 20px var(--accent-light)',
        border: '1px solid var(--accent)'
      }}>
        {icon}
      </div>
      <h3 style={{ 
        margin: '0 0 8px 0',
        color: 'var(--text-primary)',
        fontSize: '1.25rem',
        fontWeight: '600'
      }}>
        {translatedTitle}
      </h3>
      <p style={{
        margin: 0,
        color: 'var(--text-secondary)',
        maxWidth: '300px',
        lineHeight: 1.5
      }}>
        {translatedDesc}
      </p>
      {actionButton && (
        <div style={{ marginTop: '24px' }}>
          {actionButton}
        </div>
      )}
    </div>
  );
}
