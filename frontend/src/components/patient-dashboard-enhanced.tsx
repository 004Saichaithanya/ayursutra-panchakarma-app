// import React from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
// import { Button } from './ui/button';
// import { Badge } from './ui/badge';
// import { Progress } from './ui/progress';
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import { Textarea } from './ui/textarea';
// import { Input } from './ui/input';
// import { Label } from './ui/label';
// import { ScrollArea } from './ui/scroll-area';
// import { Separator } from './ui/separator';
// import { ImageWithFallback } from './figma/ImageWithFallback';
// import {
//   Calendar,
//   Clock,
//   Heart,
//   Droplets,
//   Star,
//   ArrowRight,
//   Bell,
//   TrendingUp,
//   Activity,
//   Edit3,
//   Plus,
//   Save,
//   FileText,
//   Target,
//   Zap,
//   Brain,
//   Shield,
//   Smile,
//   Timer,
//   CheckCircle2,
//   AlertCircle,
//   ThermometerSun,
//   Wind,
//   StickyNote
// } from 'lucide-react';

// interface PatientDashboardProps {
//   onPageChange: (page: string) => void;
// }

// export function PatientDashboard({ onPageChange }: PatientDashboardProps) {
//   const [quickNote, setQuickNote] = React.useState('');
//   const [isAddingNote, setIsAddingNote] = React.useState(false);

//   // Mock data for enhanced dashboard
//   const currentTherapy = {
//     name: 'Panchakarma Detoxification Program',
//     startDate: '2024-12-01',
//     duration: '14 days',
//     progress: 35,
//     currentDay: 5,
//     totalDays: 14,
//     phase: 'Purvakarma (Preparation)',
//     nextPhase: 'Pradhanakarma (Main Treatment)',
//     phaseProgress: 78,
//     practitioner: 'Dr. Kamal Raj',
//     goals: [
//       { name: 'Detoxification', progress: 45, status: 'on-track' },
//       { name: 'Stress Reduction', progress: 62, status: 'ahead' },
//       { name: 'Energy Balance', progress: 38, status: 'on-track' },
//       { name: 'Sleep Quality', progress: 71, status: 'ahead' }
//     ]
//   };

//   const upcomingSessions = [
//     {
//       id: 1,
//       therapy: 'Abhyanga',
//       date: 'Today',
//       time: '2:00 PM',
//       practitioner: 'Dr. Kamal Raj',
//       status: 'confirmed',
//       preparation: ['Light meal 2 hours before', 'Wear comfortable clothes'],
//       duration: '60 mins',
//       sessionNumber: 5,
//       totalSessions: 14
//     },
//     {
//       id: 2,
//       therapy: 'Swedana',
//       date: 'Tomorrow',
//       time: '10:00 AM',
//       practitioner: 'Dr. Anjali Nair', 
//       status: 'confirmed',
//       preparation: ['Hydrate well', 'Avoid heavy meals'],
//       duration: '45 mins',
//       sessionNumber: 6,
//       totalSessions: 14
//     }
//   ];

//   const quickNotes = [
//     {
//       id: 1,
//       note: 'Feeling more energetic after today\'s session. The warm oil massage was deeply relaxing.',
//       timestamp: '2 hours ago',
//       type: 'feeling'
//     },
//     {
//       id: 2,
//       note: 'Slight headache after yesterday\'s Shirodhara. Drinking more water as advised.',
//       timestamp: '1 day ago',
//       type: 'concern'
//     },
//     {
//       id: 3,
//       note: 'Sleep quality has improved significantly since starting the treatment.',
//       timestamp: '2 days ago',
//       type: 'improvement'
//     }
//   ];

//   const sessionRemarks = [
//     {
//       id: 1,
//       session: 'Abhyanga - Session 4',
//       date: 'Yesterday',
//       practitionerNote: 'Patient responded well to the treatment. Reduced tension in shoulders and neck. Continue current therapy protocol.',
//       patientFeedback: 'Very relaxing session. Felt immediate relief in muscle tension.',
//       rating: 5,
//       mood: 'Excellent',
//       energy: 8
//     },
//     {
//       id: 2,
//       session: 'Shirodhara - Session 3',
//       date: '2 days ago',
//       practitionerNote: 'Good response to treatment. Patient showing signs of improved mental clarity. Minor headache reported post-session - normal reaction.',
//       patientFeedback: 'Mind felt very calm during the session. Slight headache afterwards but resolved quickly.',
//       rating: 4,
//       mood: 'Good',
//       energy: 7
//     }
//   ];

