import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import toast from 'react-hot-toast';

export default function FeedbackDashboard({ user }) {
  const [category, setCategory] = useState("Suggestion");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!details.trim()) {
      toast.error("Please provide some details for your feedback.");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "feedbacks"), {
        uid: user?.uid || "anonymous",
        email: user?.email || "anonymous",
        category,
        details,
        status: "new",
        createdAt: serverTimestamp()
      });
      toast.success("Feedback submitted successfully! Thank you.");
      setDetails("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: 'clamp(20px, 5vw, 40px)', maxWidth: '800px', margin: '0 auto', width: '100%', height: '100%', overflowY: 'auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>Feedback</h1>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>Help us improve Logic Coach by sharing your thoughts, bug reports, and suggestions.</p>
      </div>

      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '32px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Category</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              style={{ padding: '12px 16px', background: 'var(--bg-base)', color: 'var(--text-primary)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '16px' }}
            >
              <option value="Bug">🐛 Bug Report</option>
              <option value="Suggestion">💡 Feature Suggestion</option>
              <option value="Content">📝 Content / Problem Issue</option>
              <option value="Other">💬 Other</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Details</label>
            <textarea 
              value={details} 
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Please describe the issue or suggestion in detail..."
              rows={6}
              style={{ padding: '16px', background: 'var(--bg-base)', color: 'var(--text-primary)', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '16px', resize: 'vertical', fontFamily: 'inherit' }}
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="start-btn"
            style={{ width: '100%', padding: '16px', fontSize: '16px', marginTop: '8px', opacity: isSubmitting ? 0.7 : 1 }}
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
}
