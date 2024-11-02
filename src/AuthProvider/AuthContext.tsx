import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, User, updateProfile, UserCredential } from 'firebase/auth';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider
} from 'firebase/auth';
import auth from '../Firebase/Firebase.config';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    setUser: (user: User | null) => void; // Added setUser
    createUser: (email: string, password: string) => Promise<UserCredential>;
    signinUser: (email: string, password: string) => Promise<void>;
    logOut: () => Promise<void>;
    googleLogin: () => Promise<UserCredential>; // Updated return type
    githubLogin: () => Promise<void>;
    updateUserProfile: (name: string, image: string, phoneNumber: string) => Promise<void>; // Added phoneNumber
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const createUser = async (email: string, password: string): Promise<UserCredential> => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return userCredential;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signinUser = async (email: string, password: string): Promise<void> => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error signing in:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logOut = async (): Promise<void> => {
        setLoading(true);
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error during logout:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const googleLogin = async (): Promise<UserCredential> => {
        setLoading(true);
        try {
            const userCredential = await signInWithPopup(auth, googleProvider);
            return userCredential; // Return the userCredential
        } catch (error) {
            console.error("Error during Google login:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };
    

    const githubLogin = async (): Promise<void> => {
        setLoading(true);
        try {
            await signInWithPopup(auth, githubProvider);
        } catch (error) {
            console.error("Error during GitHub login:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateUserProfile = async (name: string, image: string, phoneNumber: string): Promise<void> => {
        if (auth.currentUser) {
            try {
                await updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: image,
                });
                // Here you can handle saving phoneNumber to a database if needed
            } catch (error) {
                console.error("Error updating user profile:", error);
                throw error;
            }
        } else {
            console.error("No user is currently signed in.");
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, setLoading, setUser, createUser, signinUser, logOut, googleLogin, githubLogin, updateUserProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
