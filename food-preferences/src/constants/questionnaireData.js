export const RATING_OPTIONS = [
  'Love It',
  'Like It',
  "It's OK",
  "Don't Like",
  'Never Tried'
];

export const STOCK_OPTIONS = ['Yes', 'Sometimes', 'No'];

export const QUESTIONNAIRE_SECTIONS = [
  {
    id: 'snacks',
    title: 'Snacks',
    subsections: [
      {
        id: 'salty',
        title: 'Salty Snacks',
        items: [
          { id: 'chips', label: 'Chips', followUp: { type: 'text', label: 'What brands/flavors do you prefer?' } },
          { id: 'pretzels', label: 'Pretzels', followUp: { type: 'text', label: 'What brands/flavors do you prefer?' } },
          { id: 'popcorn', label: 'Popcorn', followUp: { type: 'text', label: 'What brands/flavors do you prefer?' } },
          { id: 'crackers', label: 'Crackers', followUp: { type: 'text', label: 'What brands/flavors do you prefer?' } },
          { id: 'nuts', label: 'Nuts', followUp: { type: 'text', label: 'What brands/flavors do you prefer?' } },
          { id: 'trail_mix', label: 'Trail mix', followUp: { type: 'text', label: 'What brands/flavors do you prefer?' } },
          { id: 'jerky', label: 'Jerky', followUp: { type: 'text', label: 'What brands/flavors do you prefer?' } }
        ]
      },
      {
        id: 'sweet',
        title: 'Sweet Snacks',
        items: [
          { id: 'chocolate', label: 'Chocolate', followUp: { type: 'text', label: 'What brands/flavors do you prefer?' } },
          { id: 'candy', label: 'Candy', followUp: { type: 'text', label: 'What brands/flavors do you prefer?' } },
          { id: 'cookies', label: 'Cookies', followUp: { type: 'text', label: 'What brands/flavors do you prefer?' } },
          { id: 'granola_bars', label: 'Granola bars', followUp: { type: 'text', label: 'What brands/flavors do you prefer?' } },
          { id: 'fruit_snacks', label: 'Fruit snacks', followUp: { type: 'text', label: 'What brands/flavors do you prefer?' } },
          { id: 'ice_cream_snack', label: 'Ice cream', followUp: { type: 'text', label: 'What brands/flavors do you prefer?' } }
        ]
      },
      {
        id: 'healthy',
        title: 'Healthy Snacks',
        items: [
          { id: 'fresh_fruit', label: 'Fresh fruit', followUp: { type: 'text', label: 'What brands/flavors do you prefer?' } },
          { id: 'veggies_dip', label: 'Veggies + dip', followUp: { type: 'text', label: 'What brands/flavors do you prefer?' } },
          { id: 'yogurt_snack', label: 'Yogurt', followUp: { type: 'text', label: 'What brands/flavors do you prefer?' } },
          { id: 'string_cheese', label: 'String cheese', followUp: { type: 'text', label: 'What brands/flavors do you prefer?' } },
          { id: 'hummus', label: 'Hummus', followUp: { type: 'text', label: 'What brands/flavors do you prefer?' } },
          { id: 'rice_cakes', label: 'Rice cakes', followUp: { type: 'text', label: 'What brands/flavors do you prefer?' } }
        ]
      }
    ]
  },
  {
    id: 'proteins',
    title: 'Proteins',
    items: [
      { id: 'chicken_breast', label: 'Chicken breast', followUp: { type: 'checkbox', label: 'How do you like it prepared?', options: ['Grilled', 'Roasted', 'Pan-seared', 'Baked', 'Crockpot', 'Other'] } },
      { id: 'chicken_thighs', label: 'Chicken thighs', followUp: { type: 'checkbox', label: 'How do you like it prepared?', options: ['Grilled', 'Roasted', 'Pan-seared', 'Baked', 'Crockpot', 'Other'] } },
      { id: 'ground_chicken', label: 'Ground chicken', followUp: { type: 'checkbox', label: 'How do you like it prepared?', options: ['Grilled', 'Roasted', 'Pan-seared', 'Baked', 'Crockpot', 'Other'] } },
      { id: 'turkey', label: 'Turkey', followUp: { type: 'checkbox', label: 'How do you like it prepared?', options: ['Grilled', 'Roasted', 'Pan-seared', 'Baked', 'Crockpot', 'Other'] } },
      { id: 'ground_turkey', label: 'Ground turkey', followUp: { type: 'checkbox', label: 'How do you like it prepared?', options: ['Grilled', 'Roasted', 'Pan-seared', 'Baked', 'Crockpot', 'Other'] } },
      { id: 'beef', label: 'Beef', followUp: { type: 'checkbox', label: 'How do you like it prepared?', options: ['Grilled', 'Roasted', 'Pan-seared', 'Baked', 'Crockpot', 'Other'] } },
      { id: 'ground_beef', label: 'Ground beef', followUp: { type: 'checkbox', label: 'How do you like it prepared?', options: ['Grilled', 'Roasted', 'Pan-seared', 'Baked', 'Crockpot', 'Other'] } },
      { id: 'pork_chops', label: 'Pork chops', followUp: { type: 'checkbox', label: 'How do you like it prepared?', options: ['Grilled', 'Roasted', 'Pan-seared', 'Baked', 'Crockpot', 'Other'] } },
      { id: 'bacon', label: 'Bacon', followUp: { type: 'checkbox', label: 'How do you like it prepared?', options: ['Grilled', 'Roasted', 'Pan-seared', 'Baked', 'Crockpot', 'Other'] } },
      { id: 'sausage', label: 'Sausage', followUp: { type: 'checkbox', label: 'How do you like it prepared?', options: ['Grilled', 'Roasted', 'Pan-seared', 'Baked', 'Crockpot', 'Other'] } },
      { id: 'fish_seafood', label: 'Fish/Seafood', followUp: { type: 'checkbox', label: 'How do you like it prepared?', options: ['Grilled', 'Roasted', 'Pan-seared', 'Baked', 'Crockpot', 'Other'] } },
      { id: 'eggs', label: 'Eggs', followUp: { type: 'checkbox', label: 'How do you like it prepared?', options: ['Grilled', 'Roasted', 'Pan-seared', 'Baked', 'Crockpot', 'Other'] } },
      { id: 'tofu', label: 'Tofu', followUp: { type: 'checkbox', label: 'How do you like it prepared?', options: ['Grilled', 'Roasted', 'Pan-seared', 'Baked', 'Crockpot', 'Other'] } }
    ]
  },
  {
    id: 'vegetables',
    title: 'Vegetables',
    items: [
      {
        id: 'bell_peppers',
        label: 'Bell peppers',
        followUp: {
          type: 'checkbox',
          label: 'Which colors?',
          options: ['Red', 'Yellow', 'Orange', 'Green', 'All']
        }
      },
      { id: 'onions', label: 'Onions' },
      { id: 'garlic', label: 'Garlic' },
      { id: 'tomatoes', label: 'Tomatoes' },
      { id: 'lettuce', label: 'Lettuce' },
      { id: 'spinach', label: 'Spinach' },
      { id: 'broccoli', label: 'Broccoli' },
      { id: 'cauliflower', label: 'Cauliflower' },
      { id: 'brussels_sprouts', label: 'Brussels sprouts' },
      { id: 'carrots', label: 'Carrots' },
      { id: 'celery', label: 'Celery' },
      { id: 'cucumbers', label: 'Cucumbers' },
      { id: 'zucchini', label: 'Zucchini' },
      { id: 'mushrooms', label: 'Mushrooms' },
      { id: 'corn', label: 'Corn' },
      {
        id: 'potatoes',
        label: 'Potatoes',
        followUp: {
          type: 'checkbox',
          label: 'Which type?',
          options: ['Russet', 'Red', 'Sweet', 'All']
        }
      },
      { id: 'green_beans', label: 'Green beans' },
      { id: 'asparagus', label: 'Asparagus' }
    ]
  },
  {
    id: 'fruits',
    title: 'Fruits',
    items: [
      {
        id: 'apples',
        label: 'Apples',
        followUp: {
          type: 'checkbox',
          label: 'Which varieties?',
          options: ['Honeycrisp', 'Granny Smith', 'Gala', 'Fuji', 'Other']
        }
      },
      { id: 'bananas', label: 'Bananas' },
      { id: 'oranges_clementines', label: 'Oranges/Clementines' },
      {
        id: 'grapes',
        label: 'Grapes',
        followUp: {
          type: 'checkbox',
          label: 'Which color?',
          options: ['Red', 'Green', 'Both']
        }
      },
      { id: 'strawberries', label: 'Strawberries' },
      { id: 'blueberries', label: 'Blueberries' },
      { id: 'raspberries', label: 'Raspberries' },
      { id: 'blackberries', label: 'Blackberries' },
      { id: 'watermelon', label: 'Watermelon' },
      { id: 'cantaloupe', label: 'Cantaloupe' },
      { id: 'honeydew', label: 'Honeydew' },
      { id: 'pineapple', label: 'Pineapple' },
      { id: 'mango', label: 'Mango' },
      { id: 'avocado', label: 'Avocado' }
    ]
  },
  {
    id: 'breakfast',
    title: 'Breakfast Items',
    items: [
      { id: 'cereal', label: 'Cereal', followUp: { type: 'text', label: 'What kinds/brands?' } },
      { id: 'oatmeal', label: 'Oatmeal' },
      {
        id: 'yogurt',
        label: 'Yogurt',
        followUp: {
          type: 'text',
          label: 'Greek or regular? Flavors?'
        }
      },
      { id: 'bagels', label: 'Bagels' },
      { id: 'english_muffins', label: 'English muffins' },
      {
        id: 'bread',
        label: 'Bread',
        followUp: {
          type: 'checkbox',
          label: 'What type?',
          options: ['White', 'Wheat', 'Sourdough', 'Multigrain', 'Other']
        }
      },
      { id: 'pancake_waffle_mix', label: 'Pancake/Waffle mix' },
      { id: 'eggs_breakfast', label: 'Eggs' },
      { id: 'breakfast_meats', label: 'Breakfast meats' },
      { id: 'breakfast_bars', label: 'Breakfast bars' }
    ]
  },
  {
    id: 'beverages',
    title: 'Beverages',
    items: [
      {
        id: 'coffee',
        label: 'Coffee',
        followUp: {
          type: 'checkbox',
          label: 'How do you take it?',
          options: ['Black', 'Cream', 'Sugar', 'Flavored', 'Other']
        }
      },
      {
        id: 'tea',
        label: 'Tea',
        followUp: {
          type: 'checkbox',
          label: 'What kinds?',
          options: ['Black', 'Green', 'Herbal', 'Iced', 'Other']
        }
      },
      {
        id: 'milk',
        label: 'Milk',
        followUp: {
          type: 'checkbox',
          label: 'What type?',
          options: ['Whole', '2%', 'Skim', 'Almond', 'Oat', 'Other']
        }
      },
      { id: 'juice', label: 'Juice' },
      { id: 'soda', label: 'Soda' },
      { id: 'sparkling_water', label: 'Sparkling water' },
      { id: 'sports_drinks', label: 'Sports drinks' },
      { id: 'energy_drinks', label: 'Energy drinks' }
    ]
  },
  {
    id: 'pantry',
    title: 'Pantry Staples',
    useStockOptions: true,
    items: [
      {
        id: 'rice',
        label: 'Rice',
        followUp: {
          type: 'checkbox',
          label: 'What type?',
          options: ['White', 'Brown', 'Jasmine', 'Basmati', 'Other']
        }
      },
      {
        id: 'pasta',
        label: 'Pasta',
        followUp: {
          type: 'checkbox',
          label: 'What shapes?',
          options: ['Penne', 'Spaghetti', 'Fettuccine', 'Shells', 'Other']
        }
      },
      { id: 'pasta_sauce', label: 'Pasta sauce' },
      { id: 'canned_beans', label: 'Canned beans' },
      { id: 'canned_tomatoes', label: 'Canned tomatoes' },
      { id: 'broth_stock', label: 'Broth/Stock' },
      { id: 'olive_oil', label: 'Olive oil' },
      { id: 'cooking_spray', label: 'Cooking spray' },
      { id: 'spices', label: 'Spices' },
      { id: 'flour', label: 'Flour' },
      { id: 'bread_pantry', label: 'Bread' },
      {
        id: 'tortillas',
        label: 'Tortillas',
        followUp: {
          type: 'checkbox',
          label: 'What kind?',
          options: ['Flour', 'Corn', 'Both']
        }
      }
    ]
  },
  {
    id: 'treats',
    title: 'Treats & Desserts',
    items: [
      { id: 'ice_cream', label: 'Ice cream', followUp: { type: 'text', label: 'Favorite flavors?' } },
      { id: 'frozen_desserts', label: 'Frozen desserts' },
      { id: 'bakery_items', label: 'Bakery items' },
      { id: 'pie', label: 'Pie' },
      { id: 'candy_treats', label: 'Candy' },
      { id: 'chocolate_treats', label: 'Chocolate' }
    ],
    additionalQuestions: [
      {
        id: 'treat_frequency',
        type: 'radio',
        label: 'How often do you want treats in the house?',
        options: ['Always', 'Weekly', 'Special occasions', 'Rarely']
      }
    ]
  },
  {
    id: 'dietary',
    title: 'Dietary Preferences',
    isOpenEnded: true,
    questions: [
      { id: 'dont_buy', label: 'Any foods you absolutely DON\'T want me to buy?', type: 'textarea' },
      { id: 'want_more', label: 'Any foods you wish we had MORE often?', type: 'textarea' },
      { id: 'allergies', label: 'Any allergies or foods that don\'t agree with you?', type: 'textarea' },
      { id: 'organic_brands', label: 'Do you prefer organic/specific brands for anything?', type: 'textarea' },
      { id: 'meal_prep', label: 'Meal prep preferences: Do you like leftovers? How many days is too many for the same meal?', type: 'textarea' },
      { id: 'snack_timing', label: 'Snack timing: Do you prefer having snacks available for work? After dinner? Anytime?', type: 'textarea' }
    ]
  },
  {
    id: 'priorities',
    title: 'Shopping Priorities',
    type: 'ranking',
    instructions: 'Rank from 1-5, where 1 = most important',
    items: [
      { id: 'healthy_snacks', label: 'Having healthy snack options available' },
      { id: 'quick_meals', label: 'Having quick/easy meal components ready' },
      { id: 'treats', label: 'Having treat/indulgent foods for relaxation' },
      { id: 'new_foods', label: 'Trying new foods/recipes together' },
      { id: 'familiar_favorites', label: 'Sticking to familiar favorites' }
    ],
    finalQuestion: {
      id: 'good_food_house',
      label: 'What would make you feel like we have a "good food house"?',
      type: 'textarea'
    }
  }
];

export const DATA_VERSION = '1.0.0';
