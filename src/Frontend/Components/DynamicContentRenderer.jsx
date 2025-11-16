import React from 'react';
import CodeSnippet from './Code Components/CodeSnippet';
import Summary from './Interface Components/ReadingArea/Summary';
import KeyFeatures from './Interface Components/ReadingArea/KeyFeatures';
import ImportantNote from './Interface Components/ReadingArea/ImportantNote';
import HandsOn from './Interface Components/ReadingArea/HandsOn';
import ConceptExplanation from './Interface Components/ReadingArea/ConceptExplanation';
import MistakesToAvoid from './Interface Components/ReadingArea/MistakesToAvoid';
import MCQ from './Practice Components/MCQ';

// Component to render timeline events
const TimelineEvent = ({ year, title, description }) => (
  <div className="relative pl-8 py-4 transition-all duration-300 hover:scale-[1.02]">
    <div className="absolute left-0 top-0 mt-7 -ml-1.5 h-3 w-3 rounded-full border-2 border-blue-400 bg-gray-900"></div>
    <div className="absolute left-0 top-0 mt-8 h-full w-px bg-gradient-to-b from-blue-500/50 to-transparent"></div>
    <div className="text-blue-400 font-mono text-sm">{year}</div>
    <h3 className="text-lg font-medium text-gray-200 mt-1">{title}</h3>
    <p className="text-gray-300 mt-1">{description}</p>
  </div>
);

// Component to render timeline section
const Timeline = ({ title, events }) => (
  <div className="mt-8">
    <h2 className="text-2xl font-semibold mb-6">{title}</h2>
    <div className="border-l border-blue-500/20 ml-4">
      {events.map((event, index) => (
        <TimelineEvent key={index} {...event} />
      ))}
    </div>
  </div>
);

// Component to render text content
const TextBlock = ({ content }) => (
  <div className="prose prose-invert max-w-none">
    <p className="text-gray-300 leading-relaxed">{content}</p>
  </div>
);

// Component to render headings
const HeadingBlock = ({ content, level = 2 }) => {
  const HeadingTag = `h${level}`;
  const sizeClasses = {
    1: 'text-4xl',
    2: 'text-3xl',
    3: 'text-2xl',
    4: 'text-xl',
    5: 'text-lg',
    6: 'text-base'
  };
  
  return React.createElement(
    HeadingTag,
    { className: `${sizeClasses[level]} font-semibold text-gray-100 mt-8 mb-4` },
    content
  );
};

// Component to render lists
const ListBlock = ({ items, type = 'bullet' }) => {
  const ListTag = type === 'numbered' ? 'ol' : 'ul';
  const listClass = type === 'numbered' ? 'list-decimal' : 'list-disc';
  
  return (
    <div className="my-4">
      {React.createElement(
        ListTag,
        { className: `${listClass} list-inside space-y-2 text-gray-300` },
        items.map((item, index) => (
          <li key={index} className="leading-relaxed">{item}</li>
        ))
      )}
    </div>
  );
};

/**
 * DynamicContentRenderer - Renders module content dynamically from backend data
 * @param {Object} props
 * @param {Array} props.contentBlocks - Array of content blocks from the backend
 */
