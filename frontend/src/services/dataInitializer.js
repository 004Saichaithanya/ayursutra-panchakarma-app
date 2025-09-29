import { 
  userService, 
  sessionService, 
  notificationService, 
  feedbackService, 
  notesService,
  progressService 
} from './database';

// Sample data for initialization
const samplePatients = [
  {
    uid: 'patient_001',
    email: 'priya.sharma@email.com',
    name: 'Priya Sharma',
    userType: 'patient',
    age: 34,
    gender: 'Female',
    phone: '+91 98765 43210',
    dosha: 'Vata-Pitta',
    medicalHistory: 'Chronic stress, mild digestive issues, sleep disturbances',
    currentCondition: 'Significant improvement in stress levels and digestion',
    assignedTherapy: 'Abhyanga',
    status: 'active'
  },
  {
    uid: 'patient_002',
    email: 'raj.patel@email.com',
    name: 'Raj Patel',
    userType: 'patient',
    age: 42,
    gender: 'Male',
    phone: '+91 98765 43211',
    dosha: 'Pitta-Kapha',
    medicalHistory: 'Hypertension, anxiety, work stress',
    currentCondition: 'Blood pressure stabilizing, reduced anxiety levels',
    assignedTherapy: 'Shirodhara',
    status: 'active'
  },
  {
    uid: 'patient_003',
    email: 'meera.singh@email.com',
    name: 'Meera Singh',
    userType: 'patient',
    age: 29,
    gender: 'Female',
    phone: '+91 98765 43212',
    dosha: 'Kapha-Vata',
    medicalHistory: 'Joint stiffness, fatigue, irregular sleep',
    currentCondition: 'Improved flexibility, better energy levels',
    assignedTherapy: 'Panchakarma',
    status: 'active'
  }
];

const samplePractitioners = [
  {
    uid: 'practitioner_001',
    email: 'dr.kamal@ayursutra.com',
    name: 'Dr. Kamal Raj',
    userType: 'practitioner',
    specialization: 'Panchakarma Specialist',
    experience: '15 years',
    qualifications: 'BAMS, MD (Ayurveda)',
    expertise: ['Panchakarma', 'Abhyanga', 'Shirodhara', 'Consultation'],
    status: 'active'
  },
  {
    uid: 'practitioner_002',
    email: 'dr.anjali@ayursutra.com',
    name: 'Dr. Anjali Nair',
    userType: 'practitioner',
    specialization: 'Yoga & Lifestyle Therapy',
    experience: '8 years',
    qualifications: 'BAMS, Certified Yoga Instructor',
    expertise: ['Yoga Therapy', 'Lifestyle Counseling', 'Swedana', 'Diet Planning'],
    status: 'active'
  }
];

const sampleSessions = [
  {
    patientId: 'patient_001',
    practitionerId: 'practitioner_001',
    patientName: 'Priya Sharma',
    practitionerName: 'Dr. Kamal Raj',
    therapy: 'Abhyanga',
    date: new Date(2025, 8, 23), // Tomorrow
    time: '2:00 PM',
    duration: 60,
    location: 'Treatment Room A',
    status: 'confirmed',
    sessionId: 'SES001',
    preparation: ['Light meal 2 hours before', 'Wear comfortable clothes', 'Arrive 15 minutes early'],
    notes: 'Regular weekly session'
  },
  {
    patientId: 'patient_002',
    practitionerId: 'practitioner_001',
    patientName: 'Raj Patel',
    practitionerName: 'Dr. Kamal Raj',
    therapy: 'Shirodhara',
    date: new Date(2025, 8, 24), // Day after tomorrow
    time: '10:30 AM',
    duration: 45,
    location: 'Treatment Room B',
    status: 'confirmed',
    sessionId: 'SES002',
    preparation: ['Hydrate well', 'Avoid heavy meals', 'Bring water bottle'],
    notes: 'Second session in series'
  },
  {
    patientId: 'patient_001',
    practitionerId: 'practitioner_001',
    patientName: 'Priya Sharma',
    practitionerName: 'Dr. Kamal Raj',
    therapy: 'Abhyanga',
    date: new Date(2025, 8, 19), // Past session
    time: '2:00 PM',
    duration: 60,
    location: 'Treatment Room A',
    status: 'completed',
    sessionId: 'SES003',
    notes: 'Patient responded well to treatment'
  }
];

const sampleNotifications = [
  {
    userId: 'patient_001',
    type: 'reminder',
    title: 'Pre-therapy Diet',
    message: 'Consume warm ghee with milk before tomorrow\'s session',
    priority: 'high',
    read: false
  },
  {
    userId: 'patient_001',
    type: 'schedule',
    title: 'Session Confirmed',
    message: 'Your Abhyanga session tomorrow at 2:00 PM is confirmed',
    priority: 'medium',
    read: false
  },
  {
    userId: 'practitioner_001',
    type: 'urgent',
    title: 'Session Update Required',
    message: 'Raj Patel requested to reschedule tomorrow\'s session',
    priority: 'urgent',
    read: false
  }
];

