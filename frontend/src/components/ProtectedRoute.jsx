import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Login } from './login';
import { Button } from './ui/button';
import { Shield, ArrowRight } from 'lucide-react';

export function ProtectedRoute({ children, userType, redirectOnMismatch = true }) {
  const { currentUser, userProfile, loading } = useAuth();

  // Show loading spinner while authentication state is being determined
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login if not authenticated
  if (!currentUser) {
    return <Login />;
  }

  // Show loading if user profile is still being loaded
  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Strict role-based access control
  if (userType && userProfile?.userType !== userType) {
    const currentRole = userProfile.userType;
    const requiredRole = userType;
    const correctDashboard = currentRole === 'patient' ? 'patient-dashboard' : 'practitioner-dashboard';
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Access Restricted
            </h2>
            
            <p className="text-gray-600 mb-2">
              This area is for <strong>{requiredRole}s</strong> only.
            </p>
            
            <p className="text-gray-600 mb-6">
              You are currently logged in as a <strong>{currentRole}</strong>.
            </p>
            
            <div className="space-y-3">
              {redirectOnMismatch && (
                <Button 
                  onClick={() => window.location.href = `#${correctDashboard}`}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Go to {currentRole} Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
              
              <p className="text-sm text-gray-500">
                Need access? Contact your administrator.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
}