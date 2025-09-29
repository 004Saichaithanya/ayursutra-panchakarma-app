import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  Brain,
  TrendingUp,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Target,
  BarChart3,
  Zap,
  Star,
  ArrowRight,
  Calendar,
  Heart
} from 'lucide-react';

/**
 * @param {{ onPageChange: (page: string) => void }} props
 */
export function AIRecommendations({ onPageChange }) {
  const aiInsights = {
    confidence: 92,
    dataPoints: 1247,
    patientsAnalyzed: 156,
    successRate: 88
  };

  const recommendations = [
    {
      id: 1,
      type: 'treatment',
      priority: 'high',
      title: 'Extend Abhyanga Duration for Vata Patients',
      description:
        'Analysis shows 23% better outcomes when Abhyanga sessions are extended from 45 to 60 minutes for Vata-dominant patients.',
      confidence: 94,
      evidence: '89 patient cases analyzed',
      expectedImprovement: '15-25%',
      implementation: 'Immediate',
      affectedPatients: 12,
      category: 'Therapy Optimization'
    },
    {
      id: 2,
      type: 'nutrition',
      priority: 'medium',
      title: 'Pre-treatment Ghee Timing Adjustment',
      description:
        'Patients consuming medicated ghee 2 hours before therapy show better absorption and reduced side effects.',
      confidence: 87,
      evidence: '134 treatment sessions',
      expectedImprovement: '18-22%',
      implementation: 'Next week',
      affectedPatients: 8,
      category: 'Nutrition Protocol'
    },
    {
      id: 3,
      type: 'schedule',
      priority: 'high',
      title: 'Optimal Session Spacing for Pitta Types',
      description:
        'Pitta-dominant patients benefit from 48-hour gaps between intensive treatments instead of daily sessions.',
      confidence: 91,
      evidence: '67 patient schedules',
      expectedImprovement: '20-28%',
      implementation: 'Gradual rollout',
      affectedPatients: 15,
      category: 'Scheduling'
    },
    {
      id: 4,
      type: 'wellness',
      priority: 'low',
      title: 'Evening Yoga Integration',
      description:
        'Adding 15-minute evening yoga sessions improves sleep quality by 32% across all dosha types.',
      confidence: 89,
      evidence: '203 sleep tracking records',
      expectedImprovement: '25-35%',
      implementation: 'Next month',
      affectedPatients: 24,
      category: 'Lifestyle Enhancement'
    }
  ];

  const patientSpecificRecommendations = [
    {
      patientName: 'Priya Sharma',
      patientId: 'PS001',
      dosha: 'Vata-Pitta',
      recommendations: [
        {
          type: 'Increase oil temperature by 2-3°C for better absorption',
          priority: 'medium',
          reason: 'Lower body temperature detected in recent sessions'
        },
        {
          type: 'Add 10 minutes of pranayama post-treatment',
          priority: 'low',
          reason: 'Stress markers elevated in feedback data'
        }
      ]
    },
    {
      patientName: 'Raj Kumar',
      patientId: 'RK002',
      dosha: 'Kapha-Vata',
      recommendations: [
        {
          type: 'Reduce treatment intensity by 15%',
          priority: 'high',
          reason: 'Fatigue scores increasing over past 3 sessions'
        },
        {
          type: 'Incorporate dry brushing before oil treatments',
          priority: 'medium',
          reason: 'Lymphatic circulation showing slower response'
        }
      ]
    }
  ];

  const trendingInsights = [
    {
      title: 'Seasonal Effectiveness Patterns',
      description: 'Detox treatments show 18% higher success rates during autumn months',
      icon: Calendar,
      trend: 'up',
      impact: 'high'
    },
    {
      title: 'Age-Based Response Variations',
      description: 'Patients 35+ respond better to gentler, longer-duration therapies',
      icon: Users,
      trend: 'up',
      impact: 'medium'
    },
    {
      title: 'Feedback Correlation Discovery',
      description: 'Sleep quality improvements correlate strongly with digestive health gains',
      icon: Heart,
      trend: 'stable',
      impact: 'high'
    }
  ];

  const implementationHistory = [
    {
      date: '2 weeks ago',
      recommendation: 'Adjusted meal timing protocols',
      result: '+12% patient satisfaction',
      status: 'successful'
    },
    {
      date: '1 month ago',
      recommendation: 'Introduced pre-session breathing exercises',
      result: '+8% stress reduction',
      status: 'successful'
    },
    {
      date: '6 weeks ago',
      recommendation: 'Modified oil selection criteria',
      result: '+15% skin absorption rates',
      status: 'successful'
    }
  ];

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">AI-Powered Therapy Recommendations</h1>
        <p className="text-indigo-100 mb-6">
          Data-driven insights to optimize treatment outcomes and personalize patient care
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <Brain className="w-8 h-8 mx-auto mb-2" />
            <p className="text-indigo-100">AI Confidence</p>
            <p className="text-2xl font-bold">{aiInsights.confidence}%</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <BarChart3 className="w-8 h-8 mx-auto mb-2" />
            <p className="text-indigo-100">Data Points</p>
            <p className="text-2xl font-bold">{aiInsights.dataPoints.toLocaleString()}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2" />
            <p className="text-indigo-100">Patients Analyzed</p>
            <p className="text-2xl font-bold">{aiInsights.patientsAnalyzed}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <Target className="w-8 h-8 mx-auto mb-2" />
            <p className="text-indigo-100">Success Rate</p>
            <p className="text-2xl font-bold">{aiInsights.successRate}%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column - Main Recommendations */}
        <div className="xl:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="w-5 h-5 text-indigo-600" />
                <span>Treatment Protocol Recommendations</span>
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                AI-analyzed suggestions based on patient outcomes and treatment data
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className={`border rounded-xl p-6 ${
                    rec.priority === 'high'
                      ? 'border-red-200 bg-red-50'
                      : rec.priority === 'medium'
                      ? 'border-yellow-200 bg-yellow-50'
                      : 'border-blue-200 bg-blue-50'
                  } hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-medium text-gray-900">{rec.title}</h3>
                        <Badge
                          className={
                            rec.priority === 'high'
                              ? 'bg-red-100 text-red-700'
                              : rec.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-blue-100 text-blue-700'
                          }
                        >
                          {rec.priority} priority
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {rec.category}
                        </Badge>
                      </div>
                      <p className="text-gray-700 mb-4">{rec.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500">Confidence</p>
                          <div className="flex items-center space-x-2">
                            <Progress value={rec.confidence} className="h-2 flex-1" />
                            <span className="text-sm font-medium">{rec.confidence}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Expected Improvement</p>
                          <p className="text-sm font-medium text-green-600">
                            {rec.expectedImprovement}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Affected Patients</p>
                          <p className="text-sm font-medium">{rec.affectedPatients} patients</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Implementation</p>
                          <p className="text-sm font-medium">{rec.implementation}</p>
                        </div>
                      </div>

                      <p className="text-xs text-gray-600 mb-4">
                        <strong>Evidence:</strong> {rec.evidence}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Implement
                    </Button>
                    <Button variant="outline" size="sm" className="border-indigo-200 text-indigo-600">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="border-indigo-200 text-indigo-600">
                      Schedule Review
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Patient-Specific Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-indigo-600" />
                <span>Patient-Specific Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {patientSpecificRecommendations.map((patient, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar>
                      <AvatarFallback className="bg-indigo-100 text-indigo-700">
                        {patient.patientName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-gray-900">{patient.patientName}</h3>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-gray-600">ID: {patient.patientId}</p>
                        <Badge variant="outline" className="text-xs">
                          {patient.dosha}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {patient.recommendations.map((rec, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-lg ${
                          rec.priority === 'high'
                            ? 'bg-red-50 border border-red-200'
                            : rec.priority === 'medium'
                            ? 'bg-yellow-50 border border-yellow-200'
                            : 'bg-blue-50 border border-blue-200'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 mb-1">{rec.type}</p>
                            <p className="text-sm text-gray-600">{rec.reason}</p>
                          </div>
                          <Badge
                            className={
                              rec.priority === 'high'
                                ? 'bg-red-100 text-red-700'
                                : rec.priority === 'medium'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-blue-100 text-blue-700'
                            }
                          >
                            {rec.priority}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-3 mt-4">
                    <Button size="sm" variant="outline" className="border-indigo-200 text-indigo-600">
                      Apply to Patient
                    </Button>
                    <Button size="sm" variant="outline" className="border-indigo-200 text-indigo-600">
                      View Full Profile
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Trending Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span>Trending Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {trendingInsights.map((insight, index) => {
                const Icon = insight.icon;
                return (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Icon className="w-6 h-6 text-indigo-600 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{insight.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                        <div className="flex items-center space-x-2">
                          <Badge
                            className={
                              insight.impact === 'high'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }
                          >
                            {insight.impact} impact
                          </Badge>
                          <div className="flex items-center space-x-1">
                            {insight.trend === 'up' ? (
                              <TrendingUp className="w-3 h-3 text-green-500" />
                            ) : (
                              <BarChart3 className="w-3 h-3 text-gray-500" />
                            )}
                            <span className="text-xs text-gray-500">trending</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Implementation History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-indigo-600" />
                <span>Implementation History</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {implementationHistory.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-green-900">{item.recommendation}</p>
                    <p className="text-sm text-green-700 mt-1">{item.result}</p>
                    <p className="text-xs text-green-600 mt-2">{item.date}</p>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                size="sm"
                className="w-full border-indigo-200 text-indigo-600 hover:bg-indigo-50"
              >
                View Full History
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>AI Analysis Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                onClick={() => onPageChange('ai-insights')}
                className="w-full justify-start space-x-3 border-indigo-200 text-indigo-700 hover:bg-indigo-50"
              >
                <Brain className="w-5 h-5" />
                <span>Advanced Analytics</span>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start space-x-3 border-indigo-200 text-indigo-700 hover:bg-indigo-50"
              >
                <Zap className="w-5 h-5" />
                <span>Generate New Insights</span>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start space-x-3 border-indigo-200 text-indigo-700 hover:bg-indigo-50"
              >
                <Target className="w-5 h-5" />
                <span>Treatment Predictor</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
