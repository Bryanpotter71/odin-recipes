export const generateMealIdeas = (responses, respondent) => {
  const favorites = {
    proteins: [],
    vegetables: [],
    grains: [],
    extras: []
  };

  const getItemLabel = (key) => {
    const parts = key.split('.');
    const itemId = parts[parts.length - 1];
    return itemId.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  };

  // Collect favorites
  Object.entries(responses).forEach(([key, value]) => {
    const parts = key.split('.');
    const section = parts[0];
    const item = parts[parts.length - 1];
    const label = getItemLabel(key);

    if (value.rating === 'Love It' || value.rating === 'Like It') {
      if (section === 'proteins') {
        favorites.proteins.push({ name: label, item, preps: value.followUpData || [] });
      } else if (section === 'vegetables') {
        favorites.vegetables.push({ name: label, item });
      } else if (section === 'pantry' && (item === 'rice' || item === 'pasta')) {
        favorites.grains.push({ name: label, item, type: value.followUpData });
      }
    }

    if ((value.rating === 'Love It' || value.rating === 'Like It') && section === 'pantry') {
      if (item === 'tortillas' || item === 'bread_pantry') {
        favorites.extras.push({ name: label, item, type: value.followUpData });
      }
    }
  });

  // Generate meal ideas based on favorites
  const meals = [];

  // Helper function to check if item exists
  const hasProtein = (name) => favorites.proteins.some(p => p.item.includes(name));
  const hasVegetable = (name) => favorites.vegetables.some(v => v.item.includes(name));
  const hasGrain = (name) => favorites.grains.some(g => g.item.includes(name));

  // Chicken-based meals
  if (hasProtein('chicken')) {
    const chicken = favorites.proteins.find(p => p.item.includes('chicken'));
    const preps = chicken?.preps || [];

    if (hasVegetable('bell_pepper') && hasVegetable('onion')) {
      if (preps.includes('Grilled') || preps.includes('Pan-seared')) {
        meals.push({
          name: 'Chicken Fajitas',
          uses: ['Chicken', 'Bell peppers', 'Onions', 'Tortillas'],
          prep: 'Grilled/Pan-seared'
        });
      }
    }

    if (hasVegetable('broccoli') && hasGrain('rice')) {
      meals.push({
        name: 'Chicken and Broccoli Stir-Fry',
        uses: ['Chicken', 'Broccoli', 'Rice'],
        prep: 'Pan-seared'
      });
    }

    if (hasGrain('pasta')) {
      meals.push({
        name: 'Chicken Pasta',
        uses: ['Chicken', 'Pasta', 'Pasta sauce'],
        prep: 'Baked/Pan-seared'
      });
    }

    if (hasVegetable('brussels_sprout') || hasVegetable('carrot')) {
      if (preps.includes('Roasted') || preps.includes('Baked')) {
        meals.push({
          name: 'Roasted Chicken with Vegetables',
          uses: ['Chicken', 'Roasted vegetables (Brussels sprouts, carrots, potatoes)'],
          prep: 'Roasted/Baked'
        });
      }
    }
  }

  // Turkey-based meals
  if (hasProtein('ground_turkey')) {
    if (hasVegetable('bell_pepper') && hasVegetable('onion')) {
      meals.push({
        name: 'Turkey Tacos',
        uses: ['Ground turkey', 'Bell peppers', 'Onions', 'Tortillas'],
        prep: 'Pan-seared'
      });
    }

    if (hasGrain('pasta')) {
      meals.push({
        name: 'Turkey Pasta Bake',
        uses: ['Ground turkey', 'Pasta', 'Pasta sauce', 'Cheese'],
        prep: 'Baked'
      });
    }
  }

  // Beef-based meals
  if (hasProtein('ground_beef')) {
    if (hasVegetable('tomato') && hasGrain('pasta')) {
      meals.push({
        name: 'Spaghetti and Meat Sauce',
        uses: ['Ground beef', 'Pasta', 'Tomatoes', 'Pasta sauce'],
        prep: 'Stovetop'
      });
    }

    if (hasVegetable('bell_pepper') && hasVegetable('onion')) {
      meals.push({
        name: 'Beef Tacos',
        uses: ['Ground beef', 'Bell peppers', 'Onions', 'Tortillas'],
        prep: 'Pan-seared'
      });
    }
  }

  // Egg-based meals
  if (hasProtein('eggs')) {
    if (hasVegetable('bell_pepper') && hasVegetable('onion')) {
      meals.push({
        name: 'Veggie Omelet',
        uses: ['Eggs', 'Bell peppers', 'Onions', 'Cheese'],
        prep: 'Pan-seared'
      });
    }

    meals.push({
      name: 'Breakfast Scramble',
      uses: ['Eggs', 'Vegetables', 'Cheese'],
      prep: 'Pan-seared'
    });
  }

  // Fish-based meals
  if (hasProtein('fish')) {
    if (hasVegetable('asparagus') || hasVegetable('green_bean')) {
      meals.push({
        name: 'Baked Fish with Green Vegetables',
        uses: ['Fish', 'Asparagus/Green beans', 'Lemon'],
        prep: 'Baked'
      });
    }

    if (hasGrain('rice')) {
      meals.push({
        name: 'Fish and Rice Bowl',
        uses: ['Fish', 'Rice', 'Vegetables'],
        prep: 'Grilled/Baked'
      });
    }
  }

  // Vegetarian options
  if (hasVegetable('zucchini') && hasVegetable('tomato') && hasGrain('pasta')) {
    meals.push({
      name: 'Vegetable Pasta Primavera',
      uses: ['Pasta', 'Zucchini', 'Tomatoes', 'Bell peppers'],
      prep: 'Stovetop'
    });
  }

  // Rice bowls
  if (hasGrain('rice')) {
    const veggies = favorites.vegetables.slice(0, 3).map(v => v.name).join(', ');
    if (veggies) {
      meals.push({
        name: 'Rice Bowl with Roasted Vegetables',
        uses: ['Rice', veggies],
        prep: 'Roasted/Stovetop'
      });
    }
  }

  // Salad options
  if (hasVegetable('lettuce') || hasVegetable('spinach')) {
    const protein = favorites.proteins[0]?.name || 'Protein';
    meals.push({
      name: `${protein} Salad`,
      uses: [protein, 'Lettuce/Spinach', 'Vegetables', 'Dressing'],
      prep: 'Grilled protein'
    });
  }

  // Sheet pan meals
  if (favorites.proteins.length > 0 && favorites.vegetables.length >= 2) {
    const protein = favorites.proteins[0].name;
    const veggies = favorites.vegetables.slice(0, 3).map(v => v.name).join(', ');
    meals.push({
      name: 'Sheet Pan Dinner',
      uses: [protein, veggies],
      prep: 'Roasted'
    });
  }

  // Stir-fry options
  if (favorites.vegetables.length >= 2) {
    const protein = favorites.proteins.find(p => p.preps.includes('Pan-seared'))?.name || 'Chicken';
    meals.push({
      name: 'Stir-Fry',
      uses: [protein, 'Mixed vegetables', 'Rice or noodles'],
      prep: 'Pan-seared'
    });
  }

  // Soup options
  if (hasVegetable('carrot') && hasVegetable('celery')) {
    meals.push({
      name: 'Homemade Soup',
      uses: ['Chicken/Turkey', 'Carrots', 'Celery', 'Broth'],
      prep: 'Stovetop/Crockpot'
    });
  }

  // Limit to 15 meal ideas
  return meals.slice(0, 15);
};
