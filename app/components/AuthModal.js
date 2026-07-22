import { useState } from "react";
import { auth, googleProvider } from "../../lib/firebase";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInAnonymously } from "firebase/auth";

export default function AuthModal({ onClose, onSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError("");
      await signInWithPopup(auth, googleProvider);
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestSignIn = async () => {
    try {
      setLoading(true);
      setError("");
      await signInAnonymously(auth);
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    try {
      if (!isLogin && password !== confirmPassword) {
        setError("Passwords do not match. Please try again.");
        return;
      }

      setLoading(true);
      setError("");
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onSuccess();
    } catch (err) {
      const errorMessage = err.message || "";
      if (err.code === 'auth/invalid-credential' || errorMessage.includes('invalid-credential') || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError("Invalid email or password. If you don't have an account, click 'Sign Up' below.");
      } else if (err.code === 'auth/email-already-in-use' || errorMessage.includes('email-already-in-use')) {
        setError("This email is already registered. Please Sign In instead.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content auth-modal">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
        <p className="auth-subtitle">
          {isLogin 
            ? "Sign in to save your progress and unlock unlimited problems." 
            : "Create an account to track your progress and compete on leaderboards."}
        </p>
        
        {error && <div className="auth-error">{error}</div>}

        <button 
          className="google-btn" 
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo" />
          Continue with Google
        </button>

        <button 
          className="google-btn" 
          style={{ marginTop: '10px', background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-light)' }}
          onClick={handleGuestSignIn}
          disabled={loading}
        >
          👤 Continue as Guest
        </button>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <form onSubmit={handleEmailAuth} className="auth-form">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
          )}
          <button type="submit" className="email-btn" disabled={loading}>
            {loading ? "Please wait..." : (isLogin ? "Sign In" : "Sign Up")}
          </button>
        </form>

        <p className="auth-switch">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button type="button" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}
