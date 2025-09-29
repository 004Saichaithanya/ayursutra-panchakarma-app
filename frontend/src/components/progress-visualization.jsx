import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  TrendingUp,
  Calendar,
  Heart,
  Droplets,
  Activity,
  Target,
  ArrowUp,
  ArrowDown,
  BarChart3,
  LineChart,
  CheckCircle
} from 'lucide-react';

/**
 * @param {{ onPageChange: (page: string) => void }} props
 */
export function ProgressVisualization({ onPageChange }) {
  const treatmentProgress = {
    currentDay: 5,
    totalDays: 14,
    percentage: 35,
    phase: 'Purvakarma (Preparation Phase)',
    nextPhase: 'Pradhanakarma (Main Treatment)',
    daysToNext: 2
  };

  const healthMetrics = [
    {
      name: 'Energy Level',
      current: 85,
      previous: 72,
      target: 90,
      trend: 'up',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      icon: Heart
    },
    {
      name: 'Stress Level',
      current: 35,
      previous: 48,
      target: 25,
      trend: 'down',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      icon: Activity
    },
    {
      name: 'Sleep Quality',
      current: 88,
      previous: 75,
      target: 90,
      trend: 'up',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      icon: Droplets
    },
    {
      name: 'Digestive Health',
      current: 78,
      previous: 65,
      target: 85,
      trend: 'up',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      icon: Target
    }
  ];

  const weeklyData = [
    { week: 'Week 1', energy: 65, stress: 55, sleep: 70, digestion: 60 },
    { week: 'Week 2', energy: 85, stress: 35, sleep: 88, digestion: 78 }
  ];

  const milestones = [
    {
      day: 1,
      title: 'Initial Assessment',
      status: 'completed',
      description: 'Comprehensive dosha analysis and treatment plan creation'
    },
    {
      day: 3,
      title: 'Dietary Adjustments',
      status: 'completed',
      description: 'Personalized nutrition plan implementation'
    },
    {
      day: 5,
      title: 'First Therapy Session',
      status: 'current',
      description: 'Begin Abhyanga and oil treatments'
    },
    {
      day: 7,
      title: 'Mid-Phase Review',
      status: 'upcoming',
      description: 'Progress evaluation and treatment adjustments'
    },
    {
      day: 10,
      title: 'Main Treatment Phase',
      status: 'upcoming',
      description: 'Intensive Panchakarma procedures'
    },
    {
      day: 14,
      title: 'Treatment Completion',
      status: 'upcoming',
      description: 'Final assessment and post-treatment plan'
    }
  ];

  const symptoms = [
    { name: 'Joint Stiffness', week1: 7, week2: 4, improvement: 43 },
    { name: 'Mental Fatigue', week1: 8, week2: 3, improvement: 63 },
    { name: 'Digestive Issues', week1: 6, week2: 2, improvement: 67 },
    { name: 'Sleep Disturbance', week1: 7, week2: 2, improvement: 71 }
  ];

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-teal-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Progress Visualization</h1>
        <p className="text-blue-100 mb-6">Track your healing journey with detailed analytics and insights</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <Calendar className="w-8 h-8 mb-2" />
            <p className="text-blue-100">Current Day</p>
            <p className="text-2xl font-bold">
              {treatmentProgress.currentDay} of {treatmentProgress.totalDays}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <TrendingUp className="w-8 h-8 mb-2" />
            <p className="text-blue-100">Overall Progress</p>
            <p className="text-2xl font-bold">{treatmentProgress.percentage}%</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <Target className="w-8 h-8 mb-2" />
            <p className="text-blue-100">Current Phase</p>
            <p className="font-bold text-sm">Purvakarma</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <CheckCircle className="w-8 h-8 mb-2" />
            <p className="text-blue-100">Wellness Score</p>
            <p className="text-2xl font-bold">8.5/10</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="xl:col-span-2 space-y-8">
          {/* Treatment Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>Treatment Timeline</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Treatment Progress</span>
                    <span>
                      Day {treatmentProgress.currentDay} of {treatmentProgress.totalDays}
                    </span>
                  </div>
                  <Progress value={treatmentProgress.percentage} className="h-4" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{treatmentProgress.phase}</span>
                    <span>
                      {treatmentProgress.daysToNext} days to {treatmentProgress.nextPhase}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {milestones.map((milestone) => (
                    <div key={milestone.day} className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-4 h-4 rounded-full ${
                            milestone.status === 'completed'
                              ? 'bg-green-500'
                              : milestone.status === 'current'
                              ? 'bg-blue-500 animate-pulse'
                              : 'bg-gray-300'
                          }`}
                        />
                        {milestone.day !== 14 && <div className="w-px h-12 bg-gray-200 mt-2" />}
                      </div>

                      <div className="flex-1 pb-8">
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="font-medium text-gray-900">
                            Day {milestone.day}: {milestone.title}
                          </h3>
                          <Badge
                            className={
                              milestone.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : milestone.status === 'current'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-600'
                            }
                          >
                            {milestone.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health Metrics Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span>Health Metrics Over Time</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {healthMetrics.map((metric) => {
                    const Icon = metric.icon;
                    return (
                      <div key={metric.name} className={`p-4 rounded-xl ${metric.bgColor}`}>
                        <Icon className={`w-6 h-6 mb-2 ${metric.color}`} />
                        <p className="text-sm font-medium text-gray-900">{metric.name}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <p className="text-2xl font-bold text-gray-900">{metric.current}%</p>
                          <div className="flex items-center space-x-1">
                            {metric.trend === 'up' ? (
                              <ArrowUp className="w-4 h-4 text-green-500" />
                            ) : (
                              <ArrowDown className="w-4 h-4 text-red-500" />
                            )}
                            <span
                              className={`text-xs ${
                                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                              }`}
                            >
                              {Math.abs(metric.current - metric.previous)}%
                            </span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Current</span>
                            <span>Target: {metric.target}%</span>
                          </div>
                          <Progress value={metric.current} className="h-2" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Weekly Comparison */}
                <div className="mt-8">
                  <h3 className="font-medium text-gray-900 mb-4">Weekly Comparison</h3>
                  <div className="space-y-4">
                    {Object.keys(weeklyData[0])
                      .filter((key) => key !== 'week')
                      .map((metric) => (
                        <div key={metric} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize">{metric}</span>
                            <span className="text-gray-600">
                              Week 1: {weeklyData[0][metric]}% → Week 2: {weeklyData[1][metric]}%
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Progress value={weeklyData[0][metric]} className="h-2" />
                              <span className="text-xs text-gray-500">Week 1</span>
                            </div>
                            <div>
                              <Progress value={weeklyData[1][metric]} className="h-2" />
                              <span className="text-xs text-gray-500">Week 2</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Symptom Improvement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span>Symptom Improvement</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {symptoms.map((symptom) => (
                <div key={symptom.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{symptom.name}</span>
                    <Badge className="bg-green-100 text-green-700">-{symptom.improvement}%</Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Week 1: {symptom.week1}/10</span>
                      <span>Week 2: {symptom.week2}/10</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <Progress value={symptom.week1 * 10} className="h-2 bg-red-100" />
                      <Progress value={symptom.week2 * 10} className="h-2 bg-green-100" />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Treatment Phases */}
          <Card>
            <CardHeader>
              <CardTitle>Treatment Phases</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-green-900">Purvakarma</h3>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm text-green-700">Preparation phase completed successfully</p>
                <p className="text-xs text-green-600 mt-1">Days 1-3</p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-blue-900">Pradhan Karma</h3>
                  <div className="w-5 h-5 bg-blue-500 rounded-full animate-pulse" />
                </div>
                <p className="text-sm text-blue-700">Main treatment phase in progress</p>
                <p className="text-xs text-blue-600 mt-1">Days 4-10 (Current)</p>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">Paschat Karma</h3>
                  <div className="w-5 h-5 bg-gray-300 rounded-full" />
                </div>
                <p className="text-sm text-gray-700">Recovery and rejuvenation phase</p>
                <p className="text-xs text-gray-600 mt-1">Days 11-14</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Insights */}
          <Card>
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Positive Trend</h4>
                <p className="text-sm text-blue-700">
                  Your energy levels have improved by 18% since treatment began. Continue with current
                  therapy schedule.
                </p>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Milestone Reached</h4>
                <p className="text-sm text-green-700">
                  Sleep quality has exceeded target levels. Excellent progress in stress management.
                </p>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h4 className="font-medium text-amber-900 mb-2">Recommendation</h4>
                <p className="text-sm text-amber-700">
                  Consider adding meditation to enhance digestive health improvements.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Export Options */}
          <Card>
            <CardHeader>
              <CardTitle>Export Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start space-x-3">
                <LineChart className="w-5 h-5" />
                <span>Download Report PDF</span>
              </Button>
              <Button variant="outline" className="w-full justify-start space-x-3">
                <BarChart3 className="w-5 h-5" />
                <span>Export Data CSV</span>
              </Button>
              <Button variant="outline" className="w-full justify-start space-x-3">
                <Calendar className="w-5 h-5" />
                <span>Share with Practitioner</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
