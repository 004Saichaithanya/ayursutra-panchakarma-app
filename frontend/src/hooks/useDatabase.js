import { useState, useEffect } from 'react';
import { 
  userService, 
  sessionService, 
  notificationService, 
  feedbackService, 
  notesService,
  progressService,
  subscribeToUserNotifications,
  subscribeToUserSessions
} from '../services/database';

// Hook for user data operations
export const useUser = (userId) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      setLoading(true);
      const result = await userService.getUser(userId);
      if (result.success) {
        setUser(result.data);
        setError(null);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    fetchUser();
  }, [userId]);

  const updateUser = async (updates) => {
    const result = await userService.updateUser(userId, updates);
    if (result.success) {
      setUser(prev => ({ ...prev, ...updates }));
    }
    return result;
  };

  return { user, loading, error, updateUser };
};

// Hook for sessions data
export const useSessions = (userId, userType) => {
  const [sessions, setSessions] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId || !userType) {
      setLoading(false);
      return;
    }

    let unsubscribe;

    const fetchSessions = async () => {
      setLoading(true);
      
      // Get all sessions
      const sessionsResult = await sessionService.getUserSessions(userId, userType);
      if (sessionsResult.success) {
        setSessions(sessionsResult.data);
      } else {
        setError(sessionsResult.error);
      }

      // Get upcoming sessions
      const upcomingResult = await sessionService.getUpcomingSessions(userId, userType);
      if (upcomingResult.success) {
        setUpcomingSessions(upcomingResult.data);
      }

      setLoading(false);
    };

    fetchSessions();

    // Set up real-time listener
    unsubscribe = subscribeToUserSessions(userId, userType, (updatedSessions) => {
      setSessions(updatedSessions);
      
      // Filter upcoming sessions
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const upcoming = updatedSessions.filter(session => {
        const sessionDate = new Date(session.date.seconds * 1000);
        return sessionDate >= today;
      });
      setUpcomingSessions(upcoming);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [userId, userType]);

  const createSession = async (sessionData) => {
    return await sessionService.createSession(sessionData);
  };

  const updateSession = async (sessionId, updates) => {
    return await sessionService.updateSession(sessionId, updates);
  };

  return { 
    sessions, 
    upcomingSessions, 
    loading, 
    error, 
    createSession, 
    updateSession 
  };
};

// Hook for notifications
export const useNotifications = (userId) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    let unsubscribe;

    const fetchNotifications = async () => {
      setLoading(true);
      const result = await notificationService.getUserNotifications(userId);
      if (result.success) {
        setNotifications(result.data);
        setUnreadCount(result.data.filter(n => !n.read).length);
        setError(null);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    fetchNotifications();

    // Set up real-time listener for unread notifications
    unsubscribe = subscribeToUserNotifications(userId, (unreadNotifications) => {
      setUnreadCount(unreadNotifications.length);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [userId]);

  const markAsRead = async (notificationId) => {
    const result = await notificationService.markAsRead(notificationId);
    if (result.success) {
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
    return result;
  };

  const createNotification = async (notificationData) => {
    return await notificationService.createNotification(notificationData);
  };

  return { 
    notifications, 
    unreadCount, 
    loading, 
    error, 
    markAsRead, 
    createNotification 
  };
};

// Hook for feedback data
export const useFeedback = (userId, sessionId = null) => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchFeedback = async () => {
      setLoading(true);
      let result;
      
      if (sessionId) {
        result = await feedbackService.getSessionFeedback(sessionId);
      } else {
        result = await feedbackService.getUserFeedback(userId);
      }

      if (result.success) {
        setFeedback(result.data);
        setError(null);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    fetchFeedback();
  }, [userId, sessionId]);

  const createFeedback = async (feedbackData) => {
    const result = await feedbackService.createFeedback(feedbackData);
    if (result.success) {
      // Refresh feedback list
      setFeedback(prev => [feedbackData, ...prev]);
    }
    return result;
  };

  return { feedback, loading, error, createFeedback };
};

// Hook for patient notes
export const useNotes = (patientId) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!patientId) {
      setLoading(false);
      return;
    }

    const fetchNotes = async () => {
      setLoading(true);
      const result = await notesService.getPatientNotes(patientId);
      if (result.success) {
        setNotes(result.data);
        setError(null);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    fetchNotes();
  }, [patientId]);

  const createNote = async (noteData) => {
    const result = await notesService.createNote(noteData);
    if (result.success) {
      setNotes(prev => [noteData, ...prev]);
    }
    return result;
  };

  const updateNote = async (noteId, updates) => {
    const result = await notesService.updateNote(noteId, updates);
    if (result.success) {
      setNotes(prev => 
        prev.map(note => note.id === noteId ? { ...note, ...updates } : note)
      );
    }
    return result;
  };

  return { notes, loading, error, createNote, updateNote };
};

// Hook for progress data
export const useProgress = (userId) => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchProgress = async () => {
      setLoading(true);
      const result = await progressService.getProgress(userId);
      if (result.success) {
        setProgress(result.data);
        setError(null);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    fetchProgress();
  }, [userId]);

  const updateProgress = async (progressData) => {
    const result = await progressService.updateProgress(userId, progressData);
    if (result.success) {
      setProgress(prev => ({ ...prev, ...progressData }));
    }
    return result;
  };

  return { progress, loading, error, updateProgress };
};

// Hook for patients list (for practitioners)
export const usePatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      const result = await userService.getAllPatients();
      if (result.success) {
        setPatients(result.data);
        setError(null);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    fetchPatients();
  }, []);

  return { patients, loading, error };
};

// Hook for practitioners list
export const usePractitioners = () => {
  const [practitioners, setPractitioners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPractitioners = async () => {
      setLoading(true);
      const result = await userService.getAllPractitioners();
      if (result.success) {
        setPractitioners(result.data);
        setError(null);
      } else {
        setError(result.error);
      }
      setLoading(false);
    };

    fetchPractitioners();
  }, []);

  return { practitioners, loading, error };
};