//   const vitalSigns = {
//     pulse: { value: 72, unit: 'bpm', status: 'normal' },
//     bloodPressure: { value: '120/80', unit: 'mmHg', status: 'normal' },
//     temperature: { value: 98.6, unit: '°F', status: 'normal' },
//     weight: { value: 65, unit: 'kg', change: -1.2 }
//   };

//   const notifications = [
//     {
//       id: 1,
//       type: 'reminder',
//       title: 'Pre-therapy Diet',
//       message: 'Consume warm ghee with milk before tomorrow\'s session',
//       time: '2 hours ago',
//       priority: 'high'
//     },
//     {
//       id: 2,
//       type: 'schedule',
//       title: 'Session Confirmed',
//       message: 'Your Abhyanga session today at 2:00 PM is confirmed',
//       time: '4 hours ago',
//       priority: 'medium'
//     },
//     {
//       id: 3,
//       type: 'achievement',
//       title: 'Milestone Reached!',
//       message: 'You\'ve completed 25% of your Panchakarma program',
//       time: '1 day ago',
//       priority: 'low'
//     }
//   ];

//   const handleSaveNote = () => {
//     if (quickNote.trim()) {
//       console.log('Saving note:', quickNote);
//       setQuickNote('');
//       setIsAddingNote(false);
//     }
//   };

//   const getGoalStatusColor = (status: string) => {
//     switch (status) {
//       case 'ahead': return 'text-green-600 bg-green-100';
//       case 'on-track': return 'text-blue-600 bg-blue-100';
//       case 'behind': return 'text-red-600 bg-red-100';
//       default: return 'text-gray-600 bg-gray-100';
//     }
//   };

//   const getNoteTypeIcon = (type: string) => {
//     switch (type) {
//       case 'feeling': return <Smile className="w-4 h-4 text-green-600" />;
//       case 'concern': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
//       case 'improvement': return <TrendingUp className="w-4 h-4 text-blue-600" />;
//       default: return <StickyNote className="w-4 h-4 text-gray-600" />;
//     }
//   };

//   const getVitalStatusColor = (status: string) => {
//     switch (status) {
//       case 'normal': return 'text-green-600';
//       case 'high': return 'text-red-600';
//       case 'low': return 'text-blue-600';
//       default: return 'text-gray-600';
//     }
//   };

//   return (
//     <div className="p-6 space-y-8 max-w-7xl mx-auto bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 min-h-screen">
//       {/* Welcome Header - Enhanced */}
//       <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-8 text-white shadow-2xl">
//         <div className="relative z-10">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h1 className="text-4xl font-bold mb-2">Welcome back, Priya!</h1>
//               <p className="text-emerald-100 text-lg">Your wellness journey continues • Day {currentTherapy.currentDay} of {currentTherapy.totalDays}</p>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3">
//                 <p className="text-white/90 text-sm">Therapy Progress</p>
//                 <p className="text-2xl font-bold">{currentTherapy.progress}%</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
//               <div className="flex items-center space-x-3 mb-3">
//                 <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
//                   <Target className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <p className="text-white/90 text-sm">Current Phase</p>
//                   <p className="font-bold text-lg">{currentTherapy.phase}</p>
//                 </div>
//               </div>
//               <Progress value={currentTherapy.phaseProgress} className="bg-white/20 h-2" />
//               <p className="text-white/80 text-xs mt-2">{currentTherapy.phaseProgress}% Complete</p>
//             </div>
            
//             <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
//               <div className="flex items-center space-x-3 mb-3">
//                 <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
//                   <Heart className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <p className="text-white/90 text-sm">Today's Session</p>
//                   <p className="font-bold text-lg">Abhyanga</p>
//                 </div>
//               </div>
//               <p className="text-white/80 text-sm">Session 5 of 14 • 2:00 PM</p>
//             </div>
            
//             <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
//               <div className="flex items-center space-x-3 mb-3">
//                 <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
//                   <Star className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <p className="text-white/90 text-sm">Wellness Score</p>
//                   <p className="font-bold text-lg">8.5/10</p>
//                 </div>
//               </div>
//               <p className="text-green-200 text-sm">↗ +0.8 from last week</p>
//             </div>

