# Food Preferences Questionnaire - Phase 1

A comprehensive React-based food preferences questionnaire system designed to capture detailed household food preferences and generate actionable outputs for meal planning and shopping.

## Overview

This is Phase 1 of a household food operating system. The questionnaire captures preferences across 10 comprehensive sections and generates:

- Organized shopping lists by category
- Personalized preference profiles
- Meal ideas based on favorites
- Exportable data in multiple formats (PDF, JSON, plain text)

## Features

### 10 Comprehensive Sections

1. **Snacks** - Salty, Sweet, and Healthy snacks with brand preferences
2. **Proteins** - Various proteins with preparation method preferences
3. **Vegetables** - 18 common vegetables with variety preferences
4. **Fruits** - 14 fruits with variety preferences
5. **Breakfast Items** - Morning food preferences
6. **Beverages** - Drink preferences with customization options
7. **Pantry Staples** - Stock frequency for essential items
8. **Treats & Desserts** - Indulgence preferences and frequency
9. **Dietary Preferences** - Open-ended questions about restrictions and preferences
10. **Shopping Priorities** - Ranking of food shopping values

### Key Functionality

- **Auto-save**: Every answer is automatically saved to localStorage
- **Resume capability**: Close and return anytime - your progress is preserved
- **Conditional questions**: Follow-up questions appear based on your ratings
- **Progress tracking**: Visual progress bar shows completion status
- **Mobile-first design**: Fully responsive, works great on phones
- **Multiple export options**:
  - PDF download with formatted output
  - JSON data export for programmatic use
  - Copy to clipboard as formatted text
  - Print-friendly version

### Output Generation

The questionnaire generates three comprehensive sections:

1. **Shopping List** - Organized by store categories (Produce, Meat/Protein, Dairy, etc.)
   - Always Buy items (Love It ratings)
   - Sometimes Buy items (Like It / It's OK ratings)
   - Never Buy items (Don't Like ratings)

2. **Preference Profile** - Summary of:
   - Top favorites by category
   - Preparation preferences for proteins
   - Brand/flavor specifics
   - Dietary notes and restrictions

3. **Meal Ideas** - 10-15 personalized meal suggestions based on favorite ingredients

## Technology Stack

- **React** - UI framework with hooks
- **Tailwind CSS** - Utility-first styling
- **jsPDF** - PDF generation
- **Vite** - Build tool
- **localStorage** - Client-side data persistence

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Opens the app at `http://localhost:5173`

## Build

```bash
npm run build
```

Builds production-ready files to `/dist`

## Data Structure

The questionnaire uses a versioned JSON format:

```json
{
  "version": "1.0.0",
  "timestamp": "2024-11-10T17:30:00Z",
  "respondent": "Name",
  "responses": {
    "snacks.salty.chips": {
      "rating": "Love It",
      "followUpData": "Doritos Cool Ranch"
    },
    "proteins.chicken_breast": {
      "rating": "Love It",
      "followUpData": ["Grilled", "Baked"]
    }
  }
}
```

## File Structure

```
/src
  /components
    QuestionSection.jsx    - Accordion section wrapper
    QuestionItem.jsx       - Individual question component
    ProgressBar.jsx        - Progress indicator
    OutputPage.jsx         - Results display with tabs
  /utils
    generateShoppingList.js - Shopping list generation logic
    generateProfile.js      - Profile summary generation
    generateMealIdeas.js    - Meal suggestion algorithm
    pdfExport.js           - PDF export functionality
  /constants
    questionnaireData.js   - All section definitions and items
  App.jsx                  - Main application logic
  index.css                - Tailwind directives
```

## Future Phases

This data foundation will power:

- Weekly meal plan generation
- Automated shopping list creation
- Recipe suggestions based on preferences
- Preference tracking over time
- Multi-user household support

## License

Private project for household use.
