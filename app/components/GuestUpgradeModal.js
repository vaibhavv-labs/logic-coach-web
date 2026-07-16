import { useState } from "react";
import { auth, googleProvider } from "../../lib/firebase";
import { linkWithPopup } from "firebase/auth";

export default function GuestUpgradeModal({ onClose, onSuccess }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLinkGoogle = async () => {
    try {
      setLoading(true);
      setError("");
      await linkWithPopup(auth.currentUser, googleProvider);
      onSuccess();
    } catch (err) {
      if (err.code === 'auth/credential-already-in-use') {
        setError("This Google account is already linked to another user. Please sign in with a different account.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content auth-modal" style={{ textAlign: 'center' }}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>You're on fire! 🔥</h2>
        <p className="auth-subtitle" style={{ marginBottom: '24px' }}>
          You've solved 3 problems! If you leave now, your progress will be lost forever. 
          Save your anonymous account by linking a Google account.
        </p>
        
        {error && <div className="auth-error">{error}</div>}

        <button 
          className="google-btn" 
          onClick={handleLinkGoogle}
          disabled={loading}
          style={{ background: 'var(--accent-orange)', color: '#fff', border: 'none', justifyContent: 'center' }}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo" style={{ background: '#fff', borderRadius: '50%', padding: '2px' }} />
          {loading ? "Linking..." : "Save Progress with Google"}
        </button>

        <button 
          onClick={onClose}
          style={{ marginTop: '16px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '14px', textDecoration: 'underline' }}
        >
          No thanks, I want to lose my progress
        </button>
      </div>
    </div>
  );
}
