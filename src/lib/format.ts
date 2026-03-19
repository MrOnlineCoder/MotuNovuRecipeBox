import { RecipeIngredientUnit, type RecipeIngredient } from '@/entities/recipe';
import { isIngredientQuantitative } from './ingredients';

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
