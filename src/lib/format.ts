import { RecipeIngredientUnit, type RecipeIngredient } from '@/entities/recipe';
import { isIngredientQuantitative } from './ingredients';

export const formatDoubleDecimal = (num: number) => {
  return `${Math.round(num * 100) / 100}`;
};

export const formatIngredientUnit = (ingredient: RecipeIngredient) => {
  return isIngredientQuantitative(ingredient)
    ? `${ingredient.quantity} ${ingredient.unit}`
    : ingredient.unit;
};

export const formatDate = (datetime: string | Date) => {
  const date = new Date(datetime);

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatSecondsDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes > 0 && remainingSeconds > 0) {
    return `${minutes} min ${remainingSeconds} sec`;
  } else if (minutes > 0) {
    return `${minutes} min`;
  } else {
    return `${remainingSeconds} sec`;
  }
};

export const pluralizeRecipeCount = (count: number) => {
  return `${count} ${count === 1 ? 'recipe' : 'recipes'}`;
};
