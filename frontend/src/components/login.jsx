import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useAuth } from '../contexts/AuthContext';
import {
  Leaf,
  User,
  Mail,
  Phone,
  Calendar,
  Heart,
  Shield,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export function Login() {
  const { signup, login, resetPassword } = useAuth();
  const [isRegistering, setIsRegistering] = React.useState(false);
  const [userType, setUserType] = React.useState('patient');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    age: '',
    gender: '',
    dosha: '',
    medicalHistory: '',
    specialization: '',
    experience: ''
  });

  const doshaTypes = [
    { value: 'vata', label: 'Vata (Air + Space)' },
    { value: 'pitta', label: 'Pitta (Fire + Water)' },
    { value: 'kapha', label: 'Kapha (Earth + Water)' },
    { value: 'vata-pitta', label: 'Vata-Pitta' },
    { value: 'pitta-kapha', label: 'Pitta-Kapha' },
    { value: 'vata-kapha', label: 'Vata-Kapha' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setMessage('');
      setLoading(true);

      if (isRegistering) {
        // Sign up user
        await signup(formData.email, formData.password, {
          ...formData,
          userType
        });
        setMessage('Account created successfully! You are now logged in.');
      } else {
        // Login user
        await login(formData.email, formData.password);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setError('Please enter your email address first');
      return;
    }

    try {
      setError('');
      setMessage('');
      setLoading(true);
      await resetPassword(formData.email);
      setMessage('Password reset email sent! Check your inbox.');
    } catch (error) {
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      default:
        return 'An error occurred. Please try again.';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-emerald-900">AyurSutra</h1>
                  <p className="text-emerald-600">Panchakarma Patient Management</p>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Welcome to Holistic Healing
              </h2>
              <p className="text-gray-600 mb-8">
                Experience personalized Panchakarma care with AI-powered insights, 
                comprehensive progress tracking, and seamless practitioner collaboration.
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1730977806307-3351cb73a9b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkYSUyMHdlbGxuZXNzJTIwbWVkaXRhdGlvbnxlbnwxfHx8fDE3NTgzODU3NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                alt="Ayurveda wellness" 
                className="w-full h-64 lg:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 via-transparent to-transparent"></div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl">
                <Heart className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-emerald-900">Personalized Care</p>
              </div>
              <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl">
                <Shield className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-emerald-900">Secure Platform</p>
              </div>
              <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl">
                <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-emerald-900">Proven Results</p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <Card className="w-full shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-6">
              {/* User Type Toggle */}
              <div className="flex p-1 bg-gray-100 rounded-lg">
                <Button
                  type="button"
                  variant={userType === 'patient' ? 'default' : 'ghost'}
                  onClick={() => setUserType('patient')}
                  className={`flex-1 ${userType === 'patient' ? 'bg-emerald-600 text-white' : 'text-emerald-700'}`}
                >
                  <User className="w-4 h-4 mr-2" />
                  Patient
                </Button>
                <Button
                  type="button"
                  variant={userType === 'practitioner' ? 'default' : 'ghost'}
                  onClick={() => setUserType('practitioner')}
                  className={`flex-1 ${userType === 'practitioner' ? 'bg-emerald-600 text-white' : 'text-emerald-700'}`}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Practitioner
                </Button>
              </div>

              <CardTitle className="text-center">
                {isRegistering ? 'Create Account' : 'Sign In'}
                <p className="text-sm font-normal text-gray-600 mt-2">
                  {isRegistering 
                    ? `Join as a ${userType} to start your wellness journey` 
                    : `Welcome back! Please sign in to continue`
                  }
                </p>
              </CardTitle>
            </CardHeader>

            <CardContent>
              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}

              {/* Success Message */}
              {message && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-green-700 text-sm">{message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder={userType === 'patient' ? 'Priya Sharma' : 'Dr. Kamal Raj'}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                {isRegistering && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+91 98765 43210"
                          required
                        />
                      </div>
                      {userType === 'patient' && (
                        <div className="space-y-2">
                          <Label htmlFor="age">Age</Label>
                          <Input
                            id="age"
                            type="number"
                            value={formData.age}
                            onChange={(e) => handleInputChange('age', e.target.value)}
                            placeholder="30"
                            required
                          />
                        </div>
                      )}
                    </div>

                    {userType === 'patient' ? (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="gender">Gender</Label>
                            <Select onValueChange={(value) => handleInputChange('gender', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
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
                            <Select onValueChange={(value) => handleInputChange('dosha', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select dosha type" />
                              </SelectTrigger>
                              <SelectContent>
                                {doshaTypes.map((dosha) => (
                                  <SelectItem key={dosha.value} value={dosha.value}>
                                    {dosha.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="medicalHistory">Medical History (Optional)</Label>
                          <Textarea
                            id="medicalHistory"
                            value={formData.medicalHistory}
                            onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                            placeholder="Please describe any relevant medical conditions, allergies, or ongoing treatments..."
                            rows={3}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="specialization">Specialization</Label>
                            <Select onValueChange={(value) => handleInputChange('specialization', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select specialization" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="panchakarma">Panchakarma Specialist</SelectItem>
                                <SelectItem value="general">General Ayurveda</SelectItem>
                                <SelectItem value="nutrition">Ayurvedic Nutrition</SelectItem>
                                <SelectItem value="yoga">Yoga Therapy</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="experience">Years of Experience</Label>
                            <Input
                              id="experience"
                              type="number"
                              value={formData.experience}
                              onChange={(e) => handleInputChange('experience', e.target.value)}
                              placeholder="10"
                              required
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}

                {/* Password field */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder={isRegistering ? "Create a password" : "Enter your password"}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50"
                  size="lg"
                >
                  {loading ? 'Please wait...' : (isRegistering ? 'Create Account' : 'Sign In')}
                  {!loading && <ArrowRight className="w-5 h-5 ml-2" />}
                </Button>

                <div className="text-center space-y-2">
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="text-emerald-600 hover:text-emerald-700"
                  >
                    {isRegistering 
                      ? 'Already have an account? Sign in' 
                      : 'New user? Create an account'
                    }
                  </Button>
                  
                  {!isRegistering && (
                    <div>
                      <Button
                        type="button"
                        variant="link"
                        onClick={handleForgotPassword}
                        className="text-sm text-gray-600 hover:text-gray-700"
                        disabled={loading}
                      >
                        Forgot your password?
                      </Button>
                    </div>
                  )}
                </div>
              </form>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}