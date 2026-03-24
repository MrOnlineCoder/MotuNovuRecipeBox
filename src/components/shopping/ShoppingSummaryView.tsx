import type { ShoppingCartIngredient } from "@/entities/shopping"
import { formatDoubleDecimal } from "@/lib/format";
import { Button } from "../ui/button";
import { ClipboardCopyIcon } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";
import { toast } from "sonner";

export const ShoppingSummaryView: React.FC<{
    list: ShoppingCartIngredient[]
    onReset: () => void
}> = ({
    list,
    onReset
}) => {
        const validIngredients = list.filter(i => i.neededQuantity > 0 && i.currentQuantity < i.neededQuantity);

        const copyListToClipboard = () => {
            const header = `I need to buy:\n\n`;
            const items = validIngredients.map(i => `- ${i.name}: ${formatDoubleDecimal(i.neededQuantity - i.currentQuantity)} ${i.unit}`).join('\n');

            const fullText = header + items;

            copyToClipboard(fullText);

            toast.success('Copied');
        }

        return <>
            <div className="text-lg font-bold text-primary">
                I need to buy:
            </div>

            {validIngredients.map((ingredient, index) => (
                <div key={index} className="w-full flex gap-2 items-center py-2 border-dashed border-b pb-3">
                    <div className="font-mono text-primary w-full">
                        {ingredient.name}
                    </div>
                    <div className="font-mono text-primary w-fit whitespace-nowrap">
                        {formatDoubleDecimal(
                            ingredient.neededQuantity - ingredient.currentQuantity
                        )} {ingredient.unit}
                    </div>
                </div>
            ))}

            <Button onClick={copyListToClipboard} variant="secondary">
                <ClipboardCopyIcon />
                Copy to clipboard
            </Button>

            <Button onClick={onReset} variant="ghost" className="mt-4">
                Reset
            </Button>
        </>
    }