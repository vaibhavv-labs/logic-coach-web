import React from 'react';

export default function SettingsDashboard({ language, setLanguage, theme, toggleTheme, user, onSignOut }) {
  return (
    <div style={{ padding: 'clamp(20px, 5vw, 40px)', maxWidth: '800px', margin: '0 auto', width: '100%', height: '100%', overflowY: 'auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>Settings</h1>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>Manage your preferences and account settings.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* App Preferences */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px', color: 'var(--text-primary)' }}>App Preferences</h2>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Theme Appearance</div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Toggle between light and dark mode</div>
            </div>
            <button 
              onClick={toggleTheme}
              style={{ padding: '8px 16px', background: 'var(--bg-base)', color: 'var(--text-primary)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer' }}
            >
              {theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Default Programming Language</div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Language used for logic coaching</div>
            </div>
            <select 
              value={language || 'Python'} 
              onChange={(e) => setLanguage && setLanguage(e.target.value)}
              style={{ padding: '8px 16px', background: 'var(--bg-base)', color: 'var(--text-primary)', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer' }}
            >
              <option value="Python">Python</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Java">Java</option>
              <option value="C++">C++</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Push Notifications</div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Receive reminders for your streak</div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input type="checkbox" style={{ marginRight: '8px', width: '18px', height: '18px' }} defaultChecked />
              <span style={{ color: 'var(--text-primary)' }}>Enabled</span>
            </label>
          </div>
        </div>

        {/* Account Settings */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px', color: 'var(--text-primary)' }}>Account Settings</h2>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Logged in as</div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{user?.email || "Anonymous"}</div>
            </div>
            {user && (
              <button 
                onClick={onSignOut}
                style={{ padding: '8px 16px', background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
              >
                Sign Out
              </button>
            )}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600, color: '#991b1b' }}>Danger Zone</div>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Permanently delete your account</div>
            </div>
            <button 
              onClick={() => alert("Contact support to delete account.")}
              style={{ padding: '8px 16px', background: 'transparent', color: '#991b1b', border: '1px solid #991b1b', borderRadius: '8px', cursor: 'pointer' }}
            >
              Delete Account
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
