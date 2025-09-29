import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../firebase';

// Collection names
export const COLLECTIONS = {
  USERS: 'users',           // Index collection with minimal data
  PATIENTS: 'patients',     // Patient-specific data
  PRACTITIONERS: 'practitioners', // Practitioner-specific data
  SESSIONS: 'sessions',
  NOTIFICATIONS: 'notifications',
  FEEDBACK: 'feedback',
  NOTES: 'notes',
  MESSAGES: 'messages',
  PROGRESS: 'progress',
  RECIPES: 'recipes',
  ANALYTICS: 'analytics'
};

// User Operations (Index Collection)
export const userService = {
  async createUserIndex(userData) {
    try {
      // Create minimal user index with just uid, email, and role
      const userIndex = {
        uid: userData.uid,
        email: userData.email,
        name: userData.name,
        userType: userData.userType,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      await setDoc(doc(db, COLLECTIONS.USERS, userData.uid), userIndex);
      
      // Create role-specific document
      const roleCollection = userData.userType === 'patient' ? COLLECTIONS.PATIENTS : COLLECTIONS.PRACTITIONERS;
      const roleData = {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      // Add allowedPractitionerIds for patients (empty initially)
      if (userData.userType === 'patient') {
        roleData.allowedPractitionerIds = [];
      }
      
      await setDoc(doc(db, roleCollection, userData.uid), roleData);
      
      return { success: true };
    } catch (error) {
      console.error('Error creating user:', error);
      return { success: false, error: error.message };
    }
  },

  async getUserByRole(uid, userType) {
    try {
      const collection = userType === 'patient' ? COLLECTIONS.PATIENTS : COLLECTIONS.PRACTITIONERS;
      const userDoc = await getDoc(doc(db, collection, uid));
      if (userDoc.exists()) {
        return { success: true, data: userDoc.data() };
      }
      return { success: false, error: 'User profile not found' };
    } catch (error) {
      console.error('Error getting user by role:', error);
      return { success: false, error: error.message };
    }
  },

  async updateUserByRole(uid, userType, updates) {
    try {
      const collection = userType === 'patient' ? COLLECTIONS.PATIENTS : COLLECTIONS.PRACTITIONERS;
      await updateDoc(doc(db, collection, uid), {
        ...updates,
        updatedAt: serverTimestamp()
      });
      
      // Update name in index if changed
      if (updates.name) {
        await updateDoc(doc(db, COLLECTIONS.USERS, uid), {
          name: updates.name,
          updatedAt: serverTimestamp()
        });
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error updating user by role:', error);
      return { success: false, error: error.message };
    }
  },

  // Legacy methods for backward compatibility - will be deprecated
  async createUser(userData) {
    return this.createUserIndex(userData);
  },

  async getUser(uid) {
    try {
      // First get user index to determine role
      const userIndex = await getDoc(doc(db, COLLECTIONS.USERS, uid));
      if (!userIndex.exists()) {
        return { success: false, error: 'User not found' };
      }
      
      const indexData = userIndex.data();
      // Then get full profile from role-specific collection
      return this.getUserByRole(uid, indexData.userType);
    } catch (error) {
      console.error('Error getting user:', error);
      return { success: false, error: error.message };
    }
  },

  async updateUser(uid, updates) {
    try {
      // Get user type from index
      const userIndex = await getDoc(doc(db, COLLECTIONS.USERS, uid));
      if (!userIndex.exists()) {
        return { success: false, error: 'User not found' };
      }
      
      const indexData = userIndex.data();
      return this.updateUserByRole(uid, indexData.userType, updates);
    } catch (error) {
      console.error('Error updating user:', error);
      return { success: false, error: error.message };
    }
  },

  async getAllPatients() {
    try {
      const q = query(
        collection(db, COLLECTIONS.PATIENTS),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const patients = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return { success: true, data: patients };
    } catch (error) {
      console.error('Error getting patients:', error);
      return { success: false, error: error.message };
    }
  },

  async getAllPractitioners() {
    try {
      const q = query(
        collection(db, COLLECTIONS.PRACTITIONERS),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const practitioners = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return { success: true, data: practitioners };
    } catch (error) {
      console.error('Error getting practitioners:', error);
      return { success: false, error: error.message };
    }
  }
};

// Session Operations
export const sessionService = {
  async createSession(sessionData) {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.SESSIONS), {
        ...sessionData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error creating session:', error);
      return { success: false, error: error.message };
    }
  },

  async getUserSessions(userId, userType) {
    try {
      const field = userType === 'patient' ? 'patientId' : 'practitionerId';
      const q = query(
        collection(db, COLLECTIONS.SESSIONS),
        where(field, '==', userId)
      );
      const snapshot = await getDocs(q);
      const sessions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => {
          const dateA = a.date?.seconds ? new Date(a.date.seconds * 1000) : new Date(a.date);
          const dateB = b.date?.seconds ? new Date(b.date.seconds * 1000) : new Date(b.date);
          return dateB - dateA; // Sort by date desc
        });
      return { success: true, data: sessions };
    } catch (error) {
      console.error('Error getting user sessions:', error);
      return { success: false, error: error.message };
    }
  },

  async updateSession(sessionId, updates) {
    try {
      await updateDoc(doc(db, COLLECTIONS.SESSIONS, sessionId), {
        ...updates,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating session:', error);
      return { success: false, error: error.message };
    }
  },

  async getUpcomingSessions(userId, userType) {
    try {
      const field = userType === 'patient' ? 'patientId' : 'practitionerId';
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const q = query(
        collection(db, COLLECTIONS.SESSIONS),
        where(field, '==', userId)
      );
      const snapshot = await getDocs(q);
      const sessions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(session => {
          const sessionDate = session.date?.seconds ? new Date(session.date.seconds * 1000) : new Date(session.date);
          return sessionDate >= today;
        })
        .sort((a, b) => {
          const dateA = a.date?.seconds ? new Date(a.date.seconds * 1000) : new Date(a.date);
          const dateB = b.date?.seconds ? new Date(b.date.seconds * 1000) : new Date(b.date);
          return dateA - dateB; // Sort by date asc
        })
        .slice(0, 10); // Limit to 10
      return { success: true, data: sessions };
    } catch (error) {
      console.error('Error getting upcoming sessions:', error);
      return { success: false, error: error.message };
    }
  }
};

// Notification Operations
export const notificationService = {
  async createNotification(notificationData) {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.NOTIFICATIONS), {
        ...notificationData,
        createdAt: serverTimestamp(),
        read: false
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error creating notification:', error);
      return { success: false, error: error.message };
    }
  },

  async getUserNotifications(userId) {
    try {
      const q = query(
        collection(db, COLLECTIONS.NOTIFICATIONS),
        where('userId', '==', userId)
      );
      const snapshot = await getDocs(q);
      const notifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => {
          const timeA = a.createdAt?.seconds ? a.createdAt.seconds : 0;
          const timeB = b.createdAt?.seconds ? b.createdAt.seconds : 0;
          return timeB - timeA; // Sort by createdAt desc
        })
        .slice(0, 20); // Limit to 20
      return { success: true, data: notifications };
    } catch (error) {
      console.error('Error getting notifications:', error);
      return { success: false, error: error.message };
    }
  },

  async markAsRead(notificationId) {
    try {
      await updateDoc(doc(db, COLLECTIONS.NOTIFICATIONS, notificationId), {
        read: true,
        readAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return { success: false, error: error.message };
    }
  }
};

// Feedback Operations
export const feedbackService = {
  async createFeedback(feedbackData) {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.FEEDBACK), {
        ...feedbackData,
        createdAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error creating feedback:', error);
      return { success: false, error: error.message };
    }
  },

  async getSessionFeedback(sessionId) {
    try {
      const q = query(
        collection(db, COLLECTIONS.FEEDBACK),
        where('sessionId', '==', sessionId)
      );
      const snapshot = await getDocs(q);
      const feedback = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return { success: true, data: feedback };
    } catch (error) {
      console.error('Error getting feedback:', error);
      return { success: false, error: error.message };
    }
  },

  async getUserFeedback(userId) {
    try {
      const q = query(
        collection(db, COLLECTIONS.FEEDBACK),
        where('patientId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const feedback = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return { success: true, data: feedback };
    } catch (error) {
      console.error('Error getting user feedback:', error);
      return { success: false, error: error.message };
    }
  }
};

// Notes Operations
export const notesService = {
  async createNote(noteData) {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.NOTES), {
        ...noteData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error creating note:', error);
      return { success: false, error: error.message };
    }
  },

  async getPatientNotes(patientId) {
    try {
      const q = query(
        collection(db, COLLECTIONS.NOTES),
        where('patientId', '==', patientId),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const notes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return { success: true, data: notes };
    } catch (error) {
      console.error('Error getting patient notes:', error);
      return { success: false, error: error.message };
    }
  },

  async updateNote(noteId, updates) {
    try {
      await updateDoc(doc(db, COLLECTIONS.NOTES, noteId), {
        ...updates,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating note:', error);
      return { success: false, error: error.message };
    }
  }
};

// Messages Operations
export const messageService = {
  async sendMessage(messageData) {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.MESSAGES), {
        ...messageData,
        createdAt: serverTimestamp(),
        status: 'sent'
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error sending message:', error);
      return { success: false, error: error.message };
    }
  },

  async getConversation(userId1, userId2) {
    try {
      const q = query(
        collection(db, COLLECTIONS.MESSAGES),
        where('participants', 'array-contains-any', [userId1, userId2]),
        orderBy('createdAt', 'asc')
      );
      const snapshot = await getDocs(q);
      const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return { success: true, data: messages };
    } catch (error) {
      console.error('Error getting conversation:', error);
      return { success: false, error: error.message };
    }
  }
};

// Progress Operations
export const progressService = {
  async updateProgress(userId, progressData) {
    try {
      await setDoc(doc(db, COLLECTIONS.PROGRESS, userId), {
        ...progressData,
        updatedAt: serverTimestamp()
      }, { merge: true });
      return { success: true };
    } catch (error) {
      console.error('Error updating progress:', error);
      return { success: false, error: error.message };
    }
  },

  async getProgress(userId) {
    try {
      const progressDoc = await getDoc(doc(db, COLLECTIONS.PROGRESS, userId));
      if (progressDoc.exists()) {
        return { success: true, data: progressDoc.data() };
      }
      return { success: false, error: 'Progress not found' };
    } catch (error) {
      console.error('Error getting progress:', error);
      return { success: false, error: error.message };
    }
  }
};

// Patient-specific operations
export const patientService = {
  async getPatient(uid) {
    return userService.getUserByRole(uid, 'patient');
  },

  async updatePatient(uid, updates) {
    return userService.updateUserByRole(uid, 'patient', updates);
  },

  async assignPractitioner(patientUid, practitionerUid) {
    try {
      const patientResult = await this.getPatient(patientUid);
      if (!patientResult.success) {
        return { success: false, error: 'Patient not found' };
      }

      const currentAllowed = patientResult.data.allowedPractitionerIds || [];
      if (!currentAllowed.includes(practitionerUid)) {
        const updatedAllowed = [...currentAllowed, practitionerUid];
        return this.updatePatient(patientUid, { 
          allowedPractitionerIds: updatedAllowed 
        });
      }
      return { success: true, message: 'Practitioner already assigned' };
    } catch (error) {
      console.error('Error assigning practitioner:', error);
      return { success: false, error: error.message };
    }
  }
};

// Practitioner-specific operations
export const practitionerService = {
  async getPractitioner(uid) {
    return userService.getUserByRole(uid, 'practitioner');
  },

  async updatePractitioner(uid, updates) {
    return userService.updateUserByRole(uid, 'practitioner', updates);
  },

  async getAssignedPatients(practitionerUid) {
    try {
      const q = query(
        collection(db, COLLECTIONS.PATIENTS),
        where('allowedPractitionerIds', 'array-contains', practitionerUid)
      );
      const snapshot = await getDocs(q);
      const patients = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return { success: true, data: patients };
    } catch (error) {
      console.error('Error getting assigned patients:', error);
      return { success: false, error: error.message };
    }
  }
};

// Migration helper function
export const migrationService = {
  async migrateExistingUsers() {
    try {
      console.log('Starting user migration to role-based collections...');
      
      // Get all existing users
      const usersSnapshot = await getDocs(collection(db, COLLECTIONS.USERS));
      let migratedCount = 0;
      
      for (const userDoc of usersSnapshot.docs) {
        const userData = userDoc.data();
        const uid = userDoc.id;
        
        // Check if already migrated (skip if role-specific doc exists)
        const roleCollection = userData.userType === 'patient' ? COLLECTIONS.PATIENTS : COLLECTIONS.PRACTITIONERS;
        const roleDoc = await getDoc(doc(db, roleCollection, uid));
        
        if (!roleDoc.exists()) {
          // Create role-specific document
          const roleData = {
            ...userData,
            updatedAt: serverTimestamp()
          };
          
          // Add allowedPractitionerIds for patients
          if (userData.userType === 'patient') {
            roleData.allowedPractitionerIds = [];
          }
          
          await setDoc(doc(db, roleCollection, uid), roleData);
          migratedCount++;
          
          // Update user index to be minimal
          const userIndex = {
            uid: userData.uid,
            email: userData.email,
            name: userData.name,
            userType: userData.userType,
            createdAt: userData.createdAt,
            updatedAt: serverTimestamp()
          };
          
          await setDoc(doc(db, COLLECTIONS.USERS, uid), userIndex);
          
          console.log(`Migrated ${userData.userType}: ${userData.name}`);
        }
      }
      
      console.log(`Migration completed. Migrated ${migratedCount} users.`);
      return { success: true, migratedCount };
    } catch (error) {
      console.error('Migration error:', error);
      return { success: false, error: error.message };
    }
  }
};

// Real-time listeners (simplified to avoid index requirements)
export const subscribeToUserNotifications = (userId, callback) => {
  const q = query(
    collection(db, COLLECTIONS.NOTIFICATIONS),
    where('userId', '==', userId)
  );
  
  return onSnapshot(q, (snapshot) => {
    const notifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(n => !n.read)
      .sort((a, b) => {
        const timeA = a.createdAt?.seconds ? a.createdAt.seconds : 0;
        const timeB = b.createdAt?.seconds ? b.createdAt.seconds : 0;
        return timeB - timeA;
      });
    callback(notifications);
  });
};

export const subscribeToUserSessions = (userId, userType, callback) => {
  const field = userType === 'patient' ? 'patientId' : 'practitionerId';
  const q = query(
    collection(db, COLLECTIONS.SESSIONS),
    where(field, '==', userId)
  );
  
  return onSnapshot(q, (snapshot) => {
    const sessions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      .sort((a, b) => {
        const dateA = a.date?.seconds ? new Date(a.date.seconds * 1000) : new Date(a.date);
        const dateB = b.date?.seconds ? new Date(b.date.seconds * 1000) : new Date(b.date);
        return dateB - dateA;
      });
    callback(sessions);
  });
};