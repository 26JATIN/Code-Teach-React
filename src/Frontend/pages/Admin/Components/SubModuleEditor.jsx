import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Save, 
  Plus,
  Trash2,
  GripVertical,
  Eye,
  FileText,
  Code,
  CheckSquare,
  AlertCircle,
  Lightbulb,
  BookOpen,
  Clock
} from 'lucide-react';
import ContentBlockEditor from './ContentBlockEditor';

/**
 * SubModuleEditor - Full-page editor for creating/editing submodules
 * Provides a clean, spacious interface for content creation
 */
const SubModuleEditor = ({ 
  subModule, 
  moduleTitle,
  onSave, 
  onCancel,
  isNew = false 
}) => {
  const [formData, setFormData] = useState({
    title: subModule?.title || '',
    description: subModule?.description || '',
    order: subModule?.order || 1,
    estimatedTime: subModule?.estimatedTime || 15,
    difficulty: subModule?.difficulty || 'beginner',
    contentBlocks: subModule?.contentBlocks || []
  });

  const [activeTab, setActiveTab] = useState('details'); // details, content, preview
  const [expandedBlock, setExpandedBlock] = useState(null);

  const handleSave = () => {
    if (!formData.title.trim()) {
      alert('Please enter a submodule title');
      return;
    }
    onSave({ ...subModule, ...formData });
  };

  const addContentBlock = () => {
    const newBlock = {
      tempId: Date.now(),
      type: 'text',
      order: formData.contentBlocks.length + 1,
      content: {}
    };
    setFormData({
      ...formData,
      contentBlocks: [...formData.contentBlocks, newBlock]
    });
    setExpandedBlock(newBlock.tempId);
  };

  const updateContentBlock = (index, updates) => {
    const newBlocks = [...formData.contentBlocks];
    newBlocks[index] = { ...newBlocks[index], ...updates };
    setFormData({ ...formData, contentBlocks: newBlocks });
  };

  const deleteContentBlock = (index) => {
    const newBlocks = formData.contentBlocks.filter((_, i) => i !== index);
    setFormData({ ...formData, contentBlocks: newBlocks });
  };

  const moveBlock = (index, direction) => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === formData.contentBlocks.length - 1)
    ) {
      return;
    }

    const newBlocks = [...formData.contentBlocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    
    // Update orders
    newBlocks.forEach((block, i) => {
      block.order = i + 1;
    });

    setFormData({ ...formData, contentBlocks: newBlocks });
  };

  const difficultyColors = {
    beginner: 'bg-green-500',
    intermediate: 'bg-yellow-500',
    advanced: 'bg-red-500'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onCancel}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-400" />
              </button>
              <div>
                <p className="text-sm text-gray-400">{moduleTitle}</p>
                <h1 className="text-2xl font-bold text-white">
                  {isNew ? 'Create New SubModule' : 'Edit SubModule'}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
              >
                <Save className="h-4 w-4" />
                Save SubModule
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-4">
            {['details', 'content', 'preview'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'details' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Title */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                SubModule Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Introduction to Variables"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            {/* Description */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of what students will learn..."
                rows={4}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
              />
            </div>

            {/* Meta Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Order */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Order Number
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  min="1"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              {/* Estimated Time */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <Clock className="h-4 w-4" />
                  Estimated Time (minutes)
                </label>
                <input
                  type="number"
                  value={formData.estimatedTime}
                  onChange={(e) => setFormData({ ...formData, estimatedTime: parseInt(e.target.value) })}
                  min="1"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              {/* Difficulty */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Difficulty Level
                </label>
                <div className="flex gap-2">
                  {['beginner', 'intermediate', 'advanced'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setFormData({ ...formData, difficulty: level })}
                      className={`flex-1 px-3 py-2 rounded-lg capitalize transition-all ${
                        formData.difficulty === level
                          ? `${difficultyColors[level]} text-white`
                          : 'bg-gray-900 text-gray-400 hover:text-white'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'content' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Add Content Block Button */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">
                Content Blocks ({formData.contentBlocks.length})
              </h2>
              <button
                onClick={addContentBlock}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus className="h-5 w-5" />
                Add Content Block
              </button>
            </div>

            {/* Content Blocks List */}
            {formData.contentBlocks.length === 0 ? (
              <div className="bg-gray-800/30 border-2 border-dashed border-gray-700 rounded-xl p-12 text-center">
                <FileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-400 mb-2">
                  No content blocks yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Start building your submodule by adding content blocks
                </p>
                <button
                  onClick={addContentBlock}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg inline-flex items-center gap-2 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  Add Your First Block
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {formData.contentBlocks.map((block, index) => (
                  <ContentBlockEditor
                    key={block._id || block.tempId}
                    block={block}
                    index={index}
                    isExpanded={expandedBlock === (block._id || block.tempId)}
                    onToggle={() => 
                      setExpandedBlock(
                        expandedBlock === (block._id || block.tempId) 
                          ? null 
                          : (block._id || block.tempId)
                      )
                    }
                    onUpdate={(updates) => updateContentBlock(index, updates)}
                    onDelete={() => deleteContentBlock(index)}
                    onMoveUp={() => moveBlock(index, 'up')}
                    onMoveDown={() => moveBlock(index, 'down')}
                    canMoveUp={index > 0}
                    canMoveDown={index < formData.contentBlocks.length - 1}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'preview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 rounded-xl p-8 border border-gray-700"
          >
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">{formData.title}</h2>
              <p className="text-gray-400">{formData.description}</p>
              <div className="flex items-center gap-4 mt-4 text-sm">
                <span className={`px-3 py-1 rounded-full ${difficultyColors[formData.difficulty]} text-white capitalize`}>
                  {formData.difficulty}
                </span>
                <span className="text-gray-400 flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formData.estimatedTime} minutes
                </span>
                <span className="text-gray-400">
                  {formData.contentBlocks.length} content blocks
                </span>
              </div>
            </div>

            {/* Preview Content Blocks */}
            <div className="space-y-6">
              {formData.contentBlocks.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No content to preview yet. Add content blocks to see them here.
                </p>
              ) : (
                formData.contentBlocks.map((block, index) => (
                  <div key={index} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-gray-500">#{block.order}</span>
                      <span className="text-sm font-medium text-blue-400 capitalize">{block.type}</span>
                    </div>
                    <div className="text-gray-400 text-sm">
                      {block.content?.title || block.content?.text || 'No content'}
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SubModuleEditor;
