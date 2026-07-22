import { useState } from "react";
import { db } from "../../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import toast from 'react-hot-toast';
import { t } from '../data/translations';

export default function CustomProblemModal({ onClose, onSubmit, user, language = "English" }) {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim() || !user) return;

    try {
      setLoading(true);
      
      const problemData = {
        title: "Custom Problem",
        description: description,
        category: "User Submitted",
        difficulty: "Custom",
        uid: user.uid,
        testCases: [],
        createdAt: serverTimestamp()
      };

      // Store custom problem in Firestore
      const docRef = await addDoc(collection(db, "custom_problems"), problemData);
      
      const newProblem = {
        id: docRef.id,
        ...problemData,
        icon: "✏️"
      };

      toast.success(t("toast_problem_submitted", language));
      onSubmit(newProblem);
      onClose();
    } catch (error) {
      console.error("Error adding custom problem: ", error);
      if (error.code === 'permission-denied') {
         toast.error(t("toast_auth_blocked", language));
      } else {
         toast.error(t("toast_problem_failed", language));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        <h2>Submit Your Own Problem</h2>
        <p>Stuck on an assignment or personal project? Paste it here and the Logic Coach will guide you!</p>
        
        <form onSubmit={handleSubmit}>
          <textarea
            className="custom-problem-textarea"
            placeholder="E.g., Write a program to reverse an array without using built-in functions..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            required
          />
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading || !description.trim()}>
              {loading ? "Submitting..." : "Start Solving"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