//             <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
//               <div className="flex items-center space-x-3 mb-3">
//                 <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
//                   <Zap className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <p className="text-white/90 text-sm">Energy Level</p>
//                   <p className="font-bold text-lg">85%</p>
//                 </div>
//               </div>
//               <p className="text-green-200 text-sm">Excellent improvement!</p>
//             </div>
//           </div>
//         </div>
        
//         <div className="absolute top-0 right-0 w-80 h-80 opacity-20">
//           <ImageWithFallback 
//             src="https://images.unsplash.com/photo-1730977806307-3351cb73a9b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkYSUyMHdlbGxuZXNzJTIwbWVkaXRhdGlvbnxlbnwxfHx8fDE3NTgzODU3NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
//             alt="Ayurveda wellness" 
//             className="w-full h-full object-cover rounded-3xl"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
//         {/* Left Column */}
//         <div className="xl:col-span-2 space-y-8">
//           {/* Active Therapy Progress */}
//           <Card className="bg-white/90 backdrop-blur-sm border-emerald-200 shadow-xl">
//             <CardHeader>
//               <CardTitle className="flex items-center space-x-2">
//                 <Activity className="w-6 h-6 text-emerald-600" />
//                 <span>Active Therapy Progress</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
//                 <div className="flex items-center justify-between mb-4">
//                   <div>
//                     <h3 className="text-xl font-medium text-emerald-900">{currentTherapy.name}</h3>
//                     <p className="text-emerald-600">with {currentTherapy.practitioner}</p>
//                   </div>
//                   <Badge className="bg-emerald-100 text-emerald-700 px-4 py-2">
//                     Active Treatment
//                   </Badge>
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//                   <div className="text-center">
//                     <p className="text-sm text-emerald-600 mb-1">Duration</p>
//                     <p className="font-bold text-emerald-900">{currentTherapy.duration}</p>
//                   </div>
//                   <div className="text-center">
//                     <p className="text-sm text-emerald-600 mb-1">Current Day</p>
//                     <p className="font-bold text-emerald-900">{currentTherapy.currentDay} of {currentTherapy.totalDays}</p>
//                   </div>
//                   <div className="text-center">
//                     <p className="text-sm text-emerald-600 mb-1">Next Phase</p>
//                     <p className="font-bold text-emerald-900">{currentTherapy.nextPhase}</p>
//                   </div>
//                 </div>

//                 <div className="mb-6">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="font-medium text-emerald-900">Overall Progress</span>
//                     <span className="text-sm text-emerald-600">{currentTherapy.progress}% Complete</span>
//                   </div>
//                   <Progress value={currentTherapy.progress} className="h-4 bg-emerald-100" />
//                 </div>

//                 <div className="space-y-4">
//                   <h4 className="font-medium text-emerald-900 mb-3">Treatment Goals</h4>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {currentTherapy.goals.map((goal, index) => (
//                       <div key={index} className="bg-white rounded-xl p-4 border border-emerald-100">
//                         <div className="flex items-center justify-between mb-2">
//                           <span className="font-medium text-gray-900">{goal.name}</span>
//                           <Badge className={getGoalStatusColor(goal.status)} variant="outline">
//                             {goal.status}
//                           </Badge>
//                         </div>
//                         <Progress value={goal.progress} className="h-2" />
//                         <p className="text-xs text-gray-600 mt-1">{goal.progress}% achieved</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Upcoming Sessions */}
//           <Card className="bg-white/90 backdrop-blur-sm border-emerald-200 shadow-xl">
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <CardTitle className="flex items-center space-x-2">
//                   <Calendar className="w-6 h-6 text-emerald-600" />
//                   <span>Upcoming Sessions</span>
//                 </CardTitle>
//                 <Button 
//                   variant="outline" 
//                   size="sm"
//                   onClick={() => onPageChange('sessions')}
//                   className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
//                 >
//                   View All
//                   <ArrowRight className="w-4 h-4 ml-2" />
//                 </Button>
//               </div>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {upcomingSessions.map((session) => (
//                 <div key={session.id} className="bg-gradient-to-r from-gray-50 to-emerald-50 border border-emerald-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="flex-1">
//                       <div className="flex items-center space-x-3 mb-2">
//                         <h3 className="text-lg font-medium text-emerald-900">{session.therapy}</h3>
//                         <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
//                           Session {session.sessionNumber}/{session.totalSessions}
//                         </Badge>
//                       </div>
//                       <div className="flex items-center space-x-6 text-sm text-emerald-600 mb-2">
//                         <div className="flex items-center space-x-2">
//                           <Calendar className="w-4 h-4" />
//                           <span>{session.date}</span>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <Clock className="w-4 h-4" />
//                           <span>{session.time}</span>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <Timer className="w-4 h-4" />
//                           <span>{session.duration}</span>
//                         </div>
//                       </div>
//                       <p className="text-sm text-emerald-700 mb-4">with {session.practitioner}</p>
//                     </div>
//                     <Badge className="bg-green-100 text-green-700 border-green-200">
//                       {session.status}
//                     </Badge>
//                   </div>
                  
