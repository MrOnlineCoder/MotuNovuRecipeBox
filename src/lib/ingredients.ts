import {
  RecipeIngredientUnit,
  type Recipe,
  type RecipeIngredient,
} from '@/entities/recipe';

export const isIngredientQuantitative = (ingredient: RecipeIngredient) => {
  const nonQuantitativeUnits = [RecipeIngredientUnit.TO_TASTE];

  return !nonQuantitativeUnits.includes(ingredient.unit);
};

export const recalculateIngredients = (
  recipe: Recipe,
  servings: number,
): RecipeIngredient[] => {
  if (!recipe.ingredients || recipe.ingredients.length === 0) {
    return [];
  }

  const newList: RecipeIngredient[] = [];

  for (const item of recipe.ingredients) {
    if (!isIngredientQuantitative(item)) {
      newList.push(item);
      continue;
    }

    const newItem = { ...item };
    newItem.quantity =
      Math.round((item.quantity / recipe.servings) * servings * 10) / 10;
    newList.push(newItem);
  }

  return newList;
};
