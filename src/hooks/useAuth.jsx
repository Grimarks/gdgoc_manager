import { useState, useEffect, useContext, createContext } from "react";
import { auth, db } from "../lib/firebase.js";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [claims, setClaims] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true);

            if (currentUser) {
                // ambil data Firestore
                const userDocRef = doc(db, "users", currentUser.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                }

                // ambil custom claims (untuk role-based access)
                const token = await currentUser.getIdTokenResult();
                setClaims(token.claims);

                setUser(currentUser);
            } else {
                setUser(null);
                setUserData(null);
                setClaims(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signOut = () => firebaseSignOut(auth);

    return (
        <AuthContext.Provider value={{ user, userData, claims, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
