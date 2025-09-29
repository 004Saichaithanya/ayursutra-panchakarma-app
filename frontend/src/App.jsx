import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navigation } from './components/navigation-updated';
import { Login } from './components/login';
import { PatientDashboard } from './components/patient-dashboard';
import { PractitionerDashboard } from './components/practitioner-dashboard-enhanced';
import { ScheduleManagement } from './components/schedule-management-simplified';
import { PatientManagement } from './components/patient-management-redesigned';
import { AnalyticsDashboardEnhanced } from './components/analytics-dashboard-enhanced';
import { AyurvedaChatbot } from './components/ayurveda-chatbot';
import { NotesHistory } from './components/notes-history';
import { SessionFeedbackViewer } from './components/session-feedback-viewer';
import { CommunicationMessaging } from './components/communication-messaging';
import { TaskReminders } from './components/task-reminders';
import { ResourceSharing } from './components/resource-sharing';
import { PatientFeedbackEnhanced } from './components/patient-feedback-enhanced';
import { TransportationAssistance } from './components/transportation-assistance';
import { YogaGuidance } from './components/yoga-guidance';
import { ProgressVisualization } from './components/progress-visualization';
import { DietLifestyle } from './components/diet-lifestyle-updated';
import { AIRecommendations } from './components/ai-recommendations';
import { Sessions } from './components/sessions';
import { Documents } from './components/documents';
import { Notifications } from './components/notifications';
import { Settings } from './components/settings';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './components/ui/dialog';
import { Button } from './components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';

function AppContent() {
  const { currentUser, userProfile, logout } = useAuth();
  const [currentPage, setCurrentPage] = React.useState(null); // Start with null to prevent premature patient dashboard rendering
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = React.useState(false);

  // Set initial page based on user type
  React.useEffect(() => {
    if (userProfile && userProfile.userType) {
      const initialPage = userProfile.userType === 'patient' ? 'patient-dashboard' : 'practitioner-dashboard';
      console.log('🔄 Setting initial page based on user type:', userProfile.userType, '-> page:', initialPage);
      console.log('📊 Current userProfile:', userProfile);
      setCurrentPage(initialPage);
    } else if (userProfile) {
      // If userProfile exists but no userType, default to patient
      console.log('⚠️ User profile exists but no userType found, defaulting to patient-dashboard');
      setCurrentPage('patient-dashboard');
    }
  }, [userProfile]);

  const handlePageChange = (page) => {
    // Ensure users can only access pages appropriate to their role
    const patientPages = ['patient-dashboard', 'sessions', 'progress', 'yoga-guidance', 'diet-lifestyle', 'documents', 'notifications', 'feedback', 'transportation', 'settings'];
    const practitionerPages = ['practitioner-dashboard', 'schedule', 'patients', 'analytics', 'notes', 'feedback-viewer', 'communication', 'tasks', 'resources', 'settings'];
    
    const userType = userProfile?.userType;
    
    if (userType === 'patient' && patientPages.includes(page)) {
      setCurrentPage(page);
    } else if (userType === 'practitioner' && practitionerPages.includes(page)) {
      setCurrentPage(page);
    } else {
      // Redirect to appropriate dashboard if trying to access unauthorized page
      // Default to patient dashboard if userType is undefined/null
      const correctPage = userType === 'patient' ? 'patient-dashboard' : 
                         userType === 'practitioner' ? 'practitioner-dashboard' : 'patient-dashboard';
      console.log('⚠️ Redirecting to correct dashboard:', userType, '-> page:', correctPage);
      setCurrentPage(correctPage);
    }
  };

  const handleLogoutRequest = () => {
    setIsLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = async () => {
    try {
      await logout();
      setCurrentPage('patient-dashboard');
      setIsLogoutDialogOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleLogoutCancel = () => {
    setIsLogoutDialogOpen(false);
  };

  if (!currentUser) {
    return <Login />;
  }

  // Show loading state while currentPage is being determined
  if (!currentPage) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const renderCurrentPage = () => {
    // Role-based page rendering with strict access control
    const userType = userProfile?.userType;
    
    // Show patient dashboard by default, only show practitioner if explicitly set
    if (userType === 'practitioner') {
      // Practitioner pages
      switch (currentPage) {
        case 'practitioner-dashboard':
          return <PractitionerDashboard onPageChange={handlePageChange} />;
        case 'schedule':
          return <ScheduleManagement onPageChange={handlePageChange} />;
        case 'patients':
          return <PatientManagement onPageChange={handlePageChange} />;
        case 'analytics':
          return <AnalyticsDashboardEnhanced onPageChange={handlePageChange} />;
        case 'notes':
          return <NotesHistory onPageChange={handlePageChange} />;
        case 'feedback-viewer':
          return <SessionFeedbackViewer onPageChange={handlePageChange} />;
        case 'communication':
          return <CommunicationMessaging onPageChange={handlePageChange} />;
        case 'tasks':
          return <TaskReminders onPageChange={handlePageChange} />;
        case 'resources':
          return <ResourceSharing onPageChange={handlePageChange} />;
        case 'ai-recommendations':
          return <AIRecommendations onPageChange={handlePageChange} />;
        case 'settings':
          return <Settings onPageChange={handlePageChange} onLogout={handleLogoutRequest} userType={userProfile?.userType} />;
        default:
          return <PractitionerDashboard onPageChange={handlePageChange} />;
      }
    } else {
      // Patient pages (default for all other cases including undefined/null userType)
      switch (currentPage) {
        case 'patient-dashboard':
          return <PatientDashboard onPageChange={handlePageChange} />;
        case 'sessions':
          return <Sessions onPageChange={handlePageChange} />;
        case 'progress':
          return <ProgressVisualization onPageChange={handlePageChange} />;
        case 'yoga-guidance':
          return <YogaGuidance onPageChange={handlePageChange} />;
        case 'diet-lifestyle':
          return <DietLifestyle onPageChange={handlePageChange} />;
        case 'documents':
          return <Documents onPageChange={handlePageChange} />;
        case 'notifications':
          return <Notifications onPageChange={handlePageChange} />;
        case 'feedback':
          return <PatientFeedbackEnhanced onPageChange={handlePageChange} />;
        case 'transportation':
          return <TransportationAssistance onPageChange={handlePageChange} />;
        case 'settings':
          return <Settings onPageChange={handlePageChange} onLogout={handleLogoutRequest} userType={userProfile?.userType} />;
        default:
          return <PatientDashboard onPageChange={handlePageChange} />;
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex">
        <Navigation 
          currentPage={currentPage}
          onPageChange={handlePageChange}
          userType={userProfile?.userType}
          onLogout={handleLogoutRequest}
        />
        
        <main className="flex-1 lg:ml-0">
          {renderCurrentPage()}
          {/* Add chatbot only for patient pages */}
          {userProfile?.userType === 'patient' && <AyurvedaChatbot />}
        </main>
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              <span>Confirm Logout</span>
            </DialogTitle>
            <DialogDescription>
              This action will log you out and redirect you to the login screen.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              Are you sure you want to logout? You will be redirected to the login screen and need to sign in again to access your account.
            </p>
            <div className="flex space-x-3">
              <Button 
                onClick={handleLogoutConfirm}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                Yes, Logout
              </Button>
              <Button 
                variant="outline" 
                onClick={handleLogoutCancel}
                className="flex-1"
              >
                No, Stay Logged In
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}