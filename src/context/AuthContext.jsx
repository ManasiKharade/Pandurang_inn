import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
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

  const updateAdminPassword = async (newPassword) => {
    if (!currentUser) throw new Error("No user is currently logged in.");

    // 1. Check if it's the mock user
    if (currentUser.isMock) {
      // For mock user, just simulate success since it's hardcoded to admin123
      toast.success("Mock password updated (simulated).");
      return;
    }

    // 2. Check if it's a Firestore DB user
    const savedDbUser = localStorage.getItem("hotel_raks_db_user");
    if (savedDbUser && db) {
      try {
        const adminDocRef = doc(db, "admins", currentUser.uid);
        await updateDoc(adminDocRef, { password: newPassword });
        // Update local storage to match
        const updatedUser = { ...currentUser, password: newPassword };
        localStorage.setItem("hotel_raks_db_user", JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
        return;
      } catch (dbError) {
        throw new Error("Failed to update database password: " + dbError.message);
      }
    }

    // 3. Otherwise, try standard Firebase Authentication
    if (isFirebaseConfigured && auth && auth.currentUser) {
      try {
        await updatePassword(auth.currentUser, newPassword);
      } catch (authError) {
        throw new Error("Failed to update Firebase Auth password: " + authError.message);
      }
    } else {
      throw new Error("Could not determine user type to update password.");
    }
  };

  const resetAdminPassword = async (email) => {
    if (!isFirebaseConfigured || !auth) {
      throw new Error("Firebase isn't configured. Reset password requires Firebase.");
    }
    
    // Note: This only resets Firebase Authentication passwords.
    // If they are a purely Firestore-driven user, they cannot use this email reset link directly.
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (authError) {
      const readableMessage =
        authError.code === "auth/user-not-found"
          ? "No admin account found with this email."
          : authError.message || "Failed to send password reset email.";
      throw new Error(readableMessage);
    }
  };

  const value = { currentUser, loading, login, logout, updateAdminPassword, resetAdminPassword };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
