require('dotenv').config({ path: '.env.local' });
const { initializeApp } = require('firebase/app');
const { getAuth, signInAnonymously, deleteUser } = require('firebase/auth');
const { getFirestore, collection, getDocs, doc, setDoc, query, orderBy, limit } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function runSanityCheck() {
  console.log("Starting Production Sanity Check...");
  let user;
  try {
    // 1. Log in as a test user
    console.log("\n[1] Logging in anonymously (test user)...");
    const userCredential = await signInAnonymously(auth);
    user = userCredential.user;
    console.log(`✅ Logged in successfully. UID: ${user.uid}`);

    // 2. Confirm Leaderboard loads correctly (requires read access to user_progress)
    console.log("\n[2] Fetching leaderboard (requires public read on user_progress)...");
    const leaderboardQuery = query(collection(db, 'user_progress'), orderBy('totalAttempted', 'desc'), limit(5));
    const leaderboardSnapshot = await getDocs(leaderboardQuery);
    console.log(`✅ Leaderboard fetched successfully. Got ${leaderboardSnapshot.size} entries.`);

    // 3. Confirm we can save our own progress normally
    console.log("\n[3] Saving test user's progress...");
    const userDocRef = doc(db, 'user_progress', user.uid);
    await setDoc(userDocRef, {
      roadmap: { username: 'SanityTestUser', onboardingCompleted: true },
      totalAttempted: 1,
      streak: 1
    });
    console.log("✅ Progress saved successfully to own document.");

    // (Optional) Clean up our test user's progress is not strictly needed or possible if we blocked delete, 
    // but the rules say delete is false, so we leave the document. We will delete the auth user.
    
    console.log("\n🎉 ALL SANITY CHECKS PASSED!");
  } catch (error) {
    console.error("\n❌ SANITY CHECK FAILED:", error.message);
  } finally {
    if (user) {
      console.log("\nCleaning up test user auth...");
      await deleteUser(user).catch(e => console.log("Failed to delete user:", e.message));
    }
    process.exit(0);
  }
}

runSanityCheck();
