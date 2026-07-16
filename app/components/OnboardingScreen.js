import React, { useState } from 'react';
import { db } from '../../lib/firebase';
import { doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';

export default function OnboardingScreen({ user, onComplete }) {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [interest, setInterest] = useState("");
  const [language, setLanguage] = useState("");
  const [goal, setGoal] = useState("");
  
  const [loading, setLoading] = useState(false);

  const handleNext = () => setStep(prev => prev + 1);
  const handlePrev = () => setStep(prev => prev - 1);

  const finishOnboarding = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "user_progress", user.uid);
      const docSnap = await getDoc(docRef);
      const roadmapData = {
        role,
        interest,
        language,
        goal,
        onboardingCompleted: true,
      };

      if (docSnap.exists()) {
        await updateDoc(docRef, { roadmap: roadmapData, onboardingCompleted: true });
      } else {
        await setDoc(docRef, { roadmap: roadmapData, onboardingCompleted: true, totalAttempted: 0, streak: 0 });
      }
      onComplete(roadmapData);
    } catch (error) {
      console.error("Error saving onboarding data", error);
      alert("Failed to save your preferences. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const displayName = user.displayName ? user.displayName.split(" ")[0] : "there";

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="onboarding-fade-in" style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>Welcome {displayName},</h1>
            <h2 style={{ fontSize: '24px', color: 'var(--accent-orange)' }}>Chef here!</h2>
            <p style={{ marginTop: '24px', fontSize: '18px', color: 'var(--text-secondary)' }}>
              Let&apos;s get to know you so we can personalize your learning journey.
            </p>
            <div style={{ marginTop: '48px' }}>
              <button className="start-btn" onClick={handleNext}>Let&apos;s Start</button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="onboarding-fade-in">
            <h2 style={{ fontSize: '28px', marginBottom: '24px', textAlign: 'center' }}>What describes you best?</h2>
            <div className="onboarding-options">
              {['Student', 'Faculty', 'Working Professional', 'Others'].map(opt => (
                <button 
                  key={opt}
                  className={`onboarding-option-btn ${role === opt ? 'selected' : ''}`}
                  onClick={() => setRole(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
            <div className="onboarding-actions">
              <button className="login-btn-ghost" onClick={handlePrev}>Back</button>
              <button className="start-btn-small" disabled={!role} onClick={handleNext}>Continue</button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="onboarding-fade-in" style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Let’s build a roadmap for you,</h1>
            <h2 style={{ fontSize: '24px', color: 'var(--text-secondary)' }}>in a few quick questions...</h2>
            <div style={{ marginTop: '48px' }}>
              <button className="start-btn" onClick={handleNext}>Next</button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="onboarding-fade-in">
            <h2 style={{ fontSize: '28px', marginBottom: '24px', textAlign: 'center' }}>What are you interested in?</h2>
            <div className="onboarding-options grid-cols-2">
              {['Programming Languages', 'Data Structures & Algorithms', 'Web Development', 'Data Analytics', 'Competitive Programming'].map(opt => (
                <button 
                  key={opt}
                  className={`onboarding-option-btn ${interest === opt ? 'selected' : ''}`}
                  onClick={() => setInterest(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
            <div className="onboarding-actions">
              <button className="login-btn-ghost" onClick={handlePrev}>Back</button>
              <button className="start-btn-small" disabled={!interest} onClick={handleNext}>Next</button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="onboarding-fade-in">
            <h2 style={{ fontSize: '28px', marginBottom: '24px', textAlign: 'center' }}>Which programming language do you want to learn?</h2>
            <div className="onboarding-options grid-cols-2">
              {[
                { name: 'Python', desc: '150k Learners' }, 
                { name: 'Java', desc: '110k Learners' }, 
                { name: 'C', desc: '200k Learners' }, 
                { name: 'C++', desc: '421k Learners' }, 
                { name: 'JavaScript', desc: '11k Learners' },
                { name: 'C#', desc: '' }
              ].map(opt => (
                <button 
                  key={opt.name}
                  className={`onboarding-option-btn ${language === opt.name ? 'selected' : ''}`}
                  onClick={() => setLanguage(opt.name)}
                >
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{opt.name}</div>
                  {opt.desc && <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>{opt.desc}</div>}
                </button>
              ))}
            </div>
            <div className="onboarding-actions">
              <button className="login-btn-ghost" onClick={handlePrev}>Back</button>
              <button className="start-btn-small" disabled={!language} onClick={handleNext}>Next</button>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="onboarding-fade-in">
            <h2 style={{ fontSize: '28px', marginBottom: '24px', textAlign: 'center' }}>What is your goal for learning {language}?</h2>
            <div className="onboarding-options">
              {[
                { title: 'Logic Building', desc: 'Learn to solve problems step by step' },
                { title: 'Project Building', desc: 'Build real-world applications' }
              ].map(opt => (
                <button 
                  key={opt.title}
                  className={`onboarding-option-btn ${goal === opt.title ? 'selected' : ''}`}
                  onClick={() => setGoal(opt.title)}
                >
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{opt.title}</div>
                  <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>{opt.desc}</div>
                </button>
              ))}
            </div>
            <div className="onboarding-actions">
              <button className="login-btn-ghost" onClick={handlePrev}>Back</button>
              <button className="start-btn" disabled={!goal || loading} onClick={finishOnboarding}>
                {loading ? "Generating Roadmap..." : "Generate Roadmap"}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="onboarding-layout">
      <div className="landing-bg-orb orb-1"></div>
      <div className="landing-bg-orb orb-2"></div>
      
      <div className="onboarding-container">
        <div className="onboarding-card">
           <div className="onboarding-progress-bar">
             <div className="onboarding-progress-fill" style={{ width: `${(step / 6) * 100}%` }}></div>
           </div>
           <div className="onboarding-content">
             {renderStepContent()}
           </div>
        </div>
      </div>
    </div>
  );
}
