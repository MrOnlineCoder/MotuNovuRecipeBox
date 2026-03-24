export interface ShoppingCartItem {
  recipeId: string;
  servings: number;
}

export interface ShoppingCartIngredient {
  name: string;
  neededQuantity: number;
  currentQuantity: number;
  unit: string;
}
