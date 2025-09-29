import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import {
  ArrowLeft,
  Star,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  MessageSquare,
  Heart,
  Smile,
  Frown,
  Meh
} from 'lucide-react';

/**
 * @param {{ onPageChange: (page: string) => void }} props
 */
export function SessionFeedbackViewer({ onPageChange }) {
  const feedbackData = [
    {
      id: 1,
      sessionId: 's101',
      patientId: 1,
      patientName: 'Priya Sharma',
      patientAvatar: '/placeholder-avatar.jpg',
      sessionDate: new Date(2024, 11, 13),
      sessionTime: '14:30',
      sessionType: 'Abhyanga',
      practitioner: 'Dr. Kamal Raj',
      rating: 5,
      comfort: 5,
      effectiveness: 5,
      environment: 4,
      communication: 5,
      overallExperience: 'Excellent',
      feedback:
        'The session was absolutely wonderful! I felt so relaxed and my stress levels dropped significantly. Dr. Kamal was very professional and made me feel comfortable throughout. The oils used were perfect for my skin type.',
      improvements: 'Maybe slightly warmer room temperature would be perfect.',
      wouldRecommend: true,
      submittedAt: new Date(2024, 11, 13, 16, 45),
      mood: 'excellent',
      symptoms: ['stress-reduced', 'sleep-improved', 'energy-increased']
    },
    {
      id: 2,
      sessionId: 's102',
      patientId: 2,
      patientName: 'Raj Patel',
      patientAvatar: '/placeholder-avatar.jpg',
      sessionDate: new Date(2024, 11, 8),
      sessionTime: '16:15',
      sessionType: 'Shirodhara',
      practitioner: 'Dr. Kamal Raj',
      rating: 4,
      comfort: 3,
      effectiveness: 4,
      environment: 4,
      communication: 4,
      overallExperience: 'Good',
      feedback:
        'The Shirodhara session was beneficial for my insomnia. I did feel a bit uncomfortable initially with the oil temperature, but Dr. Kamal adjusted it perfectly. My sleep has improved since the session.',
      improvements: 'Initial oil temperature could be better calibrated.',
      wouldRecommend: true,
      submittedAt: new Date(2024, 11, 8, 18, 30),
      mood: 'good',
      symptoms: ['sleep-improved', 'anxiety-reduced']
    },
    {
      id: 3,
      sessionId: 's103',
      patientId: 3,
      patientName: 'Meera Singh',
      patientAvatar: '/placeholder-avatar.jpg',
      sessionDate: new Date(2024, 11, 12),
      sessionTime: '11:45',
      sessionType: 'Panchakarma',
      practitioner: 'Dr. Kamal Raj',
      rating: 5,
      comfort: 5,
      effectiveness: 5,
      environment: 5,
      communication: 5,
      overallExperience: 'Excellent',
      feedback:
        'This Panchakarma session was transformative! I feel like a completely new person. My energy levels are through the roof, and my digestive issues have completely resolved. Dr. Kamal is truly gifted.',
      improvements: 'Everything was perfect! No suggestions.',
      wouldRecommend: true,
      submittedAt: new Date(2024, 11, 12, 14, 20),
      mood: 'excellent',
      symptoms: ['energy-increased', 'digestion-improved', 'mental-clarity']
    },
    {
      id: 4,
      sessionId: 's104',
      patientId: 4,
      patientName: 'Amit Kumar',
      patientAvatar: '/placeholder-avatar.jpg',
      sessionDate: new Date(2024, 10, 28),
      sessionTime: '10:00',
      sessionType: 'Yoga Therapy',
      practitioner: 'Dr. Kamal Raj',
      rating: 3,
      comfort: 4,
      effectiveness: 3,
      environment: 4,
      communication: 3,
      overallExperience: 'Average',
      feedback:
        'The yoga session was okay. Some poses were challenging for my current fitness level. I think I need more personalized modifications for my joint issues.',
      improvements: 'More beginner-friendly modifications needed for joint problems.',
      wouldRecommend: false,
      submittedAt: new Date(2024, 10, 28, 12, 15),
      mood: 'neutral',
      symptoms: ['flexibility-improved']
    },
    {
      id: 5,
      sessionId: 's105',
      patientId: 1,
      patientName: 'Priya Sharma',
      patientAvatar: '/placeholder-avatar.jpg',
      sessionDate: new Date(2024, 11, 10),
      sessionTime: '14:30',
      sessionType: 'Abhyanga',
      practitioner: 'Dr. Kamal Raj',
      rating: 4,
      comfort: 4,
      effectiveness: 4,
      environment: 4,
      communication: 5,
      overallExperience: 'Good',
      feedback:
        'Another great session! Consistency in treatment is really showing results. My skin texture continues to improve and stress levels remain low.',
      improvements: 'Perhaps include some breathing exercises during the massage.',
      wouldRecommend: true,
      submittedAt: new Date(2024, 11, 10, 16, 0),
      mood: 'good',
      symptoms: ['stress-reduced', 'skin-improved']
    }
  ];

  const [searchTerm, setSearchTerm] = React.useState('');
  const [patientFilter, setPatientFilter] = React.useState('all');
  const [sessionFilter, setSessionFilter] = React.useState('all');
  const [ratingFilter, setRatingFilter] = React.useState('all');
  const [selectedTab, setSelectedTab] = React.useState('all');

  const patients = [...new Set(feedbackData.map((f) => f.patientName))];
  const sessionTypes = [...new Set(feedbackData.map((f) => f.sessionType))];

  const filteredFeedback = feedbackData.filter((feedback) => {
    const matchesSearch =
      searchTerm === '' ||
      feedback.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.feedback.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.sessionType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPatient = patientFilter === 'all' || feedback.patientName === patientFilter;
    const matchesSession = sessionFilter === 'all' || feedback.sessionType === sessionFilter;
    const matchesRating =
      ratingFilter === 'all' ||
      (ratingFilter === '5' && feedback.rating === 5) ||
      (ratingFilter === '4' && feedback.rating === 4) ||
      (ratingFilter === '3' && feedback.rating <= 3);

    return matchesSearch && matchesPatient && matchesSession && matchesRating;
  });

  const getRatingColor = (rating) => {
    if (rating >= 5) return 'text-green-600';
    if (rating >= 4) return 'text-blue-600';
    if (rating >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMoodIcon = (mood) => {
    switch (mood) {
      case 'excellent':
        return <Smile className="w-5 h-5 text-green-500" />;
      case 'good':
        return <Smile className="w-5 h-5 text-blue-500" />;
      case 'neutral':
        return <Meh className="w-5 h-5 text-yellow-500" />;
      case 'poor':
        return <Frown className="w-5 h-5 text-red-500" />;
      default:
        return <Meh className="w-5 h-5 text-gray-500" />;
    }
  };

  const getOverallStats = () => {
    const total = feedbackData.length;
    const avgRating = (feedbackData.reduce((sum, f) => sum + f.rating, 0) / total).toFixed(1);
    const recommended = feedbackData.filter((f) => f.wouldRecommend).length;
    const recommendationRate = ((recommended / total) * 100).toFixed(1);
    return { total, avgRating, recommendationRate };
  };

  const stats = getOverallStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-emerald-900 mb-2">Session Feedback Viewer</h1>
            <p className="text-emerald-600">Review and analyze patient feedback from therapy sessions</p>
          </div>
          <Button
            onClick={() => onPageChange('practitioner-dashboard')}
            variant="outline"
            className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm border-emerald-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-600 text-sm font-medium">Total Feedback</p>
                  <p className="text-2xl font-bold text-emerald-900">{stats.total}</p>
                </div>
                <div className="bg-emerald-100 p-3 rounded-full">
                  <MessageSquare className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Average Rating</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-2xl font-bold text-blue-900">{stats.avgRating}</p>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            parseFloat(stats.avgRating) >= star ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Star className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Would Recommend</p>
                  <p className="text-2xl font-bold text-purple-900">{stats.recommendationRate}%</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Controls */}
        <Card className="bg-white/90 backdrop-blur-sm border-emerald-200 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search feedback, patient, or session..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>

                <Select value={patientFilter} onValueChange={setPatientFilter}>
                  <SelectTrigger className="w-48">
                    <User className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="All Patients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Patients</SelectItem>
                    {patients.map((patient) => (
                      <SelectItem key={patient} value={patient}>
                        {patient}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sessionFilter} onValueChange={setSessionFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="All Sessions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sessions</SelectItem>
                    {sessionTypes.map((session) => (
                      <SelectItem key={session} value={session}>
                        {session}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                  <SelectTrigger className="w-32">
                    <Star className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="All Ratings" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4+ Stars</SelectItem>
                    <SelectItem value="3">3+ Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feedback List */}
        <div className="space-y-6">
          {filteredFeedback.length === 0 ? (
            <Card className="bg-white/90 backdrop-blur-sm border-gray-200">
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback found</h3>
                <p className="text-gray-600">No feedback matches your current search criteria.</p>
              </CardContent>
            </Card>
          ) : (
            filteredFeedback
              .sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime())
              .map((feedback) => (
                <Card key={feedback.id} className="bg-white/90 backdrop-blur-sm border-emerald-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={feedback.patientAvatar} />
                          <AvatarFallback className="bg-emerald-100 text-emerald-700">
                            {feedback.patientName
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-gray-900">{feedback.patientName}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {feedback.sessionDate.toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{feedback.sessionTime}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {feedback.sessionType}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {getMoodIcon(feedback.mood)}
                        <div className="flex items-center space-x-1">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  feedback.rating >= star ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className={`font-medium ${getRatingColor(feedback.rating)}`}>
                            {feedback.rating}/5
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Detailed Ratings</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Comfort</span>
                            <div className="flex items-center space-x-2">
                              <Progress value={feedback.comfort * 20} className="w-16 h-2" />
                              <span className="text-sm font-medium">{feedback.comfort}/5</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Effectiveness</span>
                            <div className="flex items-center space-x-2">
                              <Progress value={feedback.effectiveness * 20} className="w-16 h-2" />
                              <span className="text-sm font-medium">{feedback.effectiveness}/5</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Environment</span>
                            <div className="flex items-center space-x-2">
                              <Progress value={feedback.environment * 20} className="w-16 h-2" />
                              <span className="text-sm font-medium">{feedback.environment}/5</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Communication</span>
                            <div className="flex items-center space-x-2">
                              <Progress value={feedback.communication * 20} className="w-16 h-2" />
                              <span className="text-sm font-medium">{feedback.communication}/5</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Symptoms & Improvements</h4>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {feedback.symptoms.map((symptom, index) => (
                            <Badge key={index} className="bg-green-100 text-green-800" variant="outline">
                              {symptom.replace('-', ' ')}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Would Recommend:</span>
                          <Badge
                            className={feedback.wouldRecommend ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                            variant="outline"
                          >
                            {feedback.wouldRecommend ? 'Yes' : 'No'}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Patient Feedback</h4>
                        <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{feedback.feedback}</p>
                      </div>

                      {feedback.improvements && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Suggested Improvements</h4>
                          <p className="text-gray-700 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                            {feedback.improvements}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                      <span className="text-xs text-gray-500">
                        Submitted:{' '}
                        {feedback.submittedAt.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      <Badge className="bg-emerald-100 text-emerald-800" variant="outline">
                        Session ID: {feedback.sessionId}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
