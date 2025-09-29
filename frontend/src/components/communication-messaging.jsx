import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import {
  ArrowLeft,
  Send,
  Paperclip,
  Download,
  Search,
  Plus,
  Phone,
  Video,
  MoreVertical,
  Clock,
  Check,
  CheckCheck,
  Upload,
  File,
  Image,
  FileText
} from 'lucide-react';

/**
 * @param {{ onPageChange: (page: string) => void }} props
 */
export function CommunicationMessaging({ onPageChange }) {
  // Mock data (kept inside to keep file self-contained)
  const conversations = [
    {
      id: 1,
      patientName: 'Priya Sharma',
      patientAvatar: '/placeholder-avatar.jpg',
      lastMessage: 'Thank you for the session today! Feeling much better.',
      lastMessageTime: new Date(2024, 11, 13, 16, 45),
      unreadCount: 0,
      isOnline: true,
      patientId: 1
    },
    {
      id: 2,
      patientName: 'Raj Patel',
      patientAvatar: '/placeholder-avatar.jpg',
      lastMessage: "Can we reschedule tomorrow's appointment?",
      lastMessageTime: new Date(2024, 11, 13, 14, 20),
      unreadCount: 2,
      isOnline: false,
      patientId: 2
    },
    {
      id: 3,
      patientName: 'Meera Singh',
      patientAvatar: '/placeholder-avatar.jpg',
      lastMessage: 'The diet chart you shared is working wonderfully!',
      lastMessageTime: new Date(2024, 11, 13, 12, 15),
      unreadCount: 0,
      isOnline: true,
      patientId: 3
    },
    {
      id: 4,
      patientName: 'Amit Kumar',
      patientAvatar: '/placeholder-avatar.jpg',
      lastMessage: 'I have some questions about the yoga poses.',
      lastMessageTime: new Date(2024, 11, 12, 18, 30),
      unreadCount: 1,
      isOnline: false,
      patientId: 4
    }
  ];

  const messages = [
    {
      id: 1,
      senderId: 1,
      senderName: 'Priya Sharma',
      content: "Hello Dr. Kamal! I hope you're doing well.",
      timestamp: new Date(2024, 11, 13, 14, 0),
      type: 'text',
      status: 'read'
    },
    {
      id: 2,
      senderId: 'practitioner',
      senderName: 'Dr. Kamal Raj',
      content:
        "Hello Priya! I'm doing great, thank you. How are you feeling after yesterday's session?",
      timestamp: new Date(2024, 11, 13, 14, 15),
      type: 'text',
      status: 'read'
    },
    {
      id: 3,
      senderId: 1,
      senderName: 'Priya Sharma',
      content:
        "I'm feeling much better! The stress levels have reduced significantly and I slept really well last night.",
      timestamp: new Date(2024, 11, 13, 14, 30),
      type: 'text',
      status: 'read'
    },
    {
      id: 4,
      senderId: 'practitioner',
      senderName: 'Dr. Kamal Raj',
      content:
        "That's wonderful to hear! I'm attaching your updated diet chart. Please follow this for the next two weeks.",
      timestamp: new Date(2024, 11, 13, 14, 45),
      type: 'text',
      status: 'read',
      attachments: [{ id: 1, name: 'updated_diet_chart.pdf', type: 'pdf', size: '1.2 MB' }]
    },
    {
      id: 5,
      senderId: 1,
      senderName: 'Priya Sharma',
      content: "Thank you so much! I'll follow it religiously.",
      timestamp: new Date(2024, 11, 13, 15, 0),
      type: 'text',
      status: 'read'
    },
    {
      id: 6,
      senderId: 1,
      senderName: 'Priya Sharma',
      content:
        "Also, I wanted to share a photo of my skin improvement. It's looking so much healthier!",
      timestamp: new Date(2024, 11, 13, 16, 30),
      type: 'image',
      status: 'read',
      attachments: [{ id: 2, name: 'skin_progress.jpg', type: 'image', size: '2.4 MB' }]
    },
    {
      id: 7,
      senderId: 'practitioner',
      senderName: 'Dr. Kamal Raj',
      content:
        'This is fantastic progress! Your skin texture has improved remarkably. Keep up the good work!',
      timestamp: new Date(2024, 11, 13, 16, 40),
      type: 'text',
      status: 'delivered'
    },
    {
      id: 8,
      senderId: 1,
      senderName: 'Priya Sharma',
      content: 'Thank you for the session today! Feeling much better.',
      timestamp: new Date(2024, 11, 13, 16, 45),
      type: 'text',
      status: 'sent'
    }
  ];

  const [selectedConversation, setSelectedConversation] = React.useState(conversations[0]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [newMessage, setNewMessage] = React.useState('');
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [isNewChatOpen, setIsNewChatOpen] = React.useState(false);

  const filteredConversations = conversations.filter((conv) =>
    conv.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() || selectedFiles.length > 0) {
      console.log('Sending message:', {
        message: newMessage,
        files: selectedFiles,
        recipient: selectedConversation.patientName
      });
      setNewMessage('');
      setSelectedFiles([]);
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-4 h-4 text-red-500" />;
      case 'image':
        return <Image className="w-4 h-4 text-blue-500" />;
      default:
        return <File className="w-4 h-4 text-gray-500" />;
    }
  };

  const getMessageStatus = (status) => {
    switch (status) {
      case 'sent':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default:
        return null;
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-emerald-900 mb-2">Communication & Messaging</h1>
            <p className="text-emerald-600">Secure messaging with patients and file sharing</p>
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

        {/* Main Chat Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Conversations List */}
          <Card className="lg:col-span-4 bg-white/90 backdrop-blur-sm border-emerald-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-emerald-900">Messages</CardTitle>
                <Dialog open={isNewChatOpen} onOpenChange={setIsNewChatOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Start New Conversation</DialogTitle>
                    </DialogHeader>
                    <div className="p-4">
                      <p className="text-gray-600">Select a patient to start a new conversation.</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-96">
                <div className="space-y-1">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedConversation.id === conversation.id
                          ? 'bg-emerald-50 border-r-2 border-emerald-500'
                          : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={conversation.patientAvatar} />
                            <AvatarFallback className="bg-emerald-100 text-emerald-700">
                              {conversation.patientName
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-900 truncate">
                              {conversation.patientName}
                            </p>
                            <span className="text-xs text-gray-500">
                              {formatTime(conversation.lastMessageTime)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                            {conversation.unreadCount > 0 && (
                              <Badge className="bg-emerald-500 text-white">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Messages */}
          <Card className="lg:col-span-8 bg-white/90 backdrop-blur-sm border-emerald-200">
            {/* Chat Header */}
            <CardHeader className="border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={selectedConversation.patientAvatar} />
                      <AvatarFallback className="bg-emerald-100 text-emerald-700">
                        {selectedConversation.patientName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    {selectedConversation.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{selectedConversation.patientName}</h3>
                    <p className="text-sm text-gray-600">
                      {selectedConversation.isOnline
                        ? 'Online'
                        : `Last seen ${formatDate(selectedConversation.lastMessageTime)}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-blue-600 border-blue-300 hover:bg-blue-50"
                  >
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-green-600 border-green-300 hover:bg-green-50"
                  >
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages Area */}
            <CardContent className="p-0">
              <ScrollArea className="h-96 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderId === 'practitioner' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.senderId === 'practitioner'
                            ? 'bg-emerald-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>

                        {/* Attachments */}
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {message.attachments.map((attachment) => (
                              <div
                                key={attachment.id}
                                className={`flex items-center space-x-2 p-2 rounded ${
                                  message.senderId === 'practitioner'
                                    ? 'bg-emerald-600'
                                    : 'bg-gray-200'
                                }`}
                              >
                                {getFileIcon(attachment.type)}
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium truncate">{attachment.name}</p>
                                  <p className="text-xs opacity-75">{attachment.size}</p>
                                </div>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className={`p-1 ${
                                    message.senderId === 'practitioner'
                                      ? 'text-white hover:bg-emerald-600'
                                      : 'text-gray-600 hover:bg-gray-300'
                                  }`}
                                >
                                  <Download className="w-3 h-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}

                        <div
                          className={`flex items-center justify-between mt-2 ${
                            message.senderId === 'practitioner' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <span className="text-xs opacity-75">{formatTime(message.timestamp)}</span>
                          {message.senderId === 'practitioner' && (
                            <div className="ml-2">{getMessageStatus(message.status)}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* File Preview Area */}
              {selectedFiles.length > 0 && (
                <div className="border-t border-gray-200 p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Files to send:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <File className="w-4 h-4 text-gray-500" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
                          }
                          className="p-1"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-end space-x-2">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button size="sm" variant="outline" className="cursor-pointer" asChild>
                      <span>
                        <Paperclip className="w-4 h-4" />
                      </span>
                    </Button>
                  </label>

                  <div className="flex-1">
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      rows={1}
                      className="resize-none"
                    />
                  </div>

                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() && selectedFiles.length === 0}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
