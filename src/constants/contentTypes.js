/**
 * Content Type Constants
 * Defines all available content types and their properties
 * Ensures symmetry between frontend and backend
 */

export const CONTENT_TYPES = {
  SUMMARY: 'summary',
  KEY_FEATURES: 'keyFeatures',
  CODE_SNIPPET: 'codeSnippet',
  CONCEPT_EXPLANATION: 'conceptExplanation',
  IMPORTANT_NOTE: 'importantNote',
  MISTAKES_TO_AVOID: 'mistakesToAvoid',
  TIMELINE: 'timeline',
  HANDS_ON: 'handsOn',
  MCQ: 'mcq',
  QUIZ: 'quiz',
  CODING_EXERCISE: 'codingExercise',
  TEXT: 'text',
  HEADING: 'heading',
  LIST: 'list',
  IMAGE: 'image',
  VIDEO: 'video',
  LINK: 'link',
  EXAMPLE: 'example',
  COMPARISON: 'comparison'
};

export const CONTENT_TYPE_LABELS = {
  [CONTENT_TYPES.SUMMARY]: 'Summary',
  [CONTENT_TYPES.KEY_FEATURES]: 'Key Features',
  [CONTENT_TYPES.CODE_SNIPPET]: 'Code Snippet',
  [CONTENT_TYPES.CONCEPT_EXPLANATION]: 'Concept Explanation',
  [CONTENT_TYPES.IMPORTANT_NOTE]: 'Important Note',
  [CONTENT_TYPES.MISTAKES_TO_AVOID]: 'Mistakes to Avoid',
  [CONTENT_TYPES.TIMELINE]: 'Timeline',
  [CONTENT_TYPES.HANDS_ON]: 'Hands-On Practice',
  [CONTENT_TYPES.MCQ]: 'Multiple Choice Question',
  [CONTENT_TYPES.QUIZ]: 'Quiz',
  [CONTENT_TYPES.CODING_EXERCISE]: 'Coding Exercise',
  [CONTENT_TYPES.TEXT]: 'Text',
  [CONTENT_TYPES.HEADING]: 'Heading',
  [CONTENT_TYPES.LIST]: 'List',
  [CONTENT_TYPES.IMAGE]: 'Image',
  [CONTENT_TYPES.VIDEO]: 'Video',
  [CONTENT_TYPES.LINK]: 'Link',
  [CONTENT_TYPES.EXAMPLE]: 'Example',
  [CONTENT_TYPES.COMPARISON]: 'Comparison Table'
};

export const CONTENT_TYPE_DESCRIPTIONS = {
  [CONTENT_TYPES.SUMMARY]: 'A brief overview or summary of the topic',
  [CONTENT_TYPES.KEY_FEATURES]: 'Highlighted list of key features or points',
  [CONTENT_TYPES.CODE_SNIPPET]: 'Code block with syntax highlighting',
  [CONTENT_TYPES.CONCEPT_EXPLANATION]: 'Detailed explanation of a concept',
  [CONTENT_TYPES.IMPORTANT_NOTE]: 'Important information or warning',
  [CONTENT_TYPES.MISTAKES_TO_AVOID]: 'Common mistakes and their solutions',
  [CONTENT_TYPES.TIMELINE]: 'Chronological timeline of events',
  [CONTENT_TYPES.HANDS_ON]: 'Interactive hands-on practice exercise',
  [CONTENT_TYPES.MCQ]: 'Single multiple choice question',
  [CONTENT_TYPES.QUIZ]: 'Quiz with multiple questions',
  [CONTENT_TYPES.CODING_EXERCISE]: 'Coding challenge with test cases',
  [CONTENT_TYPES.TEXT]: 'Plain text or markdown content',
  [CONTENT_TYPES.HEADING]: 'Section heading',
  [CONTENT_TYPES.LIST]: 'Ordered or unordered list',
  [CONTENT_TYPES.IMAGE]: 'Image with optional caption',
  [CONTENT_TYPES.VIDEO]: 'Embedded video content',
  [CONTENT_TYPES.LINK]: 'External or internal link',
  [CONTENT_TYPES.EXAMPLE]: 'Code example with explanation',
  [CONTENT_TYPES.COMPARISON]: 'Comparison table or chart'
};

