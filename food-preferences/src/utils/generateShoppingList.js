export const generateShoppingList = (responses, respondent) => {
  const categories = {
    PRODUCE: [],
    'MEAT/PROTEIN': [],
    DAIRY: [],
    PANTRY: [],
    SNACKS: [],
    BEVERAGES: [],
    BREAKFAST: [],
    'TREATS/DESSERTS': []
  };

  const parseKey = (key) => {
    const parts = key.split('.');
    return {
      section: parts[0],
      subsection: parts.length === 3 ? parts[1] : null,
      item: parts[parts.length - 1]
    };
  };

  const getItemLabel = (key) => {
    const parts = key.split('.');
    const itemId = parts[parts.length - 1];
    return itemId.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const formatDetails = (value) => {
    if (!value) return '';

    if (value.followUpData) {
      if (Array.isArray(value.followUpData)) {
        return ` (${value.followUpData.join(', ')})`;
      }
      return ` (${value.followUpData})`;
    }
    return '';
  };

  Object.entries(responses).forEach(([key, value]) => {
    const { section, item } = parseKey(key);
    const label = getItemLabel(key);
    const details = formatDetails(value);

    // Vegetables -> PRODUCE
    if (section === 'vegetables') {
      if (value.rating === 'Love It') {
        categories.PRODUCE.push({ type: 'always', item: label + details, respondent });
      } else if (value.rating === 'Like It' || value.rating === "It's OK") {
        categories.PRODUCE.push({ type: 'sometimes', item: label + details, respondent });
      } else if (value.rating === "Don't Like") {
        categories.PRODUCE.push({ type: 'never', item: label, respondent });
      }
    }

    // Fruits -> PRODUCE
    if (section === 'fruits') {
      if (value.rating === 'Love It') {
        categories.PRODUCE.push({ type: 'always', item: label + details, respondent });
      } else if (value.rating === 'Like It' || value.rating === "It's OK") {
        categories.PRODUCE.push({ type: 'sometimes', item: label + details, respondent });
      } else if (value.rating === "Don't Like") {
        categories.PRODUCE.push({ type: 'never', item: label, respondent });
      }
    }

    // Proteins -> MEAT/PROTEIN
    if (section === 'proteins') {
      if (value.rating === 'Love It') {
        categories['MEAT/PROTEIN'].push({ type: 'always', item: label + details, respondent });
      } else if (value.rating === 'Like It' || value.rating === "It's OK") {
        categories['MEAT/PROTEIN'].push({ type: 'sometimes', item: label + details, respondent });
      } else if (value.rating === "Don't Like") {
        categories['MEAT/PROTEIN'].push({ type: 'never', item: label, respondent });
      }
    }

    // Beverages -> BEVERAGES
    if (section === 'beverages') {
      if (value.rating === 'Love It') {
        categories.BEVERAGES.push({ type: 'always', item: label + details, respondent });
      } else if (value.rating === 'Like It' || value.rating === "It's OK") {
        categories.BEVERAGES.push({ type: 'sometimes', item: label + details, respondent });
      } else if (value.rating === "Don't Like") {
        categories.BEVERAGES.push({ type: 'never', item: label, respondent });
      }
    }

    // Breakfast -> BREAKFAST
    if (section === 'breakfast') {
      if (value.rating === 'Love It') {
        categories.BREAKFAST.push({ type: 'always', item: label + details, respondent });
      } else if (value.rating === 'Like It' || value.rating === "It's OK") {
        categories.BREAKFAST.push({ type: 'sometimes', item: label + details, respondent });
      } else if (value.rating === "Don't Like") {
        categories.BREAKFAST.push({ type: 'never', item: label, respondent });
      }
    }

    // Snacks -> SNACKS
    if (section === 'snacks') {
      if (value.rating === 'Love It') {
        categories.SNACKS.push({ type: 'always', item: label + details, respondent });
      } else if (value.rating === 'Like It' || value.rating === "It's OK") {
        categories.SNACKS.push({ type: 'sometimes', item: label + details, respondent });
      } else if (value.rating === "Don't Like") {
        categories.SNACKS.push({ type: 'never', item: label, respondent });
      }
    }

    // Pantry -> PANTRY
    if (section === 'pantry') {
      if (value.rating === 'Yes') {
        categories.PANTRY.push({ type: 'always', item: label + details, respondent });
      } else if (value.rating === 'Sometimes') {
        categories.PANTRY.push({ type: 'sometimes', item: label + details, respondent });
      } else if (value.rating === 'No') {
        categories.PANTRY.push({ type: 'never', item: label, respondent });
      }
    }

    // Treats -> TREATS/DESSERTS
    if (section === 'treats') {
      if (value.rating === 'Love It') {
        categories['TREATS/DESSERTS'].push({ type: 'always', item: label + details, respondent });
      } else if (value.rating === 'Like It' || value.rating === "It's OK") {
        categories['TREATS/DESSERTS'].push({ type: 'sometimes', item: label + details, respondent });
      } else if (value.rating === "Don't Like") {
        categories['TREATS/DESSERTS'].push({ type: 'never', item: label, respondent });
      }
    }

    // Yogurt from snacks or breakfast -> DAIRY
    if ((section === 'snacks' || section === 'breakfast') &&
        (item === 'yogurt' || item === 'yogurt_snack')) {
      if (value.rating === 'Love It' || value.rating === 'Like It') {
        // Check if not already added
        const exists = categories.DAIRY.some(d => d.item.toLowerCase().includes('yogurt'));
        if (!exists) {
          categories.DAIRY.push({ type: 'always', item: 'Yogurt' + details, respondent });
        }
      }
    }

    // Milk -> DAIRY
    if (section === 'beverages' && item === 'milk') {
      if (value.rating === 'Love It' || value.rating === 'Like It') {
        categories.DAIRY.push({ type: 'always', item: 'Milk' + details, respondent });
      }
    }

    // Cheese -> DAIRY
    if (item === 'string_cheese') {
      if (value.rating === 'Love It' || value.rating === 'Like It') {
        categories.DAIRY.push({ type: 'always', item: 'String cheese', respondent });
      }
    }
  });

  return categories;
};
