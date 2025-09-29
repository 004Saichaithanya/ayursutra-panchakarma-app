import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
  Upload,
  FileText,
  Download,
  Eye,
  Trash2,
  Plus,
  Calendar,
  User,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

/**
 * @param {{ onPageChange: (page: string) => void }} props
 */
export function Documents({ onPageChange }) {
  const [isUploadOpen, setIsUploadOpen] = React.useState(false);
  const [uploadForm, setUploadForm] = React.useState({
    title: '',
    description: '',
    category: '',
    file: null
  });

  const documents = [
    {
      id: 1,
      title: 'Blood Test Report',
      description: 'Comprehensive blood work including vitamin levels and thyroid function',
      category: 'Lab Report',
      uploadDate: '2025-09-15',
      uploadedBy: 'Priya Sharma',
      fileSize: '2.3 MB',
      fileType: 'PDF',
      status: 'reviewed'
    },
    {
      id: 2,
      title: 'Ayurvedic Prescription',
      description: 'Herbal medicines and dosage instructions from initial consultation',
      category: 'Prescription',
      uploadDate: '2025-09-17',
      uploadedBy: 'Dr. Kamal Raj',
      fileSize: '1.1 MB',
      fileType: 'PDF',
      status: 'active'
    },
    {
      id: 3,
      title: 'X-Ray Spine',
      description: 'Spinal alignment check for posture-related issues',
      category: 'Medical Image',
      uploadDate: '2025-09-10',
      uploadedBy: 'Priya Sharma',
      fileSize: '5.7 MB',
      fileType: 'JPEG',
      status: 'reviewed'
    },
    {
      id: 4,
      title: 'Treatment Plan',
      description: '14-day Panchakarma treatment schedule and guidelines',
      category: 'Treatment Plan',
      uploadDate: '2025-09-17',
      uploadedBy: 'Dr. Kamal Raj',
      fileSize: '890 KB',
      fileType: 'PDF',
      status: 'active'
    },
    {
      id: 5,
      title: 'Insurance Coverage',
      description: 'Insurance pre-authorization for Panchakarma treatment',
      category: 'Insurance',
      uploadDate: '2025-09-12',
      uploadedBy: 'Priya Sharma',
      fileSize: '1.5 MB',
      fileType: 'PDF',
      status: 'approved'
    }
  ];

  const documentCategories = [
    'Lab Report',
    'Prescription',
    'Medical Image',
    'Treatment Plan',
    'Insurance',
    'Progress Report',
    'Consultation Notes',
    'Other'
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadForm((prev) => ({ ...prev, file }));
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    console.log('Uploading document:', uploadForm);
    setIsUploadOpen(false);
    setUploadForm({ title: '', description: '', category: '', file: null });
  };

  const handleView = (document) => {
    console.log('Viewing document:', document.id);
  };

  const handleDownload = (document) => {
    console.log('Downloading document:', document.id);
  };

  const handleDelete = (document) => {
    console.log('Deleting document:', document.id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'reviewed':
        return 'bg-blue-100 text-blue-700';
      case 'approved':
        return 'bg-purple-100 text-purple-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Lab Report': 'bg-red-100 text-red-700',
      Prescription: 'bg-green-100 text-green-700',
      'Medical Image': 'bg-blue-100 text-blue-700',
      'Treatment Plan': 'bg-purple-100 text-purple-700',
      Insurance: 'bg-orange-100 text-orange-700',
      'Progress Report': 'bg-teal-100 text-teal-700',
      'Consultation Notes': 'bg-indigo-100 text-indigo-700',
      Other: 'bg-gray-100 text-gray-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
    };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">My Documents</h1>
        <p className="text-blue-100 mb-6">
          Upload, manage, and share your medical documents and reports
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <FileText className="w-8 h-8 mx-auto mb-2" />
            <p className="text-blue-100">Total Documents</p>
            <p className="text-2xl font-bold">{documents.length}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <CheckCircle className="w-8 h-8 mx-auto mb-2" />
            <p className="text-blue-100">Reviewed</p>
            <p className="text-2xl font-bold">{documents.filter((d) => d.status === 'reviewed').length}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <Calendar className="w-8 h-8 mx-auto mb-2" />
            <p className="text-blue-100">This Month</p>
            <p className="text-2xl font-bold">3</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <Upload className="w-8 h-8 mx-auto mb-2" />
            <p className="text-blue-100">Storage Used</p>
            <p className="text-2xl font-bold">12.4 MB</p>
          </div>
        </div>
      </div>

      {/* Upload Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Document Library</h2>
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUploadSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Document Title *</Label>
                <Input
                  id="title"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter document title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select onValueChange={(value) => setUploadForm((prev) => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document category" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={uploadForm.description}
                  onChange={(e) =>
                    setUploadForm((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Add a brief description of the document"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Upload File *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    id="file"
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    className="hidden"
                  />
                  <Label htmlFor="file" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500 mt-1">PDF, JPG, PNG, DOC up to 10MB</p>
                  </Label>
                  {uploadForm.file && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-blue-700 font-medium">{uploadForm.file.name}</p>
                      <p className="text-blue-600 text-sm">
                        {(uploadForm.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex space-x-4">
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Upload Document
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsUploadOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {documents.map((document) => (
          <Card key={document.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{document.title}</CardTitle>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge className={getCategoryColor(document.category)}>{document.category}</Badge>
                    <Badge className={getStatusColor(document.status)}>{document.status}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{document.fileType}</p>
                  <p className="text-sm text-gray-500">{document.fileSize}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{document.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Uploaded by:</span>
                  <span className="font-medium">{document.uploadedBy}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Upload date:</span>
                  <span className="font-medium">
                    {new Date(document.uploadDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" onClick={() => handleView(document)} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDownload(document)}
                  className="flex-1 border-blue-200 text-blue-600"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(document)}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {documents.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Documents Yet</h3>
            <p className="text-gray-600 mb-6">
              Upload your medical documents, reports, and prescriptions to keep them organized and
              easily accessible.
            </p>
            <Button onClick={() => setIsUploadOpen(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Upload Your First Document
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Storage Info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Storage Information</h3>
            <Badge variant="outline">12.4 MB / 100 MB used</Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Document storage</span>
              <span className="font-medium">12.4%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '12.4%' }} />
            </div>
            <p className="text-xs text-gray-500">
              Documents are stored securely and encrypted. You can upload up to 100MB of documents.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
