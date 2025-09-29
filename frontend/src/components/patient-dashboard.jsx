import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useAuth } from '../contexts/AuthContext';
import { useSessions, useNotifications, useFeedback, useProgress } from '../hooks/useDatabase';
import {
  Calendar,
  Clock,
  Heart,
  Droplets,
  Leaf,
  Star,
  ArrowRight,
  Bell,
  TrendingUp,
  Activity
} from 'lucide-react';

export function PatientDashboard({ onPageChange }) {
  const { currentUser, userProfile } = useAuth();
  
  // Use real data from database with defensive defaults
  const { upcomingSessions = [], loading: sessionsLoading } = useSessions(currentUser?.uid, 'patient');
  const { notifications = [], loading: notificationsLoading } = useNotifications(currentUser?.uid);
  const { feedback = [], loading: feedbackLoading } = useFeedback(currentUser?.uid);
  const { progress, loading: progressLoading } = useProgress(currentUser?.uid);

  // Helper function to format date for display
  const formatSessionDate = (date) => {
    if (!date) return 'TBD';
    
    const sessionDate = date.seconds ? new Date(date.seconds * 1000) : new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (sessionDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (sessionDate.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return sessionDate.toLocaleDateString();
    }
  };

  // Format time from session data
  const formatTime = (timeString) => {
    if (!timeString) return 'TBD';
    return timeString;
  };

  // Get recent feedback (limit to 3 most recent) with defensive check
  const recentFeedback = (feedback || []).slice(0, 3).map(f => ({
    session: f.therapy,
    rating: f.rating,
    mood: f.mood,
    energy: f.energy
  }));

  // Get recent notifications (limit to 3 most recent unread) with defensive check
  const recentNotifications = (notifications || []).slice(0, 3);

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-8 text-white">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {userProfile?.name && userProfile.name !== 'User' ? userProfile.name.split(' ')[0] : 'there'}!
          </h1>
          <p className="text-emerald-100 mb-6">
            Your wellness journey continues. 
            {progress?.treatmentProgress ? 
              ` Today is Day ${progress.treatmentProgress.currentDay} of your ${progress.treatmentProgress.totalDays}-day ${progress.treatmentProgress.phase} program.` :
              ' Let\'s begin your path to wellness and healing.'
            }
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white/90">Progress</p>
                  <p className="font-bold">
                    {progress?.treatmentProgress?.percentage || 0}% Complete
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white/90">Today's Session</p>
                  <p className="font-bold">
                    {upcomingSessions.length > 0 ? upcomingSessions[0].therapy : 'No sessions today'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white/90">Wellness Score</p>
                  <p className="font-bold">
                    {progress?.wellnessScore ? `${progress.wellnessScore}/10` : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-64 h-64 opacity-20">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1730977806307-3351cb73a9b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkYSUyMHdlbGxuZXNzJTIwbWVkaXRhdGlvbnxlbnwxfHx8fDE3NTgzODU3NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
            alt="Ayurveda wellness" 
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="xl:col-span-2 space-y-8">
          {/* Upcoming Sessions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  <span>Upcoming Sessions</span>
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onPageChange('sessions')}
                  className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                >
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {sessionsLoading ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-2"></div>
                  Loading your sessions...
                </div>
              ) : upcomingSessions.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No upcoming sessions</h3>
                  <p className="text-sm">Your next session will appear here once scheduled</p>
                </div>
              ) : (
                upcomingSessions.map((session) => (
                  <div key={session.id} className="border border-emerald-100 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-emerald-900">{session.therapy}</h3>
                        <div className="flex items-center space-x-4 text-sm text-emerald-600 mt-1">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatSessionDate(session.date)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{formatTime(session.time)}</span>
                          </div>
                        </div>
                        <p className="text-sm text-emerald-700 mt-2">with {session.practitioner}</p>
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
                        {session.status}
                      </Badge>
                    </div>
                    
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="font-medium text-amber-900 mb-2">Pre-therapy Preparation:</p>
                      <ul className="space-y-1">
                        {(session.preparation || []).map((item, index) => (
                          <li key={index} className="text-sm text-amber-800 flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex space-x-3 mt-4">
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        Join Session
                      </Button>
                      <Button variant="outline" size="sm" className="border-emerald-200 text-emerald-600">
                        Reschedule
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Progress Visualization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <span>Your Progress Journey</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Treatment Progress</span>
                    <span className="text-sm text-emerald-600">
                      {progress?.treatmentProgress ? 
                        `${progress.treatmentProgress.currentDay} of ${progress.treatmentProgress.totalDays} days` : 
                        'N/A'
                      }
                    </span>
                  </div>
                  <Progress value={progress?.treatmentProgress?.percentage || 0} className="h-3" />
                  <p className="text-sm text-gray-600 mt-2">You're making excellent progress! Keep up the great work.</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                    <Droplets className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-blue-800">Detox Level</p>
                    <p className="font-bold text-blue-900">{progress?.detoxLevel || 0}%</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                    <Heart className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-green-800">Energy Level</p>
                    <p className="font-bold text-green-900">{progress?.energyLevel || 0}%</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                    <Activity className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm text-purple-800">Balance</p>
                    <p className="font-bold text-purple-900">{progress?.balance || 0}%</p>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  onClick={() => onPageChange('progress')}
                  className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                >
                  View Detailed Progress Report
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-emerald-600" />
                  <span>Notifications</span>
                </CardTitle>
                <Badge className="bg-orange-100 text-orange-700">
                  {notifications.filter(n => !n.read).length} New
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {notificationsLoading ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600 mx-auto mb-2"></div>
                  Loading notifications...
                </div>
              ) : notifications.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Bell className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm">No notifications yet</p>
                </div>
              ) : (
                notifications.slice(0, 3).map((notification) => (
                  <div key={notification.id} className="flex space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      notification.priority === 'high' ? 'bg-red-500' :
                      notification.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm">{notification.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                    </div>
                  </div>
                ))
              )}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onPageChange('notifications')}
                className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50"
              >
                View All Notifications
              </Button>
            </CardContent>
          </Card>

          {/* Recent Feedback */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-emerald-600" />
                <span>Recent Feedback</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {feedbackLoading ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600 mx-auto mb-2"></div>
                  Loading feedback...
                </div>
              ) : recentFeedback.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Star className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm">No session feedback yet</p>
                  <p className="text-xs text-gray-500 mt-1">Feedback will appear after your first session</p>
                </div>
              ) : (
                recentFeedback.map((feedback, index) => (
                  <div key={index} className="p-4 border border-emerald-100 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-emerald-900">{feedback.session}</p>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">Mood: </span>
                        <span className="font-medium">{feedback.mood}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Energy: </span>
                        <span className="font-medium">{feedback.energy}/10</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                onClick={() => onPageChange('yoga-guidance')}
                className="w-full justify-start space-x-3 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              >
                <Heart className="w-5 h-5" />
                <span>Today's Yoga Practice</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => onPageChange('diet-lifestyle')}
                className="w-full justify-start space-x-3 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              >
                <Leaf className="w-5 h-5" />
                <span>Diet Recommendations</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => onPageChange('documents')}
                className="w-full justify-start space-x-3 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              >
                <Calendar className="w-5 h-5" />
                <span>Upload Lab Reports</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}