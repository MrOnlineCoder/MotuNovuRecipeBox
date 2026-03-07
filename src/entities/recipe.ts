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

  TO_TASTE = 'to taste',
}

export interface RecipeIngredient {
  name: string;
  quantity: number;
  unit: RecipeIngredientUnit;
}

export interface RecipeInstruction {
  text: string;
  isOptional?: boolean;
  timer?: number | null; //in seconds
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

  instructions: RecipeInstruction[];

  notes: string | null;

  createdAt: string;
  updatedAt: string | null;

  isFavorite: boolean;
}
