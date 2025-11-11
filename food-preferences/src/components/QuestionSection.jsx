import { useState } from 'react';
import QuestionItem from './QuestionItem';

const QuestionSection = ({ section, responses, onResponseChange, isComplete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleItemChange = (itemId, value, subsectionId = null) => {
    const key = subsectionId
      ? `${section.id}.${subsectionId}.${itemId}`
      : `${section.id}.${itemId}`;
    onResponseChange(key, value);
  };

  // Render open-ended section (Dietary Preferences)
  if (section.isOpenEnded) {
    return (
      <div className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <span className="text-lg font-semibold text-gray-800">{section.title}</span>
            {isComplete && (
              <span className="text-green-600">✓</span>
            )}
          </div>
          <svg
            className={`w-6 h-6 text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isExpanded && (
          <div className="px-6 pb-6">
            {section.questions.map((question) => (
              <div key={question.id} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {question.label}
                </label>
                <textarea
                  value={responses[`${section.id}.${question.id}`] || ''}
                  onChange={(e) => handleItemChange(question.id, e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type your answer here..."
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Render ranking section (Shopping Priorities)
  if (section.type === 'ranking') {
    return (
      <div className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <span className="text-lg font-semibold text-gray-800">{section.title}</span>
            {isComplete && (
              <span className="text-green-600">✓</span>
            )}
          </div>
          <svg
            className={`w-6 h-6 text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isExpanded && (
          <div className="px-6 pb-6">
            <p className="text-sm text-gray-600 mb-4">{section.instructions}</p>
            {section.items.map((item) => (
              <div key={item.id} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {item.label}
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rank) => (
                    <button
                      key={rank}
                      onClick={() => handleItemChange(item.id, rank)}
                      className={`w-12 h-12 rounded-lg text-sm font-medium transition-all ${
                        responses[`${section.id}.${item.id}`] === rank
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {rank}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {section.finalQuestion && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {section.finalQuestion.label}
                </label>
                <textarea
                  value={responses[`${section.id}.${section.finalQuestion.id}`] || ''}
                  onChange={(e) => handleItemChange(section.finalQuestion.id, e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type your answer here..."
                />
              </div>
            )}

            {section.additionalQuestions?.map((question) => (
              <div key={question.id} className="mt-6 pt-6 border-t border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {question.label}
                </label>
                {question.type === 'radio' && (
                  <div className="space-y-2">
                    {question.options.map((option) => (
                      <label key={option} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`${section.id}.${question.id}`}
                          checked={responses[`${section.id}.${question.id}`] === option}
                          onChange={() => handleItemChange(question.id, option)}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Render standard section with items (possibly with subsections)
  return (
    <div className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <span className="text-lg font-semibold text-gray-800">{section.title}</span>
          {isComplete && (
            <span className="text-green-600">✓</span>
          )}
        </div>
        <svg
          className={`w-6 h-6 text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="px-6 pb-6">
          {/* Handle subsections (like Snacks with Salty/Sweet/Healthy) */}
          {section.subsections ? (
            section.subsections.map((subsection) => (
              <div key={subsection.id} className="mb-6">
                <h3 className="text-md font-semibold text-gray-700 mb-4">{subsection.title}</h3>
                {subsection.items.map((item) => (
                  <QuestionItem
                    key={item.id}
                    item={item}
                    sectionId={section.id}
                    subsectionId={subsection.id}
                    value={responses[`${section.id}.${subsection.id}.${item.id}`]}
                    onChange={(value) => handleItemChange(item.id, value, subsection.id)}
                    useStockOptions={section.useStockOptions}
                  />
                ))}
              </div>
            ))
          ) : (
            /* Handle sections without subsections */
            section.items?.map((item) => (
              <QuestionItem
                key={item.id}
                item={item}
                sectionId={section.id}
                value={responses[`${section.id}.${item.id}`]}
                onChange={(value) => handleItemChange(item.id, value)}
                useStockOptions={section.useStockOptions}
              />
            ))
          )}

          {/* Additional questions for sections like Treats */}
          {section.additionalQuestions?.map((question) => (
            <div key={question.id} className="mt-6 pt-6 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {question.label}
              </label>
              {question.type === 'radio' && (
                <div className="space-y-2">
                  {question.options.map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`${section.id}.${question.id}`}
                        checked={responses[`${section.id}.${question.id}`] === option}
                        onChange={() => handleItemChange(question.id, option)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionSection;
