export const generateProfile = (responses, respondent) => {
  const profile = {
    topFavorites: {
      proteins: [],
      vegetables: [],
      fruits: [],
      snacks: [],
      breakfast: [],
      beverages: []
    },
    preparationPreferences: {},
    neverBuy: [],
    brandSpecifics: [],
    dietaryNotes: {}
  };

  const getItemLabel = (key) => {
    const parts = key.split('.');
    const itemId = parts[parts.length - 1];
    return itemId.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  };

  Object.entries(responses).forEach(([key, value]) => {
    const parts = key.split('.');
    const section = parts[0];
    const label = getItemLabel(key);

    // Collect "Love It" items by category
    if (value.rating === 'Love It') {
      if (section === 'proteins') {
        profile.topFavorites.proteins.push(label);

        // Add preparation preferences
        if (value.followUpData && value.followUpData.length > 0) {
          profile.preparationPreferences[label] = value.followUpData.join(', ');
        }
      } else if (section === 'vegetables') {
        let vegLabel = label;
        if (value.followUpData && value.followUpData.length > 0) {
          vegLabel += ` (${value.followUpData.join(', ')})`;
        }
        profile.topFavorites.vegetables.push(vegLabel);
      } else if (section === 'fruits') {
        let fruitLabel = label;
        if (value.followUpData && value.followUpData.length > 0) {
          fruitLabel += ` (${value.followUpData.join(', ')})`;
        }
        profile.topFavorites.fruits.push(fruitLabel);
      } else if (section === 'snacks') {
        if (value.followUpData) {
          profile.topFavorites.snacks.push(`${label}: ${value.followUpData}`);
        } else {
          profile.topFavorites.snacks.push(label);
        }
      } else if (section === 'breakfast') {
        if (value.followUpData) {
          if (Array.isArray(value.followUpData)) {
            profile.topFavorites.breakfast.push(`${label} (${value.followUpData.join(', ')})`);
          } else {
            profile.topFavorites.breakfast.push(`${label}: ${value.followUpData}`);
          }
        } else {
          profile.topFavorites.breakfast.push(label);
        }
      } else if (section === 'beverages') {
        if (value.followUpData && value.followUpData.length > 0) {
          profile.topFavorites.beverages.push(`${label} (${value.followUpData.join(', ')})`);
        } else {
          profile.topFavorites.beverages.push(label);
        }
      }
    }

    // Collect "Like It" items for brand specifics
    if ((value.rating === 'Love It' || value.rating === 'Like It') && value.followUpData) {
      if (section === 'snacks' || section === 'breakfast' || section === 'treats') {
        if (typeof value.followUpData === 'string' && value.followUpData.trim()) {
          profile.brandSpecifics.push(`${label}: ${value.followUpData}`);
        }
      }
    }

    // Collect "Don't Like" items
    if (value.rating === "Don't Like") {
      profile.neverBuy.push(label);
    }
  });

  // Collect dietary notes
  if (responses['dietary.dont_buy']) {
    profile.dietaryNotes.dontBuy = responses['dietary.dont_buy'];
  }
  if (responses['dietary.want_more']) {
    profile.dietaryNotes.wantMore = responses['dietary.want_more'];
  }
  if (responses['dietary.allergies']) {
    profile.dietaryNotes.allergies = responses['dietary.allergies'];
  }
  if (responses['dietary.organic_brands']) {
    profile.dietaryNotes.organicBrands = responses['dietary.organic_brands'];
  }
  if (responses['dietary.meal_prep']) {
    profile.dietaryNotes.mealPrep = responses['dietary.meal_prep'];
  }
  if (responses['dietary.snack_timing']) {
    profile.dietaryNotes.snackTiming = responses['dietary.snack_timing'];
  }

  return profile;
};
