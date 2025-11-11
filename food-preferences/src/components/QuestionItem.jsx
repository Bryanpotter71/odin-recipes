import { useState, useEffect } from 'react';
import { RATING_OPTIONS, STOCK_OPTIONS } from '../constants/questionnaireData';

const QuestionItem = ({ item, sectionId, subsectionId, value, onChange, useStockOptions }) => {
  const [showFollowUp, setShowFollowUp] = useState(false);

  useEffect(() => {
    if (useStockOptions) {
      setShowFollowUp(value?.rating === 'Yes' || value?.rating === 'Sometimes');
    } else {
      setShowFollowUp(value?.rating === 'Love It' || value?.rating === 'Like It');
    }
  }, [value?.rating, useStockOptions]);

  const handleRatingChange = (rating) => {
    onChange({
      ...value,
      rating,
      details: value?.details || null,
      followUpData: value?.followUpData || null
    });
  };

  const handleFollowUpChange = (data) => {
    onChange({
      ...value,
      followUpData: data
    });
  };

  const options = useStockOptions ? STOCK_OPTIONS : RATING_OPTIONS;

  return (
    <div className="py-4 border-b border-gray-200 last:border-b-0">
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {item.label}
        </label>
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleRatingChange(option)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                value?.rating === option
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {showFollowUp && item.followUp && (
        <div className="ml-4 mt-3 p-4 bg-blue-50 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {item.followUp.label}
          </label>

          {item.followUp.type === 'text' && (
            <input
              type="text"
              value={value?.followUpData || ''}
              onChange={(e) => handleFollowUpChange(e.target.value)}
              placeholder="Enter your preferences..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          {item.followUp.type === 'checkbox' && (
            <div className="space-y-2">
              {item.followUp.options.map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={value?.followUpData?.includes(option) || false}
                    onChange={(e) => {
                      const currentData = value?.followUpData || [];
                      const newData = e.target.checked
                        ? [...currentData, option]
                        : currentData.filter((item) => item !== option);
                      handleFollowUpChange(newData);
                    }}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionItem;
