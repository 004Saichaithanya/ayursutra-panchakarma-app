import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Edit2,
  RotateCcw,
  XCircle,
  User,
  Activity,
  Timer,
  ThermometerSun,
  Plus,
  Search,
  AlertTriangle,
  CheckCircle,
  Eye
} from 'lucide-react';

/**
 * Schedule Management Component
 * @param {Object} props - Component props
 * @param {Function} props.onPageChange - Function to handle page navigation
 */

// Upcoming appointments data
const upcomingAppointments = [
  {
    id: 1,
    date: new Date(2024, 11, 15),
    time: '09:00',
    endTime: '10:00',
    duration: 60,
    patient: {
      name: 'Priya Sharma',
      avatar: '/placeholder-avatar.jpg',
      phone: '+91 98765 43210',
      email: 'priya.sharma@email.com',
      age: 34,
      dosha: 'Vata-Pitta'
    },
    therapy: 'Abhyanga',
    status: 'confirmed',
    room: 'Room A',
    notes: 'Regular stress relief session. Patient responds well to treatment.',
    sessionNumber: 9,
    totalSessions: 12,
    priority: 'medium'
  },
  {
    id: 2,
    date: new Date(2024, 11, 15),
    time: '10:30',
    endTime: '11:15',
    duration: 45,
    patient: {
      name: 'Raj Patel',
      avatar: '/placeholder-avatar.jpg',
      phone: '+91 87654 32109',
      email: 'raj.patel@email.com',
      age: 42,
      dosha: 'Pitta-Kapha'
    },
    therapy: 'Shirodhara',
    status: 'pending',
    room: 'Room B',
    notes: 'Monitor blood pressure before session. Patient reported dizziness last time.',
    sessionNumber: 4,
    totalSessions: 10,
    priority: 'high'
  },
  {
    id: 3,
    date: new Date(2024, 11, 15),
    time: '14:00',
    endTime: '15:30',
    duration: 90,
    patient: {
      name: 'Meera Singh',
      avatar: '/placeholder-avatar.jpg',
      phone: '+91 76543 21098',
      email: 'meera.singh@email.com',
      age: 28,
      dosha: 'Vata'
    },
    therapy: 'Panchakarma',
    status: 'confirmed',
    room: 'Room C',
    notes: 'Detox session day 3. Patient responding excellently to treatment.',
    sessionNumber: 12,
    totalSessions: 14,
    priority: 'high'
  },
  {
    id: 4,
    date: new Date(2024, 11, 16),
    time: '09:30',
    endTime: '10:00',
    duration: 30,
    patient: {
      name: 'Amit Kumar',
      avatar: '/placeholder-avatar.jpg',
      phone: '+91 65432 10987',
      email: 'amit.kumar@email.com',
      age: 36,
      dosha: 'Kapha'
    },
    therapy: 'Yoga Therapy',
    status: 'confirmed',
    room: 'Studio 1',
    notes: 'Focus on weight management and joint mobility exercises.',
    sessionNumber: 3,
    totalSessions: 8,
    priority: 'medium'
  },
  {
    id: 5,
    date: new Date(2024, 11, 16),
    time: '11:00',
    endTime: '12:15',
    duration: 75,
    patient: {
      name: 'Sunita Verma',
      avatar: '/placeholder-avatar.jpg',
      phone: '+91 54321 09876',
      email: 'sunita.verma@email.com',
      age: 42,
      dosha: 'Kapha-Vata'
    },
    therapy: 'Abhyanga',
    status: 'confirmed',
    room: 'Room A',
    notes: 'Maintenance session. Patient prefers moderate pressure with warm sesame oil.',
    sessionNumber: 8,
    totalSessions: 12,
    priority: 'low'
  },
  {
    id: 6,
    date: new Date(2024, 11, 17),
    time: '08:30',
    endTime: '09:30',
    duration: 60,
    patient: {
      name: 'Vikram Agarwal',
      avatar: '/placeholder-avatar.jpg',
      phone: '+91 43210 98765',
      email: 'vikram.agarwal@email.com',
      age: 35,
      dosha: 'Pitta-Vata'
    },
    therapy: 'Nasya',
    status: 'pending',
    room: 'Room B',
    notes: 'First session for sinus treatment. Explain procedure thoroughly.',
    sessionNumber: 1,
    totalSessions: 5,
    priority: 'medium'
  },
  {
    id: 7,
    date: new Date(2024, 11, 18),
    time: '10:00',
    endTime: '11:30',
    duration: 90,
    patient: {
      name: 'Ramesh Gupta',
      avatar: '/placeholder-avatar.jpg',
      phone: '+91 21098 76543',
      email: 'ramesh.gupta@email.com',
      age: 55,
      dosha: 'Kapha'
    },
    therapy: 'Panchakarma',
    status: 'confirmed',
    room: 'Room A',
    notes: 'Weight management program. Monitor vitals - patient has diabetes.',
    sessionNumber: 5,
    totalSessions: 14,
    priority: 'high'
  }
];

