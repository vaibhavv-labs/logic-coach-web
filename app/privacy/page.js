
import React from 'react';
import Link from 'next/link';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Privacy Policy | Logic Coach',
  description: 'Privacy Policy for Logic Coach',
};

export default function PrivacyPolicy() {
  return (
    <div className="landing-layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', padding: '0 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '60px', paddingBottom: '60px', flex: 1, width: '100%' }}>
        
        <div style={{ marginBottom: '40px' }}>
          <Link href="/" className="action-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
            ← Back to Home
          </Link>
        </div>

        <h1 style={{ fontSize: '36px', marginBottom: '24px', color: 'var(--text-primary)' }}>Privacy Policy</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="glass-panel" style={{ padding: '32px', textAlign: 'left', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
          <div style={{ backgroundColor: 'var(--bg-surface-raised)', padding: '16px', borderRadius: '8px', borderLeft: '4px solid var(--accent)', marginBottom: '24px' }}>
            <strong>Disclaimer:</strong> This is a production-ready draft requiring legal review and has not been evaluated by an attorney.
          </div>

          <h2 style={{ color: 'var(--text-primary)', marginBottom: '16px', marginTop: '0' }}>1. Information We Collect & Store</h2>
          <p style={{ marginBottom: '12px' }}>We only collect the data necessary to provide and improve the Logic Coach experience:</p>
          <ul style={{ marginBottom: '24px', paddingLeft: '20px' }}>
            <li><strong>Account Data:</strong> If you sign in, we use Firebase Authentication which stores your email address and display name. If you use Guest Mode, Firebase creates an anonymous identifier for you without requiring personal details.</li>
            <li><strong>Progress & Usage Data:</strong> We store your learning progress (e.g., streak, total problems attempted, custom problems created, and level counts) in our database (Firebase Firestore) linked to your User ID or Guest ID.</li>
            <li><strong>Local Storage:</strong> We use local storage on your device strictly for interface preferences: your chosen theme (light/dark mode), preferred language, and onboarding completion status. We do not use third-party tracking cookies.</li>
            <li><strong>Network & Security Data:</strong> We temporarily process IP addresses strictly for security, abuse prevention, and API rate limiting. This data is not permanently stored or linked to your account.</li>
          </ul>

          <h2 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>2. AI Interactions & Chat Logs</h2>
          <p style={{ marginBottom: '24px' }}>
            Logic Coach relies on third-party AI services (Google Gemini API) to generate problems and simulate a Socratic tutor. 
            When you type a message or submit code, that specific text is sent to the AI to generate a response. 
            <strong>We do not save your chat history in our database.</strong> Chat messages exist only temporarily in your browser during an active session and are lost if you refresh the page. 
            No personally identifiable account information (like your email or name) is transmitted to the AI provider.
          </p>

          <h2 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>3. Third-Party Services</h2>
          <p style={{ marginBottom: '12px' }}>We utilize the following third-party infrastructure to run the App:</p>
          <ul style={{ marginBottom: '24px', paddingLeft: '20px' }}>
            <li><strong>Google Firebase:</strong> Used for authentication (Auth), database storage (Firestore), analytics (Firebase Analytics, if supported by your browser), and hosting.</li>
            <li><strong>Google Gemini API:</strong> Used to generate the Socratic AI responses and coding problems.</li>
            <li><strong>Sentry:</strong> Used for error tracking and crash reporting. We do not attach your user identity (email/name) to crash reports.</li>
            <li><strong>Upstash Redis:</strong> Used as infrastructure to temporarily process data (such as IP addresses) required for rate limiting and abuse prevention.</li>
          </ul>

          <h2 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>4. Data Deletion</h2>
          <p style={{ marginBottom: '24px' }}>
            Currently, there is no automated self-service mechanism within the App to delete your account or wipe your progress data. 
            We are working to add this functionality in the future.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
