import { useRecipesStore } from "@/store/recipe";
import { SimpleSelect } from "../ui/select"
import { useShoppingStore } from "@/store/shopping";
import { Button } from "../ui/button";
import { TrashIcon } from "lucide-react";
import { Panel } from "../ui/panel";
import { pluralizeRecipeCount } from "@/lib/format";
import type { ShoppingCartItem } from "@/entities/shopping";
import type { Recipe } from "@/entities/recipe";

export type ShoppingItemWithRecipe = ShoppingCartItem & {
    recipe: Recipe;
}

export const ShoppingRecipeListView: React.FC<{
    onConfirm: (selection: ShoppingItemWithRecipe[]) => void
}> = (props) => {
    const store = useRecipesStore()
    const shopping = useShoppingStore()

    const cart = shopping.cart;

    const cartWithRecipes: ShoppingItemWithRecipe[] = cart.map(item => {
        return {
            ...item,
            recipe: store.recipes.find(r => r.id === item.recipeId)!
        }
    });

    return <>
        {cartWithRecipes.map(item => {
            return <Panel className="flex flex-row gap-2 items-center py-4" key={item.recipeId}>
                {!!item.recipe.photoUrl && <img src={item.recipe.photoUrl} alt={item.recipe.name} className="rounded-sm h-10 w-12 object-cover" />}
                <h2 className="text-lg font-bold">{item.recipe.name}</h2>

                <SimpleSelect
                    className="w-16 bg-primary-foreground"
                    onChange={e => shopping.changeRecipeServings(item.recipe, e)}
                    defaultValue={item.servings ?? 1}
                    placeholder="Servings"
                    options={
                        [
                            { label: '1', value: 1 },
                            { label: '2', value: 2 },
                            { label: '3', value: 3 },
                            { label: '4', value: 4 },
                            { label: '5', value: 5 },
                            { label: '6', value: 6 },
                            { label: '7', value: 7 },
                            { label: '8', value: 8 },
                            { label: '9', value: 9 },
                            { label: '10', value: 10 },
                        ]
                    } />

                <TrashIcon className="text-red-500 mx-3 cursor-pointer" onClick={
                    () => shopping.removeRecipeFromCart(item.recipe)
                } />
            </Panel>
        })}


        <Button variant="success" onClick={() => props.onConfirm(cartWithRecipes)}>
            Generate ({pluralizeRecipeCount(cart.length)})
        </Button >
    </>
}