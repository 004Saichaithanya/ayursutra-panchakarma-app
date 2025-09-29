import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Bell,
  Calendar,
  Heart,
  Utensils,
  AlertTriangle,
  CheckCircle,
  Clock,
  Trash2,
  Settings,
  Filter
} from 'lucide-react';

/**
 * @param {{ onPageChange: (page: string) => void }} props
 */
export function Notifications({ onPageChange }) {
  const [filter, setFilter] = React.useState('all');

  const notifications = [
    {
      id: 1,
      type: 'therapy',
      title: 'Session Reminder',
      message:
        'Your Abhyanga session is scheduled for today at 2:00 PM. Please arrive 15 minutes early.',
      time: '1 hour ago',
      priority: 'high',
      read: false,
      category: 'Session'
    },
    {
      id: 2,
      type: 'diet',
      title: 'Pre-therapy Diet',
      message:
        "Consume warm ghee with milk 2 hours before tomorrow's session for better absorption.",
      time: '2 hours ago',
      priority: 'medium',
      read: false,
      category: 'Diet'
    },
    {
      id: 3,
      type: 'wellness',
      title: 'Daily Yoga Reminder',
      message: "Don't forget to complete your morning yoga routine. You have a 7-day streak!",
      time: '4 hours ago',
      priority: 'low',
      read: true,
      category: 'Wellness'
    },
    {
      id: 4,
      type: 'schedule',
      title: 'Session Confirmed',
      message:
        'Your Swedana session for tomorrow at 10:00 AM has been confirmed with Dr. Anjali Nair.',
      time: '6 hours ago',
      priority: 'medium',
      read: true,
      category: 'Session'
    },
    {
      id: 5,
      type: 'medication',
      title: 'Herbal Medicine Reminder',
      message: 'Time to take your evening herbal medicine (Triphala). Take with warm water.',
      time: '8 hours ago',
      priority: 'high',
      read: false,
      category: 'Medication'
    },
    {
      id: 6,
      type: 'progress',
      title: 'Weekly Progress Update',
      message:
        'Great job! Your energy levels have improved by 18% this week. Keep up the excellent work.',
      time: '1 day ago',
      priority: 'low',
      read: true,
      category: 'Progress'
    },
    {
      id: 7,
      type: 'lifestyle',
      title: 'Hydration Reminder',
      message: "You're doing well with warm water intake. Aim for 8-10 glasses today.",
      time: '1 day ago',
      priority: 'low',
      read: true,
      category: 'Lifestyle'
    },
    {
      id: 8,
      type: 'alert',
      title: 'Treatment Phase Update',
      message:
        "You're entering the main treatment phase (Pradhan Karma) tomorrow. Review preparation guidelines.",
      time: '2 days ago',
      priority: 'high',
      read: true,
      category: 'Treatment'
    },
    {
      id: 9,
      type: 'feedback',
      title: 'Feedback Request',
      message:
        'Please provide feedback for your recent Abhyanga session to help us improve your treatment.',
      time: '2 days ago',
      priority: 'medium',
      read: false,
      category: 'Feedback'
    },
    {
      id: 10,
      type: 'appointment',
      title: 'New Appointment Available',
      message:
        'A slot has opened up for consultation on September 25th at 3:00 PM. Book now if interested.',
      time: '3 days ago',
      priority: 'medium',
      read: true,
      category: 'Appointment'
    }
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'therapy':
      case 'session':
      case 'schedule':
        return Calendar;
      case 'diet':
      case 'medication':
        return Utensils;
      case 'wellness':
      case 'lifestyle':
        return Heart;
      case 'alert':
      case 'treatment':
        return AlertTriangle;
      case 'progress':
        return CheckCircle;
      default:
        return Bell;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      Session: 'bg-emerald-100 text-emerald-700',
      Diet: 'bg-orange-100 text-orange-700',
      Wellness: 'bg-purple-100 text-purple-700',
      Medication: 'bg-blue-100 text-blue-700',
      Progress: 'bg-green-100 text-green-700',
      Lifestyle: 'bg-teal-100 text-teal-700',
      Treatment: 'bg-red-100 text-red-700',
      Feedback: 'bg-indigo-100 text-indigo-700',
      Appointment: 'bg-pink-100 text-pink-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const filteredNotifications =
    filter === 'all'
      ? notifications
      : filter === 'unread'
      ? notifications.filter((n) => !n.read)
      : notifications.filter((n) => n.priority === filter);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const highPriorityCount = notifications.filter((n) => n.priority === 'high').length;

  const markAsRead = (id) => {
    console.log('Marking notification as read:', id);
  };

  const deleteNotification = (id) => {
    console.log('Deleting notification:', id);
  };

  const markAllAsRead = () => {
    console.log('Marking all notifications as read');
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Notifications</h1>
        <p className="text-orange-100 mb-6">
          Stay updated with your therapy schedule, reminders, and wellness tips
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <Bell className="w-8 h-8 mx-auto mb-2" />
            <p className="text-orange-100">Total</p>
            <p className="text-2xl font-bold">{notifications.length}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
            <p className="text-orange-100">Unread</p>
            <p className="text-2xl font-bold">{unreadCount}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2" />
            <p className="text-orange-100">High Priority</p>
            <p className="text-2xl font-bold">{highPriorityCount}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <CheckCircle className="w-8 h-8 mx-auto mb-2" />
            <p className="text-orange-100">Today</p>
            <p className="text-2xl font-bold">5</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-900">All Notifications</h2>
          {unreadCount > 0 && <Badge className="bg-red-100 text-red-700">{unreadCount} unread</Badge>}
        </div>

        <div className="flex space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange('settings')}
            className="border-gray-200"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" size="sm" onClick={markAllAsRead} className="border-gray-200">
            <CheckCircle className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <Tabs value={filter} onValueChange={setFilter} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          <TabsTrigger value="high">High Priority</TabsTrigger>
          <TabsTrigger value="medium">Medium</TabsTrigger>
          <TabsTrigger value="low">Low</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="space-y-4">
          {filteredNotifications.map((notification) => {
            const Icon = getIcon(notification.type);
            return (
              <Card
                key={notification.id}
                className={`hover:shadow-md transition-shadow ${
                  !notification.read ? 'border-l-4 border-l-orange-500 bg-orange-50/30' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        notification.read ? 'bg-gray-100' : 'bg-orange-100'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${notification.read ? 'text-gray-600' : 'text-orange-600'}`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3
                            className={`font-medium ${
                              notification.read ? 'text-gray-900' : 'text-gray-900 font-semibold'
                            }`}
                          >
                            {notification.title}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getCategoryColor(notification.category)}>
                              {notification.category}
                            </Badge>
                            <Badge className={getPriorityColor(notification.priority)}>
                              {notification.priority}
                            </Badge>
                            {!notification.read && (
                              <Badge className="bg-orange-100 text-orange-700">New</Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <span className="text-sm text-gray-500">{notification.time}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteNotification(notification.id)}
                            className="text-gray-400 hover:text-red-600 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <p className={`text-sm mb-3 ${notification.read ? 'text-gray-600' : 'text-gray-700'}`}>
                        {notification.message}
                      </p>

                      <div className="flex space-x-3">
                        {!notification.read && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => markAsRead(notification.id)}
                            className="border-orange-200 text-orange-600 hover:bg-orange-50"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark as Read
                          </Button>
                        )}

                        {notification.type === 'therapy' && (
                          <Button
                            size="sm"
                            onClick={() => onPageChange('sessions')}
                            className="bg-orange-600 hover:bg-orange-700"
                          >
                            View Session
                          </Button>
                        )}

                        {notification.type === 'feedback' && (
                          <Button
                            size="sm"
                            onClick={() => onPageChange('sessions')}
                            className="bg-orange-600 hover:bg-orange-700"
                          >
                            Give Feedback
                          </Button>
                        )}

                        {notification.type === 'progress' && (
                          <Button
                            size="sm"
                            onClick={() => onPageChange('progress')}
                            className="bg-orange-600 hover:bg-orange-700"
                          >
                            View Progress
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {filteredNotifications.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  {filter === 'unread' ? 'All caught up!' : 'No notifications'}
                </h3>
                <p className="text-gray-600">
                  {filter === 'unread'
                    ? 'You have no unread notifications.'
                    : `No ${filter === 'all' ? '' : filter + ' priority '}notifications to show.`}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-gray-600" />
            <span>Notification Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Delivery Methods</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-3">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                  <span className="text-sm">In-app notifications</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                  <span className="text-sm">Email notifications</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm">SMS notifications</span>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Notification Types</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-3">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                  <span className="text-sm">Session reminders</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                  <span className="text-sm">Diet and lifestyle tips</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                  <span className="text-sm">Progress updates</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm">Marketing updates</span>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button onClick={() => onPageChange('settings')} className="bg-orange-600 hover:bg-orange-700">
              Update Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
