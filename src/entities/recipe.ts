export enum RecipeDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export enum RecipeIngredientUnit {
  GRAMS = 'g',
  MILLILITERS = 'ml',
  CUPS = 'cups',
  TABLESPOONS = 'tbsp',
  TEASPOONS = 'tsp',
  PIECES = 'pcs',
}

export interface RecipeIngredient {
  name: string;
  quantity: number;
  unit: RecipeIngredientUnit;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  difficulty: RecipeDifficulty;

  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;

  photoUrl: string;

  tags: string[];

  ingredients: RecipeIngredient[];

  instructions: string[];

  createdAt: string;
  updatedAt: string | null;

  isFavorite: boolean;
}
