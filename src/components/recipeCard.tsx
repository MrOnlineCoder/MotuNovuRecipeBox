import type { Recipe } from "@/entities/recipe";
import { ClockIcon, UtensilsIcon } from "lucide-react";

export const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
    return <div className="w-full border rounded-sm flex p-2 gap-2">
        <img src={recipe.photoUrl} alt={recipe.name} className="h-16 rounded-sm w-auto object-cover" />

        <div className="flex flex-col gap-2">
            <h1 className="text-lg font-bold">{recipe.name}</h1>
            <div className="flex gap-6 text-secondary-foreground items-center">
                <span className="flex gap-1 items-center">
                    <ClockIcon size={16} />
                    {Math.ceil(recipe.prepTime + recipe.cookTime)} min
                </span>

                <span className="flex gap-1 items-center">
                    <UtensilsIcon size={16} />
                    {recipe.servings}
                </span>
            </div>
        </div>
    </div>
}