//                   <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
//                     <p className="font-medium text-amber-900 mb-2 flex items-center">
//                       <AlertCircle className="w-4 h-4 mr-2" />
//                       Pre-therapy Preparation:
//                     </p>
//                     <ul className="space-y-1">
//                       {session.preparation.map((item, index) => (
//                         <li key={index} className="text-sm text-amber-800 flex items-center space-x-2">
//                           <CheckCircle2 className="w-3 h-3 text-amber-600" />
//                           <span>{item}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
                  
//                   <div className="flex space-x-3">
//                     <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 flex-1">
//                       Join Session
//                     </Button>
//                     <Button variant="outline" size="sm" className="border-emerald-200 text-emerald-600 flex-1">
//                       Reschedule
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-8">
//           {/* Quick Notes */}
//           <Card className="bg-white/90 backdrop-blur-sm border-blue-200 shadow-xl">
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <CardTitle className="flex items-center space-x-2">
//                   <Edit3 className="w-5 h-5 text-blue-600" />
//                   <span>Quick Notes</span>
//                 </CardTitle>
//                 <Button 
//                   size="sm"
//                   onClick={() => setIsAddingNote(true)}
//                   className="bg-blue-600 hover:bg-blue-700"
//                 >
//                   <Plus className="w-4 h-4" />
//                 </Button>
//               </div>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {isAddingNote && (
//                 <div className="space-y-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
//                   <Label htmlFor="quickNote" className="text-blue-900">Add a quick note</Label>
//                   <Textarea
//                     id="quickNote"
//                     value={quickNote}
//                     onChange={(e) => setQuickNote(e.target.value)}
//                     placeholder="How are you feeling? Any observations about your treatment..."
//                     className="border-blue-200"
//                     rows={3}
//                   />
//                   <div className="flex space-x-2">
//                     <Button size="sm" onClick={handleSaveNote} className="bg-blue-600 hover:bg-blue-700">
//                       <Save className="w-3 h-3 mr-1" />
//                       Save
//                     </Button>
//                     <Button size="sm" variant="outline" onClick={() => setIsAddingNote(false)}>
//                       Cancel
//                     </Button>
//                   </div>
//                 </div>
//               )}

//               <ScrollArea className="h-64">
//                 <div className="space-y-3">
//                   {quickNotes.map((note) => (
//                     <div key={note.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">
//                       <div className="flex items-start space-x-3">
//                         {getNoteTypeIcon(note.type)}
//                         <div className="flex-1">
//                           <p className="text-sm text-gray-900 mb-2">{note.note}</p>
//                           <p className="text-xs text-gray-500">{note.timestamp}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </ScrollArea>
//             </CardContent>
//           </Card>

//           {/* Session Remarks */}
//           <Card className="bg-white/90 backdrop-blur-sm border-purple-200 shadow-xl">
//             <CardHeader>
//               <CardTitle className="flex items-center space-x-2">
//                 <FileText className="w-5 h-5 text-purple-600" />
//                 <span>Session Remarks</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <ScrollArea className="h-80">
//                 <div className="space-y-4">
//                   {sessionRemarks.map((remark) => (
//                     <div key={remark.id} className="p-4 border border-purple-100 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50">
//                       <div className="flex items-center justify-between mb-3">
//                         <h4 className="font-medium text-purple-900">{remark.session}</h4>
//                         <div className="flex items-center space-x-1">
//                           {Array.from({ length: 5 }).map((_, i) => (
//                             <Star 
//                               key={i} 
//                               className={`w-4 h-4 ${i < remark.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
//                             />
//                           ))}
//                         </div>
//                       </div>
                      
