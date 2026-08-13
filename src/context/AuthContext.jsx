import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "../firebase/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check for Firestore admin login session stored in localStorage first
    const savedDbUser = localStorage.getItem("hotel_raks_db_user");
    if (savedDbUser) {
      try {
        setCurrentUser(JSON.parse(savedDbUser));
        setLoading(false);
      } catch (e) {
        localStorage.removeItem("hotel_raks_db_user");
      }
    }

    if (!isFirebaseConfigured || !auth) {
      // No Firebase project connected yet -- look for a mock session
      const savedMockUser =
        localStorage.getItem("pandurang_inn_mock_user") ||
        localStorage.getItem("hotel_raks_mock_user");
      if (savedMockUser) {
        try {
          setCurrentUser(JSON.parse(savedMockUser));
        } catch (e) {
          localStorage.removeItem("pandurang_inn_mock_user");
          localStorage.removeItem("hotel_raks_mock_user");
        }
      }
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // If we don't have a db-based user logged in, use the auth user
      if (user) {
        setCurrentUser(user);
      } else if (!localStorage.getItem("hotel_raks_db_user")) {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    if (!isFirebaseConfigured || !auth) {
      // Dev bypass mode
      if (
        (email === "admin@panduranginn.com" || email === "admin@hotelraks.com") &&
        password === "admin123"
      ) {
        const mockUser = {
          email,
          uid: "mock-admin-id",
          displayName: "Pandurang Inn Admin (Demo)",
          isMock: true,
        };
        setCurrentUser(mockUser);
        localStorage.setItem("hotel_raks_mock_user", JSON.stringify(mockUser));
        return mockUser;
      }
      throw new Error(
        "Invalid admin credentials. Use admin@panduranginn.com and admin123 in demo mode."
      );
    }

    // 1. Check Firestore 'admins' collection first for database credentials
    if (db) {
      try {
        const adminsRef = collection(db, "admins");
        const q = query(adminsRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const adminDoc = querySnapshot.docs[0].data();
          if (adminDoc.password && adminDoc.password === password) {
            const adminUser = {
              uid: querySnapshot.docs[0].id,
              email: adminDoc.email,
              displayName: adminDoc.name || adminDoc.displayName || "Admin",
              ...adminDoc,
            };
            setCurrentUser(adminUser);
            localStorage.setItem("hotel_raks_db_user", JSON.stringify(adminUser));
            return adminUser;
          }
        }
      } catch (dbError) {
        console.warn("Firestore admin query error:", dbError?.message || dbError);
      }
    }

    // 2. If not found in DB or password didn't match, try standard Firebase Authentication
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setCurrentUser(user);
      return user;
    } catch (authError) {
      // Format clean error message for user UI
      const readableMessage =
        authError.code === "auth/invalid-credential" ||
        authError.code === "auth/user-not-found" ||
        authError.code === "auth/wrong-password"
          ? "Invalid email or password. Please verify your credentials."
          : authError.message || "Invalid email or password.";

      throw new Error(readableMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem("pandurang_inn_mock_user");
    localStorage.removeItem("hotel_raks_mock_user");
    localStorage.removeItem("hotel_raks_db_user");
    setCurrentUser(null);

    if (isFirebaseConfigured && auth) {
      return signOut(auth);
    }
    return Promise.resolve();
  };

  const value = { currentUser, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
