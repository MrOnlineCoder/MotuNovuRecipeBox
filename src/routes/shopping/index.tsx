import { ShoppingIngredientsChecklistView } from '@/components/shopping/ShoppingIngredientsChecklistView';
import { ShoppingRecipeListView, type ShoppingItemWithRecipe } from '@/components/shopping/ShoppingRecipeListView';
import { ShoppingSummaryView } from '@/components/shopping/ShoppingSummaryView';
import { Panel } from '@/components/ui/panel'
import type { ShoppingCartIngredient } from '@/entities/shopping';
import { isIngredientQuantitative, recalculateIngredients } from '@/lib/ingredients';
import { useShoppingStore } from '@/store/shopping';
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';

export const Route = createFileRoute('/shopping/')({
    component: RouteComponent,
})

enum ShoppingViewStep {
    RECIPE_LIST,
    INGREDIENTS_CHECK,
    RESULT
}

const EmptyShoppingCart = () => {
    return <div className="flex flex-col gap-4 px-4 pt-3">
        <h1 className="text-2xl font-bold self-center">Shopping List Generator</h1>

        <Panel className="justify-center">
            Your shopping cart is empty now. Add at least 1 recipe to make a shopping list.
        </Panel>
    </div>
}

function RouteComponent() {
    const shopping = useShoppingStore()

    const cart = shopping.cart;

    const isCartEmpty = cart.length === 0;

    const [step, setStep] = useState<ShoppingViewStep>(ShoppingViewStep.RECIPE_LIST);

    const [ingredients, setIngredients] = useState<ShoppingCartIngredient[]>([]);

    const onRecipesListConfirm = (selection: ShoppingItemWithRecipe[]) => {
        const builderMap: Record<string, ShoppingCartIngredient> = {};

        for (const item of selection) {
            const recaclulated = recalculateIngredients(item.recipe, item.servings ?? 1);

            for (const ingredient of recaclulated) {
                if (!isIngredientQuantitative(ingredient)) {
                    continue;
                }

                if (!builderMap[ingredient.name]) {
                    builderMap[ingredient.name] = {
                        name: ingredient.name,
                        neededQuantity: 0,
                        currentQuantity: 0,
                        unit: ingredient.unit,
                    }
                }

                if (ingredient.quantity) {
                    builderMap[ingredient.name].neededQuantity += ingredient.quantity;
                }
            }
        }

        setIngredients(Object.values(builderMap));

        setStep(ShoppingViewStep.INGREDIENTS_CHECK);
    }

    const onReset = () => {
        shopping.clearCart();
        setIngredients([]);
        setStep(ShoppingViewStep.RECIPE_LIST);
    }

    if (isCartEmpty) {
        return <EmptyShoppingCart />
    }

    return <div className="flex flex-col gap-4 px-3 pt-2 pb-2">
        <h1 className="text-2xl font-bold self-center">Shopping List Generator</h1>
        {step === ShoppingViewStep.RECIPE_LIST && <ShoppingRecipeListView onConfirm={onRecipesListConfirm} />}
        {step === ShoppingViewStep.INGREDIENTS_CHECK &&
            <ShoppingIngredientsChecklistView
                list={ingredients}
                onChange={setIngredients}
                onConfirm={() => setStep(ShoppingViewStep.RESULT)}
            />}
        {step === ShoppingViewStep.RESULT && <ShoppingSummaryView list={ingredients} onReset={onReset} />}
    </div>
}
