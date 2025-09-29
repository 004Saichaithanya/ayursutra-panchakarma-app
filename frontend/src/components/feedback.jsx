import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Star, ThumbsUp, ThumbsDown, Heart, Zap, CheckCircle, Send } from 'lucide-react';

/**
 * @param {{ 
 *  isOpen: boolean, 
 *  onClose: () => void, 
 *  sessionData?: { therapy: string, date: string, practitioner: string } 
 * }} props
 */
export function Feedback({ isOpen, onClose, sessionData }) {
  const [rating, setRating] = React.useState(0);
  const [mood, setMood] = React.useState('');
  const [energy, setEnergy] = React.useState(0);
  const [symptoms, setSymptoms] = React.useState('');
  const [sideEffects, setSideEffects] = React.useState('');
  const [comments, setComments] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const moods = [
    { label: 'Excellent', emoji: '😊', value: 'excellent' },
    { label: 'Very Good', emoji: '😌', value: 'very-good' },
    { label: 'Good', emoji: '🙂', value: 'good' },
    { label: 'Fair', emoji: '😐', value: 'fair' },
    { label: 'Poor', emoji: '😟', value: 'poor' }
  ];

  const handleSubmit = () => {
    console.log('Feedback submitted:', {
      rating,
      mood,
      energy,
      symptoms,
      sideEffects,
      comments,
      sessionData
    });

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setRating(0);
      setMood('');
      setEnergy(0);
      setSymptoms('');
      setSideEffects('');
      setComments('');
      onClose();
    }, 2000);
  };

  if (submitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600">
              Your feedback has been submitted successfully. This will help us improve your treatment
              experience.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Session Feedback</DialogTitle>
          {sessionData && (
            <div className="text-sm text-gray-600 mt-2">
              <p>
                {sessionData.therapy} • {sessionData.date}
              </p>
              <p>with {sessionData.practitioner}</p>
            </div>
          )}
        </DialogHeader>

        <div className="space-y-6">
          {/* Overall Rating */}
          <div>
            <label className="block font-medium text-gray-900 mb-3">Overall Session Rating *</label>
            <div className="flex items-center space-x-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setRating(index + 1)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-8 h-8 ${
                      index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300 hover:text-yellow-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-3 text-sm text-gray-600">{rating > 0 && `${rating}/5`}</span>
            </div>
          </div>

          {/* Mood Assessment */}
          <div>
            <label className="block font-medium text-gray-900 mb-3">
              How do you feel after the session? *
            </label>
            <div className="grid grid-cols-5 gap-3">
              {moods.map((moodOption) => (
                <button
                  key={moodOption.value}
                  onClick={() => setMood(moodOption.value)}
                  className={`p-4 rounded-lg border-2 text-center transition-colors ${
                    mood === moodOption.value ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{moodOption.emoji}</div>
                  <div className="text-xs">{moodOption.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Energy Level */}
          <div>
            <label className="block font-medium text-gray-900 mb-3">Energy Level (1-10) *</label>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">Low</span>
              <div className="flex-1 flex space-x-1">
                {Array.from({ length: 10 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setEnergy(index + 1)}
                    className={`flex-1 h-8 rounded transition-colors ${
                      index < energy ? 'bg-emerald-500' : 'bg-gray-200 hover:bg-emerald-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">High</span>
              <span className="ml-3 font-medium">{energy}/10</span>
            </div>
          </div>

          {/* Symptoms */}
          <div>
            <label className="block font-medium text-gray-900 mb-3">
              How are your symptoms after the session?
            </label>
            <Textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Describe any changes in your symptoms, pain levels, or overall condition..."
              rows={3}
            />
          </div>

          {/* Side Effects */}
          <div>
            <label className="block font-medium text-gray-900 mb-3">Any side effects or discomfort?</label>
            <Textarea
              value={sideEffects}
              onChange={(e) => setSideEffects(e.target.value)}
              placeholder="Please mention any discomfort, unusual sensations, or side effects you experienced..."
              rows={3}
            />
          </div>

          {/* Additional Comments */}
          <div>
            <label className="block font-medium text-gray-900 mb-3">Additional Comments</label>
            <Textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Any other feedback, suggestions, or comments about your session..."
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <div className="flex space-x-3 pt-4">
            <Button
              onClick={handleSubmit}
              disabled={rating === 0 || mood === '' || energy === 0}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Feedback
            </Button>
            <Button variant="outline" onClick={onClose} className="border-gray-300">
              Cancel
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Your feedback helps us provide better care and will be shared with your practitioner.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
