export default function PrivacyPolicy() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'var(--font)' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '24px' }}>Privacy Policy</h1>
      <p style={{ marginBottom: '16px' }}>Last updated: {new Date().toLocaleDateString()}</p>
      
      <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>1. Information We Collect</h2>
      <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
        When you sign in using Google or create an account, we collect your email address, display name, and unique user ID. We also collect data regarding your learning progress, such as solved problems and preferred languages.
      </p>

      <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>2. How We Use Your Information</h2>
      <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
        We use this information to personalize your learning experience, maintain your streak and leaderboard ranking, and save your code execution history. We do not sell your personal data to third parties.
      </p>

      <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>3. Data Security</h2>
      <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
        Your data is securely stored using Firebase infrastructure. Authentication is handled entirely by Google Identity Services.
      </p>

      <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>4. Contact Us</h2>
      <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
        If you have any questions about this Privacy Policy, please contact the developer via GitHub.
      </p>
    </div>
  );
}
