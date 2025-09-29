import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  Play,
  Pause,
  RotateCcw,
  Trophy,
  Target,
  Clock,
  CheckCircle,
  Star,
  Calendar,
  TrendingUp,
  Award,
  Flame
} from 'lucide-react';

/**
 * @param {{ onPageChange: (page: string) => void }} props
 */
export function YogaGuidance({ onPageChange }) {
  const [isSessionActive, setIsSessionActive] = React.useState(false);
  const [currentPose, setCurrentPose] = React.useState(0);
  const [sessionProgress, setSessionProgress] = React.useState(0);

  const todayPoses = [
    {
      name: 'Surya Namaskara',
      duration: '5 minutes',
      difficulty: 'Medium',
      benefits: ['Improves circulation', 'Energizes body', 'Balances Vata'],
      instructions: 'Stand tall, bring palms together at heart center. Breathe deeply and follow the sequence.',
      completed: false
    },
    {
      name: 'Vrikshasana (Tree Pose)',
      duration: '2 minutes',
      difficulty: 'Easy',
      benefits: ['Improves balance', 'Strengthens legs', 'Calms mind'],
      instructions: 'Stand on one leg, place other foot on inner thigh. Balance with hands at heart center.',
      completed: false
    },
    {
      name: 'Bhujangasana (Cobra)',
      duration: '3 minutes',
      difficulty: 'Medium',
      benefits: ['Strengthens spine', 'Opens chest', 'Reduces Kapha'],
      instructions: 'Lie face down, place palms under shoulders. Lift chest while keeping hips grounded.',
      completed: false
    },
    {
      name: "Balasana (Child's Pose)",
      duration: '3 minutes',
      difficulty: 'Easy',
      benefits: ['Relaxes mind', 'Stretches back', 'Reduces stress'],
      instructions: 'Kneel and sit back on heels. Fold forward with arms extended or by your sides.',
      completed: false
    }
  ];

  const weeklyStats = {
    streakDays: 7,
    totalMinutes: 145,
    posesCompleted: 28,
    accuracyScore: 87
  };

  const achievements = [
    { name: '7-Day Streak', icon: Flame, unlocked: true, color: 'text-orange-500' },
    { name: 'Perfect Form', icon: Target, unlocked: true, color: 'text-green-500' },
    { name: 'Early Bird', icon: Trophy, unlocked: true, color: 'text-yellow-500' },
    { name: 'Consistency Master', icon: Award, unlocked: false, color: 'text-gray-400' }
  ];

  const recentSessions = [
    { date: 'Today', poses: 4, duration: 20, score: 92 },
    { date: 'Yesterday', poses: 4, duration: 18, score: 88 },
    { date: '2 days ago', poses: 3, duration: 15, score: 85 },
    { date: '3 days ago', poses: 4, duration: 22, score: 94 }
  ];

  const toggleSession = () => {
    setIsSessionActive((prev) => !prev);
    if (!isSessionActive) {
      const interval = setInterval(() => {
        setSessionProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsSessionActive(false);
            return 0;
          }
          return prev + 1;
        });
      }, 200);
    }
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-8 text-white">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Daily Yoga & Exercise</h1>
          <p className="text-purple-100 mb-6">
            Maintain your wellness journey with personalized yoga practices for your Vata-Pitta constitution.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <Flame className="w-8 h-8 mx-auto mb-2" />
              <p className="text-white/90">Streak</p>
              <p className="text-2xl font-bold">{weeklyStats.streakDays} days</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2" />
              <p className="text-white/90">This Week</p>
              <p className="text-2xl font-bold">{weeklyStats.totalMinutes}min</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <Target className="w-8 h-8 mx-auto mb-2" />
              <p className="text-white/90">Accuracy</p>
              <p className="text-2xl font-bold">{weeklyStats.accuracyScore}%</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2" />
              <p className="text-white/90">Poses Done</p>
              <p className="text-2xl font-bold">{weeklyStats.posesCompleted}</p>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-64 h-64 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1635617240041-c95219c05542?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwbWVkaXRhdGlvbiUyMHBvc2V8ZW58MXx8fHwxNzU4Mzg1NzU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Yoga meditation"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left - Today's Practice */}
        <div className="xl:col-span-2 space-y-8">
          {/* Active Session */}
          {isSessionActive && (
            <Card className="border-2 border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-purple-900">
                  <Play className="w-5 h-5" />
                  <span>Active Session - {todayPoses[currentPose]?.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="relative aspect-video bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-24 h-24 bg-purple-200 rounded-full flex items-center justify-center mx-auto">
                          <div className="w-16 h-16 bg-purple-400 rounded-full animate-pulse" />
                        </div>
                        <p className="text-purple-700 font-medium">Pose Detection Active</p>
                        <p className="text-sm text-purple-600">Maintain the pose for accurate scoring</p>
                      </div>
                    </div>

                    {/* Overlay */}
                    <div className="absolute top-4 left-4 bg-white/90 rounded-lg p-3">
                      <p className="text-sm font-medium">Current Accuracy</p>
                      <p className="text-2xl font-bold text-purple-600">92%</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Session Progress</span>
                      <span className="text-sm text-purple-600">{sessionProgress}%</span>
                    </div>
                    <Progress value={sessionProgress} className="h-3" />
                  </div>

                  <div className="flex space-x-4">
                    <Button onClick={toggleSession} className="bg-purple-600 hover:bg-purple-700">
                      <Pause className="w-4 h-4 mr-2" />
                      Pause Session
                    </Button>
                    <Button variant="outline" className="border-purple-200 text-purple-600">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Restart Pose
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Today's Poses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                <span>Today's Practice Sequence</span>
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                Customized for your Vata-Pitta constitution and current treatment phase
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {todayPoses.map((pose, index) => (
                <div
                  key={index}
                  className={`border rounded-xl p-6 transition-all ${
                    currentPose === index ? 'border-purple-300 bg-purple-50' : 'border-gray-200 hover:border-purple-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-medium text-gray-900">{pose.name}</h3>
                        <Badge
                          className={`${
                            pose.difficulty === 'Easy'
                              ? 'bg-green-100 text-green-700'
                              : pose.difficulty === 'Medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {pose.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{pose.instructions}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{pose.duration}</span>
                        </div>
                      </div>
                    </div>
                    {pose.completed && <CheckCircle className="w-6 h-6 text-green-500" />}
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Benefits:</p>
                    <div className="flex flex-wrap gap-2">
                      {pose.benefits.map((benefit, idx) => (
                        <span key={idx} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    {!isSessionActive ? (
                      <Button
                        onClick={() => {
                          setCurrentPose(index);
                          toggleSession();
                        }}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Pose
                      </Button>
                    ) : (
                      <Button variant="outline" disabled className="border-gray-200 text-gray-400">
                        Session Active
                      </Button>
                    )}
                    <Button variant="outline" className="border-purple-200 text-purple-600">
                      View Instructions
                    </Button>
                  </div>
                </div>
              ))}

              {!isSessionActive && (
                <Button
                  onClick={() => {
                    setCurrentPose(0);
                    toggleSession();
                  }}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  size="lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Complete Session (13 minutes)
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-8">
          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                <span>Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-xl text-center ${
                        achievement.unlocked ? 'bg-gradient-to-br from-yellow-50 to-orange-50' : 'bg-gray-50'
                      }`}
                    >
                      <Icon className={`w-8 h-8 mx-auto mb-2 ${achievement.color}`} />
                      <p className={`text-sm font-medium ${achievement.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                        {achievement.name}
                      </p>
                      {achievement.unlocked && <CheckCircle className="w-4 h-4 text-green-500 mx-auto mt-1" />}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <span>Weekly Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentSessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{session.date}</p>
                    <p className="text-sm text-gray-600">
                      {session.poses} poses • {session.duration} min
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-purple-600">{session.score}%</p>
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(session.score / 20) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Yoga Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start space-x-3 border-purple-200 text-purple-700 hover:bg-purple-50">
                <Play className="w-5 h-5" />
                <span>Breathing Exercises</span>
              </Button>
              <Button variant="outline" className="w-full justify-start space-x-3 border-purple-200 text-purple-700 hover:bg-purple-50">
                <Calendar className="w-5 h-5" />
                <span>Custom Practice Plan</span>
              </Button>
              <Button variant="outline" className="w-full justify-start space-x-3 border-purple-200 text-purple-700 hover:bg-purple-50">
                <Target className="w-5 h-5" />
                <span>Pose Library</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
