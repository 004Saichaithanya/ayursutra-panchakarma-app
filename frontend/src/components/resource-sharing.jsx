import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  ArrowLeft,
  Upload,
  Download,
  Share,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  FileText,
  Image,
  File,
  Plus,
  Calendar,
  User,
  Tag
} from 'lucide-react';

/**
 * @param {{ onPageChange: (page: string) => void }} props
 */
export function ResourceSharing({ onPageChange }) {
  // Mock data kept inside for self-contained example
  const resources = [
    {
      id: 1,
      title: 'Vata Balancing Diet Chart',
      description: 'Comprehensive diet plan for Vata dosha imbalance with seasonal recommendations',
      category: 'diet-charts',
      type: 'pdf',
      fileSize: '2.4 MB',
      uploadedBy: 'Dr. Kamal Raj',
      uploadedAt: new Date(2024, 11, 13),
      downloads: 45,
      tags: ['vata', 'diet', 'seasonal', 'dosha'],
      isPublic: true,
      sharedWith: ['All Patients', 'Priya Sharma', 'Amit Kumar'],
      thumbnail: '📋'
    },
    {
      id: 2,
      title: 'Pitta Cooling Recipes',
      description:
        'Collection of cooling recipes and drinks for Pitta constitution during summer',
      category: 'diet-charts',
      type: 'pdf',
      fileSize: '1.8 MB',
      uploadedBy: 'Dr. Kamal Raj',
      uploadedAt: new Date(2024, 11, 12),
      downloads: 32,
      tags: ['pitta', 'cooling', 'summer', 'recipes'],
      isPublic: true,
      sharedWith: ['All Patients', 'Raj Patel'],
      thumbnail: '🥗'
    },
    {
      id: 3,
      title: 'Daily Yoga Routine for Beginners',
      description: 'Step-by-step yoga guide with modifications for joint problems',
      category: 'exercise-routines',
      type: 'pdf',
      fileSize: '3.2 MB',
      uploadedBy: 'Dr. Kamal Raj',
      uploadedAt: new Date(2024, 11, 11),
      downloads: 28,
      tags: ['yoga', 'beginner', 'joint-care', 'flexibility'],
      isPublic: false,
      sharedWith: ['Amit Kumar', 'Priya Sharma'],
      thumbnail: '🧘'
    },
    {
      id: 4,
      title: 'Panchakarma Preparation Guide',
      description: 'Pre-treatment preparation instructions and dietary guidelines',
      category: 'lifestyle-guides',
      type: 'pdf',
      fileSize: '1.5 MB',
      uploadedBy: 'Dr. Kamal Raj',
      uploadedAt: new Date(2024, 11, 10),
      downloads: 67,
      tags: ['panchakarma', 'preparation', 'detox', 'guidelines'],
      isPublic: true,
      sharedWith: ['All Patients', 'Meera Singh'],
      thumbnail: '🔄'
    },
    {
      id: 5,
      title: 'Herbal Tea Blends for Stress Relief',
      description: 'Ayurvedic herbal tea recipes for managing stress and anxiety',
      category: 'herbal-remedies',
      type: 'pdf',
      fileSize: '900 KB',
      uploadedBy: 'Dr. Kamal Raj',
      uploadedAt: new Date(2024, 11, 9),
      downloads: 89,
      tags: ['herbal', 'stress', 'tea', 'anxiety', 'natural'],
      isPublic: true,
      sharedWith: ['All Patients'],
      thumbnail: '🍵'
    },
    {
      id: 6,
      title: 'Meditation Techniques Video',
      description: 'Guided meditation sessions for different dosha types',
      category: 'lifestyle-guides',
      type: 'mp4',
      fileSize: '45.2 MB',
      uploadedBy: 'Dr. Kamal Raj',
      uploadedAt: new Date(2024, 11, 8),
      downloads: 156,
      tags: ['meditation', 'mindfulness', 'dosha', 'guided'],
      isPublic: true,
      sharedWith: ['All Patients'],
      thumbnail: '🎥'
    },
    {
      id: 7,
      title: 'Essential Oil Usage Guide',
      description: 'Safe usage guidelines for essential oils in Ayurvedic treatments',
      category: 'herbal-remedies',
      type: 'pdf',
      fileSize: '1.1 MB',
      uploadedBy: 'Dr. Kamal Raj',
      uploadedAt: new Date(2024, 11, 7),
      downloads: 73,
      tags: ['essential-oils', 'safety', 'aromatherapy', 'guidelines'],
      isPublic: false,
      sharedWith: ['Staff Only'],
      thumbnail: '🛢️'
    }
  ];

  const categories = [
    { value: 'diet-charts', label: 'Diet Charts', count: 2 },
    { value: 'lifestyle-guides', label: 'Lifestyle Guides', count: 2 },
    { value: 'exercise-routines', label: 'Exercise Routines', count: 1 },
    { value: 'herbal-remedies', label: 'Herbal Remedies', count: 2 }
  ];

  const [searchTerm, setSearchTerm] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('all');
  const [selectedTab, setSelectedTab] = React.useState('all');
  const [isUploadOpen, setIsUploadOpen] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [newResource, setNewResource] = React.useState({
    title: '',
    description: '',
    category: 'diet-charts',
    tags: '',
    isPublic: true,
    sharedWith: 'all-patients'
  });

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      searchTerm === '' ||
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = categoryFilter === 'all' || resource.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'mp4':
        return (
          <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center text-white text-xs">
            ▶
          </div>
        );
      case 'jpg':
      case 'png':
      case 'image':
        return <Image className="w-5 h-5 text-blue-500" />;
      default:
        return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'diet-charts':
        return 'bg-green-100 text-green-800';
      case 'lifestyle-guides':
        return 'bg-blue-100 text-blue-800';
      case 'exercise-routines':
        return 'bg-purple-100 text-purple-800';
      case 'herbal-remedies':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const handleUploadResource = () => {
    console.log('Uploading resource:', { newResource, files: selectedFiles });
    setIsUploadOpen(false);
    setNewResource({
      title: '',
      description: '',
      category: 'diet-charts',
      tags: '',
      isPublic: true,
      sharedWith: 'all-patients'
    });
    setSelectedFiles([]);
  };

  const handleDownload = (resourceId) => {
    console.log('Downloading resource:', resourceId);
  };

  const handleShare = (resourceId) => {
    console.log('Sharing resource:', resourceId);
  };

  const handleDelete = (resourceId) => {
    console.log('Deleting resource:', resourceId);
  };

  const getTotalStats = () => {
    const totalResources = resources.length;
    const totalDownloads = resources.reduce((sum, r) => sum + r.downloads, 0);
    const publicResources = resources.filter((r) => r.isPublic).length;
    const recentUploads = resources.filter((r) => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return r.uploadedAt > weekAgo;
    }).length;

    return { totalResources, totalDownloads, publicResources, recentUploads };
  };

  const stats = getTotalStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-emerald-900 mb-2">Resource Sharing</h1>
            <p className="text-emerald-600">Upload and share therapeutic resources with patients</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={() => setIsUploadOpen(true)} className="bg-emerald-600 hover:bg-emerald-700">
              <Upload className="w-4 h-4 mr-2" />
              Upload Resource
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm border-emerald-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-600 text-sm font-medium">Total Resources</p>
                  <p className="text-2xl font-bold text-emerald-900">{stats.totalResources}</p>
                </div>
                <div className="bg-emerald-100 p-3 rounded-full">
                  <File className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Total Downloads</p>
                  <p className="text-2xl font-bold text-blue-900">{stats.totalDownloads}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Download className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium">Public Resources</p>
                  <p className="text-2xl font-bold text-purple-900">{stats.publicResources}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Share className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 text-sm font-medium">Recent Uploads</p>
                  <p className="text-2xl font-bold text-orange-900">{stats.recentUploads}</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="bg-white/90 backdrop-blur-sm border-emerald-200 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label} ({category.count})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resources Grid */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="categories">By Category</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <Card
                  key={resource.id}
                  className="bg-white/90 backdrop-blur-sm border-emerald-200 hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{resource.thumbnail}</div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">{resource.title}</h3>
                          <div className="flex items-center space-x-2">
                            {getFileIcon(resource.type)}
                            <span className="text-xs text-gray-500">{resource.fileSize}</span>
                          </div>
                        </div>
                      </div>
                      <Badge
                        className={resource.isPublic ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}
                        variant="outline"
                      >
                        {resource.isPublic ? 'Public' : 'Private'}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{resource.description}</p>

                    <div className="space-y-3">
                      <Badge className={getCategoryColor(resource.category)} variant="outline">
                        {resource.category.replace('-', ' ')}
                      </Badge>

                      <div className="flex flex-wrap gap-1">
                        {resource.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-gray-50">
                            #{tag}
                          </Badge>
                        ))}
                        {resource.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs bg-gray-50">
                            +{resource.tags.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Download className="w-4 h-4" />
                          <span>{resource.downloads}</span>
                        </div>
                        <span>{resource.uploadedAt.toLocaleDateString()}</span>
                      </div>

                      <div className="flex items-center space-x-2 pt-3 border-t border-gray-200">
                        <Button
                          size="sm"
                          onClick={() => handleDownload(resource.id)}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleShare(resource.id)}
                          className="text-blue-600 border-blue-300 hover:bg-blue-50"
                        >
                          <Share className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-gray-600 border-gray-300 hover:bg-gray-50">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(resource.id)}
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            {categories.map((category) => (
              <Card key={category.value} className="bg-white/90 backdrop-blur-sm border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-emerald-900 flex items-center justify-between">
                    <span>{category.label}</span>
                    <Badge className="bg-emerald-100 text-emerald-800">{category.count} resources</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {resources
                      .filter((r) => r.category === category.value)
                      .map((resource) => (
                        <div key={resource.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="text-xl">{resource.thumbnail}</div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{resource.title}</h4>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              {getFileIcon(resource.type)}
                              <span>{resource.fileSize}</span>
                              <span>•</span>
                              <span>{resource.downloads} downloads</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button size="sm" variant="outline" onClick={() => handleDownload(resource.id)}>
                              <Download className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleShare(resource.id)}>
                              <Share className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Upload Resource Dialog */}
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Upload New Resource</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Resource Title</Label>
                <Input
                  id="title"
                  placeholder="Enter resource title..."
                  value={newResource.title}
                  onChange={(e) => setNewResource((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter resource description..."
                  value={newResource.description}
                  onChange={(e) => setNewResource((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newResource.category}
                  onValueChange={(value) => setNewResource((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  placeholder="e.g., vata, diet, seasonal, dosha"
                  value={newResource.tags}
                  onChange={(e) => setNewResource((prev) => ({ ...prev, tags: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="sharing">Sharing Options</Label>
                <Select
                  value={newResource.sharedWith}
                  onValueChange={(value) => setNewResource((prev) => ({ ...prev, sharedWith: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-patients">All Patients</SelectItem>
                    <SelectItem value="specific-patients">Specific Patients</SelectItem>
                    <SelectItem value="staff-only">Staff Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="files">Upload Files</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.jpg,.jpeg,.png,.mp4,.docx"
                  />
                  <label htmlFor="file-upload" className="flex flex-col items-center justify-center cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mb-4" />
                    <span className="text-lg font-medium text-gray-600 mb-2">Click to upload files</span>
                    <span className="text-sm text-gray-500">PDF, Images, Videos, Documents (Max 50MB)</span>
                  </label>

                  {selectedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center space-x-2">
                            {getFileIcon(file.type)}
                            <span className="text-sm">{file.name}</span>
                            <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedFiles((prev) => prev.filter((_, i) => i !== index))}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button onClick={handleUploadResource} className="flex-1">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Resource
                </Button>
                <Button variant="outline" onClick={() => setIsUploadOpen(false)} className="flex-1">
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
