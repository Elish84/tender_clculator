// auth.js (ES module) — לשים באותה תיקייה של index.html

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// הקונפיג שלך:
const firebaseConfig = {
  apiKey: "AIzaSyDqsz3WWVUdit-eFby6Ihe3oWRsDhVGmzE",
  authDomain: "tender-calculator-13d71.firebaseapp.com",
  projectId: "tender-calculator-13d71",
  storageBucket: "tender-calculator-13d71.firebasestorage.app",
  messagingSenderId: "621491656662",
  appId: "1:621491656662:web:ae6a9b959fd422eae87677",
  measurementId: "G-WSFJXTC4Y1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export function requireAuth({ redirectTo = "login.html", allowlist = null } = {}) {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        window.location.replace(redirectTo);
        return;
      }

      // אופציונלי: allowlist לפי אימייל
      if (Array.isArray(allowlist) && allowlist.length) {
        const email = (user.email || "").toLowerCase();
        const ok = allowlist.map(x => String(x).toLowerCase()).includes(email);
        if (!ok) {
          await signOut(auth);
          window.location.replace(redirectTo + "?err=not_allowed");
          return;
        }
      }

      resolve(user);
    });
  });
}

export async function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function logout() {
  return signOut(auth);
}
