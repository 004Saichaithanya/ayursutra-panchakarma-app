import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import {
  ArrowLeft,
  Download,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar as CalendarIcon,
  BarChart3,
  PieChart,
  FileText,
  Filter,
  Activity,
  Clock,
  Star,
  AlertTriangle
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Area,
  AreaChart,
  ComposedChart
} from 'recharts';

/**
 * Enhanced Analytics Dashboard Component
 * @param {Object} props - Component props
 * @param {Function} props.onPageChange - Function to handle page navigation
 */

// Enhanced mock data for weekly analytics
const weeklyAnalyticsData = [
  { 
    week: 'Week 1', 
    completionRate: 85, 
    attendance: 92, 
    avgRating: 4.2, 
    totalSessions: 45,
    abhyanga: 18,
    shirodhara: 12,
    panchakarma: 8,
    yoga: 7
  },
  { 
    week: 'Week 2', 
    completionRate: 88, 
    attendance: 89, 
    avgRating: 4.3, 
    totalSessions: 52,
    abhyanga: 22,
    shirodhara: 15,
    panchakarma: 9,
    yoga: 6
  },
  { 
    week: 'Week 3', 
    completionRate: 92, 
    attendance: 94, 
    avgRating: 4.5, 
    totalSessions: 48,
    abhyanga: 20,
    shirodhara: 13,
    panchakarma: 10,
    yoga: 5
  },
  { 
    week: 'Week 4', 
    completionRate: 90, 
    attendance: 87, 
    avgRating: 4.4, 
    totalSessions: 56,
    abhyanga: 24,
    shirodhara: 16,
    panchakarma: 11,
    yoga: 5
  }
];

// Monthly analytics data
const monthlyTrendsData = [
  { 
    month: 'Jan', 
    improvements: 78, 
    sideEffects: 5, 
    satisfaction: 4.2,
    newPatients: 24,
    completedTreatments: 156,
    avgTreatmentDuration: 12
  },
  { 
    month: 'Feb', 
    improvements: 82, 
    sideEffects: 3, 
    satisfaction: 4.3,
    newPatients: 28,
    completedTreatments: 178,
    avgTreatmentDuration: 11
  },
  { 
    month: 'Mar', 
    improvements: 85, 
    sideEffects: 4, 
    satisfaction: 4.5,
    newPatients: 31,
    completedTreatments: 192,
    avgTreatmentDuration: 10
  },
  { 
    month: 'Apr', 
    improvements: 88, 
    sideEffects: 2, 
    satisfaction: 4.6,
    newPatients: 35,
    completedTreatments: 210,
    avgTreatmentDuration: 9
  },
  { 
    month: 'May', 
    improvements: 91, 
    sideEffects: 3, 
    satisfaction: 4.7,
    newPatients: 42,
    completedTreatments: 234,
    avgTreatmentDuration: 8
  },
  { 
    month: 'Jun', 
    improvements: 89, 
    sideEffects: 4, 
    satisfaction: 4.6,
    newPatients: 38,
    completedTreatments: 218,
    avgTreatmentDuration: 9
  }
];

// Side effects distribution
const sideEffectsData = [
  { name: 'Mild Fatigue', value: 45, color: '#fbbf24' },
  { name: 'Digestive Issues', value: 25, color: '#f59e0b' },
  { name: 'Skin Irritation', value: 15, color: '#d97706' },
  { name: 'Headache', value: 10, color: '#b45309' },
  { name: 'Other', value: 5, color: '#92400e' }
];

// Therapy distribution
const therapyDistribution = [
  { name: 'Abhyanga', sessions: 245, percentage: 35, color: '#10b981' },
  { name: 'Shirodhara', sessions: 196, percentage: 28, color: '#3b82f6' },
  { name: 'Panchakarma', sessions: 154, percentage: 22, color: '#8b5cf6' },
  { name: 'Yoga Therapy', sessions: 105, percentage: 15, color: '#f59e0b' }
];

// Patient-wise analytics data
const patientWiseData = [
  {
    id: 1,
    name: 'Priya Sharma',
    initialScore: 45,
    currentScore: 85,
    improvement: 89,
    sessions: 12,
    therapy: 'Abhyanga',
    startDate: '2024-10-01',
    lastSession: '2024-12-13',
    adherence: 95,
    satisfaction: 4.8,
    sideEffects: 'None'
  },
  {
    id: 2,
    name: 'Raj Patel',
    initialScore: 38,
    currentScore: 65,
    improvement: 71,
    sessions: 8,
    therapy: 'Shirodhara',
    startDate: '2024-11-15',
    lastSession: '2024-12-08',
    adherence: 87,
    satisfaction: 4.2,
    sideEffects: 'Mild fatigue'
  },
  {
    id: 3,
    name: 'Meera Singh',
    initialScore: 42,
    currentScore: 88,
    improvement: 110,
    sessions: 15,
    therapy: 'Panchakarma',
    startDate: '2024-09-20',
    lastSession: '2024-12-12',
    adherence: 98,
    satisfaction: 4.9,
    sideEffects: 'None'
  },
  {
    id: 4,
    name: 'Amit Kumar',
    initialScore: 35,
    currentScore: 58,
    improvement: 66,
    sessions: 6,
    therapy: 'Yoga Therapy',
    startDate: '2024-11-28',
    lastSession: '2024-12-10',
    adherence: 75,
    satisfaction: 3.8,
    sideEffects: 'Joint discomfort'
  },
  {
    id: 5,
    name: 'Sunita Verma',
    initialScore: 48,
    currentScore: 82,
    improvement: 71,
    sessions: 10,
    therapy: 'Abhyanga',
    startDate: '2024-10-15',
    lastSession: '2024-12-11',
    adherence: 92,
    satisfaction: 4.6,
    sideEffects: 'Minor skin sensitivity'
  }
];

