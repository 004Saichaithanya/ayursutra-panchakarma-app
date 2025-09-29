import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import {
  User,
  Lock,
  Bell,
  Shield,
  LogOut,
  Save,
  Edit,
  Mail,
  Phone,
  Calendar,
  AlertTriangle
} from 'lucide-react';

/**
 * @param {{ onPageChange: (page: string) => void, onLogout: () => void, userType: 'patient' | 'practitioner' }} props
 */
export function Settings({ onPageChange, onLogout, userType }) {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = React.useState(false);
  const [profileData, setProfileData] = React.useState({
    name: userType === 'patient' ? 'Priya Sharma' : 'Dr. Kamal Raj',
    email: userType === 'patient' ? 'priya@demo.com' : 'kamal@demo.com',
    phone: '+91 98765 43210',
    age: userType === 'patient' ? '32' : '45',
    gender: 'female',
    dosha: 'vata-pitta',
    address: '123 Wellness Street, Mumbai, Maharashtra',
    emergencyContact: 'Raj Sharma (+91 98765 43211)',
    specialization: userType === 'practitioner' ? 'Panchakarma Specialist' : '',
    experience: userType === 'practitioner' ? '15' : '',
    license: userType === 'practitioner' ? 'AYU-MH-2010-12345' : ''
  });

  const [passwordData, setPasswordData] = React.useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notificationSettings, setNotificationSettings] = React.useState({
    emailNotifications: true,
    smsNotifications: false,
    sessionReminders: true,
    dietTips: true,
    progressUpdates: true,
    marketingEmails: false,
    reminderTiming: '24'
  });

  const handleProfileUpdate = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordUpdate = (field, value) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationUpdate = (field, value) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    console.log('Saving profile:', profileData);
  };

  const handleChangePassword = () => {
    console.log('Changing password');
  };

  const handleSaveNotifications = () => {
    console.log('Saving notifications:', notificationSettings);
  };

  const confirmLogout = () => {
    setIsLogoutDialogOpen(false);
    onLogout();
  };

  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-600 via-gray-600 to-zinc-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-slate-100 mb-6">Manage your account settings, notifications, and preferences</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <User className="w-8 h-8 mx-auto mb-2" />
            <p className="text-slate-100">Profile</p>
            <p className="font-bold">Complete</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <Shield className="w-8 h-8 mx-auto mb-2" />
            <p className="text-slate-100">Security</p>
            <p className="font-bold">Strong</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <Bell className="w-8 h-8 mx-auto mb-2" />
            <p className="text-slate-100">Notifications</p>
            <p className="font-bold">Active</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <Calendar className="w-8 h-8 mx-auto mb-2" />
            <p className="text-slate-100">Last Login</p>
            <p className="font-bold">Today</p>
          </div>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Lock className="w-4 h-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Account</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Edit className="w-5 h-5 text-gray-600" />
                <span>Edit Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={profileData.name} onChange={(e) => handleProfileUpdate('name', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleProfileUpdate('email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" value={profileData.phone} onChange={(e) => handleProfileUpdate('phone', e.target.value)} />
                </div>

                {userType === 'patient' ? (
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" type="number" value={profileData.age} onChange={(e) => handleProfileUpdate('age', e.target.value)} />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      type="number"
                      value={profileData.experience}
                      onChange={(e) => handleProfileUpdate('experience', e.target.value)}
                    />
                  </div>
                )}
              </div>

              {userType === 'patient' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={profileData.gender} onValueChange={(value) => handleProfileUpdate('gender', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dosha">Dosha Type</Label>
                    <Select value={profileData.dosha} onValueChange={(value) => handleProfileUpdate('dosha', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vata">Vata</SelectItem>
                        <SelectItem value="pitta">Pitta</SelectItem>
                        <SelectItem value="kapha">Kapha</SelectItem>
                        <SelectItem value="vata-pitta">Vata-Pitta</SelectItem>
                        <SelectItem value="pitta-kapha">Pitta-Kapha</SelectItem>
                        <SelectItem value="vata-kapha">Vata-Kapha</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Select
                      value={profileData.specialization}
                      onValueChange={(value) => handleProfileUpdate('specialization', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Panchakarma Specialist">Panchakarma Specialist</SelectItem>
                        <SelectItem value="General Ayurveda">General Ayurveda</SelectItem>
                        <SelectItem value="Ayurvedic Nutrition">Ayurvedic Nutrition</SelectItem>
                        <SelectItem value="Yoga Therapy">Yoga Therapy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="license">License Number</Label>
                    <Input id="license" value={profileData.license} onChange={(e) => handleProfileUpdate('license', e.target.value)} />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={profileData.address}
                  onChange={(e) => handleProfileUpdate('address', e.target.value)}
                  rows={3}
                />
              </div>

              {userType === 'patient' && (
                <div className="space-y-2">
                  <Label htmlFor="emergency">Emergency Contact</Label>
                  <Input
                    id="emergency"
                    value={profileData.emergencyContact}
                    onChange={(e) => handleProfileUpdate('emergencyContact', e.target.value)}
                  />
                </div>
              )}

              <Button onClick={handleSaveProfile} className="bg-slate-600 hover:bg-slate-700">
                <Save className="w-4 h-4 mr-2" />
                Save Profile Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="w-5 h-5 text-gray-600" />
                <span>Change Password</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => handlePasswordUpdate('currentPassword', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => handlePasswordUpdate('newPassword', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => handlePasswordUpdate('confirmPassword', e.target.value)}
                  />
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Password Requirements</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• At least 8 characters long</li>
                  <li>• Include uppercase and lowercase letters</li>
                  <li>• Include at least one number</li>
                  <li>• Include at least one special character</li>
                </ul>
              </div>

              <Button onClick={handleChangePassword} className="bg-slate-600 hover:bg-slate-700">
                <Save className="w-4 h-4 mr-2" />
                Update Password
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Login Notifications</h4>
                  <p className="text-sm text-gray-600">Get notified when someone logs into your account</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-gray-600" />
                <span>Notification Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Delivery Methods</h4>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <div>
                      <h5 className="font-medium">Email Notifications</h5>
                      <p className="text-sm text-gray-600">Receive notifications via email</p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => handleNotificationUpdate('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-600" />
                    <div>
                      <h5 className="font-medium">SMS Notifications</h5>
                      <p className="text-sm text-gray-600">Receive notifications via text message</p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) => handleNotificationUpdate('smsNotifications', checked)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Notification Types</h4>

                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium">Session Reminders</h5>
                    <p className="text-sm text-gray-600">Reminders about upcoming therapy sessions</p>
                  </div>
                  <Switch
                    checked={notificationSettings.sessionReminders}
                    onCheckedChange={(checked) => handleNotificationUpdate('sessionReminders', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium">Diet & Lifestyle Tips</h5>
                    <p className="text-sm text-gray-600">Daily wellness and nutrition guidance</p>
                  </div>
                  <Switch
                    checked={notificationSettings.dietTips}
                    onCheckedChange={(checked) => handleNotificationUpdate('dietTips', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium">Progress Updates</h5>
                    <p className="text-sm text-gray-600">Weekly progress reports and insights</p>
                  </div>
                  <Switch
                    checked={notificationSettings.progressUpdates}
                    onCheckedChange={(checked) => handleNotificationUpdate('progressUpdates', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium">Marketing Emails</h5>
                    <p className="text-sm text-gray-600">Information about new services and offers</p>
                  </div>
                  <Switch
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={(checked) => handleNotificationUpdate('marketingEmails', checked)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Reminder Timing</h4>
                <div className="space-y-2">
                  <Label htmlFor="reminderTiming">Send session reminders</Label>
                  <Select
                    value={notificationSettings.reminderTiming}
                    onValueChange={(value) => handleNotificationUpdate('reminderTiming', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour before</SelectItem>
                      <SelectItem value="2">2 hours before</SelectItem>
                      <SelectItem value="4">4 hours before</SelectItem>
                      <SelectItem value="24">24 hours before</SelectItem>
                      <SelectItem value="48">48 hours before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleSaveNotifications} className="bg-slate-600 hover:bg-slate-700">
                <Save className="w-4 h-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-gray-600" />
                <span>Account Management</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-900 mb-2">Account Status</h4>
                  <p className="text-sm text-yellow-700">Your account is active and in good standing.</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Account Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Account Type:</span>
                      <span className="font-medium ml-2 capitalize">{userType}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Member Since:</span>
                      <span className="font-medium ml-2">September 2025</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Last Login:</span>
                      <span className="font-medium ml-2">Today at 9:30 AM</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Data Usage:</span>
                      <span className="font-medium ml-2">12.4 MB</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                <span>Danger Zone</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border border-red-200 rounded-lg">
                <h4 className="font-medium text-red-900 mb-2">Logout</h4>
                <p className="text-sm text-red-700 mb-4">
                  You will be logged out and need to sign in again to access your account.
                </p>

                <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="flex items-center space-x-2 text-red-600">
                        <AlertTriangle className="w-5 h-5" />
                        <span>Confirm Logout</span>
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-gray-600">
                        Are you sure you want to logout? You will need to sign in again to access your account.
                      </p>
                      <div className="flex space-x-3">
                        <Button onClick={confirmLogout} className="flex-1 bg-red-600 hover:bg-red-700">
                          Yes, Logout
                        </Button>
                        <Button variant="outline" onClick={() => setIsLogoutDialogOpen(false)} className="flex-1">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