const sampleFeedback = [
  {
    sessionId: 'SES003',
    patientId: 'patient_001',
    patientName: 'Priya Sharma',
    practitionerId: 'practitioner_001',
    therapy: 'Abhyanga',
    rating: 5,
    mood: 'Excellent',
    energy: 9,
    comments: 'Felt very relaxed and energized. The oil temperature was perfect.',
    symptoms: {
      stress: 'much_better',
      sleep: 'improved',
      energy: 'increased'
    }
  }
];

const sampleNotes = [
  {
    patientId: 'patient_001',
    patientName: 'Priya Sharma',
    practitionerId: 'practitioner_001',
    practitionerName: 'Dr. Kamal Raj',
    sessionType: 'Abhyanga',
    noteType: 'Session Note',
    title: 'Post-session observation',
    content: 'Patient showed significant improvement in stress levels. Reported better sleep quality and reduced anxiety. Skin texture has improved noticeably. Recommend continuing current protocol for next 2 weeks.',
    tags: ['improvement', 'stress-reduction', 'skin-health'],
    attachments: []
  }
];

const sampleProgress = [
  {
    userId: 'patient_001',
    treatmentProgress: {
      currentDay: 5,
      totalDays: 14,
      percentage: 35,
      phase: 'Purvakarma (Preparation Phase)',
      nextPhase: 'Pradhanakarma (Main Treatment)',
      daysToNext: 2
    },
    healthMetrics: {
      energyLevel: { current: 85, previous: 72, target: 90, trend: 'up' },
      stressLevel: { current: 35, previous: 48, target: 25, trend: 'down' },
      sleepQuality: { current: 88, previous: 75, target: 90, trend: 'up' },
      digestiveHealth: { current: 78, previous: 65, target: 85, trend: 'up' }
    },
    weeklyData: [
      { week: 'Week 1', energy: 65, stress: 55, sleep: 70, digestion: 60 },
      { week: 'Week 2', energy: 85, stress: 35, sleep: 88, digestion: 78 }
    ]
  }
];

// Initialize database with sample data
export const initializeDatabase = async () => {
  try {
    console.log('🔄 Initializing database with sample data...');
    
    // Create sample patients
    for (const patient of samplePatients) {
      const result = await userService.createUser(patient);
      if (result.success) {
        console.log(`✅ Created patient: ${patient.name}`);
      } else {
        console.log(`⚠️ Patient ${patient.name} might already exist`);
      }
    }

    // Create sample practitioners
    for (const practitioner of samplePractitioners) {
      const result = await userService.createUser(practitioner);
      if (result.success) {
        console.log(`✅ Created practitioner: ${practitioner.name}`);
      } else {
        console.log(`⚠️ Practitioner ${practitioner.name} might already exist`);
      }
    }

    // Create sample sessions
    for (const session of sampleSessions) {
      const result = await sessionService.createSession(session);
      if (result.success) {
        console.log(`✅ Created session: ${session.therapy} for ${session.patientName}`);
      }
    }

    // Create sample notifications
    for (const notification of sampleNotifications) {
      const result = await notificationService.createNotification(notification);
      if (result.success) {
        console.log(`✅ Created notification: ${notification.title}`);
      }
    }

    // Create sample feedback
    for (const feedback of sampleFeedback) {
      const result = await feedbackService.createFeedback(feedback);
      if (result.success) {
        console.log(`✅ Created feedback for session: ${feedback.therapy}`);
      }
    }

    // Create sample notes
    for (const note of sampleNotes) {
      const result = await notesService.createNote(note);
      if (result.success) {
        console.log(`✅ Created note: ${note.title}`);
      }
    }

    // Create sample progress data
    for (const progress of sampleProgress) {
      const result = await progressService.updateProgress(progress.userId, progress);
      if (result.success) {
        console.log(`✅ Created progress data for patient`);
      }
    }

    console.log('🎉 Database initialization completed successfully!');
    return { success: true, message: 'Database initialized with sample data' };

  } catch (error) {
    console.error('❌ Error initializing database:', error);
    return { success: false, error: error.message };
  }
};

// Check if database needs initialization
export const checkDatabaseInitialization = async () => {
  try {
    const patientsResult = await userService.getAllPatients();
    const practitionersResult = await userService.getAllPractitioners();
    
    const hasPatients = patientsResult.success && patientsResult.data.length > 0;
    const hasPractitioners = practitionersResult.success && practitionersResult.data.length > 0;
    
    return hasPatients && hasPractitioners;
  } catch (error) {
    console.error('Error checking database initialization:', error);
    return false;
  }
};

// Initialize database if empty
export const autoInitializeDatabase = async () => {
  const isInitialized = await checkDatabaseInitialization();
  
  if (!isInitialized) {
    console.log('🔍 Database appears to be empty, initializing with sample data...');
    return await initializeDatabase();
  } else {
    console.log('✅ Database already contains data');
    return { success: true, message: 'Database already initialized' };
  }
};