//                       <div className="space-y-3">
//                         <div>
//                           <p className="text-xs text-purple-600 font-medium mb-1">Practitioner Notes:</p>
//                           <p className="text-sm text-gray-800">{remark.practitionerNote}</p>
//                         </div>
                        
//                         <Separator className="bg-purple-200" />
                        
//                         <div>
//                           <p className="text-xs text-purple-600 font-medium mb-1">Your Feedback:</p>
//                           <p className="text-sm text-gray-800">{remark.patientFeedback}</p>
//                         </div>
                        
//                         <div className="grid grid-cols-3 gap-3 text-xs">
//                           <div className="text-center">
//                             <p className="text-gray-600">Date</p>
//                             <p className="font-medium">{remark.date}</p>
//                           </div>
//                           <div className="text-center">
//                             <p className="text-gray-600">Mood</p>
//                             <p className="font-medium">{remark.mood}</p>
//                           </div>
//                           <div className="text-center">
//                             <p className="text-gray-600">Energy</p>
//                             <p className="font-medium">{remark.energy}/10</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </ScrollArea>
//             </CardContent>
//           </Card>

//           {/* Vital Signs Monitor */}
//           <Card className="bg-white/90 backdrop-blur-sm border-green-200 shadow-xl">
//             <CardHeader>
//               <CardTitle className="flex items-center space-x-2">
//                 <Activity className="w-5 h-5 text-green-600" />
//                 <span>Health Vitals</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="p-3 bg-green-50 rounded-xl border border-green-200">
//                   <div className="flex items-center space-x-2 mb-1">
//                     <Heart className="w-4 h-4 text-green-600" />
//                     <p className="text-sm text-green-800">Pulse</p>
//                   </div>
//                   <p className={`font-bold ${getVitalStatusColor(vitalSigns.pulse.status)}`}>
//                     {vitalSigns.pulse.value} {vitalSigns.pulse.unit}
//                   </p>
//                 </div>
                
//                 <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
//                   <div className="flex items-center space-x-2 mb-1">
//                     <Activity className="w-4 h-4 text-blue-600" />
//                     <p className="text-sm text-blue-800">BP</p>
//                   </div>
//                   <p className={`font-bold ${getVitalStatusColor(vitalSigns.bloodPressure.status)}`}>
//                     {vitalSigns.bloodPressure.value}
//                   </p>
//                 </div>
                
//                 <div className="p-3 bg-orange-50 rounded-xl border border-orange-200">
//                   <div className="flex items-center space-x-2 mb-1">
//                     <ThermometerSun className="w-4 h-4 text-orange-600" />
//                     <p className="text-sm text-orange-800">Temp</p>
//                   </div>
//                   <p className={`font-bold ${getVitalStatusColor(vitalSigns.temperature.status)}`}>
//                     {vitalSigns.temperature.value}°F
//                   </p>
//                 </div>
                
//                 <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
//                   <div className="flex items-center space-x-2 mb-1">
//                     <Wind className="w-4 h-4 text-purple-600" />
//                     <p className="text-sm text-purple-800">Weight</p>
//                   </div>
//                   <div>
//                     <p className="font-bold text-purple-900">{vitalSigns.weight.value} kg</p>
//                     <p className="text-xs text-green-600">-{Math.abs(vitalSigns.weight.change)} kg</p>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Notifications */}
//           <Card className="bg-white/90 backdrop-blur-sm border-orange-200 shadow-xl">
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <CardTitle className="flex items-center space-x-2">
//                   <Bell className="w-5 h-5 text-orange-600" />
//                   <span>Notifications</span>
//                 </CardTitle>
//                 <Badge className="bg-orange-100 text-orange-700">{notifications.filter(n => n.priority !== 'low').length} New</Badge>
//               </div>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               {notifications.map((notification) => (
//                 <div key={notification.id} className="flex space-x-3 p-4 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl hover:bg-orange-50 transition-colors border border-orange-100">
//                   <div className={`w-2 h-2 rounded-full mt-2 ${
//                     notification.priority === 'high' ? 'bg-red-500' :
//                     notification.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
//                   }`}></div>
//                   <div className="flex-1 min-w-0">
//                     <p className="font-medium text-gray-900 text-sm">{notification.title}</p>
//                     <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
//                     <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
//                   </div>
//                 </div>
//               ))}
//               <Button 
//                 variant="outline" 
//                 size="sm"
//                 onClick={() => onPageChange('notifications')}
//                 className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
//               >
//                 View All Notifications
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }