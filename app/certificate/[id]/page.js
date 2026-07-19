"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../../lib/firebase";
import Link from "next/link";
import { useParams } from "next/navigation";

import EmptyState from "../../components/EmptyState";

export default function CertificatePage() {
  const params = useParams();
  const userId = params?.id;
  
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
          if (currentUser?.isAnonymous) {
            window.location.href = "/";
            return;
          }
          const progressRef = doc(db, "user_progress", userId);
          const profileRef = doc(db, "user_profiles", userId);
          
          const [progressSnap, profileSnap] = await Promise.all([
          getDoc(progressRef),
          getDoc(profileRef)
        ]);
        
          if (progressSnap.exists()) {
            const progressData = progressSnap.data();
            const profileData = profileSnap.exists() ? profileSnap.data() : (progressData.roadmap || null);
            setUserData({
              ...progressData,
              roadmap: profileData
            });
          } else {
            setError("empty_cert_desc");
          }
          setLoading(false);
        });
        
        // Cleanup listener on unmount
        return () => unsubscribe();
      } catch (err) {
        console.error("Error fetching certificate:", err);
        setError("empty_cert_desc");
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return (
      <div style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)' }}>
        <h2 style={{ color: 'var(--text-secondary)' }}>Verifying Certificate... ⏳</h2>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)' }}>
        <EmptyState 
          icon="📜" 
          title="empty_cert_title" 
          description={error || "empty_cert_desc"} 
          actionButton={
            <Link href="/" className="start-btn" style={{ textDecoration: 'none' }}>
              Return Home
            </Link>
          }
        />
      </div>
    );
  }

  const username = userData.roadmap?.username || "A Dedicated Developer";
  const language = userData.roadmap?.language || "Programming";
  const totalSolved = userData.totalAttempted || 0;
  const issueDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div style={{ 
      minHeight: '100dvh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'var(--bg-base)',
      padding: '24px'
    }}>
      
      <div style={{
        background: 'var(--bg-surface)',
        border: '8px solid var(--accent)',
        borderRadius: '16px',
        padding: '60px',
        maxWidth: '800px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative elements */}
        <div style={{ position: 'absolute', top: -50, left: -50, width: 150, height: 150, background: 'var(--accent-light)', borderRadius: '50%', opacity: 0.1 }}></div>
        <div style={{ position: 'absolute', bottom: -50, right: -50, width: 150, height: 150, background: 'var(--accent-light)', borderRadius: '50%', opacity: 0.1 }}></div>

        <h3 style={{ color: 'var(--text-secondary)', fontSize: '20px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '40px' }}>
          Certificate of Completion
        </h3>
        
        <h1 style={{ color: 'var(--text-primary)', fontSize: '48px', margin: '0 0 16px 0', fontFamily: 'serif' }}>
          {username}
        </h1>
        
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '500px', margin: '0 auto 40px auto', lineHeight: '1.6' }}>
          Has successfully completed the comprehensive Logic Coach Curriculum, demonstrating mastery in Data Structures, Algorithms, and <strong>{language}</strong> syntax logic.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '40px' }}>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--accent)' }}>{totalSolved}</div>
            <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Problems Solved</div>
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--accent)' }}>{userData.streak || 0}</div>
            <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Highest Streak</div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '2px solid var(--border-light)', paddingTop: '24px', marginTop: '40px' }}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Date of Verification</div>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)' }}>{issueDate}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--accent)' }}>Logic Coach</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Verified Digital Credential</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '32px', display: 'flex', gap: '16px' }}>
        <button 
          onClick={() => window.print()}
          style={{ background: 'var(--accent)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          🖨️ Print / Save PDF
        </button>
        <Link 
          href="/"
          style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-light)', padding: '12px 24px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'none' }}
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