export function AnalyticsDashboardEnhanced({ onPageChange }) {
  const [selectedTab, setSelectedTab] = React.useState('weekly');
  const [dateRange, setDateRange] = React.useState('last30days');
  const [therapyFilter, setTherapyFilter] = React.useState('all');
  const [patientFilter, setPatientFilter] = React.useState('all');
  const [startDate, setStartDate] = React.useState(undefined);
  const [endDate, setEndDate] = React.useState(undefined);

  const handleExport = (format) => {
    console.log(`Exporting ${selectedTab} analytics as ${format}`);
    alert(`Exporting ${selectedTab} analytics as ${format.toUpperCase()}...`);
  };

  const getImprovementColor = (improvement) => {
    if (improvement >= 90) return 'text-green-600 bg-green-100';
    if (improvement >= 70) return 'text-blue-600 bg-blue-100';
    if (improvement >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getSideEffectColor = (sideEffect) => {
    if (sideEffect === 'None') return 'text-green-600 bg-green-100';
    if (sideEffect.includes('Mild') || sideEffect.includes('Minor')) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const formatDate = (date) => {
    if (!date) return 'Select date';
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-emerald-900 mb-2">Analytics Dashboard</h1>
            <p className="text-emerald-600">Comprehensive insights and performance metrics</p>
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

        {/* Filters */}
        <Card className="bg-white/90 backdrop-blur-sm border-emerald-200 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Date Range</Label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="w-40 mt-1">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last7days">Last 7 Days</SelectItem>
                      <SelectItem value="last30days">Last 30 Days</SelectItem>
                      <SelectItem value="last3months">Last 3 Months</SelectItem>
                      <SelectItem value="last6months">Last 6 Months</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {dateRange === 'custom' && (
                  <>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-40 mt-1 justify-start text-left">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formatDate(startDate)}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-40 mt-1 justify-start text-left">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formatDate(endDate)}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </>
                )}

                <div>
                  <Label className="text-sm font-medium text-gray-700">Therapy Type</Label>
                  <Select value={therapyFilter} onValueChange={setTherapyFilter}>
                    <SelectTrigger className="w-40 mt-1">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Therapies</SelectItem>
                      <SelectItem value="abhyanga">Abhyanga</SelectItem>
                      <SelectItem value="shirodhara">Shirodhara</SelectItem>
                      <SelectItem value="panchakarma">Panchakarma</SelectItem>
                      <SelectItem value="yoga">Yoga Therapy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Patient</Label>
                  <Select value={patientFilter} onValueChange={setPatientFilter}>
                    <SelectTrigger className="w-40 mt-1">
                      <Users className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Patients</SelectItem>
                      {patientWiseData.map(patient => (
                        <SelectItem key={patient.id} value={patient.name}>
                          {patient.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => handleExport('pdf')}
                  variant="outline"
                  size="sm"
                  className="border-red-300 text-red-700 hover:bg-red-50"
                >
                  <FileText className="w-4 h-4 mr-1" />
                  Export PDF
                </Button>
                <Button
                  onClick={() => handleExport('excel')}
                  variant="outline"
                  size="sm"
                  className="border-green-300 text-green-700 hover:bg-green-50"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Export Excel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="weekly">Weekly Analytics</TabsTrigger>
            <TabsTrigger value="monthly">Monthly Analytics</TabsTrigger>
            <TabsTrigger value="patient-wise">Patient-wise Analytics</TabsTrigger>
          </TabsList>

          {/* Weekly Analytics Tab */}
          <TabsContent value="weekly" className="space-y-6">
            {/* Weekly KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">Avg Completion Rate</p>
                      <p className="text-2xl font-bold text-blue-900">89%</p>
                    </div>
                    <Activity className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-600">+5% from last period</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">Avg Attendance</p>
                      <p className="text-2xl font-bold text-green-900">91%</p>
                    </div>
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-600">+2% from last period</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-yellow-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-600 text-sm font-medium">Avg Rating</p>
                      <p className="text-2xl font-bold text-yellow-900">4.4</p>
                    </div>
                    <Star className="w-8 h-8 text-yellow-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-600">+0.2 from last period</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-sm font-medium">Total Sessions</p>
                      <p className="text-2xl font-bold text-purple-900">201</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-600">+12% from last period</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/90 backdrop-blur-sm border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-emerald-900">Therapy Completion & Attendance</CardTitle>
                  <CardDescription>Weekly performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={weeklyAnalyticsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="completionRate" fill="#10b981" name="Completion Rate %" />
                        <Line type="monotone" dataKey="attendance" stroke="#3b82f6" strokeWidth={3} name="Attendance %" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-emerald-900">Feedback Ratings Trend</CardTitle>
                  <CardDescription>Weekly average ratings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weeklyAnalyticsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis domain={[0, 5]} />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="avgRating" 
                          stroke="#f59e0b" 
                          strokeWidth={3} 
                          name="Average Rating" 
                          dot={{ fill: '#f59e0b', strokeWidth: 2, r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Therapy Distribution */}
            <Card className="bg-white/90 backdrop-blur-sm border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-900">Weekly Therapy Distribution</CardTitle>
                <CardDescription>Breakdown of therapy types by week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyAnalyticsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="abhyanga" stackId="a" fill="#10b981" name="Abhyanga" />
                      <Bar dataKey="shirodhara" stackId="a" fill="#3b82f6" name="Shirodhara" />
                      <Bar dataKey="panchakarma" stackId="a" fill="#8b5cf6" name="Panchakarma" />
                      <Bar dataKey="yoga" stackId="a" fill="#f59e0b" name="Yoga Therapy" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Monthly Analytics Tab */}
          <TabsContent value="monthly" className="space-y-6">
            {/* Monthly Trends */}
            <Card className="bg-white/90 backdrop-blur-sm border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-900">Monthly Improvement Trends</CardTitle>
                <CardDescription>Overall patient improvements and satisfaction over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={monthlyTrendsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="improvements" fill="#10b981" name="Improvement Rate %" />
                      <Line type="monotone" dataKey="satisfaction" stroke="#f59e0b" strokeWidth={3} name="Satisfaction (x20)" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Side Effects Distribution */}
              <Card className="bg-white/90 backdrop-blur-sm border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-emerald-900">Side Effects Reports</CardTitle>
                  <CardDescription>Distribution of reported side effects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={sideEffectsData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {sideEffectsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Treatment Completion */}
              <Card className="bg-white/90 backdrop-blur-sm border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-emerald-900">Treatment Progress</CardTitle>
                  <CardDescription>Monthly treatment completion and duration</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyTrendsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="completedTreatments" fill="#3b82f6" name="Completed Treatments" />
                        <Bar dataKey="newPatients" fill="#10b981" name="New Patients" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Patient-wise Analytics Tab */}
          <TabsContent value="patient-wise" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-900">Individual Patient Progress Comparison</CardTitle>
                <CardDescription>Detailed analysis of each patient's improvement journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {patientWiseData
                    .filter(patient => patientFilter === 'all' || patient.name === patientFilter)
                    .map((patient) => (
                    <div key={patient.id} className="p-6 bg-gray-50 rounded-xl border">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{patient.name}</h3>
                          <p className="text-sm text-gray-600">{patient.therapy} • {patient.sessions} sessions</p>
                        </div>
                        <Badge 
                          className={`${getImprovementColor(patient.improvement)} border-0`}
                          variant="outline"
                        >
                          {patient.improvement}% Improvement
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
                        <div>
                          <Label className="text-sm text-gray-600">Initial Score</Label>
                          <div className="mt-1">
                            <p className="text-xl font-medium text-gray-900">{patient.initialScore}/100</p>
                            <Progress value={patient.initialScore} className="mt-2" />
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Current Score</Label>
                          <div className="mt-1">
                            <p className="text-xl font-medium text-gray-900">{patient.currentScore}/100</p>
                            <Progress value={patient.currentScore} className="mt-2" />
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Adherence</Label>
                          <div className="mt-1">
                            <p className="text-xl font-medium text-gray-900">{patient.adherence}%</p>
                            <Progress value={patient.adherence} className="mt-2" />
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Satisfaction</Label>
                          <div className="mt-1">
                            <div className="flex items-center space-x-2">
                              <Star className="w-5 h-5 text-yellow-500 fill-current" />
                              <p className="text-xl font-medium text-gray-900">{patient.satisfaction}/5</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <Label className="text-gray-600">Treatment Period</Label>
                          <p className="font-medium">{patient.startDate} to {patient.lastSession}</p>
                        </div>
                        <div>
                          <Label className="text-gray-600">Side Effects</Label>
                          <Badge className={`${getSideEffectColor(patient.sideEffects)} border-0`} variant="outline">
                            {patient.sideEffects}
                          </Badge>
                        </div>
                        <div className="flex justify-end">
                          <Button size="sm" variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}