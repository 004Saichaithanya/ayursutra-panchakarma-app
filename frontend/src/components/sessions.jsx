import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Calendar, Clock, User, Edit, X, CheckCircle, AlertCircle, Loader2,
} from 'lucide-react';
import { Feedback } from './feedback';

const API_BASE_URL = 'http://127.0.0.1:8000';

const getDummySessions = (patientId) => [
    { therapy: 'Abhyanga Massage', date: '2025-09-30', time: '14:00', practitioner: 'Dr. Kamal Raj', status: 'confirmed', patientId, notes: 'Follow-up massage session.' },
    { therapy: 'Swedana Steam Therapy', date: '2025-10-02', time: '11:00', practitioner: 'Dr. Anjali Nair', status: 'confirmed', patientId, notes: 'Post-massage steam therapy.' },
    { therapy: 'Initial Consultation', date: '2025-09-22', time: '16:00', practitioner: 'Dr. Kamal Raj', status: 'completed', patientId, notes: 'Patient assessment and treatment plan discussion.' },
];

export function Sessions({ onPageChange }) {
  const { currentUser } = useAuth();
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [previousSessions, setPreviousSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sessionToEdit, setSessionToEdit] = useState(null);

  const fetchSessions = async (patientId, shouldTrySeeding = true) => {
    setIsLoading(true);
    setError(null);
    try {
      let response = await fetch(`${API_BASE_URL}/sessions/${patientId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      let allSessions = await response.json();

      if (allSessions.length === 0 && shouldTrySeeding) {
        const dummySessions = getDummySessions(patientId);
        await Promise.all(dummySessions.map(session => fetch(`${API_BASE_URL}/sessions/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...session, duration: '60 min', location: 'Clinic', sessionId: `DUMMY-${Math.random()}` }),
        })));
        response = await fetch(`${API_BASE_URL}/sessions/${patientId}`);
        allSessions = await response.json();
      }

      const upcoming = allSessions.filter(s => s.status === 'confirmed' || s.status === 'pending');
      const previous = allSessions.filter(s => s.status === 'completed');
      setUpcomingSessions(upcoming.sort((a, b) => new Date(a.date) - new Date(b.date)));
      setPreviousSessions(previous.sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch (err) {
      setError('Failed to fetch sessions.');
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchSessions(currentUser.uid);
    } else {
      setUpcomingSessions([]);
      setPreviousSessions([]);
      setIsLoading(false);
    }
  }, [currentUser]);

  const handleOpenCreateModal = () => {
    setSessionToEdit(null);
    setIsModalOpen(true);
  };
  
  const handleOpenEditModal = (session) => {
    setSessionToEdit(session);
    setIsModalOpen(true);
  };

  const handleSaveSession = async (formData) => {
    if (!currentUser) return;
    
    const sessionData = {
      ...formData,
      patientId: currentUser.uid,
      duration: '60 minutes',
      location: 'Treatment Room A',
      status: 'confirmed',
      sessionId: `SES${Math.floor(Math.random() * 1000)}`,
    };
    
    try {
      const isEditing = !!sessionToEdit;
      const url = isEditing ? `${API_BASE_URL}/sessions/${sessionToEdit.id}` : `${API_BASE_URL}/sessions/`;
      const method = isEditing ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sessionData),
      });
      if (!response.ok) throw new Error(`Failed to save session.`);
      setIsModalOpen(false);
      await fetchSessions(currentUser.uid, false);
    } catch (err) {
      console.error('Save error:', err);
      alert(`Could not save the session.`);
    }
  };

  const handleCancelSession = async (session) => {
    if (!window.confirm(`Are you sure you want to cancel this session?`)) return;
    try {
        await fetch(`${API_BASE_URL}/sessions/${session.id}`, { method: 'DELETE' });
        setUpcomingSessions(current => current.filter(s => s.id !== session.id));
    } catch (err) {
        alert('Could not cancel the session.');
    }
  };

  const SessionCard = ({ session }) => (
     <Card className="transition-shadow hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
            {/* Header Section */}
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-emerald-900">{session.therapy}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                        <User className="w-4 h-4 mr-2" />
                        <span>With: {session.practitioner}</span>
                    </div>
                </div>
                <Badge 
                    className={
                        session.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                        session.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                    }
                >{session.status}</Badge>
            </div>

            {/* Details Section */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-emerald-700 border-t border-b py-4">
              <div className="flex items-center space-x-2"><Calendar className="w-4 h-4" /><span>{new Date(session.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></div>
              <div className="flex items-center space-x-2"><Clock className="w-4 h-4" /><span>{session.time}</span></div>
            </div>
            
            {/* Notes Section */}
            {session.notes && (
                <p className="text-sm text-gray-600 italic">"{session.notes}"</p>
            )}

            {/* Actions Section */}
            <div className="flex space-x-3 pt-2">
              <Button size="sm" onClick={() => handleOpenEditModal(session)} variant="outline"><Edit className="w-4 h-4 mr-2" />Modify</Button>
              <Button size="sm" onClick={() => handleCancelSession(session)} variant="destructive"><X className="w-4 h-4 mr-2" />Cancel</Button>
            </div>
        </div>
      </CardContent>
    </Card>
  );

  if (isLoading) return <div className="flex justify-center items-center h-screen"><Loader2 className="w-12 h-12 animate-spin text-emerald-600" /></div>;
  if (error) return <div className="p-12 text-center"><AlertCircle className="mx-auto w-12 h-12 text-red-500" /><p className="mt-4 text-red-700">{error}</p></div>;

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-2xl p-8 text-white">
        <div className="flex justify-between items-center mb-6">
          <div><h1 className="text-3xl font-bold">My Sessions</h1><p className="text-emerald-100">Manage your therapy sessions and track your progress</p></div>
          <Button onClick={handleOpenCreateModal} className="bg-white/20 hover:bg-white/30 text-white">+ Schedule New Session</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 p-4 text-center rounded-xl"><CheckCircle className="mx-auto w-8 h-8 mb-2" /><p>Completed</p><p className="text-2xl font-bold">{previousSessions.length}</p></div>
          <div className="bg-white/10 p-4 text-center rounded-xl"><Calendar className="mx-auto w-8 h-8 mb-2" /><p>Upcoming</p><p className="text-2xl font-bold">{upcomingSessions.length}</p></div>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="previous">Previous Sessions</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
            {upcomingSessions.length > 0 ? (
                <div className="space-y-6">
                    {upcomingSessions.map(s => <SessionCard key={s.id} session={s} />)}
                </div>
            ) : (
                <Card>
                    <CardContent className="p-12 text-center flex flex-col items-center">
                        <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
                        <h3 className="font-medium text-gray-900 mb-2">No Upcoming Sessions</h3>
                        <p className="text-gray-600 mb-4">You have no sessions scheduled.</p>
                        <Button onClick={handleOpenCreateModal} className="bg-emerald-600 hover:bg-emerald-700">Schedule a Session</Button>
                    </CardContent>
                </Card>
            )}
        </TabsContent>
        <TabsContent value="previous">
            {previousSessions.length > 0 ? (
                <div className="space-y-6">
                    {previousSessions.map(s => <SessionCard key={s.id} session={s} />)}
                </div>
            ) : (
                <Card><CardContent className="p-12 text-center text-gray-500">You have no completed sessions.</CardContent></Card>
            )}
        </TabsContent>
      </Tabs>
      
      <SessionFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSaveSession} session={sessionToEdit} />
    </div>
  );
}

