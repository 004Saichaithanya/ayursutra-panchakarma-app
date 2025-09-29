import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Search,
  Filter,
  Users,
  MessageSquare,
  PillBottle,
  FileText,
  Activity,
  TrendingUp,
  Calendar,
  Phone,
  Mail,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  ThermometerSun,
  Stethoscope,
  Send,
  Plus,
  Eye,
  Download,
  Upload,
  Heart,
  Zap,
  Shield,
  User
} from 'lucide-react';

/**
 * Patient Management Component
 * @param {Object} props - Component props
 * @param {Function} props.onPageChange - Function to handle page navigation
 */

// Enhanced patient data with medical reports and symptoms
const patientsData = [
  {
    id: 1,
    name: 'Priya Sharma',
    avatar: '/placeholder-avatar.jpg',
    age: 34,
    gender: 'Female',
    phone: '+91 98765 43210',
    email: 'priya.sharma@email.com',
    status: 'active',
    progress: 75,
    dosha: 'Vata-Pitta',
    assignedTherapy: 'Abhyanga',
    totalSessions: 12,
    completedSessions: 9,
    compliance: 85,
    riskLevel: 'low',
    lastSession: '2024-12-13',
    nextSession: '2024-12-15',
    currentCondition: 'Significant improvement in stress levels and digestion. Patient reports better sleep quality.',
    currentSymptoms: [
      { symptom: 'Mild anxiety', severity: 'low', improving: true },
      { symptom: 'Occasional headaches', severity: 'low', improving: true },
      { symptom: 'Digestive discomfort', severity: 'mild', improving: true }
    ],
    vitalSigns: {
      bloodPressure: '120/80',
      heartRate: 72,
      weight: 58,
      temperature: '98.6°F',
      lastUpdated: '2024-12-13'
    },
    medicalReports: [
      {
        id: 1,
        date: '2024-12-13',
        type: 'Session Report',
        title: 'Abhyanga Session #9',
        summary: 'Good response to treatment. Stress levels decreased significantly.',
        doctor: 'Dr. Kamal Raj'
      },
      {
        id: 2,
        date: '2024-12-01',
        type: 'Assessment',
        title: 'Monthly Progress Assessment',
        summary: 'Overall improvement observed. Continue current treatment plan.',
        doctor: 'Dr. Kamal Raj'
      },
      {
        id: 3,
        date: '2024-11-15',
        type: 'Lab Report',
        title: 'Blood Work Analysis',
        summary: 'All parameters within normal range. Stress hormones decreased.',
        doctor: 'Dr. Kamal Raj'
      }
    ],
    treatmentGoals: [
      { goal: 'Stress Reduction', target: 80, current: 75, status: 'on-track' },
      { goal: 'Sleep Quality', target: 90, current: 85, status: 'ahead' },
      { goal: 'Digestive Health', target: 85, current: 80, status: 'on-track' }
    ],
    messages: [
      { id: 1, type: 'received', content: 'Doctor, I\'m feeling much better after yesterday\'s session. Thank you!', timestamp: '2024-12-14 09:30', read: true }
    ],
    prescriptions: [
      { id: 1, medication: 'Ashwagandha', dosage: '300mg twice daily', status: 'active', dateIssued: '2024-12-01' },
      { id: 2, medication: 'Brahmi', dosage: '250mg once daily', status: 'active', dateIssued: '2024-12-01' }
    ]
  },
  {
    id: 2,
    name: 'Raj Patel',
    avatar: '/placeholder-avatar.jpg',
    age: 42,
    gender: 'Male',
    phone: '+91 87654 32109',
    email: 'raj.patel@email.com',
    status: 'needs-attention',
    progress: 45,
    dosha: 'Pitta-Kapha',
    assignedTherapy: 'Shirodhara',
    totalSessions: 10,
    completedSessions: 4,
    compliance: 65,
    riskLevel: 'medium',
    lastSession: '2024-12-08',
    nextSession: '2024-12-15',
    currentCondition: 'Some improvement in sleep patterns, but blood pressure still elevated. Requires close monitoring.',
    currentSymptoms: [
      { symptom: 'High blood pressure', severity: 'high', improving: false },
      { symptom: 'Insomnia', severity: 'medium', improving: true },
      { symptom: 'Work-related stress', severity: 'high', improving: false },
      { symptom: 'Mild dizziness', severity: 'medium', improving: false }
    ],
    vitalSigns: {
      bloodPressure: '145/90',
      heartRate: 78,
      weight: 82,
      temperature: '99.1°F',
      lastUpdated: '2024-12-08'
    },
    medicalReports: [
      {
        id: 4,
        date: '2024-12-08',
        type: 'Session Report',
        title: 'Shirodhara Session #4',
        summary: 'Patient reported mild discomfort. Adjusting treatment intensity.',
        doctor: 'Dr. Kamal Raj'
      },
      {
        id: 5,
        date: '2024-11-20',
        type: 'Assessment',
        title: 'Cardiovascular Assessment',
        summary: 'Blood pressure remains elevated. Recommend lifestyle changes.',
        doctor: 'Dr. Kamal Raj'
      }
    ],
    treatmentGoals: [
      { goal: 'Blood Pressure Control', target: 120, current: 145, status: 'behind' },
      { goal: 'Sleep Quality', target: 80, current: 60, status: 'behind' },
      { goal: 'Stress Management', target: 75, current: 45, status: 'behind' }
    ],
    messages: [
      { id: 2, type: 'received', content: 'I experienced some dizziness after yesterday\'s session. Is this normal?', timestamp: '2024-12-09 14:22', read: false }
    ],
    prescriptions: [
      { id: 3, medication: 'Arjuna Extract', dosage: '500mg twice daily', status: 'active', dateIssued: '2024-11-15' }
    ]
  },
  {
    id: 3,
    name: 'Meera Singh',
    avatar: '/placeholder-avatar.jpg',
    age: 28,
    gender: 'Female',
    phone: '+91 76543 21098',
    email: 'meera.singh@email.com',
    status: 'active',
    progress: 90,
    dosha: 'Vata',
    assignedTherapy: 'Panchakarma',
    totalSessions: 14,
    completedSessions: 12,
    compliance: 95,
    riskLevel: 'low',
    lastSession: '2024-12-12',
    nextSession: '2024-12-15',
    currentCondition: 'Excellent progress, energy levels normalized, digestion improved significantly.',
    currentSymptoms: [
      { symptom: 'Chronic fatigue', severity: 'resolved', improving: true },
      { symptom: 'Digestive disorders', severity: 'mild', improving: true },
      { symptom: 'Hormonal imbalance', severity: 'mild', improving: true }
    ],
    vitalSigns: {
      bloodPressure: '115/75',
      heartRate: 68,
      weight: 55,
      temperature: '98.4°F',
      lastUpdated: '2024-12-12'
    },
    medicalReports: [
      {
        id: 6,
        date: '2024-12-12',
        type: 'Session Report',
        title: 'Panchakarma Session #12',
        summary: 'Excellent progress. Energy levels high, patient very satisfied.',
        doctor: 'Dr. Kamal Raj'
      },
      {
        id: 7,
        date: '2024-11-25',
        type: 'Assessment',
        title: 'Hormonal Balance Check',
        summary: 'Significant improvement in hormonal markers. Treatment effective.',
        doctor: 'Dr. Kamal Raj'
      }
    ],
    treatmentGoals: [
      { goal: 'Energy Levels', target: 85, current: 90, status: 'ahead' },
      { goal: 'Digestive Health', target: 80, current: 85, status: 'ahead' },
      { goal: 'Hormonal Balance', target: 75, current: 80, status: 'ahead' }
    ],
    messages: [
      { id: 3, type: 'received', content: 'Thank you for the wonderful care! I feel so much better now.', timestamp: '2024-12-13 11:45', read: true }
    ],
    prescriptions: [
      { id: 4, medication: 'Shatavari', dosage: '500mg twice daily', status: 'active', dateIssued: '2024-11-01' }
    ]
  },
  {
    id: 4,
    name: 'Amit Kumar',
    avatar: '/placeholder-avatar.jpg',
    age: 36,
    gender: 'Male',
    phone: '+91 65432 10987',
    email: 'amit.kumar@email.com',
    status: 'inactive',
    progress: 25,
    dosha: 'Kapha',
    assignedTherapy: 'Yoga Therapy',
    totalSessions: 8,
    completedSessions: 2,
    compliance: 40,
    riskLevel: 'high',
    lastSession: '2024-11-28',
    nextSession: null,
    currentCondition: 'Treatment paused due to scheduling conflicts. Patient needs follow-up.',
    currentSymptoms: [
      { symptom: 'Obesity', severity: 'high', improving: false },
      { symptom: 'Joint pain', severity: 'medium', improving: false },
      { symptom: 'Lethargy', severity: 'high', improving: false },
      { symptom: 'Sleep apnea', severity: 'medium', improving: false }
    ],
    vitalSigns: {
      bloodPressure: '140/85',
      heartRate: 85,
      weight: 95,
      temperature: '98.8°F',
      lastUpdated: '2024-11-28'
    },
    medicalReports: [
      {
        id: 8,
        date: '2024-11-28',
        type: 'Session Report',
        title: 'Yoga Therapy Session #2',
        summary: 'Basic poses introduced. Patient needs motivation and regular follow-up.',
        doctor: 'Dr. Anjali Nair'
      }
    ],
    treatmentGoals: [
      { goal: 'Weight Loss', target: 80, current: 95, status: 'behind' },
      { goal: 'Joint Mobility', target: 80, current: 40, status: 'behind' },
      { goal: 'Energy Levels', target: 75, current: 30, status: 'behind' }
    ],
    messages: [],
    prescriptions: []
  }
];

