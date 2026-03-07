import { RecipeViewHeader } from '@/components/navigation/RecipeViewHeader'
import { Separator } from '@/components/ui/separator'
import { formatDate, formatIngredientUnit, formatSecondsDuration } from '@/lib/format'
import { useRecipesStore } from '@/store'
import { createFileRoute, useParams, useRouter } from '@tanstack/react-router'
import { AlarmClockIcon, CalendarIcon, ClipboardClock, ClockIcon, DotIcon, EarthIcon, TagIcon } from 'lucide-react'
import { useMemo } from 'react'


export const Route = createFileRoute('/recipes/$id')({
    component: RouteComponent,
})


function RouteComponent() {
    const params = Route.useParams()
    const router = useRouter()
    const store = useRecipesStore()

    const recipe = useMemo(() => {
        return store.recipes.find(r => r.id === params.id) ?? null
    }, [params.id, store.recipes]);

    const returnToRecipes = () => {
        router.navigate({
            to: '/recipes'
        });
    }

    if (!recipe) {
        return <div className="flex flex-col gap-4">
            <RecipeViewHeader isFavorite={false} onToggleFavorite={() => { }} onBack={returnToRecipes} />
        </div>
    }

    return <div className="flex flex-col gap-4">
        <RecipeViewHeader
            isFavorite={recipe.isFavorite}
            onToggleFavorite={() => store.toggleRecipeFavorite(recipe.id)}
            onBack={returnToRecipes}
        />

        <div className="px-2 py-3 flex flex-col gap-5">
            <img src={recipe.photoUrl} alt={recipe.name} className="object-cover w-full h-auto rounded-sm" />

            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold">
                    {recipe.name}
                </h1>

                <p className="text-lg">
                    {recipe.description}
                </p>
            </div>

            <div className="flex flex-col gap-1">
                <div className="flex gap-1 items-center">
                    <ClipboardClock size={16} />
                    <b>{recipe.prepTime} min</b> for prep
                </div>
                <div className="flex gap-1 items-center">
                    <ClockIcon size={16} />
                    <b>{recipe.cookTime} min</b> for cooking
                </div>
                <div className="flex gap-1 items-center">
                    <EarthIcon size={16} />
                    <b>{recipe.cuisine}</b> cuisine
                </div>
                {recipe.tags.length > 0 && <div className="flex gap-1 items-center">
                    <TagIcon size={16} />
                    {recipe.tags.join(', ')}
                </div>}
                <div className="flex gap-1 items-center">
                    <CalendarIcon size={16} />
                    created {formatDate(recipe.createdAt)}
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold">
                    Ingredients
                </h3>
                <Separator />
                <div className="flex flex-col gap-1 justify-center">
                    {recipe.ingredients.map((ingredient, index) => (
                        <div key={index} className="flex gap-1 items-center">
                            <DotIcon size={16} />
                            {ingredient.name}

                            <span className="text-secondary-foreground text-sm">
                                ({formatIngredientUnit(ingredient)})
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold">
                    Instructions
                </h3>
                <Separator />
                <div className="flex flex-col gap-8 justify-center mt-2">
                    {recipe.instructions.map((instruction, index) => (
                        <div key={index} className="flex gap-2 items-start justify-start">
                            <div className="flex justify-center items-center w-8 h-8 min-w-8 min-h-8 rounded-full border-2 border-secondary font-bold text-lg">
                                {index + 1}
                            </div>
                            <div className="flex flex-col gap-1">
                                {!!instruction.isOptional && <span className="text-sm text-secondary-foreground d-inline-flex">(Optional)</span>}
                                <div className="text-lg">
                                    {instruction.text}
                                </div>
                                {!!instruction.timer && <div className="text-sm flex gap-0.5 items-center text-secondary-foreground">
                                    <AlarmClockIcon size={16} />
                                    {formatSecondsDuration(instruction.timer)}
                                </div>}
                            </div>

                        </div>
                    ))}
                </div>
            </div>

            {!!recipe.notes && <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold">
                    Notes
                </h3>
                <Separator />
                <div className="text-lg">
                    {recipe.notes}
                </div>
            </div>}

        </div>

    </div>
}
