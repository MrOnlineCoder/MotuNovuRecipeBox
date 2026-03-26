import { CheckLineIcon, ChevronLeftCircleIcon, CookingPot, EditIcon, HeartIcon, HeartMinusIcon, ShoppingCartIcon } from "lucide-react"
import { Button } from "../ui/button"

export const RecipeViewHeader: React.FC<{
    isFavorite: boolean
    isInCart: boolean
    onToggleFavorite: () => void
    onBack: () => void
    onAddToCart: () => void
    onEdit: () => void
    onCook: () => void
}> = ({ isFavorite, onToggleFavorite, onBack, onCook, onAddToCart, onEdit, isInCart }) => {
    return <div className="w-full p-2 bg-gray-50 flex h-16 border-t items-center justify-between">
        <div className="flex gap-2 items-center cursor-pointer" onClick={onBack}>
            <ChevronLeftCircleIcon size={24} />
        </div>

        <div className="flex gap-3 items-center">
            <Button variant="outline" onClick={onAddToCart}>
                {isInCart ? <CheckLineIcon size={16} /> : <ShoppingCartIcon size={16} />}
            </Button>

            <Button variant={'default'} onClick={onEdit}>
                <EditIcon size={16} />
            </Button>

            <Button variant={isFavorite ? 'destructive' : 'default'} onClick={onToggleFavorite}>
                {isFavorite ? <HeartMinusIcon size={16} strokeWidth={2.6} /> : <HeartIcon size={16} />}
            </Button>

            <Button variant="success" onClick={onCook}>
                <CookingPot size={16} />
                Cook
            </Button>
        </div>
    </div>
}