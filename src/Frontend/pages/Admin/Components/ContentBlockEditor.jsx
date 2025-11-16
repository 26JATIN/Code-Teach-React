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
  Info,
  Link
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
    { value: 'heading', label: 'Heading', icon: Hash, color: 'gray' },
    { value: 'list', label: 'List', icon: List, color: 'gray' },
    { value: 'codeSnippet', label: 'Code Snippet', icon: Code, color: 'green' },
    { value: 'summary', label: 'Summary', icon: BookOpen, color: 'yellow' },
    { value: 'keyFeatures', label: 'Key Features', icon: Target, color: 'purple' },
    { value: 'conceptExplanation', label: 'Concept Explanation', icon: Lightbulb, color: 'cyan' },
    { value: 'importantNote', label: 'Important Note', icon: AlertCircle, color: 'red' },
    { value: 'mistakesToAvoid', label: 'Mistakes to Avoid', icon: AlertCircle, color: 'orange' },
    { value: 'timeline', label: 'Timeline', icon: Clock, color: 'blue' },
    { value: 'handsOn', label: 'Hands-On Practice', icon: Target, color: 'orange' },
    { value: 'mcq', label: 'MCQ', icon: CheckSquare, color: 'purple' },
    { value: 'codingExercise', label: 'Coding Exercise', icon: Trophy, color: 'yellow' },
    { value: 'quiz', label: 'Quiz', icon: List, color: 'pink' },
    { value: 'image', label: 'Image', icon: Image, color: 'indigo' },
    { value: 'video', label: 'Video', icon: Play, color: 'red' },
    { value: 'link', label: 'Link', icon: Link, color: 'blue' },
    { value: 'example', label: 'Example', icon: Code, color: 'green' },
    { value: 'comparison', label: 'Comparison', icon: List, color: 'purple' },
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
            {block.text || 
             block.heading || 
             block.summaryTitle ||
             block.featuresTitle ||
             block.codeSnippet?.title || 
             block.importantNote?.title ||
             block.mistakesToAvoid?.title ||
             block.timelineTitle ||
             block.handsOn?.title ||
             block.codingExercise?.title ||
             (block.mcqQuestions && block.mcqQuestions.length > 0 && block.mcqQuestions[0].question) ||
             (block.conceptSections && block.conceptSections.length > 0 && block.conceptSections[0].title) ||
             (block.listItems && block.listItems.length > 0 && block.listItems[0]) ||
             block.content?.title || 
             block.content?.text ||
             block.content?.url ||
             'No content yet'}
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
              {renderTypeSpecificFields(block, onUpdate, updateContent, updateOption, addOption, removeOption)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Render type-specific fields based on content type
const renderTypeSpecificFields = (block, onUpdate, updateContent, updateOption, addOption, removeOption) => {
  switch (block.type) {
    case 'text':
      return (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Content *
            </label>
            <textarea
              value={block.text || ''}
              onChange={(e) => onUpdate({ text: e.target.value })}
              placeholder="Enter your text content..."
              rows={6}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
            />
          </div>
        </>
      );

    case 'codeSnippet':
      return (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={block.codeSnippet?.title || ''}
              onChange={(e) => onUpdate({ 
                codeSnippet: { 
                  ...(block.codeSnippet || {}), 
                  title: e.target.value 
                } 
              })}
              placeholder="e.g., Example: Hello World Program"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Language *
            </label>
            <select
              value={block.codeSnippet?.language || 'javascript'}
              onChange={(e) => onUpdate({ 
                codeSnippet: { 
                  ...(block.codeSnippet || {}), 
                  language: e.target.value 
                } 
              })}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option value="java">Java</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="cpp">C++</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Code *
            </label>
            <textarea
              value={block.codeSnippet?.code || ''}
              onChange={(e) => onUpdate({ 
                codeSnippet: { 
                  ...(block.codeSnippet || {}), 
                  code: e.target.value 
                } 
              })}
              placeholder="Paste your code here..."
              rows={12}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 font-mono text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
            />
            <p className="mt-2 text-sm text-gray-500">
              Tip: Your code will be syntax highlighted based on the selected language
            </p>
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

    case 'heading':
      return (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Heading Text *
            </label>
            <input
              type="text"
              value={block.heading || ''}
              onChange={(e) => onUpdate({ heading: e.target.value })}
              placeholder="Enter heading text..."
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Heading Level
            </label>
            <select
              value={block.headingLevel || 2}
              onChange={(e) => onUpdate({ headingLevel: parseInt(e.target.value) })}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option value="1">H1 - Main Title</option>
              <option value="2">H2 - Section</option>
              <option value="3">H3 - Subsection</option>
              <option value="4">H4 - Minor Heading</option>
              <option value="5">H5 - Small Heading</option>
              <option value="6">H6 - Smallest</option>
            </select>
          </div>
        </>
      );

    case 'list':
      return (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              List Type
            </label>
            <select
              value={block.listType || 'bullet'}
              onChange={(e) => onUpdate({ listType: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option value="bullet">Bullet List (•)</option>
              <option value="numbered">Numbered List (1, 2, 3...)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              List Items *
            </label>
            <div className="space-y-2">
              {(block.listItems || []).map((item, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newItems = [...(block.listItems || [])];
                      newItems[i] = e.target.value;
                      onUpdate({ listItems: newItems });
                    }}
                    placeholder={`Item ${i + 1}`}
                    className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                  <button
                    onClick={() => {
                      const newItems = (block.listItems || []).filter((_, idx) => idx !== i);
                      onUpdate({ listItems: newItems });
                    }}
                    className="px-3 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newItems = [...(block.listItems || []), ''];
                  onUpdate({ listItems: newItems });
                }}
                className="w-full px-4 py-2 border-2 border-dashed border-gray-700 hover:border-gray-600 text-gray-400 hover:text-white rounded-lg transition-colors"
              >
                + Add List Item
              </button>
            </div>
          </div>
        </>
      );

    case 'summary':
      return (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Summary Title
            </label>
            <input
              type="text"
              value={block.summaryTitle || ''}
              onChange={(e) => onUpdate({ summaryTitle: e.target.value })}
              placeholder="e.g., Key Takeaways"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Summary Content
            </label>
            <textarea
              value={block.summaryDescription || ''}
              onChange={(e) => onUpdate({ summaryDescription: e.target.value })}
              placeholder="Main points and summary..."
              rows={6}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
            />
          </div>
        </>
      );

    case 'link':
      return (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              URL *
            </label>
            <input
              type="url"
              value={block.content?.url || ''}
              onChange={(e) => updateContent('url', e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Link Title *
            </label>
            <input
              type="text"
              value={block.content?.title || ''}
              onChange={(e) => updateContent('title', e.target.value)}
              placeholder="Descriptive link text"
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
              placeholder="Brief description of the link..."
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
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-yellow-400 font-medium mb-2">
                Editor for "{block.type}" type is not yet implemented
              </p>
              <p className="text-sm text-gray-400 mb-3">
                This content type uses the generic "content" field. You can add content manually,
                or this block will be preserved as-is when saving.
              </p>
              <details className="text-xs text-gray-500">
                <summary className="cursor-pointer hover:text-gray-400">View raw data</summary>
                <pre className="mt-2 p-2 bg-gray-900 rounded text-xs overflow-auto">
                  {JSON.stringify(block, null, 2)}
                </pre>
              </details>
            </div>
          </div>
        </div>
      );
  }
};

export default ContentBlockEditor;
