import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDummyKeyForTestingLogicCoachWebAndApp",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo-no-project.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-no-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo-no-project.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1234567890:web:1234567890abcdef"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Connect to emulators if running locally on client
if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
  // Use a global flag to prevent re-connecting during fast refresh/hot reloading
  if (!globalThis._firebaseEmulatorsConnected) {
    connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
    connectFirestoreEmulator(db, "127.0.0.1", 8080);
    globalThis._firebaseEmulatorsConnected = true;
    console.log("Connected to Firebase Auth & Firestore local emulators.");
  }
}

// Initialize Analytics only on the client-side, and only in non-emulator/non-demo environments
let analytics = null;
if (typeof window !== "undefined") {
  const isEmulator = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || firebaseConfig.projectId?.startsWith("demo-");
  if (!isEmulator) {
    isSupported().then((yes) => yes && (analytics = getAnalytics(app)));
  }
}

export { app, auth, db, googleProvider, analytics };
