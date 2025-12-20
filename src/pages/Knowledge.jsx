import Navbar from '../components/layout/Navbar';
import { Upload, FileText, Image, Video, Loader, CheckCircle, AlertCircle, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import api from '../services/api';

const Knowledge = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [tags, setTags] = useState('');

  const fileTypes = [
    { icon: <FileText className="w-8 h-8" />, title: "Text Documents", desc: "PDF, DOCX, TXT", color: "from-blue-500 to-cyan-500", accept: ".pdf,.docx,.txt,.doc" },
    { icon: <Image className="w-8 h-8" />, title: "Images", desc: "JPG, PNG, SVG", color: "from-purple-500 to-pink-500", accept: ".jpg,.jpeg,.png,.svg,.gif,.bmp" },
    { icon: <Video className="w-8 h-8" />, title: "Videos", desc: "MP4, AVI, MOV", color: "from-green-500 to-emerald-500", accept: ".mp4,.avi,.mov,.mkv,.webm" },
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = [...e.dataTransfer.files];
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e) => {
    const selectedFiles = [...e.target.files];
    handleFiles(selectedFiles);
  };

  const handleFiles = (newFiles) => {
    const validFiles = newFiles.filter((file) => {
      const allowedTypes = [
        'text/plain', 'application/pdf', 'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/bmp',
        'video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska', 'video/webm'
      ];
      return allowedTypes.includes(file.type);
    });

    setFiles((prev) => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setUploadProgress((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };

  const uploadFiles = async () => {
    if (files.length === 0) {
      alert('Please select files to upload');
      return;
    }

    if (!topic.trim()) {
      alert('Please enter a topic');
      return;
    }

    setUploading(true);

    for (let i = 0; i < files.length; i++) {
      try {
        const formData = new FormData();
        formData.append('file', files[i]);
        formData.append('topic', topic);
        formData.append('difficulty', difficulty);
        formData.append('tags', tags);

        const response = await api.post('/api/v1/knowledge/ingest/file', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress((prev) => ({
              ...prev,
              [i]: percentCompleted,
            }));
          },
        });

        setUploadProgress((prev) => ({
          ...prev,
          [i]: 100,
        }));
      } catch (error) {
        console.error(`Error uploading file ${i}:`, error);
        setUploadProgress((prev) => ({
          ...prev,
          [i]: 'error',
        }));
      }
    }

    setUploading(false);
  };

  const clearAllFiles = () => {
    setFiles([]);
    setUploadProgress({});
    setTopic('');
    setDifficulty('intermediate');
    setTags('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Knowledge Management</h1>
          <p className="text-gray-600 mb-8">Upload and manage your learning materials</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {fileTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl p-6 shadow-lg cursor-pointer"
              onClick={() => {
                fileInputRef.current?.click();
              }}
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${type.color} flex items-center justify-center text-white mb-4`}>
                {type.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{type.title}</h3>
              <p className="text-gray-600">{type.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
              dragActive
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-300 hover:border-purple-500'
            } cursor-pointer`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Drop files here or click to upload</h3>
            <p className="text-gray-600">Support for text, images, and videos</p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileInput}
            accept=".pdf,.docx,.txt,.doc,.jpg,.jpeg,.png,.svg,.gif,.bmp,.mp4,.avi,.mov,.mkv,.webm"
          />

          {/* Upload Metadata Form */}
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 space-y-4"
            >
              <h3 className="text-lg font-bold text-gray-900">Upload Details</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topic *
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Machine Learning, Python Basics"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="e.g., AI, Python, Learning"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Files List */}
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Selected Files ({files.length})
              </h3>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <FileText className="w-5 h-5 text-blue-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {uploadProgress[index] !== undefined && uploadProgress[index] !== 'error' && (
                      <div className="flex-1 mx-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${uploadProgress[index]}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          {uploadProgress[index]}%
                        </p>
                      </div>
                    )}

                    {/* Status Icons */}
                    {uploadProgress[index] === 100 && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                    {uploadProgress[index] === 'error' && (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                    {uploading && uploadProgress[index] === undefined && (
                      <Loader className="w-5 h-5 text-purple-500 animate-spin" />
                    )}

                    {!uploading && uploadProgress[index] === undefined && (
                      <button
                        onClick={() => removeFile(index)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex gap-4"
            >
              <button
                onClick={uploadFiles}
                disabled={uploading}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Upload Files
                  </>
                )}
              </button>
              <button
                onClick={clearAllFiles}
                disabled={uploading}
                className="bg-gray-200 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clear
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Knowledge;