export const CONTENT_TYPE_ICONS = {
  [CONTENT_TYPES.SUMMARY]: '📝',
  [CONTENT_TYPES.KEY_FEATURES]: '⭐',
  [CONTENT_TYPES.CODE_SNIPPET]: '💻',
  [CONTENT_TYPES.CONCEPT_EXPLANATION]: '💡',
  [CONTENT_TYPES.IMPORTANT_NOTE]: '⚠️',
  [CONTENT_TYPES.MISTAKES_TO_AVOID]: '❌',
  [CONTENT_TYPES.TIMELINE]: '📅',
  [CONTENT_TYPES.HANDS_ON]: '🛠️',
  [CONTENT_TYPES.MCQ]: '❓',
  [CONTENT_TYPES.QUIZ]: '📋',
  [CONTENT_TYPES.CODING_EXERCISE]: '🔨',
  [CONTENT_TYPES.TEXT]: '📄',
  [CONTENT_TYPES.HEADING]: '📌',
  [CONTENT_TYPES.LIST]: '📋',
  [CONTENT_TYPES.IMAGE]: '🖼️',
  [CONTENT_TYPES.VIDEO]: '🎥',
  [CONTENT_TYPES.LINK]: '🔗',
  [CONTENT_TYPES.EXAMPLE]: '📚',
  [CONTENT_TYPES.COMPARISON]: '⚖️'
};

/**
 * Get all content types as an array
 */
export const getAllContentTypes = () => {
  return Object.values(CONTENT_TYPES);
};

/**
 * Get content type label
 */
export const getContentTypeLabel = (type) => {
  return CONTENT_TYPE_LABELS[type] || type;
};

/**
 * Get content type description
 */
export const getContentTypeDescription = (type) => {
  return CONTENT_TYPE_DESCRIPTIONS[type] || '';
};

/**
 * Get content type icon
 */
export const getContentTypeIcon = (type) => {
  return CONTENT_TYPE_ICONS[type] || '📄';
};

/**
 * Check if content type is valid
 */
export const isValidContentType = (type) => {
  return getAllContentTypes().includes(type);
};

/**
 * Content type categories for grouping
 */
export const CONTENT_TYPE_CATEGORIES = {
  BASIC: [
    CONTENT_TYPES.TEXT,
    CONTENT_TYPES.HEADING,
    CONTENT_TYPES.LIST,
    CONTENT_TYPES.SUMMARY
  ],
  EDUCATIONAL: [
    CONTENT_TYPES.CONCEPT_EXPLANATION,
    CONTENT_TYPES.KEY_FEATURES,
    CONTENT_TYPES.IMPORTANT_NOTE,
    CONTENT_TYPES.MISTAKES_TO_AVOID,
    CONTENT_TYPES.EXAMPLE
  ],
  CODE: [
    CONTENT_TYPES.CODE_SNIPPET,
    CONTENT_TYPES.HANDS_ON,
    CONTENT_TYPES.CODING_EXERCISE
  ],
  INTERACTIVE: [
    CONTENT_TYPES.MCQ,
    CONTENT_TYPES.QUIZ,
    CONTENT_TYPES.CODING_EXERCISE,
    CONTENT_TYPES.HANDS_ON
  ],
  MEDIA: [
    CONTENT_TYPES.IMAGE,
    CONTENT_TYPES.VIDEO,
    CONTENT_TYPES.LINK
  ],
  SPECIAL: [
    CONTENT_TYPES.TIMELINE,
    CONTENT_TYPES.COMPARISON
  ]
};

/**
 * Get category for content type
 */
export const getContentTypeCategory = (type) => {
  for (const [category, types] of Object.entries(CONTENT_TYPE_CATEGORIES)) {
    if (types.includes(type)) {
      return category;
    }
  }
  return 'OTHER';
};

export default CONTENT_TYPES;
