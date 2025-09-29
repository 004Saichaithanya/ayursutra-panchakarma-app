import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import {
  ArrowLeft,
  Star,
  Send,
  Check,
  Calendar,
  Clock,
  Heart,
  Smile,
  Meh,
  Frown,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Award
} from 'lucide-react';

/**
 * @param {{ onPageChange: (page: string) => void }} props
 */
export function PatientFeedbackEnhanced({ onPageChange }) {
  // Mock data (kept inside for a self-contained example)
  const previousSessions = [
    {
      id: 1,
      date: new Date(2024, 11, 13),
      time: '14:30',
      type: 'Abhyanga',
      practitioner: 'Dr. Kamal Raj',
      status: 'completed',
      feedbackSubmitted: true,
      rating: 5
    },
    {
      id: 2,
      date: new Date(2024, 11, 10),
      time: '14:30',
      type: 'Abhyanga',
      practitioner: 'Dr. Kamal Raj',
      status: 'completed',
      feedbackSubmitted: true,
      rating: 4
    },
    {
      id: 3,
      date: new Date(2024, 11, 7),
      time: '14:30',
      type: 'Consultation',
      practitioner: 'Dr. Kamal Raj',
      status: 'completed',
      feedbackSubmitted: false,
      rating: null
    }
  ];

  const submittedFeedback = [
    {
      id: 1,
      sessionId: 1,
      sessionDate: new Date(2024, 11, 13),
      sessionType: 'Abhyanga',
      rating: 5,
      comfort: 5,
      effectiveness: 5,
      environment: 4,
      communication: 5,
      overallExperience: 'Excellent',
      feedback:
        'The session was absolutely wonderful! I felt so relaxed and my stress levels dropped significantly.',
      improvements: 'Maybe slightly warmer room temperature would be perfect.',
      wouldRecommend: true,
      mood: 'excellent',
      symptoms: ['stress-reduced', 'sleep-improved', 'energy-increased'],
      submittedAt: new Date(2024, 11, 13, 16, 45),
      practitionerResponse:
        "Thank you for the wonderful feedback! I'm so glad the treatment is helping with your stress levels. I'll make sure the room temperature is adjusted for your next session."
    },
    {
      id: 2,
      sessionId: 2,
      sessionDate: new Date(2024, 11, 10),
      sessionType: 'Abhyanga',
      rating: 4,
      comfort: 4,
      effectiveness: 4,
      environment: 4,
      communication: 5,
      overallExperience: 'Good',
      feedback:
        'Great session as always. Feeling much more relaxed and my skin is improving.',
      improvements: 'No specific suggestions.',
      wouldRecommend: true,
      mood: 'good',
      symptoms: ['stress-reduced', 'skin-improved'],
      submittedAt: new Date(2024, 11, 10, 16, 0),
      practitionerResponse:
        'Wonderful to hear about your continued improvement! Keep up the great work with the home care routine.'
    }
  ];

  const [selectedSession, setSelectedSession] = React.useState(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(1);
  const [feedback, setFeedback] = React.useState({
    rating: 0,
    comfort: 0,
    effectiveness: 0,
    environment: 0,
    communication: 0,
    overallExperience: '',
    feedback: '',
    improvements: '',
    wouldRecommend: true,
    mood: '',
    symptoms: [],
    additionalComments: ''
  });

  const symptomOptions = [
    { id: 'stress-reduced', label: 'Stress Reduced' },
    { id: 'sleep-improved', label: 'Sleep Improved' },
    { id: 'energy-increased', label: 'Energy Increased' },
    { id: 'pain-reduced', label: 'Pain Reduced' },
    { id: 'flexibility-improved', label: 'Flexibility Improved' },
    { id: 'digestion-improved', label: 'Digestion Improved' },
    { id: 'skin-improved', label: 'Skin Improved' },
    { id: 'mental-clarity', label: 'Mental Clarity' },
    { id: 'anxiety-reduced', label: 'Anxiety Reduced' },
    { id: 'mood-improved', label: 'Mood Improved' }
  ];

  const handleStartFeedback = (session) => {
    setSelectedSession(session);
    setIsFeedbackOpen(true);
    setCurrentStep(1);
  };

  const handleSymptomChange = (symptomId, checked) => {
    setFeedback((prev) => ({
      ...prev,
      symptoms: checked ? [...prev.symptoms, symptomId] : prev.symptoms.filter((s) => s !== symptomId)
    }));
  };

  const handleSubmitFeedback = () => {
    console.log('Submitting feedback:', { sessionId: selectedSession?.id, feedback });
    setIsFeedbackOpen(false);
    setCurrentStep(1);
    setFeedback({
      rating: 0,
      comfort: 0,
      effectiveness: 0,
      environment: 0,
      communication: 0,
      overallExperience: '',
      feedback: '',
      improvements: '',
      wouldRecommend: true,
      mood: '',
      symptoms: [],
      additionalComments: ''
    });
  };

  const getRatingColor = (rating) => {
    if (rating >= 5) return 'text-green-600';
    if (rating >= 4) return 'text-blue-600';
    if (rating >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMoodIcon = (mood) => {
    switch (mood) {
      case 'excellent':
        return <Smile className="w-6 h-6 text-green-500" />;
      case 'good':
        return <Smile className="w-6 h-6 text-blue-500" />;
      case 'neutral':
        return <Meh className="w-6 h-6 text-yellow-500" />;
      case 'poor':
        return <Frown className="w-6 h-6 text-red-500" />;
      default:
        return <Meh className="w-6 h-6 text-gray-500" />;
    }
  };

  const StarRating = ({ rating, onRatingChange, size = 'md' }) => {
    const starSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-8 h-8' : 'w-6 h-6';
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRatingChange(star)}
            className={`${starSize} transition-colors ${
              rating >= star ? 'text-yellow-400 fill-current' : 'text-gray-300 hover:text-yellow-300'
            }`}
          >
            <Star className="w-full h-full" />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-emerald-900 mb-2">Session Feedback</h1>
            <p className="text-emerald-600">Share your experience and help us improve</p>
          </div>
          <Button
            onClick={() => onPageChange('patient-dashboard')}
            variant="outline"
            className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Feedback */}
          <Card className="bg-white/90 backdrop-blur-sm border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-900 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Pending Feedback
              </CardTitle>
              <CardDescription>Sessions awaiting your feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {previousSessions
                  .filter((session) => !session.feedbackSubmitted)
                  .map((session) => (
                    <div key={session.id} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">{session.type}</h3>
                          <p className="text-sm text-gray-600">with {session.practitioner}</p>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200" variant="outline">
                          Pending
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{session.date.toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{session.time}</span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleStartFeedback(session)}
                          className="bg-emerald-600 hover:bg-emerald-700"
                        >
                          <Star className="w-4 h-4 mr-1" />
                          Rate Session
                        </Button>
                      </div>
                    </div>
                  ))}

                {previousSessions.filter((session) => !session.feedbackSubmitted).length === 0 && (
                  <div className="text-center py-8">
                    <Check className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="font-medium text-gray-900 mb-2">All caught up!</h3>
                    <p className="text-gray-600">You've provided feedback for all recent sessions.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Feedback History */}
          <Card className="bg-white/90 backdrop-blur-sm border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-900 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Feedback History
              </CardTitle>
              <CardDescription>Your previous session feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {submittedFeedback.map((fb) => (
                  <div key={fb.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{fb.sessionType}</h3>
                        <p className="text-sm text-gray-600">{fb.sessionDate.toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getMoodIcon(fb.mood)}
                        <div className="flex items-center space-x-1">
                          <StarRating rating={fb.rating} onRatingChange={() => {}} size="sm" />
                          <span className={`text-sm font-medium ${getRatingColor(fb.rating)}`}>
                            {fb.rating}/5
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">{fb.feedback}</p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {fb.symptoms.map((symptom, index) => (
                        <Badge key={index} className="bg-green-100 text-green-800" variant="outline">
                          {symptom.replace('-', ' ')}
                        </Badge>
                      ))}
                    </div>

                    {fb.practitionerResponse && (
                      <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded">
                        <p className="text-sm font-medium text-emerald-900 mb-1">Practitioner Response:</p>
                        <p className="text-sm text-emerald-800">{fb.practitionerResponse}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feedback Dialog */}
        <Dialog open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Session Feedback - {selectedSession?.type}</DialogTitle>
            </DialogHeader>

            {selectedSession && (
              <div className="space-y-6">
                {/* Progress Indicator */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            currentStep >= step ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {step}
                        </div>
                        {step < 3 && (
                          <div className={`w-12 h-1 mx-2 ${currentStep > step ? 'bg-emerald-600' : 'bg-gray-200'}`} />
                        )}
                      </div>
                    ))}
                  </div>
                  <Badge variant="outline">Step {currentStep} of 3</Badge>
                </div>

                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        How was your {selectedSession.type} session?
                      </h3>
                      <p className="text-gray-600 mb-6">
                        on {selectedSession.date.toLocaleDateString()} at {selectedSession.time}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="text-center">
                        <Label className="text-base font-medium">Overall Rating</Label>
                        <div className="flex justify-center mt-2 mb-4">
                          <StarRating
                            rating={feedback.rating}
                            onRatingChange={(rating) => setFeedback((prev) => ({ ...prev, rating }))}
                            size="lg"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Comfort Level</Label>
                          <div className="flex justify-center mt-1">
                            <StarRating
                              rating={feedback.comfort}
                              onRatingChange={(rating) =>
                                setFeedback((prev) => ({ ...prev, comfort: rating }))
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Treatment Effectiveness</Label>
                          <div className="flex justify-center mt-1">
                            <StarRating
                              rating={feedback.effectiveness}
                              onRatingChange={(rating) =>
                                setFeedback((prev) => ({ ...prev, effectiveness: rating }))
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Environment</Label>
                          <div className="flex justify-center mt-1">
                            <StarRating
                              rating={feedback.environment}
                              onRatingChange={(rating) =>
                                setFeedback((prev) => ({ ...prev, environment: rating }))
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Communication</Label>
                          <div className="flex justify-center mt-1">
                            <StarRating
                              rating={feedback.communication}
                              onRatingChange={(rating) =>
                                setFeedback((prev) => ({ ...prev, communication: rating }))
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <Label>How are you feeling after the session?</Label>
                      <RadioGroup
                        value={feedback.mood}
                        onValueChange={(value) => setFeedback((prev) => ({ ...prev, mood: value }))}
                        className="flex items-center justify-center space-x-6 mt-4"
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <RadioGroupItem value="excellent" id="excellent" className="sr-only" />
                          <label htmlFor="excellent" className="cursor-pointer">
                            <Smile
                              className={`w-12 h-12 ${
                                feedback.mood === 'excellent' ? 'text-green-500' : 'text-gray-300'
                              }`}
                            />
                            <span className="block text-sm text-center mt-1">Excellent</span>
                          </label>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                          <RadioGroupItem value="good" id="good" className="sr-only" />
                          <label htmlFor="good" className="cursor-pointer">
                            <Smile
                              className={`w-12 h-12 ${
                                feedback.mood === 'good' ? 'text-blue-500' : 'text-gray-300'
                              }`}
                            />
                            <span className="block text-sm text-center mt-1">Good</span>
                          </label>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                          <RadioGroupItem value="neutral" id="neutral" className="sr-only" />
                          <label htmlFor="neutral" className="cursor-pointer">
                            <Meh
                              className={`w-12 h-12 ${
                                feedback.mood === 'neutral' ? 'text-yellow-500' : 'text-gray-300'
                              }`}
                            />
                            <span className="block text-sm text-center mt-1">Neutral</span>
                          </label>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                          <RadioGroupItem value="poor" id="poor" className="sr-only" />
                          <label htmlFor="poor" className="cursor-pointer">
                            <Frown
                              className={`w-12 h-12 ${
                                feedback.mood === 'poor' ? 'text-red-500' : 'text-gray-300'
                              }`}
                            />
                            <span className="block text-sm text-center mt-1">Poor</span>
                          </label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>What improvements did you notice? (Select all that apply)</Label>
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        {symptomOptions.map((symptom) => (
                          <div key={symptom.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={symptom.id}
                              checked={feedback.symptoms.includes(symptom.id)}
                              onCheckedChange={(checked) => handleSymptomChange(symptom.id, !!checked)}
                            />
                            <Label htmlFor={symptom.id} className="text-sm">
                              {symptom.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Would you recommend this treatment to others?</Label>
                      <RadioGroup
                        value={feedback.wouldRecommend ? 'yes' : 'no'}
                        onValueChange={(value) =>
                          setFeedback((prev) => ({ ...prev, wouldRecommend: value === 'yes' }))
                        }
                        className="flex items-center space-x-6 mt-3"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="recommend-yes" />
                          <Label htmlFor="recommend-yes" className="flex items-center space-x-2">
                            <ThumbsUp className="w-4 h-4 text-green-500" />
                            <span>Yes</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="recommend-no" />
                          <Label htmlFor="recommend-no" className="flex items-center space-x-2">
                            <ThumbsDown className="w-4 h-4 text-red-500" />
                            <span>No</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="feedback">Tell us about your experience</Label>
                      <Textarea
                        id="feedback"
                        placeholder="Share your thoughts about the session..."
                        value={feedback.feedback}
                        onChange={(e) => setFeedback((prev) => ({ ...prev, feedback: e.target.value }))}
                        rows={4}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="improvements">Any suggestions for improvement?</Label>
                      <Textarea
                        id="improvements"
                        placeholder="How can we make your experience even better?"
                        value={feedback.improvements}
                        onChange={(e) => setFeedback((prev) => ({ ...prev, improvements: e.target.value }))}
                        rows={3}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="additional">Additional comments (optional)</Label>
                      <Textarea
                        id="additional"
                        placeholder="Anything else you'd like to share?"
                        value={feedback.additionalComments}
                        onChange={(e) =>
                          setFeedback((prev) => ({ ...prev, additionalComments: e.target.value }))
                        }
                        rows={2}
                        className="mt-2"
                      />
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>

                  {currentStep < 3 ? (
                    <Button
                      onClick={() => setCurrentStep(currentStep + 1)}
                      disabled={currentStep === 1 && feedback.rating === 0}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button onClick={handleSubmitFeedback} className="bg-emerald-600 hover:bg-emerald-700">
                      <Send className="w-4 h-4 mr-2" />
                      Submit Feedback
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
