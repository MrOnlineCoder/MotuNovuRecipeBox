import type { Recipe } from "@/entities/recipe";
import { useRouter } from "@tanstack/react-router";
import { ClockIcon, HeartIcon, UtensilsIcon } from "lucide-react";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

const RecipeImage: React.FC<{
    src: string | null;
    alt: string;
}> = ({ src, alt }) => {
    const [loaded, setLoaded] = useState(false);

    if (!src) return null;

    return <>
        <img src={src} alt={alt} className={
            cn(
                "h-16 rounded-sm w-auto max-w-24 object-cover",
                {
                    "hidden": !loaded,
                }
            )
        } onLoad={() => setLoaded(true)} />

        {!loaded && <Skeleton className="h-16 rounded-sm min-w-24 object-cover" />}
    </>
}

export const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
    const router = useRouter()

    const navigateToRecipe = () => {
        router.navigate({
            to: `/recipes/${recipe.id}`
        });
    }

    return <div className="w-full border rounded-sm flex p-2 pr-4 gap-2" onClick={navigateToRecipe}>
        {recipe.photoUrl && <RecipeImage src={recipe.photoUrl} alt={recipe.name} />}

        <div className="flex flex-col gap-2 w-full">
            <h1 className="text-lg font-bold">{recipe.name}</h1>
            <div className="flex gap-6 text-secondary-foreground items-center justify-between w-full">
                <div className="flex gap-3 items-center">
                    <span className="flex gap-1 items-center">
                        <ClockIcon size={16} />
                        {Math.ceil(recipe.prepTime + recipe.cookTime)} min
                    </span>

                    <span className="flex gap-1 items-center">
                        <UtensilsIcon size={16} />
                        {recipe.servings}
                    </span>
                </div>

                {!!recipe.isFavorite && <HeartIcon color="red" size={16} />}
            </div>
        </div>
    </div>
}