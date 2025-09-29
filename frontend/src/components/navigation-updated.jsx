import React from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useAuth } from '../contexts/AuthContext';
import {
  Calendar,
  User,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  Heart,
  Leaf,
  Menu,
  X,
  MessageSquare,
  Car
} from 'lucide-react';

export function Navigation({ currentPage, onPageChange, userType, onUserTypeChange, onLogout }) {
  const { userProfile } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Helper function to get user initials
  const getUserInitials = (name) => {
    if (!name) return userType === 'patient' ? 'P' : 'D';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Helper function to get display name
  const getDisplayName = () => {
    if (userProfile?.name && userProfile.name !== 'User') {
      return userProfile.name;
    }
    return userType === 'patient' ? 'Patient User' : 'Practitioner User';
  };

  // Helper function to get user subtitle
  const getUserSubtitle = () => {
    if (userType === 'patient') {
      if (userProfile?.dosha && userProfile.dosha !== null) {
        return `${userProfile.dosha} Constitution`;
      }
      return 'Complete Assessment to Discover Your Dosha';
    } else {
      return userProfile?.specialization || 'Ayurveda Practitioner';
    }
  };

  const patientPages = [
    { id: 'patient-dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'sessions', label: 'My Sessions', icon: Calendar },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
    { id: 'yoga-guidance', label: 'Yoga & Exercise', icon: Heart },
    { id: 'diet-lifestyle', label: 'Diet & Lifestyle', icon: Leaf },
    { id: 'documents', label: 'My Documents', icon: User },
    { id: 'feedback', label: 'Session Feedback', icon: MessageSquare },
    { id: 'transportation', label: 'Transportation', icon: Car },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  const practitionerPages = [
    { id: 'practitioner-dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'patients', label: 'Patient Management', icon: User },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'notes', label: 'Notes & History', icon: Bell },
    { id: 'feedback-viewer', label: 'Session Feedback', icon: Heart },
    { id: 'communication', label: 'Communication', icon: Bell },
    { id: 'tasks', label: 'Tasks & Reminders', icon: Bell },
    { id: 'resources', label: 'Resource Sharing', icon: Leaf }
  ];

  const pages = userType === 'patient' ? patientPages : practitionerPages;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-gradient-to-b from-emerald-50 to-teal-50 border-r border-emerald-200 min-h-screen">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-emerald-900">AyurSutra</h1>
              <p className="text-sm text-emerald-600">Panchakarma Care</p>
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm mb-6">
            <Avatar>
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="bg-emerald-100 text-emerald-700">
                {getUserInitials(userProfile?.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-emerald-900 truncate">
                {getDisplayName()}
              </p>
              <p className="text-sm text-emerald-600 truncate">
                {getUserSubtitle()}
              </p>
              {userType === 'patient' && (
                <Badge variant="outline" className="mt-1 text-xs border-emerald-300 text-emerald-700">
                  Day 5 of 14
                </Badge>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {pages.map((page) => {
              const Icon = page.icon;
              const isActive = currentPage === page.id;
              return (
                <Button
                  key={page.id}
                  variant={isActive ? 'default' : 'ghost'}
                  onClick={() => onPageChange(page.id)}
                  className={`w-full justify-start space-x-3 ${
                    isActive 
                      ? 'bg-emerald-600 text-white shadow-md' 
                      : 'text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{page.label}</span>
                </Button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-2">
          <Button 
            variant="ghost" 
            onClick={() => onPageChange('settings')}
            className="w-full justify-start space-x-3 text-emerald-700 hover:bg-emerald-100"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Button>
          <Button 
            variant="ghost" 
            onClick={onLogout}
            className="w-full justify-start space-x-3 text-red-700 hover:bg-red-100"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <Leaf className="w-5 h-5" />
          </div>
          <h1 className="font-bold">AyurSutra</h1>
        </div>
        <Button variant="ghost" size="sm" onClick={toggleMobileMenu} className="text-white">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50">
          <div className="bg-white h-full w-80 max-w-[85%] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="font-bold text-emerald-900">AyurSutra</h1>
                </div>
                <Button variant="ghost" size="sm" onClick={toggleMobileMenu}>
                  <X className="w-6 h-6" />
                </Button>
              </div>

              {/* User Profile */}
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl mb-6">
                <Avatar>
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-emerald-100 text-emerald-700">
                    {getUserInitials(userProfile?.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {getDisplayName()}
                  </p>
                  <p className="text-sm text-gray-600 truncate">
                    {getUserSubtitle()}
                  </p>
                  {userType === 'patient' && (
                    <Badge variant="outline" className="mt-1 text-xs border-emerald-300 text-emerald-700">
                      Day 5 of 14
                    </Badge>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2 mb-6">
                {pages.map((page) => {
                  const Icon = page.icon;
                  const isActive = currentPage === page.id;
                  return (
                    <Button
                      key={page.id}
                      variant={isActive ? 'default' : 'ghost'}
                      onClick={() => {
                        onPageChange(page.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full justify-start space-x-3 ${
                        isActive 
                          ? 'bg-emerald-600 text-white' 
                          : 'text-emerald-700 hover:bg-emerald-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{page.label}</span>
                    </Button>
                  );
                })}
              </nav>

              {/* Mobile Settings and Logout */}
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    onPageChange('settings');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full justify-start space-x-3 text-emerald-700 hover:bg-emerald-100"
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full justify-start space-x-3 text-red-700 hover:bg-red-100"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}