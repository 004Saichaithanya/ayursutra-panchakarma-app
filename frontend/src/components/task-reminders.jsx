import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Checkbox } from './ui/checkbox';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import {
  ArrowLeft,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  CheckSquare,
  Square,
  AlertTriangle,
  Star,
  Edit,
  Trash2,
  Filter,
  Search
} from 'lucide-react';

/**
 * @param {{ onPageChange: (page: string) => void }} props
 */
export function TaskReminders({ onPageChange }) {
  const tasks = [
    {
      id: 1,
      title: 'Review Patient X report',
      description:
        'Review comprehensive health assessment report for Priya Sharma and prepare treatment adjustments',
      priority: 'high',
      dueDate: new Date(2024, 11, 15),
      dueTime: '14:00',
      category: 'patient-review',
      completed: false,
      createdAt: new Date(2024, 11, 13),
      patientId: 1,
      patientName: 'Priya Sharma'
    },
    {
      id: 2,
      title: 'Prepare diet chart for Meera Singh',
      description: 'Create personalized Ayurvedic diet plan focusing on Vata dosha balancing',
      priority: 'medium',
      dueDate: new Date(2024, 11, 14),
      dueTime: '16:00',
      category: 'treatment-plan',
      completed: true,
      completedAt: new Date(2024, 11, 13, 15, 30),
      createdAt: new Date(2024, 11, 12),
      patientId: 3,
      patientName: 'Meera Singh'
    },
    {
      id: 3,
      title: 'Follow up with Raj Patel',
      description:
        'Check on side effects reported during last Shirodhara session and adjust treatment protocol',
      priority: 'urgent',
      dueDate: new Date(2024, 11, 15),
      dueTime: '10:00',
      category: 'follow-up',
      completed: false,
      createdAt: new Date(2024, 11, 13),
      patientId: 2,
      patientName: 'Raj Patel'
    },
    {
      id: 4,
      title: 'Update treatment protocols',
      description: 'Review and update standard operating procedures for Panchakarma treatments',
      priority: 'low',
      dueDate: new Date(2024, 11, 16),
      dueTime: '11:00',
      category: 'admin',
      completed: false,
      createdAt: new Date(2024, 11, 13)
    },
    {
      id: 5,
      title: 'Prepare monthly report',
      description: 'Compile patient progress reports and treatment outcomes for December',
      priority: 'medium',
      dueDate: new Date(2024, 11, 30),
      dueTime: '17:00',
      category: 'admin',
      completed: false,
      createdAt: new Date(2024, 11, 13)
    },
    {
      id: 6,
      title: 'Order herbal supplies',
      description: 'Restock essential oils and herbs for upcoming treatments',
      priority: 'medium',
      dueDate: new Date(2024, 11, 18),
      dueTime: '12:00',
      category: 'inventory',
      completed: false,
      createdAt: new Date(2024, 11, 13)
    },
    {
      id: 7,
      title: 'Schedule team meeting',
      description:
        'Organize monthly team meeting to discuss treatment improvements and patient feedback',
      priority: 'low',
      dueDate: new Date(2024, 11, 20),
      dueTime: '15:00',
      category: 'admin',
      completed: true,
      completedAt: new Date(2024, 11, 13, 9, 0),
      createdAt: new Date(2024, 11, 12)
    }
  ];

  const [searchTerm, setSearchTerm] = React.useState('');
  const [priorityFilter, setPriorityFilter] = React.useState('all');
  const [categoryFilter, setCategoryFilter] = React.useState('all');
  const [statusFilter, setStatusFilter] = React.useState('pending');
  const [isAddingTask, setIsAddingTask] = React.useState(false);
  const [editingTask, setEditingTask] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [newTask, setNewTask] = React.useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'patient-review',
    dueDate: new Date(),
    dueTime: '09:00',
    patientId: '',
    patientName: ''
  });

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      searchTerm === '' ||
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.patientName && task.patientName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || task.category === categoryFilter;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'pending' && !task.completed) ||
      (statusFilter === 'completed' && task.completed);

    return matchesSearch && matchesPriority && matchesCategory && matchesStatus;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'patient-review':
        return 'bg-blue-100 text-blue-800';
      case 'treatment-plan':
        return 'bg-purple-100 text-purple-800';
      case 'follow-up':
        return 'bg-teal-100 text-teal-800';
      case 'admin':
        return 'bg-gray-100 text-gray-800';
      case 'inventory':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const overdue = tasks.filter((t) => !t.completed && new Date(t.dueDate) < new Date()).length;
    const urgent = tasks.filter((t) => !t.completed && t.priority === 'urgent').length;
    return { total, completed, pending, overdue, urgent };
  };

  const stats = getTaskStats();

  const handleToggleTask = (taskId) => {
    console.log('Toggling task:', taskId);
  };

  const handleAddTask = () => {
    console.log('Adding task:', newTask);
    setIsAddingTask(false);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      category: 'patient-review',
      dueDate: new Date(),
      dueTime: '09:00',
      patientId: '',
      patientName: ''
    });
  };

  const handleDeleteTask = (taskId) => {
    console.log('Deleting task:', taskId);
  };

  const formatDate = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  const isOverdue = (task) => {
    if (task.completed) return false;
    const taskDateTime = new Date(task.dueDate);
    const [hh, mm] = task.dueTime.split(':').map((x) => parseInt(x, 10));
    taskDateTime.setHours(hh, mm);
    return taskDateTime < new Date();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-emerald-900 mb-2">Task Reminders</h1>
            <p className="text-emerald-600">Manage your daily tasks and reminders</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={() => setIsAddingTask(true)} className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Task
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

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Total Tasks</p>
                  <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
                </div>
                <CheckSquare className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Completed</p>
                  <p className="text-2xl font-bold text-green-900">{stats.completed}</p>
                </div>
                <CheckSquare className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 text-sm font-medium">Pending</p>
                  <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
                </div>
                <Square className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600 text-sm font-medium">Overdue</p>
                  <p className="text-2xl font-bold text-red-900">{stats.overdue}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Urgent</p>
                  <p className="text-2xl font-bold text-purple-900">{stats.urgent}</p>
                </div>
                <Star className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-white/90 backdrop-blur-sm border-emerald-200 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-32">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="patient-review">Patient Review</SelectItem>
                    <SelectItem value="treatment-plan">Treatment Plan</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="inventory">Inventory</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tasks */}
        <div className="space-y-4">
          {filteredTasks
            .sort((a, b) => {
              if (a.completed !== b.completed) return a.completed ? 1 : -1;
              const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
              if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
                return priorityOrder[a.priority] - priorityOrder[b.priority];
              }
              return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
            })
            .map((task) => (
              <Card
                key={task.id}
                className={`bg-white/90 backdrop-blur-sm border-l-4 ${
                  isOverdue(task)
                    ? 'border-l-red-500'
                    : task.priority === 'urgent'
                    ? 'border-l-purple-500'
                    : task.priority === 'high'
                    ? 'border-l-orange-500'
                    : task.priority === 'medium'
                    ? 'border-l-yellow-500'
                    : 'border-l-green-500'
                } ${task.completed ? 'opacity-75' : ''}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Checkbox checked={task.completed} onCheckedChange={() => handleToggleTask(task.id)} className="mt-1" />

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {task.title}
                          </h3>
                          {task.patientName && <p className="text-sm text-emerald-600 mt-1">Patient: {task.patientName}</p>}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(task.priority)} variant="outline">
                            {task.priority}
                          </Badge>
                          <Badge className={getCategoryColor(task.category)} variant="outline">
                            {task.category.replace('-', ' ')}
                          </Badge>
                          {isOverdue(task) && (
                            <Badge className="bg-red-100 text-red-800 border-red-200" variant="outline">
                              Overdue
                            </Badge>
                          )}
                        </div>
                      </div>

                      <p className={`text-sm mb-3 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>{task.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{formatDate(task.dueDate)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{task.dueTime}</span>
                          </div>
                          {task.completed && task.completedAt && (
                            <span className="text-green-600">Completed {task.completedAt.toLocaleDateString()}</span>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingTask(task.id)}
                            className="text-blue-600 border-blue-300 hover:bg-blue-50"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteTask(task.id)}
                            className="text-red-600 border-red-300 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Add Task Dialog */}
        <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  placeholder="Enter task title..."
                  value={newTask.title}
                  onChange={(e) => setNewTask((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter task description..."
                  value={newTask.description}
                  onChange={(e) => setNewTask((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={newTask.priority} onValueChange={(value) => setNewTask((prev) => ({ ...prev, priority: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={newTask.category} onValueChange={(value) => setNewTask((prev) => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="patient-review">Patient Review</SelectItem>
                      <SelectItem value="treatment-plan">Treatment Plan</SelectItem>
                      <SelectItem value="follow-up">Follow-up</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="inventory">Inventory</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="due-date">Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newTask.dueDate ? newTask.dueDate.toLocaleDateString() : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newTask.dueDate}
                        onSelect={(date) => date && setNewTask((prev) => ({ ...prev, dueDate: date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="due-time">Due Time</Label>
                  <Input
                    id="due-time"
                    type="time"
                    value={newTask.dueTime}
                    onChange={(e) => setNewTask((prev) => ({ ...prev, dueTime: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="patient">Patient (Optional)</Label>
                <Input
                  id="patient"
                  placeholder="Enter patient name if task is patient-specific..."
                  value={newTask.patientName}
                  onChange={(e) => setNewTask((prev) => ({ ...prev, patientName: e.target.value }))}
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button onClick={handleAddTask} className="flex-1">
                  Add Task
                </Button>
                <Button variant="outline" onClick={() => setIsAddingTask(false)} className="flex-1">
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
