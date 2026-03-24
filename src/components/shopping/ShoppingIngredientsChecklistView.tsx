import type { ShoppingCartIngredient } from "@/entities/shopping"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

export const ShoppingIngredientsChecklistView: React.FC<{
    list: ShoppingCartIngredient[]
    onChange: (newList: ShoppingCartIngredient[]) => void
    onConfirm: () => void
}> = ({ list, onChange, onConfirm }) => {

    const toggleIngredient = (index: number) => {
        const ingredient = list[index];

        const hasAnything = ingredient.currentQuantity > 0;

        const newList = [...list];

        newList[index] = {
            ...ingredient,
            currentQuantity: hasAnything ? 0 : ingredient.neededQuantity,
        }

        onChange(newList);
    }

    const setIngredientQuantity = (index: number, quantity: number) => {
        const ingredient = list[index];

        const newList = [...list];

        newList[index] = {
            ...ingredient,
            currentQuantity: quantity,
        }

        onChange(newList);
    }

    const missingIngredientsCount = list.filter(i => i.currentQuantity < i.neededQuantity).length;

    return <>
        <div className="text-sm text-primary">
            Please check what ingredients you already have and how much:
        </div>

        {list.map((ingredient, index) => {
            return <div key={index} className="w-full flex gap-2 items-center py-2 border-dashed border-b pb-3">
                <Checkbox
                    checked={ingredient.currentQuantity > 0}
                    onCheckedChange={() => toggleIngredient(index)}
                    id={`ingredient-${index}`} />
                <label htmlFor={`ingredient-${index}`} className={
                    cn(
                        "font-mono text-primary w-full",
                        {
                            'line-through text-muted-foreground': ingredient.currentQuantity >= ingredient.neededQuantity,
                        }
                    )
                }>
                    {ingredient.name}
                </label>
                <div className="flex gap-2 items-center min-w-36 w-fit">
                    <Input
                        type="number"
                        className="w-16 min-w-16"
                        placeholder="Amount"
                        value={ingredient.currentQuantity}
                        onChange={(e) => setIngredientQuantity(index, Number(e.target.value))} />
                    /
                    <div className="font-mono text-primary w-fit whitespace-nowrap">
                        {ingredient.neededQuantity} {ingredient.unit}
                    </div>
                </div>
            </div>
        })}

        <Button variant="success" onClick={() => onConfirm()} disabled={missingIngredientsCount === 0}>
            Generate buy-list for {missingIngredientsCount} missing ingredients
        </Button >
    </>
}

