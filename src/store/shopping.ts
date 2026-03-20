import type { Recipe } from '@/entities/recipe';
import type { ShoppingCartItem } from '@/entities/shopping';
import { create } from 'zustand';

export type ShoppingStore = {
  cart: ShoppingCartItem[];
} & {
  hasRecipeInCart: (recipe: Recipe) => boolean;
  addRecipeToCart: (recipe: Recipe) => void;
  removeRecipeFromCart: (recipe: Recipe) => void;
  changeRecipeServings: (recipe: Recipe, servings: number) => void;
};

export const useShoppingStore = create<ShoppingStore>((set, get) => ({
  cart: [],

  hasRecipeInCart: (recipe: Recipe) => {
    return get().cart.some((item) => item.recipeId === recipe.id);
  },

  addRecipeToCart: (recipe: Recipe) => {
    if (get().hasRecipeInCart(recipe)) {
      return;
    }

    const newItem: ShoppingCartItem = {
      recipeId: recipe.id,
      servings: 1,
    };

    set({ cart: [...get().cart, newItem] });
  },

  removeRecipeFromCart: (recipe: Recipe) => {
    set({ cart: get().cart.filter((item) => item.recipeId !== recipe.id) });
  },

  changeRecipeServings: (recipe: Recipe, servings: number) => {
    const cart = get().cart.slice();
    const item = cart.find((item) => item.recipeId === recipe.id);

    if (item) {
      item.servings = servings;
      set({ cart });
    }
  },
}));