export function ScheduleManagement({ onPageChange }) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedAppointment, setSelectedAppointment] = React.useState(null);
  const [isModifyDialogOpen, setIsModifyDialogOpen] = React.useState(false);
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = React.useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = React.useState(false);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = React.useState(false);
  
  const [modifyData, setModifyData] = React.useState({
    notes: '',
    room: '',
    duration: ''
  });
  
  const [rescheduleData, setRescheduleData] = React.useState({
    date: '',
    time: '',
    reason: ''
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-50 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-4 border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-4 border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-4 border-l-green-500 bg-green-50';
      default: return 'border-l-4 border-l-gray-300 bg-gray-50';
    }
  };

  const getRoomColor = (room) => {
    switch (room) {
      case 'Room A': return 'bg-blue-100 text-blue-800';
      case 'Room B': return 'bg-purple-100 text-purple-800';
      case 'Room C': return 'bg-emerald-100 text-emerald-800';
      case 'Studio 1': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (time) => {
    return new Date(`2024-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const filteredAppointments = upcomingAppointments.filter(appointment =>
    searchTerm === '' ||
    appointment.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.therapy.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedAppointments = filteredAppointments.reduce((groups, appointment) => {
    const dateKey = appointment.date.toDateString();
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(appointment);
    return groups;
  }, {});

  const handleModifyAppointment = () => {
    if (selectedAppointment) {
      console.log('Modifying appointment:', selectedAppointment.id, modifyData);
      toast.success('Appointment modified successfully');
      setIsModifyDialogOpen(false);
      setModifyData({ notes: '', room: '', duration: '' });
      setSelectedAppointment(null);
    }
  };

  const handleRescheduleAppointment = () => {
    if (selectedAppointment && rescheduleData.date && rescheduleData.time) {
      console.log('Rescheduling appointment:', selectedAppointment.id, rescheduleData);
      toast.success('Appointment rescheduled successfully');
      setIsRescheduleDialogOpen(false);
      setRescheduleData({ date: '', time: '', reason: '' });
      setSelectedAppointment(null);
    }
  };

  const handleCancelAppointment = () => {
    if (selectedAppointment) {
      console.log('Cancelling appointment:', selectedAppointment.id);
      toast.success('Appointment cancelled successfully');
      setIsCancelDialogOpen(false);
      setSelectedAppointment(null);
    }
  };

  const openModifyDialog = (appointment) => {
    setSelectedAppointment(appointment);
    setModifyData({
      notes: appointment.notes || '',
      room: appointment.room || '',
      duration: appointment.duration.toString() || ''
    });
    setIsModifyDialogOpen(true);
  };

  const openRescheduleDialog = (appointment) => {
    setSelectedAppointment(appointment);
    setRescheduleData({ date: '', time: '', reason: '' });
    setIsRescheduleDialogOpen(true);
  };

  const openCancelDialog = (appointment) => {
    setSelectedAppointment(appointment);
    setIsCancelDialogOpen(true);
  };

  const openViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setIsViewDetailsOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-emerald-900 mb-2">My Schedule</h1>
            <p className="text-emerald-600 text-lg">Manage your upcoming appointments and sessions</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              New Appointment
            </Button>
            <Button
              onClick={() => onPageChange('practitioner-dashboard')}
              variant="outline"
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>

        {/* Search and Summary */}
        <Card className="bg-white/95 backdrop-blur-sm border-emerald-200 mb-8 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-4">
                <Badge className="bg-emerald-100 text-emerald-800 px-4 py-2">
                  <Calendar className="w-4 h-4 mr-1" />
                  {filteredAppointments.length} Upcoming
                </Badge>
                <Badge className="bg-yellow-100 text-yellow-800 px-4 py-2">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {filteredAppointments.filter(a => a.status === 'pending').length} Pending
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointments List */}
        <div className="space-y-8">
          {Object.entries(groupedAppointments).map(([dateKey, appointments]) => (
            <div key={dateKey}>
              {/* Date Header */}
              <div className="flex items-center mb-6">
                <div className="bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-md">
                  <p className="font-medium">{formatDate(new Date(dateKey))}</p>
                </div>
                <div className="flex-1 h-px bg-emerald-200 ml-4"></div>
                <Badge className="ml-4 bg-emerald-100 text-emerald-800">
                  {appointments.length} sessions
                </Badge>
              </div>

              {/* Appointments for this date */}
              <div className="grid gap-4">
                {appointments.map((appointment) => (
                  <Card 
                    key={appointment.id} 
                    className={`${getPriorityColor(appointment.priority)} bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        {/* Left side - Appointment Details */}
                        <div className="flex items-center space-x-4">
                          <div className="flex flex-col items-center bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                            <Clock className="w-5 h-5 text-emerald-600 mb-1" />
                            <p className="text-sm font-medium text-emerald-900">{formatTime(appointment.time)}</p>
                            <p className="text-xs text-emerald-600">{appointment.duration}min</p>
                          </div>

                          <div className="flex items-center space-x-4">
                            <Avatar className="w-12 h-12 border-2 border-gray-200">
                              <AvatarImage src={appointment.patient.avatar} />
                              <AvatarFallback className="bg-emerald-100 text-emerald-700">
                                {appointment.patient.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div>
                              <h3 className="font-medium text-gray-900">{appointment.patient.name}</h3>
                              <p className="text-sm text-gray-600">{appointment.patient.age}y, {appointment.patient.dosha}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge className="text-xs" variant="outline">{appointment.therapy}</Badge>
                                <Badge className={getRoomColor(appointment.room)} variant="outline">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {appointment.room}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <div className="hidden md:block">
                            <p className="text-sm text-gray-600">Session {appointment.sessionNumber} of {appointment.totalSessions}</p>
                            <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                              <div 
                                className="bg-emerald-600 h-2 rounded-full" 
                                style={{ width: `${(appointment.sessionNumber / appointment.totalSessions) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        {/* Right side - Status and Actions */}
                        <div className="flex items-center space-x-4">
                          <Badge className={getStatusColor(appointment.status)} variant="outline">
                            {appointment.status}
                          </Badge>
                          
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openViewDetails(appointment)}
                              className="text-blue-600 border-blue-300 hover:bg-blue-50"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openModifyDialog(appointment)}
                              className="text-green-600 border-green-300 hover:bg-green-50"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openRescheduleDialog(appointment)}
                              className="text-yellow-600 border-yellow-300 hover:bg-yellow-50"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openCancelDialog(appointment)}
                              className="text-red-600 border-red-300 hover:bg-red-50"
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Notes preview */}
                      {appointment.notes && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-sm text-gray-600">{appointment.notes}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* View Details Dialog */}
        <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <Eye className="w-5 h-5 text-blue-600" />
                <span>Appointment Details</span>
              </DialogTitle>
            </DialogHeader>
            {selectedAppointment && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Patient Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={selectedAppointment.patient.avatar} />
                          <AvatarFallback>{selectedAppointment.patient.name.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{selectedAppointment.patient.name}</p>
                          <p className="text-sm text-gray-600">{selectedAppointment.patient.age} years</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{selectedAppointment.patient.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ThermometerSun className="w-4 h-4 text-orange-500" />
                        <span className="text-sm">{selectedAppointment.patient.dosha} Constitution</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Session Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">{formatDate(selectedAppointment.date)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium">{formatTime(selectedAppointment.time)} - {formatTime(selectedAppointment.endTime)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{selectedAppointment.duration} minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Therapy:</span>
                        <span className="font-medium">{selectedAppointment.therapy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Room:</span>
                        <Badge className={getRoomColor(selectedAppointment.room)}>{selectedAppointment.room}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Session:</span>
                        <span className="font-medium">{selectedAppointment.sessionNumber} of {selectedAppointment.totalSessions}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Notes</h3>
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <p className="text-sm text-gray-700">{selectedAppointment.notes}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Modify Dialog */}
        <Dialog open={isModifyDialogOpen} onOpenChange={setIsModifyDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <Edit2 className="w-5 h-5 text-green-600" />
                <span>Modify Appointment</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="modify-room">Room</Label>
                <Select value={modifyData.room} onValueChange={(value) => setModifyData(prev => ({ ...prev, room: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select room" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Room A">Room A</SelectItem>
                    <SelectItem value="Room B">Room B</SelectItem>
                    <SelectItem value="Room C">Room C</SelectItem>
                    <SelectItem value="Studio 1">Studio 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="modify-duration">Duration (minutes)</Label>
                <Select value={modifyData.duration} onValueChange={(value) => setModifyData(prev => ({ ...prev, duration: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="75">75 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="modify-notes">Notes</Label>
                <Textarea
                  id="modify-notes"
                  placeholder="Update appointment notes..."
                  value={modifyData.notes}
                  onChange={(e) => setModifyData(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                />
              </div>
              
              <div className="flex space-x-3">
                <Button onClick={handleModifyAppointment} className="flex-1 bg-green-600 hover:bg-green-700">
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setIsModifyDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Reschedule Dialog */}
        <Dialog open={isRescheduleDialogOpen} onOpenChange={setIsRescheduleDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <RotateCcw className="w-5 h-5 text-yellow-600" />
                <span>Reschedule Appointment</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="reschedule-date">New Date</Label>
                  <Input
                    id="reschedule-date"
                    type="date"
                    value={rescheduleData.date}
                    onChange={(e) => setRescheduleData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="reschedule-time">New Time</Label>
                  <Input
                    id="reschedule-time"
                    type="time"
                    value={rescheduleData.time}
                    onChange={(e) => setRescheduleData(prev => ({ ...prev, time: e.target.value }))}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="reschedule-reason">Reason for Rescheduling</Label>
                <Textarea
                  id="reschedule-reason"
                  placeholder="Please provide a reason for rescheduling..."
                  value={rescheduleData.reason}
                  onChange={(e) => setRescheduleData(prev => ({ ...prev, reason: e.target.value }))}
                  rows={3}
                />
              </div>
              
              <div className="flex space-x-3">
                <Button onClick={handleRescheduleAppointment} className="flex-1 bg-yellow-600 hover:bg-yellow-700">
                  Reschedule
                </Button>
                <Button variant="outline" onClick={() => setIsRescheduleDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Cancel Dialog */}
        <AlertDialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center space-x-3">
                <XCircle className="w-5 h-5 text-red-600" />
                <span>Cancel Appointment</span>
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to cancel this appointment? This action cannot be undone and the patient will be notified.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep Appointment</AlertDialogCancel>
              <AlertDialogAction onClick={handleCancelAppointment} className="bg-red-600 hover:bg-red-700">
                Cancel Appointment
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}