import { recipesApi } from '@/api/recipes';
import type { Recipe } from '@/entities/recipe';
import { create } from 'zustand';

export type RecipeStore = {
  recipes: Recipe[];
  isLoading: boolean;
  error: string | null;
} & {
  fetchAll: () => Promise<void>;
};

export const useRecipesStore = create<RecipeStore>((set) => ({
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
}));
