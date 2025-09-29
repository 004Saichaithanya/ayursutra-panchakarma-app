import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  deleteUser,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { userService, migrationService } from '../services/database';
import { autoInitializeDatabase } from '../services/dataInitializer';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // More graceful error handling during development
    console.error('useAuth must be used within an AuthProvider');
    return {
      currentUser: null,
      userProfile: null,
      loading: true,
      signup: () => {},
      login: () => {},
      logout: () => {},
      resetPassword: () => {},
      deleteAccount: () => {},
      runMigration: () => {}
    };
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up function
  async function signup(email, password, userData) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update user profile with display name
    await updateProfile(user, {
      displayName: userData.name
    });

    // Save additional user data to Firestore (excluding password and other sensitive data)
    const userDocData = {
      uid: user.uid,
      email: user.email,
      name: userData.name,
      userType: userData.userType,
      createdAt: serverTimestamp(),
      // Include additional profile data but exclude sensitive fields
      ...(userData.phone && { phone: userData.phone }),
      ...(userData.age && { age: userData.age }),
      ...(userData.gender && { gender: userData.gender }),
      ...(userData.dosha && { dosha: userData.dosha }),
      ...(userData.medicalHistory && { medicalHistory: userData.medicalHistory }),
      ...(userData.specialization && { specialization: userData.specialization }),
      ...(userData.experience && { experience: userData.experience })
    };

    // Use the new role-based schema
    const result = await userService.createUserIndex(userDocData);
    if (!result.success) {
      throw new Error(`Failed to create user profile: ${result.error}`);
    }
    
    return userCredential;
  }

  // Login function
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Logout function
  function logout() {
    return signOut(auth);
  }

  // Reset password function
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  // Delete account function
  async function deleteAccount() {
    if (currentUser) {
      // Note: deleteUser() requires recent authentication
      // In a production app, you should prompt for re-authentication before deletion
      try {
        // Optionally soft-delete user document instead of hard delete
        // This preserves data integrity for related records
        await setDoc(doc(db, 'users', currentUser.uid), {
          deletedAt: serverTimestamp(),
          active: false
        }, { merge: true });
        
        // Delete the user account from Firebase Auth
        await deleteUser(currentUser);
      } catch (error) {
        if (error.code === 'auth/requires-recent-login') {
          throw new Error('Please log in again before deleting your account for security.');
        }
        throw error;
      }
    }
  }

  // Load user profile from Firestore
  async function loadUserProfile(uid, user = null) {
    try {
      console.log('🔍 Loading user profile for UID:', uid);
      console.log('👤 Auth user details:', user);
      
      // Try to get user profile using the database service
      const result = await userService.getUser(uid);
      console.log('📊 Database result:', result);
      
      // If the main lookup fails, try to find the user directly in both collections
      if (!result.success) {
        console.log('⚠️ Main lookup failed, trying direct collection lookup...');
        
        // Try practitioners collection first
        const practitionerResult = await userService.getUserByRole(uid, 'practitioner');
        console.log('🩺 Practitioner lookup result:', practitionerResult);
        
        if (practitionerResult.success) {
          console.log('✅ Found user in practitioners collection');
          setUserProfile(practitionerResult.data);
          return;
        }
        
        // Try patients collection
        const patientResult = await userService.getUserByRole(uid, 'patient');
        console.log('🏥 Patient lookup result:', patientResult);
        
        if (patientResult.success) {
          console.log('✅ Found user in patients collection');
          setUserProfile(patientResult.data);
          return;
        }
        
        console.log('❌ User not found in any collection, will create default profile');
      }
      
      if (result.success) {
        console.log('✅ User profile loaded successfully:', result.data);
        setUserProfile(result.data);
      } else {
        // User profile doesn't exist, create a default patient profile
        console.warn('User profile not found, creating default profile');
        
        // Extract name from email if displayName is not available
        const authUser = user;
        const emailName = authUser?.email ? authUser.email.split('@')[0] : '';
        const displayName = authUser?.displayName;
        const derivedName = emailName ? emailName.charAt(0).toUpperCase() + emailName.slice(1) : '';
        const userName = displayName || derivedName || 'New Patient';
        
        console.log('🔧 Name extraction debug:', { 
          displayName, 
          emailName, 
          derivedName, 
          finalUserName: userName 
        });
        
        const defaultProfile = {
          uid: uid,
          email: authUser?.email || '',
          name: userName,
          userType: 'patient', // Note: This fallback should only happen for login without prior signup
          dosha: null,
          createdAt: serverTimestamp()
        };
        
        // Save using database service
        const createResult = await userService.createUser(defaultProfile);
        console.log('💾 Create user result:', createResult);
        if (createResult.success) {
          setUserProfile(defaultProfile);
          console.log('✅ Created new user profile:', userName);
        } else {
          // Fallback to temporary profile
          setUserProfile({ ...defaultProfile, isTemporary: true });
          console.warn('⚠️ Using temporary profile');
        }
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      
      // Fallback: create a better temporary profile for this session
      const authUser = user;
      const emailName = authUser?.email ? authUser.email.split('@')[0] : '';
      const displayName = authUser?.displayName;
      const derivedName = emailName ? emailName.charAt(0).toUpperCase() + emailName.slice(1) : '';
      const userName = displayName || derivedName || 'New Patient';
      
      console.log('🔧 Fallback name extraction debug:', { 
        displayName, 
        emailName, 
        derivedName, 
        finalUserName: userName 
      });
      
      const fallbackProfile = {
        uid: uid,
        email: authUser?.email || '',
        name: userName,
        userType: 'patient',
        dosha: null,
        createdAt: serverTimestamp(),
        isTemporary: true
      };
      setUserProfile(fallbackProfile);
      console.warn('Using fallback profile due to Firestore connection issues');
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('🔐 Auth state changed:', user ? `User logged in: ${user.email}` : 'User logged out');
      setCurrentUser(user);
      if (user) {
        console.log('👤 User details:', { 
          uid: user.uid, 
          email: user.email, 
          displayName: user.displayName 
        });
        await loadUserProfile(user.uid, user);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    signup,
    login,
    logout,
    resetPassword,
    deleteAccount,
    loading,
    // Migration utility for development
    runMigration: migrationService.migrateExistingUsers
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}