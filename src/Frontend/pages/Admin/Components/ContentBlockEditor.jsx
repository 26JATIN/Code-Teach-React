import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  Trash2,
  GripVertical,
  FileText,
  Code,
  CheckSquare,
  AlertCircle,
  Lightbulb,
  BookOpen,
  Image,
  Play,
  List,
  Hash,
  Clock,
  Target,
  Trophy,
  Info
} from 'lucide-react';

/**
 * ContentBlockEditor - Individual content block editor with type-specific fields
 */
const ContentBlockEditor = ({
  block,
  index,
  isExpanded,
  onToggle,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown
}) => {
  const contentTypes = [
    { value: 'text', label: 'Text', icon: FileText, color: 'blue' },
    { value: 'code', label: 'Code', icon: Code, color: 'green' },
    { value: 'mcq', label: 'MCQ', icon: CheckSquare, color: 'purple' },
    { value: 'quiz', label: 'Quiz', icon: List, color: 'pink' },
    { value: 'summary', label: 'Summary', icon: BookOpen, color: 'yellow' },
    { value: 'important-note', label: 'Important Note', icon: AlertCircle, color: 'red' },
    { value: 'tip', label: 'Tip', icon: Lightbulb, color: 'cyan' },
    { value: 'hands-on', label: 'Hands-On', icon: Target, color: 'orange' },
    { value: 'image', label: 'Image', icon: Image, color: 'indigo' },
    { value: 'video', label: 'Video', icon: Play, color: 'red' },
    { value: 'mistakes-to-avoid', label: 'Mistakes to Avoid', icon: AlertCircle, color: 'red' },
    { value: 'practice', label: 'Practice', icon: Trophy, color: 'yellow' },
    { value: 'hint', label: 'Hint', icon: Info, color: 'blue' },
  ];

  const typeConfig = contentTypes.find(t => t.value === block.type) || contentTypes[0];
  const IconComponent = typeConfig.icon;

  const updateContent = (field, value) => {
    onUpdate({
      content: {
        ...block.content,
        [field]: value
      }
    });
  };

  const updateOption = (optionIndex, value) => {
    const newOptions = [...(block.content?.options || [])];
    newOptions[optionIndex] = value;
    updateContent('options', newOptions);
  };

  const addOption = () => {
    const newOptions = [...(block.content?.options || []), ''];
    updateContent('options', newOptions);
  };

  const removeOption = (optionIndex) => {
    const newOptions = (block.content?.options || []).filter((_, i) => i !== optionIndex);
    updateContent('options', newOptions);
  };

  return (
    <motion.div
      layout
      className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-gray-800/80">
        {/* Drag Handle */}
        <div className="cursor-move text-gray-500 hover:text-gray-400">
          <GripVertical className="h-5 w-5" />
        </div>

        {/* Type Icon & Info */}
        <div className={`p-2 rounded-lg bg-${typeConfig.color}-500/10`}>
          <IconComponent className={`h-5 w-5 text-${typeConfig.color}-400`} />
        </div>
        
        <div className="flex-1">
          <h3 className="text-white font-medium">
            Block #{block.order} - {typeConfig.label}
          </h3>
          <p className="text-sm text-gray-400 truncate">
            {block.content?.title || block.content?.text || 'No content yet'}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Move Buttons */}
          <button
            onClick={onMoveUp}
            disabled={!canMoveUp}
            className={`p-2 rounded-lg transition-colors ${
              canMoveUp
                ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                : 'text-gray-600 cursor-not-allowed'
            }`}
          >
            <ChevronUp className="h-4 w-4" />
          </button>
          <button
            onClick={onMoveDown}
            disabled={!canMoveDown}
            className={`p-2 rounded-lg transition-colors ${
              canMoveDown
                ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                : 'text-gray-600 cursor-not-allowed'
            }`}
          >
            <ChevronDown className="h-4 w-4" />
          </button>

          {/* Delete Button */}
          <button
            onClick={onDelete}
            className="p-2 hover:bg-red-500/10 text-red-400 hover:text-red-300 rounded-lg transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>

          {/* Expand/Collapse */}
          <button
            onClick={onToggle}
            className="p-2 hover:bg-gray-700 text-gray-400 hover:text-white rounded-lg transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-700"
          >
            <div className="p-6 space-y-4">
              {/* Type Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Content Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {contentTypes.map((type) => {
                    const TypeIcon = type.icon;
                    return (
                      <button
                        key={type.value}
                        onClick={() => onUpdate({ type: type.value })}
                        className={`p-3 rounded-lg border transition-all ${
                          block.type === type.value
                            ? `border-${type.color}-500 bg-${type.color}-500/10`
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        <TypeIcon className={`h-5 w-5 mx-auto mb-1 ${
                          block.type === type.value ? `text-${type.color}-400` : 'text-gray-400'
                        }`} />
                        <span className={`text-xs ${
                          block.type === type.value ? 'text-white' : 'text-gray-400'
                        }`}>
                          {type.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Type-Specific Fields */}
              {renderTypeSpecificFields(block, updateContent, updateOption, addOption, removeOption)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Render type-specific fields based on content type
const renderTypeSpecificFields = (block, updateContent, updateOption, addOption, removeOption) => {
  switch (block.type) {
    case 'text':
      return (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Content
            </label>
            <textarea
              value={block.content?.text || ''}
              onChange={(e) => updateContent('text', e.target.value)}
              placeholder="Enter your text content..."
              rows={6}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
            />
          </div>
        </>
      );

    case 'code':
      return (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Language
            </label>
            <input
              type="text"
              value={block.content?.language || ''}
              onChange={(e) => updateContent('language', e.target.value)}
              placeholder="e.g., javascript, python, java"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Code
            </label>
            <textarea
              value={block.content?.code || ''}
              onChange={(e) => updateContent('code', e.target.value)}
              placeholder="Paste your code here..."
              rows={10}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 font-mono text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Caption (optional)
            </label>
            <input
              type="text"
              value={block.content?.caption || ''}
              onChange={(e) => updateContent('caption', e.target.value)}
              placeholder="Brief description of the code"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </>
      );

    case 'mcq':
    case 'quiz':
      return (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Question
            </label>
            <textarea
              value={block.content?.question || ''}
              onChange={(e) => updateContent('question', e.target.value)}
              placeholder="Enter your question..."
              rows={3}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Options
            </label>
            <div className="space-y-2">
              {(block.content?.options || []).map((option, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(i, e.target.value)}
                    placeholder={`Option ${i + 1}`}
                    className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                  <button
                    onClick={() => removeOption(i)}
                    className="px-3 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={addOption}
                className="w-full px-4 py-2 border-2 border-dashed border-gray-700 hover:border-gray-600 text-gray-400 hover:text-white rounded-lg transition-colors"
              >
                + Add Option
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Correct Answer Index (0-based)
            </label>
            <input
              type="number"
              value={block.content?.correctAnswer ?? ''}
              onChange={(e) => updateContent('correctAnswer', parseInt(e.target.value))}
              placeholder="e.g., 0 for first option"
              min="0"
              max={(block.content?.options?.length || 1) - 1}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Explanation (optional)
            </label>
            <textarea
              value={block.content?.explanation || ''}
              onChange={(e) => updateContent('explanation', e.target.value)}
              placeholder="Explain why this is the correct answer..."
              rows={3}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
            />
          </div>
        </>
      );

    case 'summary':
    case 'important-note':
    case 'tip':
    case 'mistakes-to-avoid':
      return (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={block.content?.title || ''}
              onChange={(e) => updateContent('title', e.target.value)}
              placeholder="Enter title..."
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Content
            </label>
            <textarea
              value={block.content?.content || ''}
              onChange={(e) => updateContent('content', e.target.value)}
              placeholder="Enter your content..."
              rows={6}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
            />
          </div>
        </>
      );

    case 'hands-on':
    case 'practice':
      return (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={block.content?.title || ''}
              onChange={(e) => updateContent('title', e.target.value)}
              placeholder="Exercise title..."
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={block.content?.description || ''}
              onChange={(e) => updateContent('description', e.target.value)}
              placeholder="What should students do?"
              rows={4}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Starter Code (optional)
            </label>
            <textarea
              value={block.content?.starterCode || ''}
              onChange={(e) => updateContent('starterCode', e.target.value)}
              placeholder="Initial code template..."
              rows={6}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 font-mono text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Solution (optional)
            </label>
            <textarea
              value={block.content?.solution || ''}
              onChange={(e) => updateContent('solution', e.target.value)}
              placeholder="Solution code..."
              rows={6}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 font-mono text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
            />
          </div>
        </>
      );

    case 'image':
      return (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Image URL
            </label>
            <input
              type="text"
              value={block.content?.url || ''}
              onChange={(e) => updateContent('url', e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Alt Text
            </label>
            <input
              type="text"
              value={block.content?.alt || ''}
              onChange={(e) => updateContent('alt', e.target.value)}
              placeholder="Description for accessibility"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Caption (optional)
            </label>
            <input
              type="text"
              value={block.content?.caption || ''}
              onChange={(e) => updateContent('caption', e.target.value)}
              placeholder="Image caption"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </>
      );

    case 'video':
      return (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Video URL (YouTube, Vimeo, etc.)
            </label>
            <input
              type="text"
              value={block.content?.url || ''}
              onChange={(e) => updateContent('url', e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={block.content?.title || ''}
              onChange={(e) => updateContent('title', e.target.value)}
              placeholder="Video title"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description (optional)
            </label>
            <textarea
              value={block.content?.description || ''}
              onChange={(e) => updateContent('description', e.target.value)}
              placeholder="What will students learn from this video?"
              rows={3}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
            />
          </div>
        </>
      );

    case 'hint':
      return (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Hint Text
            </label>
            <textarea
              value={block.content?.text || ''}
              onChange={(e) => updateContent('text', e.target.value)}
              placeholder="Give students a helpful hint..."
              rows={4}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
            />
          </div>
        </>
      );

    default:
      return (
        <div className="text-gray-400 text-center py-4">
          No specific fields for this content type
        </div>
      );
  }
};

export default ContentBlockEditor;
