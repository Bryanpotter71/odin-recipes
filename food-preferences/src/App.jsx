import { useState, useEffect } from 'react';
import QuestionSection from './components/QuestionSection';
import ProgressBar from './components/ProgressBar';
import OutputPage from './components/OutputPage';
import { QUESTIONNAIRE_SECTIONS } from './constants/questionnaireData';

const STORAGE_KEY = 'food_preferences_responses';
const RESPONDENT_KEY = 'food_preferences_respondent';

function App() {
  const [responses, setResponses] = useState({});
  const [respondent, setRespondent] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [showRespondentInput, setShowRespondentInput] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const savedResponses = localStorage.getItem(STORAGE_KEY);
    const savedRespondent = localStorage.getItem(RESPONDENT_KEY);

    if (savedResponses) {
      setResponses(JSON.parse(savedResponses));
    }

    if (savedRespondent) {
      setRespondent(savedRespondent);
      setShowRespondentInput(false);
    }
  }, []);

  // Auto-save to localStorage whenever responses change
  useEffect(() => {
    if (Object.keys(responses).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(responses));
    }
  }, [responses]);

  // Save respondent name
  useEffect(() => {
    if (respondent) {
      localStorage.setItem(RESPONDENT_KEY, respondent);
    }
  }, [respondent]);

  const handleResponseChange = (key, value) => {
    setResponses(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleStartQuestionnaire = (name) => {
    if (name.trim()) {
      setRespondent(name.trim());
      setShowRespondentInput(false);
    }
  };

  const handleSubmit = () => {
    setShowOutput(true);
    window.scrollTo(0, 0);
  };

  const handleBackToQuestionnaire = () => {
    setShowOutput(false);
    window.scrollTo(0, 0);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to clear all responses and start over?')) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(RESPONDENT_KEY);
      setResponses({});
      setRespondent('');
      setShowRespondentInput(true);
      setShowOutput(false);
    }
  };

  // Calculate completion progress
  const calculateProgress = () => {
    let completed = 0;
    const total = QUESTIONNAIRE_SECTIONS.length;

    QUESTIONNAIRE_SECTIONS.forEach(section => {
      let sectionComplete = false;

      if (section.isOpenEnded) {
        // Check if at least one question is answered
        sectionComplete = section.questions.some(
          q => responses[`${section.id}.${q.id}`]
        );
      } else if (section.type === 'ranking') {
        // Check if all ranking items have been rated
        const answeredCount = section.items.filter(
          item => responses[`${section.id}.${item.id}`]
        ).length;
        sectionComplete = answeredCount >= section.items.length / 2; // At least half answered
      } else if (section.subsections) {
        // Check if at least some items in subsections are answered
        let answeredCount = 0;
        section.subsections.forEach(subsection => {
          subsection.items.forEach(item => {
            if (responses[`${section.id}.${subsection.id}.${item.id}`]?.rating) {
              answeredCount++;
            }
          });
        });
        sectionComplete = answeredCount > 0;
      } else if (section.items) {
        // Check if at least some items are answered
        const answeredCount = section.items.filter(
          item => responses[`${section.id}.${item.id}`]?.rating
        ).length;
        sectionComplete = answeredCount > 0;
      }

      if (sectionComplete) completed++;
    });

    return { completed, total };
  };

  const { completed, total } = calculateProgress();

  // Respondent Name Input Screen
  if (showRespondentInput) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Food Preferences Questionnaire
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            Let's build your personalized food profile!
          </p>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What's your name?
            </label>
            <input
              type="text"
              value={respondent}
              onChange={(e) => setRespondent(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleStartQuestionnaire(respondent);
                }
              }}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>

          <button
            onClick={() => handleStartQuestionnaire(respondent)}
            disabled={!respondent.trim()}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Start Questionnaire
          </button>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> Your responses are automatically saved to your browser.
              You can return anytime to continue where you left off!
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Output Page
  if (showOutput) {
    return (
      <OutputPage
        responses={responses}
        respondent={respondent}
        onBack={handleBackToQuestionnaire}
      />
    );
  }

  // Main Questionnaire
  return (
    <div className="min-h-screen bg-gray-50">
      <ProgressBar completed={completed} total={total} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {respondent}'s Food Preferences
          </h1>
          <p className="text-gray-600 mb-4">
            Answer as many questions as you'd like. Your progress is automatically saved!
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              View Results & Export
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Clear All & Start Over
            </button>
          </div>
        </div>

        {/* Questionnaire Sections */}
        <div className="space-y-4">
          {QUESTIONNAIRE_SECTIONS.map(section => {
            // Check if section is complete
            let isComplete = false;

            if (section.isOpenEnded) {
              isComplete = section.questions.some(
                q => responses[`${section.id}.${q.id}`]
              );
            } else if (section.type === 'ranking') {
              const answeredCount = section.items.filter(
                item => responses[`${section.id}.${item.id}`]
              ).length;
              isComplete = answeredCount >= section.items.length / 2;
            } else if (section.subsections) {
              let answeredCount = 0;
              section.subsections.forEach(subsection => {
                subsection.items.forEach(item => {
                  if (responses[`${section.id}.${subsection.id}.${item.id}`]?.rating) {
                    answeredCount++;
                  }
                });
              });
              isComplete = answeredCount > 0;
            } else if (section.items) {
              const answeredCount = section.items.filter(
                item => responses[`${section.id}.${item.id}`]?.rating
              ).length;
              isComplete = answeredCount > 0;
            }

            return (
              <QuestionSection
                key={section.id}
                section={section}
                responses={responses}
                onResponseChange={handleResponseChange}
                isComplete={isComplete}
              />
            );
          })}
        </div>

        {/* Bottom Submit Button */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Ready to see your results?
          </h2>
          <p className="text-gray-600 mb-4">
            You can submit anytime - even if you haven't answered everything!
          </p>
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-lg"
          >
            Submit & View Results
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
