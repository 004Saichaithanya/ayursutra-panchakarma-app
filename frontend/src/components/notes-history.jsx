import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import {
  ArrowLeft,
  Plus,
  Edit,
  Save,
  X,
  Paperclip,
  Download,
  Eye,
  Calendar,
  Clock,
  FileText,
  Upload,
  Search,
  Filter
} from 'lucide-react';

/**
 * @param {{ onPageChange: (page: string) => void }} props
 */
export function NotesHistory({ onPageChange }) {
  // Mock data moved inside the component to keep the file self-contained
  const patientNotes = [
    {
      id: 1,
      patientId: 1,
      patientName: 'Priya Sharma',
      patientAvatar: '/placeholder-avatar.jpg',
      date: new Date(2024, 11, 13),
      time: '14:30',
      sessionType: 'Abhyanga',
      noteType: 'Session Note',
      title: 'Post-session observation',
      content:
        'Patient showed significant improvement in stress levels. Reported better sleep quality and reduced anxiety. Skin texture has improved noticeably. Recommend continuing current protocol for next 2 weeks.',
      practitioner: 'Dr. Kamal Raj',
      attachments: [
        { id: 1, name: 'progress_photos.jpg', type: 'image', size: '2.4 MB' },
        { id: 2, name: 'treatment_plan.pdf', type: 'pdf', size: '1.1 MB' }
      ],
      tags: ['improvement', 'stress-reduction', 'skin-health'],
      isEditable: true
    },
    {
      id: 2,
      patientId: 1,
      patientName: 'Priya Sharma',
      patientAvatar: '/placeholder-avatar.jpg',
      date: new Date(2024, 11, 10),
      time: '10:00',
      sessionType: 'Consultation',
      noteType: 'Medical Note',
      title: 'Initial consultation findings',
      content:
        'Patient presents with chronic stress, mild digestive issues, and sleep disturbances. Pulse examination indicates Vata-Pitta imbalance. Recommended Abhyanga therapy 3x weekly with specific herbal oils.',
      practitioner: 'Dr. Kamal Raj',
      attachments: [{ id: 3, name: 'pulse_assessment.pdf', type: 'pdf', size: '800 KB' }],
      tags: ['initial-assessment', 'vata-pitta', 'consultation'],
      isEditable: true
    },
    {
      id: 3,
      patientId: 2,
      patientName: 'Raj Patel',
      patientAvatar: '/placeholder-avatar.jpg',
      date: new Date(2024, 11, 8),
      time: '16:15',
      sessionType: 'Shirodhara',
      noteType: 'Session Note',
      title: 'Shirodhara session #4',
      content:
        'Patient reported mild discomfort during oil flow. Adjusted oil temperature and flow rate. BP readings stable during session (138/85). Patient felt more relaxed post-session.',
      practitioner: 'Dr. Kamal Raj',
      attachments: [{ id: 4, name: 'bp_readings.csv', type: 'csv', size: '45 KB' }],
      tags: ['blood-pressure', 'shirodhara', 'adjustment'],
      isEditable: true
    },
    {
      id: 4,
      patientId: 3,
      patientName: 'Meera Singh',
      patientAvatar: '/placeholder-avatar.jpg',
      date: new Date(2024, 11, 12),
      time: '11:45',
      sessionType: 'Panchakarma',
      noteType: 'Progress Note',
      title: 'Panchakarma Day 12 - Excellent progress',
      content:
        'Outstanding response to detox protocol. Energy levels normalized, digestive fire (Agni) significantly improved. Patient reports feeling "reborn". Recommend tapering down intensity gradually.',
      practitioner: 'Dr. Kamal Raj',
      attachments: [
        { id: 5, name: 'detox_progress_chart.pdf', type: 'pdf', size: '1.8 MB' },
        { id: 6, name: 'dietary_recommendations.docx', type: 'doc', size: '245 KB' }
      ],
      tags: ['excellent-progress', 'detox', 'energy-improvement'],
      isEditable: true
    }
  ];

  const patients = [
    { id: 1, name: 'Priya Sharma', avatar: '/placeholder-avatar.jpg' },
    { id: 2, name: 'Raj Patel', avatar: '/placeholder-avatar.jpg' },
    { id: 3, name: 'Meera Singh', avatar: '/placeholder-avatar.jpg' },
    { id: 4, name: 'Amit Kumar', avatar: '/placeholder-avatar.jpg' }
  ];

  const [selectedPatient, setSelectedPatient] = React.useState('all');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [noteFilter, setNoteFilter] = React.useState('all');
  const [isAddingNote, setIsAddingNote] = React.useState(false);
  const [editingNote, setEditingNote] = React.useState(null);
  const [newNote, setNewNote] = React.useState({
    patientId: '',
    sessionType: '',
    noteType: 'Session Note',
    title: '',
    content: '',
    tags: ''
  });
  const [selectedFiles, setSelectedFiles] = React.useState([]);

  const filteredNotes = patientNotes.filter((note) => {
    const matchesPatient = selectedPatient === 'all' || note.patientName === selectedPatient;
    const matchesSearch =
      searchTerm === '' ||
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = noteFilter === 'all' || note.noteType === noteFilter;

    return matchesPatient && matchesSearch && matchesFilter;
  });

  const groupedNotes = filteredNotes.reduce((acc, note) => {
    const key = note.patientName;
    if (!acc[key]) acc[key] = [];
    acc[key].push(note);
    return acc;
  }, {});

  const handleSaveNote = () => {
    console.log('Saving note:', newNote, selectedFiles);
    setIsAddingNote(false);
    setNewNote({
      patientId: '',
      sessionType: '',
      noteType: 'Session Note',
      title: '',
      content: '',
      tags: ''
    });
    setSelectedFiles([]);
  };

  const handleEditNote = (noteId) => {
    setEditingNote(noteId);
  };

  const handleSaveEdit = (noteId) => {
    console.log('Saving edit for note:', noteId);
    setEditingNote(null);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return '📄';
      case 'image':
        return '🖼️';
      case 'doc':
        return '📝';
      case 'csv':
        return '📊';
      default:
        return '📎';
    }
  };

  const getNoteTypeColor = (type) => {
    switch (type) {
      case 'Session Note':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Medical Note':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Progress Note':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-emerald-900 mb-2">Notes & Case History</h1>
            <p className="text-emerald-600">Patient timeline notes with file attachments</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={() => setIsAddingNote(true)} className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Note
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

        {/* Search and Filter Controls */}
        <Card className="bg-white/90 backdrop-blur-sm border-emerald-200 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search notes, content, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
                <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Patients</SelectItem>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.name}>
                        {patient.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={noteFilter} onValueChange={setNoteFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Session Note">Session Notes</SelectItem>
                    <SelectItem value="Medical Note">Medical Notes</SelectItem>
                    <SelectItem value="Progress Note">Progress Notes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes Timeline */}
        <div className="space-y-6">
          {Object.entries(groupedNotes).map(([patientName, notes]) => (
            <Card key={patientName} className="bg-white/90 backdrop-blur-sm border-emerald-200">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={notes[0].patientAvatar} />
                    <AvatarFallback className="bg-emerald-100 text-emerald-700">
                      {patientName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-emerald-900">{patientName}</CardTitle>
                    <CardDescription>{notes.length} notes</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notes
                    .sort((a, b) => b.date.getTime() - a.date.getTime())
                    .map((note, index) => (
                      <div key={note.id} className="relative">
                        {/* Timeline line */}
                        {index < notes.length - 1 && (
                          <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200" />
                        )}

                        <div className="flex items-start space-x-4">
                          {/* Timeline dot */}
                          <div className="bg-emerald-500 w-3 h-3 rounded-full mt-6 relative z-10" />

                          {/* Note content */}
                          <div className="flex-1 bg-gray-50 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <div>
                                  <div className="flex items-center space-x-2 mb-1">
                                    <Calendar className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm text-gray-600">
                                      {note.date.toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                      })}
                                    </span>
                                    <Clock className="w-4 h-4 text-gray-500 ml-2" />
                                    <span className="text-sm text-gray-600">{note.time}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Badge className={getNoteTypeColor(note.noteType)} variant="outline">
                                      {note.noteType}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                      {note.sessionType}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {editingNote === note.id ? (
                                  <>
                                    <Button
                                      size="sm"
                                      onClick={() => handleSaveEdit(note.id)}
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      <Save className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => setEditingNote(null)}
                                    >
                                      <X className="w-4 h-4" />
                                    </Button>
                                  </>
                                ) : (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleEditNote(note.id)}
                                    className="text-blue-600 border-blue-300 hover:bg-blue-50"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            </div>

                            <div className="mb-3">
                              {editingNote === note.id ? (
                                <div className="space-y-3">
                                  <Input defaultValue={note.title} placeholder="Note title..." className="font-medium" />
                                  <Textarea defaultValue={note.content} placeholder="Note content..." rows={4} />
                                </div>
                              ) : (
                                <>
                                  <h4 className="font-medium text-gray-900 mb-2">{note.title}</h4>
                                  <p className="text-gray-700 text-sm leading-relaxed">{note.content}</p>
                                </>
                              )}
                            </div>

                            {/* Tags */}
                            <div className="flex items-center space-x-2 mb-3">
                              {note.tags.map((tag, tagIndex) => (
                                <Badge
                                  key={tagIndex}
                                  variant="outline"
                                  className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200"
                                >
                                  #{tag}
                                </Badge>
                              ))}
                            </div>

                            {/* Attachments */}
                            {note.attachments.length > 0 && (
                              <div className="space-y-2">
                                <Label className="text-sm text-gray-600">Attachments</Label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  {note.attachments.map((attachment) => (
                                    <div key={attachment.id} className="flex items-center space-x-3 p-2 bg-white rounded border">
                                      <span className="text-lg">{getFileIcon(attachment.type)}</span>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">{attachment.name}</p>
                                        <p className="text-xs text-gray-500">{attachment.size}</p>
                                      </div>
                                      <div className="flex items-center space-x-1">
                                        <Button size="sm" variant="outline" className="p-1">
                                          <Eye className="w-3 h-3" />
                                        </Button>
                                        <Button size="sm" variant="outline" className="p-1">
                                          <Download className="w-3 h-3" />
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                              <span className="text-xs text-gray-500">By {note.practitioner}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Note Dialog */}
        <Dialog open={isAddingNote} onOpenChange={setIsAddingNote}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Note</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patient">Patient</Label>
                  <Select
                    value={newNote.patientId}
                    onValueChange={(value) => setNewNote((prev) => ({ ...prev, patientId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((patient) => (
                        <SelectItem key={patient.id} value={patient.id.toString()}>
                          {patient.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="session-type">Session Type</Label>
                  <Select
                    value={newNote.sessionType}
                    onValueChange={(value) => setNewNote((prev) => ({ ...prev, sessionType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select session type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Abhyanga">Abhyanga</SelectItem>
                      <SelectItem value="Shirodhara">Shirodhara</SelectItem>
                      <SelectItem value="Panchakarma">Panchakarma</SelectItem>
                      <SelectItem value="Yoga Therapy">Yoga Therapy</SelectItem>
                      <SelectItem value="Consultation">Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="note-type">Note Type</Label>
                <Select
                  value={newNote.noteType}
                  onValueChange={(value) => setNewNote((prev) => ({ ...prev, noteType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Session Note">Session Note</SelectItem>
                    <SelectItem value="Medical Note">Medical Note</SelectItem>
                    <SelectItem value="Progress Note">Progress Note</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Note title..."
                  value={newNote.title}
                  onChange={(e) => setNewNote((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Enter your notes here..."
                  value={newNote.content}
                  onChange={(e) => setNewNote((prev) => ({ ...prev, content: e.target.value }))}
                  rows={6}
                />
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  placeholder="e.g., improvement, stress-reduction, follow-up"
                  value={newNote.tags}
                  onChange={(e) => setNewNote((prev) => ({ ...prev, tags: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="attachments">File Attachments</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input type="file" multiple onChange={handleFileUpload} className="hidden" id="file-upload" />
                  <label htmlFor="file-upload" className="flex flex-col items-center justify-center cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Click to upload files</span>
                  </label>

                  {selectedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <Paperclip className="w-4 h-4 text-gray-500" />
                          <span>{file.name}</span>
                          <span className="text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button onClick={handleSaveNote} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Save Note
                </Button>
                <Button variant="outline" onClick={() => setIsAddingNote(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
