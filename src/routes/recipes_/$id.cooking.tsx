import { FixedBottomRender } from '@/components/layouts/FixedBottomRender'
import { RecipeCookHeader } from '@/components/navigation/RecipeCookHeader'
import { RecipeCookNavbar } from '@/components/navigation/RecipeCookNavbar'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { formatIngredientUnit, formatSecondsDuration } from '@/lib/format'
import { recalculateIngredients } from '@/lib/ingredients'
import { cn, scrollSmoothTo } from '@/lib/utils'
import { useRecipesStore } from '@/store'
import { createFileRoute } from '@tanstack/react-router'
import { AlarmClockIcon } from 'lucide-react'
import { useMemo, useState } from 'react'

export const Route = createFileRoute('/recipes_/$id/cooking')({
    component: RouteComponent,
    validateSearch: (search) => {
        return {
            servings: Number(search.servings ?? 1)
        }
    }
})

const INGREDIENT_CHECK_STEP = 0;

function RouteComponent() {
    const params = Route.useParams()
    const query = Route.useSearch()
    const store = useRecipesStore()

    const navigate = Route.useNavigate()

    const [servingsCount, setServingsCount] = useState(query.servings);

    const [currentStep, setCurrentStep] = useState(0);

    const recipe = useMemo(() => {
        return store.recipes.find(r => r.id === params.id) ?? null
    }, [params.id, store.recipes]);

    const nextStepTitle = useMemo(() => {
        if (!recipe) return '';

        if (currentStep === INGREDIENT_CHECK_STEP) {
            return 'Ingredients ready';
        }

        if (currentStep < recipe.instructions.length) {
            return 'Go to step ' + (currentStep + 1);
        }

        return 'Finish';
    }, [currentStep]);

    const ingredients = useMemo(() => {
        if (!recipe) return [];

        return recalculateIngredients(recipe, servingsCount);
    }, [recipe, servingsCount]);

    const onNextStep = () => {
        if (!recipe) return;

        const newStep = currentStep + 1;

        if (newStep > recipe.instructions.length) {
            returnToRecipes();
            return;
        }

        setCurrentStep(newStep);

        scrollSmoothTo(document.getElementById(`step-${newStep - 1}`));
    }

    const returnToRecipes = () => {
        navigate({
            to: '/recipes/$id',
            params: {
                id: params.id
            }
        })
    }

    if (!recipe) {
        return <div className="flex flex-col gap-4">
            <RecipeCookHeader
                onServingsChange={setServingsCount}
                servings={servingsCount}
                onBack={returnToRecipes} />

            <div className="px-2 py-3 flex flex-col gap-5">
                <Skeleton className="w-full rounded-sm h-64" />
            </div>
        </div>
    }

    return <div className="flex flex-col gap-4">
        <RecipeCookHeader
            onServingsChange={setServingsCount}
            servings={servingsCount}
            onBack={returnToRecipes} />

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
                <h3 className="text-lg font-semibold">
                    Ingredients ({servingsCount} servings)
                </h3>
                <Separator />
                <div className="flex flex-col gap-1.5 justify-center">
                    {ingredients.map((ingredient, index) => (
                        <div key={index} className="flex gap-1 items-center">
                            <Checkbox className="w-8 h-8" />
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
                        <div key={index} id={`step-${index}`} className={
                            cn(
                                "flex gap-2 items-start justify-start rounded-sm p-2",
                                {
                                    "bg-chart-2/30": currentStep === index + 1,
                                }
                            )
                        }>
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

        <FixedBottomRender>
            <RecipeCookNavbar
                title={nextStepTitle}
                onNextStep={onNextStep}
            />
        </FixedBottomRender>

    </div>
}
