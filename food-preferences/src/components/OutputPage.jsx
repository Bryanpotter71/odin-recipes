import { useState } from 'react';
import { generateShoppingList } from '../utils/generateShoppingList';
import { generateProfile } from '../utils/generateProfile';
import { generateMealIdeas } from '../utils/generateMealIdeas';
import { exportToPDF } from '../utils/pdfExport';
import { DATA_VERSION } from '../constants/questionnaireData';

const OutputPage = ({ responses, respondent, onBack }) => {
  const [activeTab, setActiveTab] = useState('shopping');

  const shoppingList = generateShoppingList(responses, respondent);
  const profile = generateProfile(responses, respondent);
  const mealIdeas = generateMealIdeas(responses, respondent);

  const handleDownloadJSON = () => {
    const data = {
      version: DATA_VERSION,
      timestamp: new Date().toISOString(),
      respondent,
      responses
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${respondent}-food-preferences.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = () => {
    exportToPDF(shoppingList, profile, mealIdeas, respondent);
  };

  const handleCopyToClipboard = async () => {
    const text = generateTextOutput(shoppingList, profile, mealIdeas, respondent);
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Failed to copy to clipboard');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const generateTextOutput = (shoppingList, profile, mealIdeas, respondent) => {
    let text = `${respondent.toUpperCase()}'S FOOD PREFERENCES\n\n`;
    text += '=' .repeat(50) + '\n\n';

    // Shopping List
    text += 'SHOPPING LIST\n';
    text += '-'.repeat(50) + '\n\n';

    Object.entries(shoppingList).forEach(([category, items]) => {
      if (items.length === 0) return;

      text += `${category}:\n`;

      const always = items.filter(i => i.type === 'always');
      const sometimes = items.filter(i => i.type === 'sometimes');
      const never = items.filter(i => i.type === 'never');

      if (always.length > 0) {
        text += '  ✓ Always Buy:\n';
        always.forEach(item => {
          text += `    - ${item.item}\n`;
        });
      }

      if (sometimes.length > 0) {
        text += '  ✓ Sometimes Buy:\n';
        sometimes.forEach(item => {
          text += `    - ${item.item}\n`;
        });
      }

      if (never.length > 0) {
        text += '  ✗ Never Buy:\n';
        never.forEach(item => {
          text += `    - ${item.item}\n`;
        });
      }

      text += '\n';
    });

    // Preference Profile
    text += '\n' + '='.repeat(50) + '\n\n';
    text += 'PREFERENCE PROFILE\n';
    text += '-'.repeat(50) + '\n\n';

    text += 'TOP FAVORITES:\n';
    Object.entries(profile.topFavorites).forEach(([category, items]) => {
      if (items.length > 0) {
        text += `  ${category.charAt(0).toUpperCase() + category.slice(1)}: ${items.join(', ')}\n`;
      }
    });

    if (Object.keys(profile.preparationPreferences).length > 0) {
      text += '\nPREPARATION PREFERENCES:\n';
      Object.entries(profile.preparationPreferences).forEach(([item, preps]) => {
        text += `  ${item}: ${preps}\n`;
      });
    }

    if (profile.neverBuy.length > 0) {
      text += '\nNEVER BUY:\n';
      text += `  ${profile.neverBuy.join(', ')}\n`;
    }

    if (profile.brandSpecifics.length > 0) {
      text += '\nBRAND/FLAVOR SPECIFICS:\n';
      profile.brandSpecifics.forEach(item => {
        text += `  - ${item}\n`;
      });
    }

    if (Object.keys(profile.dietaryNotes).length > 0) {
      text += '\nDIETARY NOTES:\n';
      Object.entries(profile.dietaryNotes).forEach(([key, value]) => {
        if (value) {
          const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          text += `  ${label}: ${value}\n`;
        }
      });
    }

    // Meal Ideas
    text += '\n' + '='.repeat(50) + '\n\n';
    text += 'MEAL IDEAS\n';
    text += '-'.repeat(50) + '\n\n';

    mealIdeas.forEach((meal, index) => {
      text += `${index + 1}. ${meal.name}\n`;
      text += `   Uses: ${meal.uses.join(', ')}\n`;
      if (meal.prep) {
        text += `   Prep: ${meal.prep}\n`;
      }
      text += '\n';
    });

    return text;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header with Export Options */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 no-print">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {respondent}'s Food Preferences Summary
          </h1>

          <div className="flex flex-wrap gap-3 mb-4">
            <button
              onClick={handleDownloadPDF}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Download PDF
            </button>
            <button
              onClick={handleDownloadJSON}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Download JSON
            </button>
            <button
              onClick={handleCopyToClipboard}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Copy to Clipboard
            </button>
            <button
              onClick={handlePrint}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Print
            </button>
            <button
              onClick={onBack}
              className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-medium"
            >
              Back to Questionnaire
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('shopping')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'shopping'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Shopping List
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'profile'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Preference Profile
              </button>
              <button
                onClick={() => setActiveTab('meals')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'meals'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Meal Ideas
              </button>
            </div>
          </div>
        </div>

        {/* Shopping List Tab */}
        {activeTab === 'shopping' && (
          <div className="bg-white rounded-lg shadow-md p-6 print-break-inside-avoid">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Shopping List</h2>

            {Object.entries(shoppingList).map(([category, items]) => {
              if (items.length === 0) return null;

              const always = items.filter(i => i.type === 'always');
              const sometimes = items.filter(i => i.type === 'sometimes');
              const never = items.filter(i => i.type === 'never');

              return (
                <div key={category} className="mb-6 print-break-inside-avoid">
                  <h3 className="text-lg font-bold text-gray-700 mb-3 border-b pb-2">
                    {category}
                  </h3>

                  {always.length > 0 && (
                    <div className="mb-3">
                      <p className="font-semibold text-green-700 mb-2">✓ Always Buy:</p>
                      <ul className="ml-6 space-y-1">
                        {always.map((item, idx) => (
                          <li key={idx} className="text-gray-700">
                            - {item.item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {sometimes.length > 0 && (
                    <div className="mb-3">
                      <p className="font-semibold text-blue-700 mb-2">✓ Sometimes Buy:</p>
                      <ul className="ml-6 space-y-1">
                        {sometimes.map((item, idx) => (
                          <li key={idx} className="text-gray-700">
                            - {item.item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {never.length > 0 && (
                    <div className="mb-3">
                      <p className="font-semibold text-red-700 mb-2">✗ Never Buy:</p>
                      <ul className="ml-6 space-y-1">
                        {never.map((item, idx) => (
                          <li key={idx} className="text-gray-700">
                            - {item.item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Preference Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {respondent}'s Preference Profile
            </h2>

            <div className="space-y-6">
              {/* Top Favorites */}
              <div className="print-break-inside-avoid">
                <h3 className="text-lg font-bold text-gray-700 mb-3 border-b pb-2">
                  TOP FAVORITES
                </h3>
                {Object.entries(profile.topFavorites).map(([category, items]) => {
                  if (items.length === 0) return null;
                  return (
                    <div key={category} className="mb-3">
                      <p className="font-semibold text-gray-700 capitalize">
                        {category}:
                      </p>
                      <p className="ml-4 text-gray-600">{items.join(', ')}</p>
                    </div>
                  );
                })}
              </div>

              {/* Preparation Preferences */}
              {Object.keys(profile.preparationPreferences).length > 0 && (
                <div className="print-break-inside-avoid">
                  <h3 className="text-lg font-bold text-gray-700 mb-3 border-b pb-2">
                    PREPARATION PREFERENCES
                  </h3>
                  {Object.entries(profile.preparationPreferences).map(([item, preps]) => (
                    <div key={item} className="mb-2">
                      <p className="text-gray-700">
                        <span className="font-semibold">{item}:</span> {preps}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Never Buy */}
              {profile.neverBuy.length > 0 && (
                <div className="print-break-inside-avoid">
                  <h3 className="text-lg font-bold text-gray-700 mb-3 border-b pb-2">
                    NEVER BUY
                  </h3>
                  <p className="text-gray-700 ml-4">{profile.neverBuy.join(', ')}</p>
                </div>
              )}

              {/* Brand Specifics */}
              {profile.brandSpecifics.length > 0 && (
                <div className="print-break-inside-avoid">
                  <h3 className="text-lg font-bold text-gray-700 mb-3 border-b pb-2">
                    BRAND/FLAVOR SPECIFICS
                  </h3>
                  <ul className="ml-6 space-y-1">
                    {profile.brandSpecifics.map((item, idx) => (
                      <li key={idx} className="text-gray-700">
                        - {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Dietary Notes */}
              {Object.keys(profile.dietaryNotes).length > 0 && (
                <div className="print-break-inside-avoid">
                  <h3 className="text-lg font-bold text-gray-700 mb-3 border-b pb-2">
                    DIETARY NOTES
                  </h3>
                  {Object.entries(profile.dietaryNotes).map(([key, value]) => {
                    if (!value) return null;
                    const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                    return (
                      <div key={key} className="mb-3">
                        <p className="font-semibold text-gray-700">{label}:</p>
                        <p className="ml-4 text-gray-600">{value}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Meal Ideas Tab */}
        {activeTab === 'meals' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Meal Possibilities with {respondent}'s Favorites
            </h2>

            {mealIdeas.length === 0 ? (
              <p className="text-gray-600">
                Complete more sections to generate personalized meal ideas!
              </p>
            ) : (
              <div className="space-y-4">
                {mealIdeas.map((meal, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-blue-500 pl-4 py-2 print-break-inside-avoid"
                  >
                    <h3 className="font-bold text-gray-800 text-lg">
                      {index + 1}. {meal.name}
                    </h3>
                    <p className="text-gray-600">
                      <span className="font-semibold">Uses:</span> {meal.uses.join(', ')}
                    </p>
                    {meal.prep && (
                      <p className="text-gray-600 text-sm">
                        <span className="font-semibold">Prep:</span> {meal.prep}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPage;
