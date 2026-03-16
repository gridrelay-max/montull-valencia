import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

let db: Database | null = null;
let firebaseError: string | null = null;

try {
  const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  if (firebaseConfig.databaseURL) {
    db = getDatabase(app);
  } else {
    firebaseError = "NEXT_PUBLIC_FIREBASE_DATABASE_URL no está configurada";
  }
} catch (e: any) {
  firebaseError = e?.message || "Error desconocido al conectar con Firebase";
  console.error("Firebase init error:", e);
}

export { db, firebaseError };
