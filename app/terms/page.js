
import React from 'react';
import Link from 'next/link';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Terms of Service | Logic Coach',
  description: 'Terms of Service for Logic Coach',
};

export default function TermsOfService() {
  return (
    <div className="landing-layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', padding: '0 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '60px', paddingBottom: '60px', flex: 1, width: '100%' }}>
        
        <div style={{ marginBottom: '40px' }}>
          <Link href="/" className="action-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
            ← Back to Home
          </Link>
        </div>

        <h1 style={{ fontSize: '36px', marginBottom: '24px', color: 'var(--text-primary)' }}>Terms of Service</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="glass-panel" style={{ padding: '32px', textAlign: 'left', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
          <div style={{ backgroundColor: 'var(--bg-surface-raised)', padding: '16px', borderRadius: '8px', borderLeft: '4px solid var(--accent)', marginBottom: '24px' }}>
            <strong>Disclaimer:</strong> This is a production-ready draft requiring legal review and has not been evaluated by an attorney.
          </div>

          <h2 style={{ color: 'var(--text-primary)', marginBottom: '16px', marginTop: '0' }}>1. Agreement to Terms & Account Types</h2>
          <p style={{ marginBottom: '24px' }}>
            By accessing Logic Coach (the "App"), you agree to these Terms. You may use the App by registering a permanent account (via Email/Google Auth) or by using Guest Mode. Guest Mode uses anonymous session tracking to save your progress, but if you clear your browser data or lose your session, your guest progress cannot be recovered.
          </p>

          <h2 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>2. AI Tutor & Learning Limitations</h2>
          <p style={{ marginBottom: '24px' }}>
            The core feature of this App is an AI programming tutor powered by the Google Gemini API. 
            <strong>AI responses are generated dynamically and may occasionally be inaccurate, hallucinate syntax, or provide suboptimal coding advice.</strong> 
            The App does not guarantee specific learning outcomes, job placement, or flawless code. You should independently verify the logic of any concepts discussed.
          </p>

          <h2 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>3. Fair Use and Rate Limiting</h2>
          <p style={{ marginBottom: '24px' }}>
            API requests are rate limited to ensure fair access to the AI tutor for all users. You may temporarily receive HTTP 429 (Too Many Requests) responses when your limits are exceeded. These rate limits are dynamically adjusted and may change over time to maintain service quality.
          </p>

          <h2 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>4. Abuse Prevention</h2>
          <p style={{ marginBottom: '12px' }}>
            To protect the integrity of the platform, you may not:
          </p>
          <ul style={{ marginBottom: '24px', paddingLeft: '20px' }}>
            <li>Automate requests to our APIs.</li>
            <li>Scrape content from the application.</li>
            <li>Attempt to bypass rate limits or security mechanisms.</li>
            <li>Abuse the platform or interfere with service availability.</li>
          </ul>
          <p style={{ marginBottom: '24px' }}>
            We may temporarily suspend or permanently terminate accounts involved in repeated or serious abuse.
          </p>

          <h2 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>5. User-Generated Content (Code & Chat)</h2>
          <p style={{ marginBottom: '12px' }}>
            You retain ownership of any original code you write in the App. However, by using the App, you grant us the necessary license to:
          </p>
          <ul style={{ marginBottom: '24px', paddingLeft: '20px' }}>
            <li>Store your created "Custom Problems" in our database so you can access them later.</li>
            <li>Transmit your chat prompts and code snippets to our third-party AI provider (Google Gemini) in real-time to generate your personalized tutoring experience.</li>
          </ul>
          <p style={{ marginBottom: '24px' }}>
            Note: We do not store your chat history or conversations on our servers. Once your session ends or you refresh the page, the chat context is deleted.
          </p>

          <h2 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>6. Disclaimer of Warranties</h2>
          <p style={{ marginBottom: '24px' }}>
            The materials and AI interactions on the App are provided on an 'as is' basis. Logic Coach makes no warranties, expressed or implied, 
            and hereby disclaims and negates all other warranties including implied warranties of merchantability or fitness for a particular purpose. 
            Because the AI generates responses probabilistically, we cannot guarantee the platform will be error-free or uninterrupted.
          </p>

          <h2 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>7. Account Data Deletion</h2>
          <p style={{ marginBottom: '24px' }}>
            We currently do not offer an automated way to delete your account or progress data from within the user interface. We are working to provide this functionality in future updates.
          </p>

        </div>
      </div>
      <Footer />
    </div>
  );
}
