import { recipesApi } from '@/api/recipes';
import type { Recipe } from '@/entities/recipe';
import { create } from 'zustand';

export type RecipeStore = {
  recipes: Recipe[];
  isLoading: boolean;
  error: string | null;
} & {
  fetchAll: () => Promise<void>;
  toggleRecipeFavorite: (id: string) => void;
  getPossibleCuisines: () => string[];
  getPossibleTags: () => string[];
  update: (id: string, data: Partial<Recipe>) => void;
  remove: (id: string) => void;
  create: (title: string) => Promise<Recipe | null>;
};

export const useRecipesStore = create<RecipeStore>((set, get) => ({
  recipes: [],
  isLoading: false,
  error: null,

  fetchAll: async () => {
    set({ isLoading: true });

    try {
      const result = await recipesApi.getList();

      set({ recipes: result });
    } catch (error) {
      set({ error: (error as Error).message });
    }

    set({ isLoading: false });
  },

  toggleRecipeFavorite: (id: string) => {
    const recipes = get().recipes.slice();

    const recipe = recipes.find((r) => r.id === id);

    if (recipe) {
      recipe.isFavorite = !recipe.isFavorite;
    }

    set({ recipes });
  },

  getPossibleCuisines: () => {
    const cuisinesSet = new Set<string>();

    for (const recipe of get().recipes) {
      cuisinesSet.add(recipe.cuisine);
    }

    return Array.from(cuisinesSet);
  },

  getPossibleTags: () => {
    const tagsSet = new Set<string>();

    for (const recipe of get().recipes) {
      for (const tag of recipe.tags) {
        tagsSet.add(tag);
      }
    }

    return Array.from(tagsSet);
  },

  update: async (id: string, recipe: Partial<Recipe>) => {
    const recipes = get().recipes.slice();

    const ri = recipes.findIndex((r) => r.id === id);

    try {
      if (ri !== -1) {
        const updateData = {
          ...recipes[ri],
          ...recipe,
        };
        const updated = await recipesApi.update(updateData);

        recipes[ri] = updated;
      }

      set({ recipes });
    } catch (err) {
      set({ error: (err as Error).message });
    }
  },

  remove: async (id: string) => {
    const recipes = get().recipes.slice();

    const ri = recipes.findIndex((r) => r.id === id);

    try {
      if (ri !== -1) {
        await recipesApi.remove(id);

        recipes.splice(ri, 1);
      }

      set({ recipes });
    } catch (err) {
      set({ error: (err as Error).message });
    }
  },

  create: async (name: string) => {
    try {
      const newRecipe = await recipesApi.create({
        name,
      });

      set((state) => ({
        recipes: [...state.recipes, newRecipe],
      }));

      return newRecipe;
    } catch (err) {
      set({ error: (err as Error).message });

      return null;
    }
  },
}));
