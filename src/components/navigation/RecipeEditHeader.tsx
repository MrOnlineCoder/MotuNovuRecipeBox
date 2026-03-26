import { CheckLineIcon, ChevronLeftCircleIcon, CookingPot, HeartIcon, HeartMinusIcon, SaveIcon, ShoppingCartIcon, TrashIcon } from "lucide-react"
import { Button } from "../ui/button"

export const RecipeEditHeader: React.FC<{
    onBack: () => void
    onSave: () => void
    onRemove: () => void
    canSave: boolean
    isBusy: boolean
}> = ({ onBack, onSave, canSave, isBusy, onRemove }) => {
    return <div className="w-full p-2 bg-gray-50 flex h-16 border-t items-center justify-between">
        <div className="flex gap-2 items-center cursor-pointer" onClick={onBack}>
            <ChevronLeftCircleIcon size={24} />
        </div>

        <div className="flex gap-3 items-center">
            <Button variant="destructive" onClick={onRemove} disabled={isBusy}>
                <TrashIcon size={16} />
                Delete recipe
            </Button>
            <Button variant="success" onClick={onSave} disabled={!canSave || isBusy} >
                <SaveIcon size={16} />
                {isBusy ? 'Saving...' : 'Save'}
            </Button>
        </div>
    </div>
}