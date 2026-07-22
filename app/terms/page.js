export default function TermsOfService() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'var(--font)' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '24px' }}>Terms of Service</h1>
      <p style={{ marginBottom: '16px' }}>Last updated: {new Date().toLocaleDateString()}</p>
      
      <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>1. Acceptance of Terms</h2>
      <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
        By accessing and using Logic Coach, you accept and agree to be bound by the terms and provision of this agreement.
      </p>

      <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>2. Use of Service</h2>
      <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
        Logic Coach provides interactive programming environments and AI feedback. The service is provided "as is". We reserve the right to modify or discontinue the service at any time without notice.
      </p>

      <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>3. User Conduct</h2>
      <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
        You agree not to misuse the code execution engine or attempt to compromise the security of the application. Malicious code execution or abuse of the AI API may result in account termination.
      </p>

      <h2 style={{ fontSize: '24px', marginTop: '32px', marginBottom: '16px' }}>4. Disclaimer of Warranties</h2>
      <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
        The developer makes no warranties regarding the accuracy of the AI responses or the uptime of the code execution APIs.
      </p>
    </div>
  );
}