const DynamicContentRenderer = ({ contentBlocks = [] }) => {
  // Helper function to normalize options from various formats
  const normalizeOptions = (options) => {
    if (!options || !Array.isArray(options)) return [];
    
    return options.map(opt => {
      // If it's already a string, return it
      if (typeof opt === 'string') return opt;
      
      // If it's an object with text property, extract text
      if (opt && typeof opt === 'object' && opt.text) return opt.text;
      
      // Otherwise convert to string
      return String(opt);
    });
  };

  // Helper function to find correct answer index
  const findCorrectAnswerIndex = (options) => {
    if (!options || !Array.isArray(options)) return 0;
    
    const correctIndex = options.findIndex(opt => 
      opt && typeof opt === 'object' && opt.isCorrect === true
    );
    
    return correctIndex >= 0 ? correctIndex : 0;
  };

  if (!contentBlocks || contentBlocks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">No content available for this module yet.</p>
      </div>
    );
  }

  // Sort content blocks by order
  const sortedBlocks = [...contentBlocks].sort((a, b) => a.order - b.order);

  const renderBlock = (block) => {
    // Use block.content for the new schema structure
    const content = block.content || {};
    
    switch (block.type) {
      case 'summary':
        return (
          <Summary
            title={content.title || block.summaryTitle}
            description={content.description || content.text || block.summaryDescription}
          />
        );

      case 'keyFeatures':
        return (
          <KeyFeatures
            title={content.title || block.featuresTitle}
            items={content.features || block.features}
            variant={content.variant || block.featuresVariant}
          />
        );

      case 'codeSnippet':
        return (
          <div className="my-6">
            {(content.title || block.codeSnippet?.title) && (
              <h3 className="text-xl font-semibold mb-3">
                {content.title || block.codeSnippet?.title}
              </h3>
            )}
            <CodeSnippet
              code={content.code || block.codeSnippet?.code}
              language={content.language || block.codeSnippet?.language}
              showLineNumbers={content.showLineNumbers ?? block.codeSnippet?.showLineNumbers ?? true}
              showCopyButton={content.showCopyButton ?? block.codeSnippet?.showCopyButton ?? true}
              highlightLines={content.highlightLines || block.codeSnippet?.highlightLines}
            />
            {(content.explanation || block.codeSnippet?.explanation) && (
              <p className="mt-3 text-gray-400 text-sm">
                {content.explanation || block.codeSnippet?.explanation}
              </p>
            )}
          </div>
        );

      case 'conceptExplanation':
        return (
          <ConceptExplanation 
            sections={content.sections || block.conceptSections}
            title={content.title}
            concept={content.concept}
            explanation={content.explanation}
            examples={content.examples}
          />
        );

      case 'importantNote':
        return (
          <ImportantNote
            title={content.title || block.importantNote?.title}
            points={content.points || block.importantNote?.points}
            description={content.description}
            variant={content.variant || block.importantNote?.variant}
          />
        );

      case 'mistakesToAvoid':
        return (
          <MistakesToAvoid
            title={content.title || block.mistakesToAvoid?.title}
            mistakes={content.mistakes || block.mistakesToAvoid?.mistakes || []}
            alternatives={content.alternatives || block.mistakesToAvoid?.alternatives}
          />
        );

      case 'timeline':
        return (
          <Timeline
            title={content.title || block.timelineTitle}
            events={content.events || block.timelineEvents || []}
          />
        );

      case 'handsOn':
        return (
          <HandsOn
            title={content.title || block.handsOn?.title}
            description={content.description || block.handsOn?.description}
            instructions={content.instructions}
            expectedOutcome={content.expectedOutcome}
            defaultCode={content.defaultCode || block.handsOn?.defaultCode}
            solution={content.solution || block.handsOn?.solution}
          />
        );

      case 'mcq':
        const rawOptions = content.options || block.mcqQuestions?.[0]?.options || [];
        const normalizedOptions = normalizeOptions(rawOptions);
        
        const mcqQuestion = {
          id: block._id || Date.now(),
          question: content.question || block.mcqQuestions?.[0]?.question || '',
          options: normalizedOptions,
          correctAnswer: content.correctAnswer !== undefined 
            ? content.correctAnswer 
            : (rawOptions.length > 0 ? findCorrectAnswerIndex(rawOptions) : 0),
          explanation: content.explanation || block.mcqQuestions?.[0]?.explanation || ''
        };
        
        return (
          <div className="my-8">
            <h2 className="text-2xl font-semibold mb-6">Practice Question 📝</h2>
            <MCQ question={mcqQuestion} />
          </div>
        );

      case 'quiz':
        return (
          <div className="my-8">
            <h2 className="text-2xl font-semibold mb-6">{content.title || 'Quiz'} 📝</h2>
            {(content.questions || []).map((q, index) => {
              const rawQuizOptions = q.options || [];
              const normalizedQuizOptions = normalizeOptions(rawQuizOptions);
              
              const quizQuestion = {
                id: `quiz-${block._id || Date.now()}-${index}`,
                question: q.question || '',
                options: normalizedQuizOptions,
                correctAnswer: q.correctAnswer !== undefined
                  ? q.correctAnswer
                  : (rawQuizOptions.length > 0 ? findCorrectAnswerIndex(rawQuizOptions) : 0),
                explanation: q.explanation || ''
              };
              return <MCQ key={index} question={quizQuestion} />;
            })}
          </div>
        );

      case 'codingExercise':
        return (
          <div className="my-8 p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-2">
              {content.title || block.codingExercise?.title}
            </h3>
            {(content.description || block.codingExercise?.description) && (
              <p className="text-gray-300 mb-4">
                {content.description || block.codingExercise?.description}
              </p>
            )}
            {(content.hints || block.codingExercise?.hints)?.length > 0 && (
              <div className="mb-4">
                <p className="font-medium text-gray-200 mb-2">💡 Hints:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-400">
                  {(content.hints || block.codingExercise?.hints).map((hint, i) => (
                    <li key={i}>{hint}</li>
                  ))}
                </ul>
              </div>
            )}
            {(content.starterCode || block.codingExercise?.starterCode) && (
              <CodeSnippet
                code={content.starterCode || block.codingExercise?.starterCode}
                language="java"
                showLineNumbers={true}
                showCopyButton={true}
              />
            )}
          </div>
        );

      case 'example':
        return (
          <div className="my-6 p-5 bg-blue-900/20 rounded-lg border border-blue-800">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              💡 {content.title || 'Example'}
            </h3>
            {content.code && (
              <CodeSnippet
                code={content.code}
                language={content.language || 'java'}
                showLineNumbers={true}
                showCopyButton={true}
              />
            )}
            {content.explanation && (
              <p className="mt-3 text-gray-300">{content.explanation}</p>
            )}
            {content.output && (
              <div className="mt-3 p-3 bg-gray-900 rounded border-l-4 border-green-500">
                <p className="text-xs text-gray-400 mb-1">Output:</p>
                <pre className="text-green-400 font-mono text-sm">{content.output}</pre>
              </div>
            )}
          </div>
        );

      case 'image':
        return content.url ? (
          <div className="my-6">
            <img 
              src={content.url} 
              alt={content.alt || content.caption || 'Content image'}
              className="w-full h-auto rounded-lg"
            />
            {content.caption && (
              <p className="mt-2 text-center text-sm text-gray-400 italic">
                {content.caption}
              </p>
            )}
          </div>
        ) : null;

      case 'video':
        return content.url ? (
          <div className="my-6">
            {content.title && (
              <h3 className="text-xl font-semibold mb-3">{content.title}</h3>
            )}
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
              <iframe
                src={content.url}
                className="w-full h-full"
                allowFullScreen
                title={content.title || 'Video content'}
              />
            </div>
            {content.description && (
              <p className="mt-2 text-gray-400">{content.description}</p>
            )}
          </div>
        ) : null;

      case 'link':
        return content.url ? (
          <div className="my-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors">
            <a 
              href={content.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-blue-400 group-hover:text-blue-300">
                    {content.text || 'External Link'} →
                  </h4>
                  {content.description && (
                    <p className="text-gray-400 text-sm mt-1">{content.description}</p>
                  )}
                </div>
              </div>
            </a>
          </div>
        ) : null;

      case 'comparison':
        return (
          <div className="my-6 overflow-x-auto">
            {content.title && (
              <h3 className="text-xl font-semibold mb-3">{content.title}</h3>
            )}
            <table className="w-full border-collapse bg-gray-800/50 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-700">
                  {(content.headers || []).map((header, idx) => (
                    <th key={idx} className="px-4 py-3 text-left font-semibold text-gray-200">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(content.rows || []).map((row, idx) => (
                  <tr key={idx} className="border-t border-gray-700 hover:bg-gray-700/30">
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="px-4 py-3 text-gray-300">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'text':
        return <TextBlock content={content.text || block.text} />;

      case 'heading':
        return <HeadingBlock content={content.text || block.heading} level={content.level || block.headingLevel || 2} />;

      case 'list':
        return <ListBlock items={content.items || block.listItems || []} type={content.listType || block.listType} />;

      default:
        console.warn(`Unknown content block type: ${block.type}`);
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {sortedBlocks.map((block, index) => (
        <div key={`${block.type}-${block.order}-${index}`}>
          {renderBlock(block)}
        </div>
      ))}
    </div>
  );
};

export default DynamicContentRenderer;