export function PatientManagement({ onPageChange }) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [selectedPatient, setSelectedPatient] = React.useState(patientsData[0]);
  const [activeTab, setActiveTab] = React.useState('overview');
  const [isMessageDialogOpen, setIsMessageDialogOpen] = React.useState(false);
  const [isPrescriptionDialogOpen, setIsPrescriptionDialogOpen] = React.useState(false);
  const [messageText, setMessageText] = React.useState('');
  const [prescriptionData, setPrescriptionData] = React.useState({
    medication: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: ''
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-50 text-green-700 border-green-200';
      case 'needs-attention': return 'bg-red-50 text-red-700 border-red-200';
      case 'inactive': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskLevelColor = (riskLevel) => {
    switch (riskLevel) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'resolved': return 'text-green-600 bg-green-50';
      case 'low': case 'mild': return 'text-yellow-600 bg-yellow-50';
      case 'medium': return 'text-orange-600 bg-orange-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredPatients = patientsData.filter(patient => {
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    const matchesSearch = searchTerm === '' || 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.assignedTherapy.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const handleSendMessage = () => {
    if (messageText.trim() && selectedPatient) {
      console.log('Sending message to patient:', selectedPatient.id, messageText);
      toast.success('Message sent successfully');
      setMessageText('');
      setIsMessageDialogOpen(false);
    }
  };

  const handleSendPrescription = () => {
    if (prescriptionData.medication && prescriptionData.dosage && selectedPatient) {
      console.log('Sending prescription to patient:', selectedPatient.id, prescriptionData);
      toast.success('Prescription sent as notification to patient');
      setPrescriptionData({
        medication: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: ''
      });
      setIsPrescriptionDialogOpen(false);
    }
  };

  const getUnreadMessageCount = (patient) => {
    return patient.messages ? patient.messages.filter((msg) => msg.type === 'received' && !msg.read).length : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="flex h-screen">
        {/* Left Sidebar - Patient List */}
        <div className="w-1/3 border-r border-emerald-200 bg-white/80 backdrop-blur-sm">
          {/* Header */}
          <div className="p-6 border-b border-emerald-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-emerald-900">My Patients</h1>
                <p className="text-emerald-600">Manage and monitor patient care</p>
              </div>
              <Button
                onClick={() => onPageChange('practitioner-dashboard')}
                variant="outline"
                size="sm"
                className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>

            {/* Search and Filter */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="needs-attention">Needs Attention</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                
                <Badge className="bg-emerald-100 text-emerald-800">
                  <Users className="w-4 h-4 mr-1" />
                  {filteredPatients.length} Patients
                </Badge>
              </div>
            </div>
          </div>

          {/* Patient List */}
          <ScrollArea className="flex-1 h-[calc(100vh-200px)]">
            <div className="p-4 space-y-3">
              {filteredPatients.map((patient) => (
                <Card 
                  key={patient.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedPatient?.id === patient.id 
                      ? 'ring-2 ring-emerald-300 bg-emerald-50' 
                      : 'bg-white hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedPatient(patient)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={patient.avatar} />
                            <AvatarFallback className="bg-emerald-100 text-emerald-700">
                              {patient.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          {getUnreadMessageCount(patient) > 0 && (
                            <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                              {getUnreadMessageCount(patient)}
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{patient.name}</h3>
                          <p className="text-sm text-gray-600">{patient.age}y, {patient.assignedTherapy}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getStatusColor(patient.status)} variant="outline" size="sm">
                              {patient.status}
                            </Badge>
                            <span className={`text-sm font-medium ${getProgressColor(patient.progress)}`}>
                              {patient.progress}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getRiskLevelColor(patient.riskLevel)} variant="outline" size="sm">
                          {patient.riskLevel}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <Progress value={patient.progress} className="h-1.5" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Right Panel - Patient Details */}
        <div className="flex-1 bg-white">
          {selectedPatient ? (
            <div className="h-full flex flex-col">
              {/* Patient Header */}
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-50 to-teal-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16 border-3 border-white shadow-md">
                      <AvatarImage src={selectedPatient.avatar} />
                      <AvatarFallback className="bg-emerald-100 text-emerald-700 text-lg">
                        {selectedPatient.name.split(' ').map((n) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h2>
                      <p className="text-gray-600">{selectedPatient.age} years, {selectedPatient.gender}</p>
                      <div className="flex items-center space-x-3 mt-2">
                        <Badge className={getStatusColor(selectedPatient.status)} variant="outline">
                          {selectedPatient.status}
                        </Badge>
                        <Badge className={getRiskLevelColor(selectedPatient.riskLevel)} variant="outline">
                          {selectedPatient.riskLevel} risk
                        </Badge>
                        <span className="text-sm text-gray-500">Last session: {selectedPatient.lastSession}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Button
                      onClick={() => setIsMessageDialogOpen(true)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button
                      onClick={() => setIsPrescriptionDialogOpen(true)}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <PillBottle className="w-4 h-4 mr-2" />
                      Prescribe
                    </Button>
                  </div>
                </div>
              </div>

              {/* Patient Details Tabs */}
              <div className="flex-1 p-6 overflow-hidden">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                  <TabsList className="grid w-full grid-cols-5 mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
                    <TabsTrigger value="reports">Medical Reports</TabsTrigger>
                    <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
                    <TabsTrigger value="goals">Treatment Goals</TabsTrigger>
                  </TabsList>

                  <div className="flex-1 overflow-hidden">
                    <TabsContent value="overview" className="h-full space-y-6 overflow-y-auto">
                      {/* Progress Overview */}
                      <div className="grid grid-cols-4 gap-6">
                        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                          <CardContent className="p-4 text-center">
                            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                            <p className="text-sm text-green-600 mb-1">Overall Progress</p>
                            <p className={`text-2xl font-bold ${getProgressColor(selectedPatient.progress)}`}>
                              {selectedPatient.progress}%
                            </p>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                          <CardContent className="p-4 text-center">
                            <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                            <p className="text-sm text-blue-600 mb-1">Sessions</p>
                            <p className="text-2xl font-bold text-blue-900">
                              {selectedPatient.completedSessions}/{selectedPatient.totalSessions}
                            </p>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                          <CardContent className="p-4 text-center">
                            <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                            <p className="text-sm text-purple-600 mb-1">Compliance</p>
                            <p className="text-2xl font-bold text-purple-900">{selectedPatient.compliance}%</p>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
                          <CardContent className="p-4 text-center">
                            <Shield className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                            <p className="text-sm text-orange-600 mb-1">Risk Level</p>
                            <Badge className={getRiskLevelColor(selectedPatient.riskLevel)} variant="outline">
                              {selectedPatient.riskLevel.toUpperCase()}
                            </Badge>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Current Treatment & Condition */}
                      <div className="grid grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Stethoscope className="w-5 h-5 mr-2 text-green-600" />
                              Current Treatment
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div>
                              <Label className="text-sm text-gray-600">Therapy</Label>
                              <p className="font-medium text-green-900">{selectedPatient.assignedTherapy}</p>
                            </div>
                            <div>
                              <Label className="text-sm text-gray-600">Dosha Constitution</Label>
                              <p className="font-medium flex items-center">
                                <ThermometerSun className="w-4 h-4 mr-2 text-orange-500" />
                                {selectedPatient.dosha}
                              </p>
                            </div>
                            <div>
                              <Label className="text-sm text-gray-600">Next Session</Label>
                              <p className="font-medium text-emerald-700">
                                {selectedPatient.nextSession || 'Not scheduled'}
                              </p>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <FileText className="w-5 h-5 mr-2 text-blue-600" />
                              Current Condition
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                              <p className="text-blue-900 text-sm">{selectedPatient.currentCondition}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Contact Information */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <User className="w-5 h-5 mr-2 text-gray-600" />
                            Contact Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-3">
                              <Phone className="w-4 h-4 text-gray-500" />
                              <span className="text-sm">{selectedPatient.phone}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Mail className="w-4 h-4 text-gray-500" />
                              <span className="text-sm">{selectedPatient.email}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="symptoms" className="h-full overflow-y-auto">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Activity className="w-5 h-5 mr-2 text-orange-600" />
                            Current Symptoms & Status
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {selectedPatient.currentSymptoms.map((symptom, index) => (
                              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <div className={`w-3 h-3 rounded-full ${symptom.improving ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                  <div>
                                    <p className="font-medium text-gray-900">{symptom.symptom}</p>
                                    <p className="text-sm text-gray-600">
                                      {symptom.improving ? 'Improving' : 'Needs attention'}
                                    </p>
                                  </div>
                                </div>
                                <Badge className={getSeverityColor(symptom.severity)} variant="outline">
                                  {symptom.severity}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="reports" className="h-full overflow-y-auto">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FileText className="w-5 h-5 mr-2 text-blue-600" />
                              Medical Reports
                            </div>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <Upload className="w-4 h-4 mr-2" />
                              Upload Report
                            </Button>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {selectedPatient.medicalReports.map((report) => (
                              <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center space-x-3">
                                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                      {report.type}
                                    </Badge>
                                    <span className="text-sm text-gray-500">{report.date}</span>
                                  </div>
                                  <Button size="sm" variant="outline">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download
                                  </Button>
                                </div>
                                <h4 className="font-medium text-gray-900 mb-1">{report.title}</h4>
                                <p className="text-sm text-gray-600 mb-2">{report.summary}</p>
                                <p className="text-xs text-gray-500">By: {report.doctor}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="vitals" className="h-full overflow-y-auto">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Heart className="w-5 h-5 mr-2 text-red-600" />
                            Vital Signs
                          </CardTitle>
                          <CardDescription>
                            Last updated: {selectedPatient.vitalSigns.lastUpdated}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                                <div className="flex items-center space-x-2">
                                  <Heart className="w-5 h-5 text-red-600" />
                                  <span className="font-medium text-red-900">Blood Pressure</span>
                                </div>
                                <p className="text-2xl font-bold text-red-900 mt-1">
                                  {selectedPatient.vitalSigns.bloodPressure}
                                </p>
                                <p className="text-sm text-red-600">mmHg</p>
                              </div>
                              
                              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <div className="flex items-center space-x-2">
                                  <Activity className="w-5 h-5 text-blue-600" />
                                  <span className="font-medium text-blue-900">Heart Rate</span>
                                </div>
                                <p className="text-2xl font-bold text-blue-900 mt-1">
                                  {selectedPatient.vitalSigns.heartRate}
                                </p>
                                <p className="text-sm text-blue-600">bpm</p>
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                <div className="flex items-center space-x-2">
                                  <Target className="w-5 h-5 text-green-600" />
                                  <span className="font-medium text-green-900">Weight</span>
                                </div>
                                <p className="text-2xl font-bold text-green-900 mt-1">
                                  {selectedPatient.vitalSigns.weight}
                                </p>
                                <p className="text-sm text-green-600">kg</p>
                              </div>
                              
                              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                                <div className="flex items-center space-x-2">
                                  <ThermometerSun className="w-5 h-5 text-orange-600" />
                                  <span className="font-medium text-orange-900">Temperature</span>
                                </div>
                                <p className="text-2xl font-bold text-orange-900 mt-1">
                                  {selectedPatient.vitalSigns.temperature}
                                </p>
                                <p className="text-sm text-orange-600">Fahrenheit</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="goals" className="h-full overflow-y-auto">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Target className="w-5 h-5 mr-2 text-purple-600" />
                            Treatment Goals & Progress
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            {selectedPatient.treatmentGoals.map((goal, index) => {
                              const progressPercentage = (goal.current / goal.target) * 100;
                              const statusColor = goal.status === 'ahead' ? 'text-green-600' : 
                                                goal.status === 'on-track' ? 'text-blue-600' : 'text-red-600';
                              
                              return (
                                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                                  <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-medium text-gray-900">{goal.goal}</h4>
                                    <Badge className={
                                      goal.status === 'ahead' ? 'bg-green-50 text-green-700 border-green-200' :
                                      goal.status === 'on-track' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                      'bg-red-50 text-red-700 border-red-200'
                                    } variant="outline">
                                      {goal.status}
                                    </Badge>
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-600">Current: {goal.current}</span>
                                      <span className="text-gray-600">Target: {goal.target}</span>
                                    </div>
                                    <Progress value={progressPercentage} className="h-2" />
                                    <p className={`text-sm font-medium ${statusColor}`}>
                                      {Math.round(progressPercentage)}% of target achieved
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Select a patient to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Message Dialog */}
      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <span>Send Message to {selectedPatient?.name}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="message-text">Message</Label>
              <Textarea
                id="message-text"
                placeholder="Type your message here..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                rows={4}
              />
            </div>
            <div className="flex space-x-3">
              <Button onClick={handleSendMessage} className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
              <Button variant="outline" onClick={() => setIsMessageDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Prescription Dialog */}
      <Dialog open={isPrescriptionDialogOpen} onOpenChange={setIsPrescriptionDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3">
              <PillBottle className="w-5 h-5 text-purple-600" />
              <span>New Prescription for {selectedPatient?.name}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="medication">Medication</Label>
                <Input
                  id="medication"
                  placeholder="e.g., Ashwagandha"
                  value={prescriptionData.medication}
                  onChange={(e) => setPrescriptionData(prev => ({ ...prev, medication: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="dosage">Dosage</Label>
                <Input
                  id="dosage"
                  placeholder="e.g., 300mg"
                  value={prescriptionData.dosage}
                  onChange={(e) => setPrescriptionData(prev => ({ ...prev, dosage: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="frequency">Frequency</Label>
                <Select onValueChange={(value) => setPrescriptionData(prev => ({ ...prev, frequency: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once-daily">Once daily</SelectItem>
                    <SelectItem value="twice-daily">Twice daily</SelectItem>
                    <SelectItem value="thrice-daily">Thrice daily</SelectItem>
                    <SelectItem value="as-needed">As needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Select onValueChange={(value) => setPrescriptionData(prev => ({ ...prev, duration: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-week">1 week</SelectItem>
                    <SelectItem value="2-weeks">2 weeks</SelectItem>
                    <SelectItem value="1-month">1 month</SelectItem>
                    <SelectItem value="3-months">3 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="instructions">Special Instructions</Label>
              <Textarea
                id="instructions"
                placeholder="Any special instructions for the patient..."
                value={prescriptionData.instructions}
                onChange={(e) => setPrescriptionData(prev => ({ ...prev, instructions: e.target.value }))}
                rows={3}
              />
            </div>
            
            <div className="flex space-x-3">
              <Button onClick={handleSendPrescription} className="flex-1 bg-purple-600 hover:bg-purple-700">
                <Send className="w-4 h-4 mr-2" />
                Send Prescription
              </Button>
              <Button variant="outline" onClick={() => setIsPrescriptionDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}