function SessionFormModal({ isOpen, onClose, onSubmit, session }) {
  const isEditing = !!session;
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (session) {
      setFormData({
        therapy: session.therapy || '',
        date: session.date || '',
        time: session.time || '',
        notes: session.notes || '',
        practitioner: session.practitioner || '',
      });
    } else {
      setFormData({
        therapy: '', date: '', time: '', notes: '', practitioner: '',
      });
    }
  }, [session, isOpen]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); onSubmit(formData); };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader><DialogTitle>{isEditing ? 'Edit Session' : 'Schedule New Session'}</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="practitioner" className="text-right">Practitioner</Label>
              <Input id="practitioner" value={formData.practitioner || ''} onChange={handleChange} className="col-span-3" placeholder="e.g., Dr. Kamal Raj" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="therapy" className="text-right">Therapy</Label>
              <Input id="therapy" value={formData.therapy || ''} onChange={handleChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">Date</Label>
              <Input id="date" type="date" value={formData.date || ''} onChange={handleChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">Time</Label>
              <Input id="time" type="time" value={formData.time || ''} onChange={handleChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">Notes</Label>
              <Textarea id="notes" value={formData.notes || ''} onChange={handleChange} className="col-span-3" placeholder="Any additional notes..."/>
            </div>
          <DialogFooter>
            <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
            <Button type="submit">{isEditing ? 'Save Changes' : 'Schedule'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}