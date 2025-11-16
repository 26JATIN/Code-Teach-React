import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Save, 
  X, 
  ChevronDown, 
  ChevronUp, 
  BookOpen,
  FileText,
  Code,
  List,
  CheckSquare,
  Image as ImageIcon,
  Video,
  Link as LinkIcon,
  ExternalLink,
  AlertCircle,
  Clock,
  Award,
  Lightbulb
} from 'lucide-react';
import config from '../../../../config/config';
import { apiRequest } from '../../../../config/config';

const ModuleManager = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [expandedModule, setExpandedModule] = useState(null);
  const [showAddModule, setShowAddModule] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  // Fetch all courses
  useEffect(() => {
    fetchCourses();
  }, []);

  // Fetch modules when course is selected
  useEffect(() => {
    if (selectedCourse) {
      fetchModules();
    }
  }, [selectedCourse]);

  const fetchCourses = async () => {
    try {
      const response = await apiRequest('/api/courses/all');
      setCourses(response);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchModules = async () => {
    try {
      setLoading(true);
      const response = await apiRequest(`/api/modules/course/${selectedCourse}`);
      
      // Ensure all submodules have contentBlocks array initialized
      const modulesWithDefaults = (response.modules || []).map(module => ({
        ...module,
        subModules: (module.subModules || []).map(subModule => ({
          ...subModule,
          contentBlocks: subModule.contentBlocks || []
        }))
      }));
      
      setModules(modulesWithDefaults);
    } catch (error) {
      console.error('Error fetching modules:', error);
      setModules([]);
    } finally {
      setLoading(false);
    }
  };

  const addNewModule = () => {
    const newModule = {
      tempId: Date.now(),
      courseId: selectedCourse,
      id: `${modules.length + 1}`,
      order: modules.length + 1,
      title: '',
      description: '',
      icon: '📚',
      subModules: []
    };
    setModules([...modules, newModule]);
    setExpandedModule(newModule.tempId);
    setShowAddModule(false);
  };

  const addSubModule = (moduleIndex) => {
    const newModules = [...modules];
    const newSubModule = {
      tempId: Date.now(),
      id: `${newModules[moduleIndex].subModules.length + 1}`,
      order: newModules[moduleIndex].subModules.length + 1,
      title: '',
      description: '',
      estimatedTime: 15,
      difficulty: 'beginner',
      contentBlocks: []
    };
    newModules[moduleIndex].subModules.push(newSubModule);
    setModules(newModules);
  };

  const addContentBlock = (moduleIndex, subModuleIndex) => {
    const newModules = [...modules];
    const subModule = newModules[moduleIndex].subModules[subModuleIndex];
    
    // Ensure contentBlocks array exists
    if (!subModule.contentBlocks) {
      subModule.contentBlocks = [];
    }
    
    const newBlock = {
      tempId: Date.now(),
      type: 'summary',
      order: subModule.contentBlocks.length + 1,
      content: {}
    };
    subModule.contentBlocks.push(newBlock);
    setModules(newModules);
  };

  const updateModule = (index, field, value) => {
    const newModules = [...modules];
    newModules[index][field] = value;
    setModules(newModules);
  };

  const updateSubModule = (moduleIndex, subModuleIndex, field, value) => {
    const newModules = [...modules];
    newModules[moduleIndex].subModules[subModuleIndex][field] = value;
    setModules(newModules);
  };

  const updateContentBlock = (moduleIndex, subModuleIndex, blockIndex, field, value) => {
    const newModules = [...modules];
    const subModule = newModules[moduleIndex].subModules[subModuleIndex];
    
    // Ensure contentBlocks array exists
    if (!subModule.contentBlocks) {
      subModule.contentBlocks = [];
      return;
    }
    
    if (field === 'type') {
      // Reset content when type changes
      subModule.contentBlocks[blockIndex] = {
        ...subModule.contentBlocks[blockIndex],
        type: value,
        content: getDefaultContentForType(value)
      };
    } else {
      subModule.contentBlocks[blockIndex][field] = value;
    }
    setModules(newModules);
  };

  const getDefaultContentForType = (type) => {
    const defaults = {
      summary: { title: '', text: '' },
      codeSnippet: { language: 'javascript', code: '', explanation: '' },
      mcq: { question: '', options: ['', '', '', ''], correctAnswer: 0, explanation: '' },
      keyFeatures: { features: [{ title: '', description: '' }] },
      example: { title: '', description: '', code: '', output: '' },
      note: { type: 'info', title: '', text: '' },
      image: { url: '', alt: '', caption: '' },
      video: { url: '', title: '', description: '' },
      link: { url: '', title: '', description: '' },
      list: { items: [''] },
      timeline: { events: [{ year: '', title: '', description: '' }] },
      comparison: { items: [{ title: '', pros: [''], cons: [''] }] },
      quiz: { questions: [] }
    };
    return defaults[type] || {};
  };

  const deleteModule = (index) => {
    if (window.confirm('Are you sure you want to delete this module?')) {
      const newModules = modules.filter((_, i) => i !== index);
      setModules(newModules);
    }
  };

  const deleteSubModule = (moduleIndex, subModuleIndex) => {
    if (window.confirm('Are you sure you want to delete this submodule?')) {
      const newModules = [...modules];
      newModules[moduleIndex].subModules.splice(subModuleIndex, 1);
      setModules(newModules);
    }
  };

  const deleteContentBlock = (moduleIndex, subModuleIndex, blockIndex) => {
    const newModules = [...modules];
    const subModule = newModules[moduleIndex].subModules[subModuleIndex];
    
    // Ensure contentBlocks array exists
    if (!subModule.contentBlocks) {
      return;
    }
    
    subModule.contentBlocks.splice(blockIndex, 1);
    setModules(newModules);
  };

  const saveModules = async () => {
    try {
      setSaving(true);
      
      // Save each module
      for (const module of modules) {
        const moduleData = {
          courseId: selectedCourse,
          id: module.id || `${module.order}`,
          order: module.order,
          title: module.title,
          description: module.description,
          icon: module.icon || '📚',
          subModules: module.subModules
        };

        if (module._id) {
          // Update existing module
          await apiRequest(`/api/modules/${module._id}`, {
            method: 'PUT',
            body: JSON.stringify(moduleData)
          });
        } else {
          // Create new module
          await apiRequest('/api/modules', {
            method: 'POST',
            body: JSON.stringify(moduleData)
          });
        }
      }

      alert('Modules saved successfully!');
      fetchModules(); // Refresh the list
    } catch (error) {
      console.error('Error saving modules:', error);
      alert('Failed to save modules: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const contentTypeIcons = {
    summary: FileText,
    codeSnippet: Code,
    mcq: CheckSquare,
    keyFeatures: List,
    example: Lightbulb,
    note: AlertCircle,
    image: ImageIcon,
    video: Video,
    link: LinkIcon,
    list: List,
    timeline: Clock,
    comparison: Award,
    quiz: CheckSquare
  };

  const contentTypeLabels = {
    summary: 'Summary',
    codeSnippet: 'Code Snippet',
    mcq: 'Multiple Choice Question',
    keyFeatures: 'Key Features',
    example: 'Example',
    note: 'Important Note',
    image: 'Image',
    video: 'Video',
    link: 'External Link',
    list: 'List',
    timeline: 'Timeline',
    comparison: 'Comparison Table',
    quiz: 'Quiz'
  };

  const handlePreview = (module, subModule) => {
    setPreviewData({ module, subModule });
    setPreviewMode(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Module Manager
        </h2>
        
        {/* Course Selector */}
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="w-full sm:w-64 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select a Course</option>
          {courses.map(course => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      {!selectedCourse ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
          <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            Please select a course to manage its modules
          </p>
        </div>
      ) : loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={addNewModule}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus className="h-5 w-5" />
              Add Module
            </button>
            
            {modules.length > 0 && (
              <button
                onClick={saveModules}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-5 w-5" />
                {saving ? 'Saving...' : 'Save All Modules'}
              </button>
            )}
          </div>

          {/* Modules List */}
          <div className="space-y-4">
            <AnimatePresence>
              {modules.map((module, moduleIndex) => (
                <motion.div
                  key={module._id || module.tempId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                >
                  {/* Module Header */}
                  <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center font-bold">
                          {module.order}
                        </div>
                        <input
                          type="text"
                          value={module.title}
                          onChange={(e) => updateModule(moduleIndex, 'title', e.target.value)}
                          placeholder="Module Title"
                          className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400"
                        />
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => setExpandedModule(expandedModule === (module._id || module.tempId) ? null : (module._id || module.tempId))}
                          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          {expandedModule === (module._id || module.tempId) ? (
                            <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                          )}
                        </button>
                        <button
                          onClick={() => deleteModule(moduleIndex)}
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Module Content */}
                  <AnimatePresence>
                    {expandedModule === (module._id || module.tempId) && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 space-y-4">
                          {/* Module Details */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Description
                              </label>
                              <textarea
                                value={module.description}
                                onChange={(e) => updateModule(moduleIndex, 'description', e.target.value)}
                                placeholder="Module description"
                                rows={3}
                                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Icon (emoji)
                              </label>
                              <input
                                type="text"
                                value={module.icon || ''}
                                onChange={(e) => updateModule(moduleIndex, 'icon', e.target.value)}
                                placeholder="e.g., 📚 or 🔥"
                                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400"
                              />
                            </div>
                          </div>

                          {/* SubModules */}
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                SubModules ({module.subModules.length})
                              </h4>
                              <button
                                onClick={() => addSubModule(moduleIndex)}
                                className="flex items-center gap-2 px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors"
                              >
                                <Plus className="h-4 w-4" />
                                Add SubModule
                              </button>
                            </div>

                            {module.subModules.map((subModule, subModuleIndex) => (
                              <SubModuleCard
                                key={subModule._id || subModule.tempId}
                                subModule={subModule}
                                module={module}
                                moduleIndex={moduleIndex}
                                subModuleIndex={subModuleIndex}
                                updateSubModule={updateSubModule}
                                deleteSubModule={deleteSubModule}
                                addContentBlock={addContentBlock}
                                contentBlocks={subModule.contentBlocks || []}
                                updateContentBlock={updateContentBlock}
                                deleteContentBlock={deleteContentBlock}
                                contentTypeIcons={contentTypeIcons}
                                onPreview={handlePreview}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>

            {modules.length === 0 && (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
                <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  No modules yet. Create your first module!
                </p>
                <button
                  onClick={addNewModule}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  Add First Module
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Preview Modal */}
      <PreviewModal
        isOpen={previewMode}
        onClose={() => setPreviewMode(false)}
        data={previewData}
      />
    </div>
  );
};

// SubModule Card Component
const SubModuleCard = ({
  subModule,
  moduleIndex,
  subModuleIndex,
  updateSubModule,
  deleteSubModule,
  addContentBlock,
  contentBlocks,
  updateContentBlock,
  deleteContentBlock,
  contentTypeIcons,
  module,
  onPreview
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
      <div className="p-3 bg-gray-50 dark:bg-gray-700/50 flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-6 h-6 rounded bg-purple-500 text-white flex items-center justify-center text-sm font-bold">
            {subModule.order}
          </div>
          <input
            type="text"
            value={subModule.title}
            onChange={(e) => updateSubModule(moduleIndex, subModuleIndex, 'title', e.target.value)}
            placeholder="SubModule Title"
            className="flex-1 px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-900 dark:text-white placeholder-gray-400"
          />
        </div>
        
        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={() => onPreview(module, subModule)}
            className="p-1.5 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded transition-colors"
            title="Preview Content"
          >
            <BookOpen className="h-4 w-4" />
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
          >
            {expanded ? (
              <ChevronUp className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            )}
          </button>
          <button
            onClick={() => deleteSubModule(moduleIndex, subModuleIndex)}
            className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-3 space-y-3">
              <textarea
                value={subModule.description}
                onChange={(e) => updateSubModule(moduleIndex, subModuleIndex, 'description', e.target.value)}
                placeholder="SubModule description"
                rows={2}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-900 dark:text-white placeholder-gray-400"
              />

              {/* SubModule Metadata */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Estimated Time (minutes)
                  </label>
                  <input
                    type="number"
                    value={subModule.estimatedTime || 15}
                    onChange={(e) => updateSubModule(moduleIndex, subModuleIndex, 'estimatedTime', parseInt(e.target.value))}
                    placeholder="15"
                    className="w-full px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Difficulty
                  </label>
                  <select
                    value={subModule.difficulty || 'beginner'}
                    onChange={(e) => updateSubModule(moduleIndex, subModuleIndex, 'difficulty', e.target.value)}
                    className="w-full px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-900 dark:text-white"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              {/* Content Blocks */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Content Blocks ({(contentBlocks || []).length})
                  </h5>
                  <button
                    onClick={() => addContentBlock(moduleIndex, subModuleIndex)}
                    className="flex items-center gap-1 px-2 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                    Add Block
                  </button>
                </div>

                {(contentBlocks || []).map((block, blockIndex) => (
                  <ContentBlockCard
                    key={block._id || block.tempId}
                    block={block}
                    moduleIndex={moduleIndex}
                    subModuleIndex={subModuleIndex}
                    blockIndex={blockIndex}
                    updateContentBlock={updateContentBlock}
                    deleteContentBlock={deleteContentBlock}
                    contentTypeIcons={contentTypeIcons}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Content Block Card Component
const ContentBlockCard = ({
  block,
  moduleIndex,
  subModuleIndex,
  blockIndex,
  updateContentBlock,
  deleteContentBlock,
  contentTypeIcons
}) => {
  const [expanded, setExpanded] = useState(false);
  const Icon = contentTypeIcons[block.type] || FileText;

  const contentTypes = [
    { value: 'summary', label: 'Summary' },
    { value: 'codeSnippet', label: 'Code Snippet' },
    { value: 'mcq', label: 'Multiple Choice' },
    { value: 'keyFeatures', label: 'Key Features' },
    { value: 'example', label: 'Example' },
    { value: 'note', label: 'Note' },
    { value: 'image', label: 'Image' },
    { value: 'video', label: 'Video' },
    { value: 'link', label: 'Link' },
    { value: 'list', label: 'List' },
    { value: 'timeline', label: 'Timeline' },
    { value: 'comparison', label: 'Comparison' },
    { value: 'quiz', label: 'Quiz' }
  ];

  return (
    <div className="border border-gray-200 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-800/50">
      <div className="p-2 flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <select
            value={block.type}
            onChange={(e) => updateContentBlock(moduleIndex, subModuleIndex, blockIndex, 'type', e.target.value)}
            className="px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
          >
            {contentTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Order: {block.order}
          </span>
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
          >
            {expanded ? (
              <ChevronUp className="h-3 w-3 text-gray-600 dark:text-gray-300" />
            ) : (
              <ChevronDown className="h-3 w-3 text-gray-600 dark:text-gray-300" />
            )}
          </button>
          <button
            onClick={() => deleteContentBlock(moduleIndex, subModuleIndex, blockIndex)}
            className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded transition-colors"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-2 pt-0">
              <ContentBlockEditor
                block={block}
                moduleIndex={moduleIndex}
                subModuleIndex={subModuleIndex}
                blockIndex={blockIndex}
                updateContentBlock={updateContentBlock}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Content Block Editor Component
const ContentBlockEditor = ({ block, moduleIndex, subModuleIndex, blockIndex, updateContentBlock }) => {
  const updateContent = (path, value) => {
    const newContent = { ...block.content };
    const keys = path.split('.');
    let current = newContent;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    updateContentBlock(moduleIndex, subModuleIndex, blockIndex, 'content', newContent);
  };

  const updateArrayItem = (arrayName, index, value) => {
    const currentArray = block.content[arrayName] || [];
    const newArray = [...currentArray];
    newArray[index] = value;
    updateContent(arrayName, newArray);
  };

  const addArrayItem = (arrayName, defaultValue = '') => {
    const currentArray = block.content[arrayName] || [];
    updateContent(arrayName, [...currentArray, defaultValue]);
  };

  const removeArrayItem = (arrayName, index) => {
    const currentArray = block.content[arrayName] || [];
    updateContent(arrayName, currentArray.filter((_, i) => i !== index));
  };

  const renderEditor = () => {
    switch (block.type) {
      case 'summary':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={block.content.title || ''}
              onChange={(e) => updateContent('title', e.target.value)}
              placeholder="Title"
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
            <textarea
              value={block.content.description || ''}
              onChange={(e) => updateContent('description', e.target.value)}
              placeholder="Description"
              rows={3}
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
          </div>
        );

      case 'codeSnippet':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={block.content.title || ''}
              onChange={(e) => updateContent('title', e.target.value)}
              placeholder="Code Title"
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
            <select
              value={block.content.language || 'java'}
              onChange={(e) => updateContent('language', e.target.value)}
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            >
              <option value="java">Java</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="cpp">C++</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
            </select>
            <textarea
              value={block.content.code || ''}
              onChange={(e) => updateContent('code', e.target.value)}
              placeholder="Code here..."
              rows={5}
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs font-mono text-gray-900 dark:text-white"
            />
            <textarea
              value={block.content.explanation || ''}
              onChange={(e) => updateContent('explanation', e.target.value)}
              placeholder="Explanation"
              rows={2}
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
          </div>
        );

      case 'keyFeatures':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={block.content.title || ''}
              onChange={(e) => updateContent('title', e.target.value)}
              placeholder="Title"
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
            <div className="space-y-2">
              {(block.content.features || []).map((feature, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateArrayItem('features', idx, e.target.value)}
                    placeholder={`Feature ${idx + 1}`}
                    className="flex-1 px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={() => removeArrayItem('features', idx)}
                    className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addArrayItem('features', '')}
                className="text-xs text-blue-600 hover:text-blue-700"
              >
                + Add Feature
              </button>
            </div>
          </div>
        );

      case 'importantNote':
      case 'mistakesToAvoid':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={block.content.title || ''}
              onChange={(e) => updateContent('title', e.target.value)}
              placeholder="Title"
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
            {block.type === 'importantNote' ? (
              <textarea
                value={block.content.description || ''}
                onChange={(e) => updateContent('description', e.target.value)}
                placeholder="Note description"
                rows={3}
                className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
              />
            ) : (
              <div className="space-y-2">
                {(block.content.mistakes || []).map((mistake, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={mistake}
                      onChange={(e) => updateArrayItem('mistakes', idx, e.target.value)}
                      placeholder={`Mistake ${idx + 1}`}
                      className="flex-1 px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
                    />
                    <button
                      onClick={() => removeArrayItem('mistakes', idx)}
                      className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('mistakes', '')}
                  className="text-xs text-blue-600 hover:text-blue-700"
                >
                  + Add Mistake
                </button>
              </div>
            )}
          </div>
        );

      case 'timeline':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={block.content.title || ''}
              onChange={(e) => updateContent('title', e.target.value)}
              placeholder="Timeline Title"
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
            <div className="space-y-2">
              {(block.content.events || []).map((event, idx) => (
                <div key={idx} className="flex gap-2 items-start">
                  <input
                    type="text"
                    value={event.year || ''}
                    onChange={(e) => {
                      const events = [...(block.content.events || [])];
                      events[idx] = { ...events[idx], year: e.target.value };
                      updateContent('events', events);
                    }}
                    placeholder="Year"
                    className="w-20 px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={event.event || ''}
                    onChange={(e) => {
                      const events = [...(block.content.events || [])];
                      events[idx] = { ...events[idx], event: e.target.value };
                      updateContent('events', events);
                    }}
                    placeholder="Event description"
                    className="flex-1 px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={() => removeArrayItem('events', idx)}
                    className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addArrayItem('events', { year: '', event: '' })}
                className="text-xs text-blue-600 hover:text-blue-700"
              >
                + Add Event
              </button>
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={block.content.url || ''}
              onChange={(e) => updateContent('url', e.target.value)}
              placeholder="Image URL"
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
            <input
              type="text"
              value={block.content.caption || ''}
              onChange={(e) => updateContent('caption', e.target.value)}
              placeholder="Caption"
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
            <input
              type="text"
              value={block.content.alt || ''}
              onChange={(e) => updateContent('alt', e.target.value)}
              placeholder="Alt text"
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
          </div>
        );

      case 'video':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={block.content.url || ''}
              onChange={(e) => updateContent('url', e.target.value)}
              placeholder="Video URL (YouTube embed)"
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
            <input
              type="text"
              value={block.content.title || ''}
              onChange={(e) => updateContent('title', e.target.value)}
              placeholder="Video Title"
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
            <input
              type="text"
              value={block.content.duration || ''}
              onChange={(e) => updateContent('duration', e.target.value)}
              placeholder="Duration (e.g., 10:30)"
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
          </div>
        );

      case 'link':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={block.content.url || ''}
              onChange={(e) => updateContent('url', e.target.value)}
              placeholder="URL"
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
            <input
              type="text"
              value={block.content.text || ''}
              onChange={(e) => updateContent('text', e.target.value)}
              placeholder="Link Text"
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
            <textarea
              value={block.content.description || ''}
              onChange={(e) => updateContent('description', e.target.value)}
              placeholder="Description"
              rows={2}
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
          </div>
        );

      case 'list':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={block.content.title || ''}
              onChange={(e) => updateContent('title', e.target.value)}
              placeholder="List Title"
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
            <select
              value={block.content.listType || 'unordered'}
              onChange={(e) => updateContent('listType', e.target.value)}
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            >
              <option value="ordered">Ordered (1, 2, 3...)</option>
              <option value="unordered">Unordered (bullets)</option>
            </select>
            <div className="space-y-2">
              {(block.content.items || []).map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateArrayItem('items', idx, e.target.value)}
                    placeholder={`Item ${idx + 1}`}
                    className="flex-1 px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={() => removeArrayItem('items', idx)}
                    className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addArrayItem('items', '')}
                className="text-xs text-blue-600 hover:text-blue-700"
              >
                + Add Item
              </button>
            </div>
          </div>
        );

      case 'text':
      case 'heading':
        return (
          <div className="space-y-2">
            {block.type === 'heading' && (
              <select
                value={block.content.level || 2}
                onChange={(e) => updateContent('level', parseInt(e.target.value))}
                className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
              >
                <option value={1}>Heading 1</option>
                <option value={2}>Heading 2</option>
                <option value={3}>Heading 3</option>
                <option value={4}>Heading 4</option>
              </select>
            )}
            <textarea
              value={block.content.text || ''}
              onChange={(e) => updateContent('text', e.target.value)}
              placeholder={block.type === 'heading' ? 'Heading text' : 'Text content (Markdown supported)'}
              rows={block.type === 'heading' ? 2 : 4}
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
          </div>
        );

      case 'conceptExplanation':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={block.content.title || ''}
              onChange={(e) => updateContent('title', e.target.value)}
              placeholder="Concept Title"
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
            <input
              type="text"
              value={block.content.concept || ''}
              onChange={(e) => updateContent('concept', e.target.value)}
              placeholder="Concept Name"
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
            <textarea
              value={block.content.explanation || ''}
              onChange={(e) => updateContent('explanation', e.target.value)}
              placeholder="Explanation"
              rows={4}
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
            <div className="space-y-2">
              <label className="text-xs text-gray-600 dark:text-gray-400">Examples:</label>
              {(block.content.examples || []).map((example, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={example}
                    onChange={(e) => updateArrayItem('examples', idx, e.target.value)}
                    placeholder={`Example ${idx + 1}`}
                    className="flex-1 px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={() => removeArrayItem('examples', idx)}
                    className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addArrayItem('examples', '')}
                className="text-xs text-blue-600 hover:text-blue-700"
              >
                + Add Example
              </button>
            </div>
          </div>
        );

      case 'handsOn':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={block.content.title || ''}
              onChange={(e) => updateContent('title', e.target.value)}
              placeholder="Activity Title"
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
            <textarea
              value={block.content.instructions || ''}
              onChange={(e) => updateContent('instructions', e.target.value)}
              placeholder="Step-by-step instructions"
              rows={4}
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
            <textarea
              value={block.content.expectedOutcome || ''}
              onChange={(e) => updateContent('expectedOutcome', e.target.value)}
              placeholder="Expected outcome"
              rows={2}
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
          </div>
        );

      case 'mcq':
        return (
          <div className="space-y-2">
            <textarea
              value={block.content.question || ''}
              onChange={(e) => updateContent('question', e.target.value)}
              placeholder="Question"
              rows={2}
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
            <div className="space-y-2">
              <label className="text-xs text-gray-600 dark:text-gray-400">Options:</label>
              {(block.content.options || []).map((option, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="radio"
                    checked={block.content.correctAnswer === idx}
                    onChange={() => updateContent('correctAnswer', idx)}
                    className="mt-1"
                  />
                  <input
                    type="text"
                    value={typeof option === 'string' ? option : option.text || ''}
                    onChange={(e) => {
                      const options = [...(block.content.options || [])];
                      options[idx] = typeof options[idx] === 'string' ? e.target.value : { ...options[idx], text: e.target.value };
                      updateContent('options', options);
                    }}
                    placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                    className="flex-1 px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={() => removeArrayItem('options', idx)}
                    className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addArrayItem('options', '')}
                className="text-xs text-blue-600 hover:text-blue-700"
              >
                + Add Option
              </button>
            </div>
            <textarea
              value={block.content.explanation || ''}
              onChange={(e) => updateContent('explanation', e.target.value)}
              placeholder="Explanation"
              rows={2}
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
          </div>
        );

      case 'codingExercise':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={block.content.title || ''}
              onChange={(e) => updateContent('title', e.target.value)}
              placeholder="Exercise Title"
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
            <textarea
              value={block.content.description || ''}
              onChange={(e) => updateContent('description', e.target.value)}
              placeholder="Description"
              rows={2}
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
            <textarea
              value={block.content.starterCode || ''}
              onChange={(e) => updateContent('starterCode', e.target.value)}
              placeholder="Starter code"
              rows={4}
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs font-mono text-gray-900 dark:text-white"
            />
            <textarea
              value={block.content.solution || ''}
              onChange={(e) => updateContent('solution', e.target.value)}
              placeholder="Solution code"
              rows={3}
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs font-mono text-gray-900 dark:text-white"
            />
          </div>
        );

      case 'example':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={block.content.title || ''}
              onChange={(e) => updateContent('title', e.target.value)}
              placeholder="Example Title"
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
            <textarea
              value={block.content.code || ''}
              onChange={(e) => updateContent('code', e.target.value)}
              placeholder="Code example"
              rows={5}
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs font-mono text-gray-900 dark:text-white"
            />
            <textarea
              value={block.content.explanation || ''}
              onChange={(e) => updateContent('explanation', e.target.value)}
              placeholder="Explanation"
              rows={3}
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
            <textarea
              value={block.content.output || ''}
              onChange={(e) => updateContent('output', e.target.value)}
              placeholder="Expected output"
              rows={2}
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs font-mono text-gray-900 dark:text-white"
            />
          </div>
        );

      case 'quiz':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={block.content.title || ''}
              onChange={(e) => updateContent('title', e.target.value)}
              placeholder="Quiz Title"
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
            <input
              type="number"
              value={block.content.passingScore || 0}
              onChange={(e) => updateContent('passingScore', parseInt(e.target.value))}
              placeholder="Passing score"
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
            <div className="text-xs text-gray-600 dark:text-gray-400 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
              Add questions using MCQ blocks separately. This is a quiz container.
            </div>
          </div>
        );

      case 'comparison':
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={block.content.title || ''}
              onChange={(e) => updateContent('title', e.target.value)}
              placeholder="Comparison Title"
              className="w-full px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
            />
            <div className="space-y-2">
              <label className="text-xs text-gray-600 dark:text-gray-400">Headers:</label>
              {(block.content.headers || []).map((header, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={header}
                    onChange={(e) => updateArrayItem('headers', idx, e.target.value)}
                    placeholder={`Column ${idx + 1}`}
                    className="flex-1 px-2 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={() => removeArrayItem('headers', idx)}
                    className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addArrayItem('headers', '')}
                className="text-xs text-blue-600 hover:text-blue-700"
              >
                + Add Header
              </button>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
              Row editing coming soon. Edit in JSON for now.
            </div>
          </div>
        );

      default:
        return (
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-xs">
            <p className="text-yellow-800 dark:text-yellow-200">
              Editor for "{block.type}" type coming soon! 
              For now, you can edit the JSON directly in the backend.
            </p>
          </div>
        );
    }
  };

  return renderEditor();
};

// Preview Modal Component
const PreviewModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  const { module, subModule } = data;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Preview Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-6 w-6" />
                Content Preview
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {module.title} › {subModule.title}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* SubModule Info */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {subModule.title}
              </h4>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {subModule.description}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <Clock className="h-4 w-4" />
                  {subModule.estimatedTime || 15} minutes
                </span>
                <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 font-medium capitalize">
                  {subModule.difficulty || 'Beginner'}
                </span>
              </div>
            </div>

            {/* Content Blocks */}
            {(subModule.contentBlocks || []).map((block, index) => (
              <div key={block._id || block.tempId} className="animate-fadeIn">
                <PreviewContentBlock block={block} index={index} />
              </div>
            ))}

            {(subModule.contentBlocks || []).length === 0 && (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No content blocks added yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Preview Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            Close Preview
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// Preview Content Block Component
const PreviewContentBlock = ({ block, index }) => {
  const renderContent = () => {
    switch (block.type) {
      case 'summary':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h5 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              {block.content.title || 'Summary'}
            </h5>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {block.content.description || block.content.text || 'No content'}
            </p>
          </div>
        );

      case 'codeSnippet':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
            {block.content.title && (
              <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <h6 className="font-semibold text-gray-900 dark:text-white text-sm">{block.content.title}</h6>
              </div>
            )}
            <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
              <span className="text-gray-300 text-sm font-medium">
                {block.content.language || 'code'}
              </span>
              <Code className="h-4 w-4 text-gray-400" />
            </div>
            <pre className="bg-gray-900 p-4 overflow-x-auto">
              <code className="text-green-400 text-sm font-mono">
                {block.content.code || '// Your code here'}
              </code>
            </pre>
            {block.content.explanation && (
              <div className="px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {block.content.explanation}
                </p>
              </div>
            )}
          </div>
        );

      case 'keyFeatures':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h5 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <List className="h-5 w-5 text-indigo-500" />
              {block.content.title || 'Key Features'}
            </h5>
            <ul className="space-y-3">
              {(block.content.features || []).map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-1 w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'importantNote':
        return (
          <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h5 className="font-bold text-amber-900 dark:text-amber-100 mb-2">{block.content.title || 'Important Note'}</h5>
                <p className="text-amber-800 dark:text-amber-200 leading-relaxed">{block.content.description || 'No content'}</p>
              </div>
            </div>
          </div>
        );

      case 'mistakesToAvoid':
        return (
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-xl p-6">
            <h5 className="font-bold text-red-900 dark:text-red-100 mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              {block.content.title || 'Common Mistakes to Avoid'}
            </h5>
            <ul className="space-y-2">
              {(block.content.mistakes || []).map((mistake, idx) => (
                <li key={idx} className="flex items-start gap-2 text-red-800 dark:text-red-200">
                  <span className="text-lg">⚠️</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'timeline':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h5 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-500" />
              {block.content.title || 'Timeline'}
            </h5>
            <div className="space-y-4 relative before:content-[''] before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-0.5 before:bg-purple-300 dark:before:bg-purple-700">
              {(block.content.events || []).map((event, idx) => (
                <div key={idx} className="flex gap-4 relative">
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-xs z-10">
                    {idx + 1}
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="font-bold text-purple-600 dark:text-purple-400">{event.year}</div>
                    <div className="text-gray-700 dark:text-gray-300 mt-1">{event.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
            {block.content.url && (
              <img 
                src={block.content.url} 
                alt={block.content.alt || 'Content image'}
                className="w-full h-auto"
              />
            )}
            {block.content.caption && (
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900/50">
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center italic">
                  {block.content.caption}
                </p>
              </div>
            )}
          </div>
        );

      case 'video':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
            {block.content.title && (
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <h6 className="font-semibold text-gray-900 dark:text-white flex items-center justify-between">
                  <span>{block.content.title}</span>
                  {block.content.duration && (
                    <span className="text-sm text-gray-500">{block.content.duration}</span>
                  )}
                </h6>
              </div>
            )}
            <div className="aspect-video bg-gray-900">
              {block.content.url ? (
                <iframe
                  src={block.content.url}
                  className="w-full h-full"
                  allowFullScreen
                  title={block.content.title || 'Video'}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No video URL provided
                </div>
              )}
            </div>
          </div>
        );

      case 'link':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <a href={block.content.url || '#'} target="_blank" rel="noopener noreferrer" className="block group">
              <div className="flex items-center justify-between mb-2">
                <h6 className="font-semibold text-blue-600 dark:text-blue-400 group-hover:underline">
                  {block.content.text || 'External Link'}
                </h6>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </div>
              {block.content.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400">{block.content.description}</p>
              )}
              {block.content.url && (
                <p className="text-xs text-gray-500 mt-2 truncate">{block.content.url}</p>
              )}
            </a>
          </div>
        );

      case 'list':
        const ListTag = block.content.listType === 'ordered' ? 'ol' : 'ul';
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            {block.content.title && (
              <h5 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{block.content.title}</h5>
            )}
            <ListTag className={`space-y-2 ${block.content.listType === 'ordered' ? 'list-decimal list-inside' : 'list-disc list-inside'} text-gray-700 dark:text-gray-300`}>
              {(block.content.items || []).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ListTag>
          </div>
        );

      case 'text':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {block.content.text || 'No content'}
            </div>
          </div>
        );

      case 'heading':
        const HeadingTag = `h${block.content.level || 2}`;
        const headingSizes = {
          1: 'text-3xl',
          2: 'text-2xl',
          3: 'text-xl',
          4: 'text-lg'
        };
        return (
          <div className="my-4">
            {React.createElement(
              HeadingTag,
              {
                className: `font-bold text-gray-900 dark:text-white ${headingSizes[block.content.level || 2]}`
              },
              block.content.text || 'Heading'
            )}
          </div>
        );

      case 'conceptExplanation':
        return (
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 shadow-sm border border-indigo-200 dark:border-indigo-800">
            <h5 className="text-lg font-bold text-indigo-900 dark:text-indigo-100 mb-2">{block.content.title || 'Concept'}</h5>
            <div className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-3">{block.content.concept}</div>
            <div className="text-gray-800 dark:text-gray-200 leading-relaxed mb-4 whitespace-pre-wrap">{block.content.explanation}</div>
            {(block.content.examples || []).length > 0 && (
              <div className="mt-4">
                <div className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-2">Examples:</div>
                <ul className="space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300">
                  {block.content.examples.map((example, idx) => (
                    <li key={idx}>{example}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      case 'handsOn':
        return (
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 shadow-sm border border-green-200 dark:border-green-800">
            <h5 className="text-lg font-bold text-green-900 dark:text-green-100 mb-4 flex items-center gap-2">
              <Code className="h-5 w-5" />
              {block.content.title || 'Hands-On Activity'}
            </h5>
            <div className="mb-4">
              <div className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2">Instructions:</div>
              <div className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{block.content.instructions}</div>
            </div>
            {block.content.expectedOutcome && (
              <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-green-200 dark:border-green-700">
                <div className="text-sm font-semibold text-green-700 dark:text-green-300 mb-1">Expected Outcome:</div>
                <div className="text-gray-700 dark:text-gray-300">{block.content.expectedOutcome}</div>
              </div>
            )}
          </div>
        );

      case 'mcq':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-purple-500" />
              {block.content.question || 'Question'}
            </h5>
            <div className="space-y-2">
              {(block.content.options || []).map((option, idx) => {
                const optionText = typeof option === 'string' ? option : option.text;
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border-2 ${
                      idx === block.content.correctAnswer
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-gray-900 dark:text-white">{optionText}</span>
                      {idx === block.content.correctAnswer && (
                        <span className="ml-auto text-green-600 dark:text-green-400 text-xs font-medium">
                          ✓ Correct
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {block.content.explanation && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Explanation:</strong> {block.content.explanation}
                </p>
              </div>
            )}
          </div>
        );

      case 'codingExercise':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="px-5 py-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-b border-gray-200 dark:border-gray-700">
              <h5 className="text-lg font-bold text-gray-900 dark:text-white">{block.content.title || 'Coding Exercise'}</h5>
              {block.content.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{block.content.description}</p>
              )}
            </div>
            <div className="p-5">
              {block.content.starterCode && (
                <div className="mb-4">
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Starter Code:</div>
                  <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <code className="text-green-400 text-sm font-mono">{block.content.starterCode}</code>
                  </pre>
                </div>
              )}
              {block.content.solution && (
                <div>
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Solution:</div>
                  <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <code className="text-blue-400 text-sm font-mono">{block.content.solution}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        );

      case 'example':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="px-5 py-3 bg-blue-50 dark:bg-blue-900/20 border-b border-gray-200 dark:border-gray-700">
              <h5 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-500" />
                {block.content.title || 'Example'}
              </h5>
            </div>
            <div className="p-5">
              <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto mb-4">
                <code className="text-green-400 text-sm font-mono">{block.content.code || '// Example code'}</code>
              </pre>
              {block.content.explanation && (
                <div className="mb-3 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{block.content.explanation}</div>
              )}
              {block.content.output && (
                <div className="mt-3 p-3 bg-gray-100 dark:bg-gray-900 rounded-lg border-l-4 border-green-500">
                  <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Output:</div>
                  <pre className="text-sm font-mono text-gray-900 dark:text-gray-100">{block.content.output}</pre>
                </div>
              )}
            </div>
          </div>
        );

      case 'quiz':
        return (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 shadow-sm border border-purple-200 dark:border-purple-800">
            <h5 className="text-xl font-bold text-purple-900 dark:text-purple-100 mb-2 flex items-center gap-2">
              <CheckSquare className="h-6 w-6" />
              {block.content.title || 'Quiz'}
            </h5>
            <div className="text-sm text-purple-700 dark:text-purple-300 mb-4">
              Passing Score: {block.content.passingScore || 0} questions
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400 text-sm">Quiz questions should be added as separate MCQ blocks</p>
            </div>
          </div>
        );

      case 'comparison':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto">
            <h5 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{block.content.title || 'Comparison'}</h5>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                  {(block.content.headers || []).map((header, idx) => (
                    <th key={idx} className="text-left py-2 px-3 font-semibold text-gray-900 dark:text-white">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(block.content.rows || []).map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="py-2 px-3 text-gray-700 dark:text-gray-300">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return (
          <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Preview for "{block.type}" coming soon
            </p>
          </div>
        );
    }
  };

  return (
    <div className="group">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
          Block {index + 1}
        </span>
        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
      </div>
      {renderContent()}
    </div>
  );
};

export default ModuleManager;
