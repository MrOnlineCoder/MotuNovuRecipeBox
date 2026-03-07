import {
  RecipeDifficulty,
  RecipeIngredientUnit,
  type Recipe,
} from '@/entities/recipe';
import { delayedReturn } from '@/utils/delay';

const MOCK_RECIPES: Recipe[] = [
  {
    name: 'Spaghetti alla Carbonara ',
    description: 'Iconic Roman dish - creamy and flavorful, no cream!',
    cuisine: 'Italian',
    difficulty: RecipeDifficulty.MEDIUM,
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    tags: ['pasta', 'roman', 'comfort food', 'quick'],
    photoUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3',
    ingredients: [
      {
        name: 'Spaghetti',
        quantity: 400,
        unit: RecipeIngredientUnit.GRAMS,
      },
      {
        name: 'Guanciale',
        quantity: 150,
        unit: RecipeIngredientUnit.GRAMS,
      },
      {
        name: 'Eggs',
        quantity: 4,
        unit: RecipeIngredientUnit.PIECES,
      },
      {
        name: 'Pecorino Romano DOP',
        quantity: 100,
        unit: RecipeIngredientUnit.GRAMS,
      },
      {
        name: 'Black pepper',
        quantity: 1,
        unit: RecipeIngredientUnit.TO_TASTE,
      },
    ],
    createdAt: new Date(2026, 2, 7).toISOString(),
    updatedAt: null,
    id: '1',
    instructions: [
      {
        text: 'Bring water to boil for pasta (salt when boiling)',
      },
      {
        text: 'Cut guanciale into strips and cook in pan until golden (no oil needed!)',
      },
      {
        text: 'In a bowl, beat eggs with grated pecorino and abundant black pepper',
      },
      {
        text: 'Cook spaghetti al dente, reserve 1 cup pasta water',
      },
      {
        text: 'Drain pasta and add to pan with guanciale (heat off!)',
      },
      {
        text: 'Add egg-pecorino mixture and mix quickly, adding pasta water for creaminess',
      },
      {
        text: 'Serve immediately with freshly ground black pepper and extra pecorino',
      },
    ],
    isFavorite: false,
    notes:
      'Secret - creaminess comes from egg-pecorino-pasta water emulsion, NOT cream! Heat must be off when adding eggs to avoid scrambling.',
  },
  {
    name: 'Classic Mac and Cheese',
    description:
      'The ultimate American comfort food - creamy, cheesy, perfect!',
    cuisine: 'American',
    difficulty: RecipeDifficulty.EASY,
    prepTime: 10,
    cookTime: 20,
    servings: 6,
    tags: ['comfort food', 'pasta', 'cheese', 'family favorite'],
    photoUrl: 'https://images.unsplash.com/photo-1543339494-b4cd4f7ba686',
    ingredients: [
      {
        name: 'Elbow macaroni',
        quantity: 450,
        unit: RecipeIngredientUnit.GRAMS,
      },
      {
        name: 'Butter',
        quantity: 60,
        unit: RecipeIngredientUnit.GRAMS,
      },
      {
        name: 'All-purpose flour',
        quantity: 60,
        unit: RecipeIngredientUnit.GRAMS,
      },
      {
        name: 'Whole milk',
        quantity: 700,
        unit: RecipeIngredientUnit.MILLILITERS,
      },
      {
        name: 'Sharp Cheddar cheese',
        quantity: 300,
        unit: RecipeIngredientUnit.GRAMS,
      },
      {
        name: 'Mozzarella',
        quantity: 150,
        unit: RecipeIngredientUnit.GRAMS,
      },
      {
        name: 'Dijon mustard',
        quantity: 1,
        unit: RecipeIngredientUnit.TEASPOONS,
      },
      {
        name: 'Paprika',
        quantity: 0.5,
        unit: RecipeIngredientUnit.TEASPOONS,
      },
      {
        name: 'Salt and pepper',
        quantity: 1,
        unit: RecipeIngredientUnit.TO_TASTE,
      },
      {
        name: 'Breadcrumbs',
        quantity: 50,
        unit: RecipeIngredientUnit.GRAMS,
      },
    ],
    createdAt: new Date(2026, 2, 8).toISOString(),
    updatedAt: null,
    id: '2',
    instructions: [
      {
        text: 'Cook macaroni according to package (1-2 min less for al dente). Drain and set aside',
      },
      {
        text: 'In same pot, melt butter over medium heat',
      },
      {
        text: 'Add flour and whisk for 1-2 minutes (roux) until slightly golden',
        timer: 2 * 60,
      },
      {
        text: 'Gradually pour in milk while whisking constantly to prevent lumps',
      },
      {
        text: 'Cook while stirring until thickened (5-7 min)',
        timer: 5 * 60,
      },
      {
        text: 'Reduce heat, add cheeses, mustard, paprika, salt and pepper. Stir until fully melted',
      },
      {
        text: 'Add macaroni to sauce and mix well',
      },
      {
        text: 'Transfer to baking dish, top with breadcrumbs and broil at 180°C for 15 min',
        timer: 15 * 60,
        isOptional: true,
      },
      {
        text: 'Serve hot with a sprinkle of paprika',
      },
    ],
    isFavorite: false,
    notes:
      'Pro tip - use freshly grated cheese, not pre-shredded (contains anti-caking agents that prevent optimal creaminess). For extra creaminess add a tablespoon of cream cheese.',
  },
  {
    name: 'Chicken Parmigiana',
    description:
      'Italian-American fusion - breaded chicken with marinara and melted mozzarella',
    cuisine: 'Italian-American',
    difficulty: RecipeDifficulty.MEDIUM,
    prepTime: 20,
    cookTime: 30,
    servings: 4,
    tags: [
      'chicken',
      'cheese',
      'italian-american',
      'comfort food',
      'weeknight dinner',
    ],
    photoUrl: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8',
    ingredients: [
      {
        name: 'Chicken breasts',
        quantity: 4,
        unit: RecipeIngredientUnit.PIECES,
      },
      {
        name: 'All-purpose flour',
        quantity: 100,
        unit: RecipeIngredientUnit.GRAMS,
      },
      {
        name: 'Eggs',
        quantity: 2,
        unit: RecipeIngredientUnit.PIECES,
      },
      {
        name: 'Breadcrumbs',
        quantity: 150,
        unit: RecipeIngredientUnit.GRAMS,
      },
      {
        name: 'Parmesan cheese',
        quantity: 50,
        unit: RecipeIngredientUnit.GRAMS,
      },
      {
        name: 'Fresh mozzarella',
        quantity: 250,
        unit: RecipeIngredientUnit.GRAMS,
      },
      {
        name: 'Marinara sauce',
        quantity: 500,
        unit: RecipeIngredientUnit.MILLILITERS,
      },
      {
        name: 'Fresh basil',
        quantity: 1,
        unit: RecipeIngredientUnit.TO_TASTE,
      },
      {
        name: 'Olive oil',
        quantity: 1,
        unit: RecipeIngredientUnit.TO_TASTE,
      },
      {
        name: 'Salt and pepper',
        quantity: 1,
        unit: RecipeIngredientUnit.TO_TASTE,
      },
    ],
    createdAt: new Date(2026, 2, 9).toISOString(),
    updatedAt: null,
    id: '3',
    instructions: [
      {
        text: 'Preheat oven to 200°C (400°F)',
      },
      {
        text: 'Prepare three dishes: flour, beaten eggs, breadcrumbs mixed with parmesan',
      },
      {
        text: 'Salt and pepper the pounded chicken breasts',
      },
      {
        text: 'Dredge each breast in: flour → eggs → breadcrumbs, pressing well',
      },
      {
        text: 'Heat oil in pan over medium-high heat and fry breasts 3-4 min per side until golden',
        timer: 2 * 4 * 60,
      },
      {
        text: 'Transfer breasts to baking dish, pour marinara sauce over them',
      },
      {
        text: 'Top each breast with mozzarella slices and sprinkle of parmesan',
      },
      {
        text: 'Bake for 15-20 min until cheese is melted and lightly golden',
        timer: 17 * 60,
      },
      {
        text: 'Garnish with fresh basil and serve with spaghetti or salad',
      },
    ],
    isFavorite: false,
    notes:
      'Light version - instead of frying, bake breaded breasts at 200°C for 20 min, flipping halfway, then proceed with sauce and cheese. For extra flavor add garlic powder and oregano to breadcrumbs.',
  },
];

export const recipesApi = {
  getList: () => delayedReturn(1000, () => MOCK_RECIPES),
};
