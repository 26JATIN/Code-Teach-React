import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft,
  Plus, 
  Trash2, 
  Save, 
  Edit,
  BookOpen,
  ChevronRight,
  ChevronDown,
  Eye,
  Clock,
  FileText
} from 'lucide-react';
import { apiRequest } from '../../../../config/config';
import SubModuleEditor from './SubModuleEditor';

/**
 * ModuleFormNew - Cleaner, step-based module management
 * Steps: 1) Select Course → 2) View/Edit Modules → 3) Edit SubModules
 */
const ModuleFormNew = () => {
  const [step, setStep] = useState(1); // 1: Course Selection, 2: Module List, 3: SubModule Editor
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [editingSubModule, setEditingSubModule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await apiRequest('/api/courses/all');
      setCourses(response);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchModules = async (courseId) => {
    try {
      setLoading(true);
      console.log('Fetching modules for course:', courseId);
      // Use admin endpoint to get full module details with _id and contentBlocks
      const response = await apiRequest(`/api/modules/course/${courseId}/admin`);
      console.log('API Response:', response);
      const modulesWithDefaults = (response.modules || []).map(module => ({
        ...module,
        subModules: (module.subModules || []).map(subModule => ({
          ...subModule,
          contentBlocks: subModule.contentBlocks || []
        }))
      }));
      console.log('Processed modules:', modulesWithDefaults);
      setModules(modulesWithDefaults);
    } catch (error) {
      console.error('Error fetching modules:', error);
      alert('Failed to fetch modules: ' + error.message);
      setModules([]);
    } finally {
      setLoading(false);
    }
  };

  const selectCourse = (course) => {
    setSelectedCourse(course);
    fetchModules(course._id);
    setStep(2);
  };

  const addNewModule = () => {
    const newModule = {
      tempId: Date.now(),
      courseId: selectedCourse._id,
      id: `${modules.length + 1}`,
      order: modules.length + 1,
      title: '',
      description: '',
      icon: '📚',
      subModules: [],
      isNew: true
    };
    setModules([...modules, newModule]);
    setSelectedModule(newModule);
  };

  const saveModule = async (module) => {
    try {
      setSaving(true);
      console.log('Saving module:', module);
      const endpoint = module._id 
        ? `/api/modules/${module._id}` 
        : '/api/modules';
      
      const method = module._id ? 'PUT' : 'POST';
      
      console.log(`Making ${method} request to ${endpoint}`);
      const result = await apiRequest(endpoint, {
        method,
        body: JSON.stringify(module)
      });
      console.log('Save result:', result);

      // Refresh modules
      await fetchModules(selectedCourse._id);
      alert('Module saved successfully!');
    } catch (error) {
      console.error('Error saving module:', error);
      alert('Failed to save module: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteModule = async (moduleId) => {
    if (!window.confirm('Are you sure you want to delete this module?')) return;
    
    try {
      await apiRequest(`/api/modules/${moduleId}`, { method: 'DELETE' });
      await fetchModules(selectedCourse._id);
      alert('Module deleted successfully!');
    } catch (error) {
      console.error('Error deleting module:', error);
      alert('Failed to delete module');
    }
  };

  const editSubModule = (module, subModule) => {
    setSelectedModule(module);
    setEditingSubModule(subModule);
    setStep(3);
  };

  const createNewSubModule = (module) => {
    const newSubModule = {
      tempId: Date.now(),
      title: '',
      description: '',
      order: (module.subModules || []).length + 1,
      estimatedTime: 15,
      difficulty: 'beginner',
      contentBlocks: [],
      isNew: true
    };
    setSelectedModule(module);
    setEditingSubModule(newSubModule);
    setStep(3);
  };

  const saveSubModule = async (updatedSubModule) => {
    try {
      setSaving(true);
      
      // Update the module with the new/updated submodule
      const moduleIndex = modules.findIndex(m => 
        m._id === selectedModule._id || m.tempId === selectedModule.tempId
      );
      
      const updatedModule = { ...modules[moduleIndex] };
      
      if (updatedSubModule.isNew) {
        // Add new submodule
        updatedModule.subModules = [
          ...(updatedModule.subModules || []),
          updatedSubModule
        ];
      } else {
        // Update existing submodule
        const subIndex = updatedModule.subModules.findIndex(s => 
          s._id === updatedSubModule._id || s.tempId === updatedSubModule.tempId
        );
        updatedModule.subModules[subIndex] = updatedSubModule;
      }

      // Save the entire module
      await saveModule(updatedModule);
      
      // Go back to module list
      setStep(2);
      setEditingSubModule(null);
    } catch (error) {
      console.error('Error saving submodule:', error);
      alert('Failed to save submodule');
    } finally {
      setSaving(false);
    }
  };

  const deleteSubModule = async (module, subModuleId) => {
    if (!window.confirm('Are you sure you want to delete this submodule?')) return;
    
    try {
      const updatedModule = {
        ...module,
        subModules: module.subModules.filter(s => 
          s._id !== subModuleId && s.tempId !== subModuleId
        )
      };
      
      await saveModule(updatedModule);
      alert('SubModule deleted successfully!');
    } catch (error) {
      console.error('Error deleting submodule:', error);
      alert('Failed to delete submodule');
    }
  };

  // STEP 1: Course Selection
  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Module Management</h1>
            <p className="text-gray-400">Select a course to manage its modules and content</p>
          </div>

          {courses.length === 0 ? (
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-12 text-center">
              <BookOpen className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-400 mb-2">
                No courses available
              </h3>
              <p className="text-gray-500">
                Create a course first before managing modules
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <motion.button
                  key={course._id}
                  onClick={() => selectCourse(course)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-left hover:border-blue-500 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <BookOpen className="h-6 w-6 text-blue-400" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-600 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {course.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-700 flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      {course.moduleCount || 0} modules
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // STEP 2: Module List
  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => {
                setStep(1);
                setSelectedCourse(null);
                setModules([]);
              }}
              className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Courses
            </button>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  {selectedCourse?.title}
                </h1>
                <p className="text-gray-400">
                  Manage modules and submodules for this course
                </p>
              </div>
              <button
                onClick={addNewModule}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus className="h-5 w-5" />
                Add Module
              </button>
            </div>
          </div>

          {/* Modules */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-gray-400 mt-4">Loading modules...</p>
            </div>
          ) : modules.length === 0 ? (
            <div className="bg-gray-800/50 border-2 border-dashed border-gray-700 rounded-xl p-12 text-center">
              <BookOpen className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-400 mb-2">
                No modules yet
              </h3>
              <p className="text-gray-500 mb-6">
                Start building your course by adding the first module
              </p>
              <button
                onClick={addNewModule}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg inline-flex items-center gap-2 transition-colors"
              >
                <Plus className="h-5 w-5" />
                Create First Module
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {modules.map((module, moduleIndex) => (
                <ModuleCard
                  key={module._id || module.tempId}
                  module={module}
                  onEdit={(m) => setSelectedModule(m)}
                  onDelete={() => deleteModule(module._id)}
                  onAddSubModule={() => createNewSubModule(module)}
                  onEditSubModule={(sub) => editSubModule(module, sub)}
                  onDeleteSubModule={(subId) => deleteSubModule(module, subId)}
                  onSave={saveModule}
                  saving={saving}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // STEP 3: SubModule Editor
  if (step === 3 && editingSubModule) {
    return (
      <SubModuleEditor
        subModule={editingSubModule}
        moduleTitle={selectedModule?.title || 'Module'}
        onSave={saveSubModule}
        onCancel={() => {
          setStep(2);
          setEditingSubModule(null);
        }}
        isNew={editingSubModule.isNew}
      />
    );
  }

  return null;
};

// ModuleCard Component
const ModuleCard = ({ 
  module, 
  onEdit, 
  onDelete, 
  onAddSubModule, 
  onEditSubModule,
  onDeleteSubModule,
  onSave,
  saving 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(module.isNew);
  const [formData, setFormData] = useState({
    title: module.title,
    description: module.description,
    icon: module.icon,
    order: module.order
  });

  const handleSave = () => {
    onSave({ ...module, ...formData });
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden"
    >
      {/* Module Header */}
      <div className="p-6">
        {isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Module Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Introduction to Programming"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Icon (Emoji)
                </label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="📚"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of this module..."
                rows={3}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white resize-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {saving ? 'Saving...' : 'Save Module'}
              </button>
              {!module.isNew && (
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      title: module.title,
                      description: module.description,
                      icon: module.icon,
                      order: module.order
                    });
                  }}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="text-4xl">{module.icon}</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {module.title}
                  </h3>
                  <p className="text-gray-400">
                    {module.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>{(module.subModules || []).length} submodules</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 hover:bg-gray-700 text-gray-400 hover:text-white rounded-lg transition-colors"
                >
                  <Edit className="h-5 w-5" />
                </button>
                {module._id && (
                  <button
                    onClick={onDelete}
                    className="p-2 hover:bg-red-500/10 text-red-400 hover:text-red-300 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 hover:bg-gray-700 text-gray-400 hover:text-white rounded-lg transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* SubModules */}
      <AnimatePresence>
        {isExpanded && !isEditing && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="border-t border-gray-700 bg-gray-900/30"
          >
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold text-white">SubModules</h4>
                <button
                  onClick={onAddSubModule}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition-colors text-sm"
                >
                  <Plus className="h-4 w-4" />
                  Add SubModule
                </button>
              </div>

              {(module.subModules || []).length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-2 text-gray-600" />
                  <p>No submodules yet. Click "Add SubModule" to create one.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {module.subModules.map((subModule) => (
                    <div
                      key={subModule._id || subModule.tempId}
                      className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-blue-500 transition-all group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-white group-hover:text-blue-400 transition-colors">
                          {subModule.title}
                        </h5>
                        <div className="flex gap-1">
                          <button
                            onClick={() => onEditSubModule(subModule)}
                            className="p-1 hover:bg-gray-700 text-gray-400 hover:text-white rounded transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => onDeleteSubModule(subModule._id || subModule.tempId)}
                            className="p-1 hover:bg-red-500/10 text-red-400 hover:text-red-300 rounded transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                        {subModule.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {subModule.estimatedTime || 15} min
                        </span>
                        <span className="capitalize px-2 py-1 bg-gray-700 rounded">
                          {subModule.difficulty || 'beginner'}
                        </span>
                        <span>{(subModule.contentBlocks || []).length} blocks</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ModuleFormNew;
