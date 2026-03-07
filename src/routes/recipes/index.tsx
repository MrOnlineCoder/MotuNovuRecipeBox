import { RecipeCard } from '@/components/RecipeCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRecipesStore } from '@/store'
import { createFileRoute } from '@tanstack/react-router'
import { BookDashedIcon, BookPlusIcon } from 'lucide-react'


const EmptyRecipesList: React.FC = () => {
    return <div className="flex flex-col gap-4 px-12 pt-3 h-full justify-center items-center">
        <div className="self-center justify-self-center flex flex-col bg-secondary px-2 py-4 gap-2 items-center border rounded-sm">
            <BookDashedIcon size={32} />
            <h3 className="font-semibold">Your cookbook is empty!</h3>
            <p className="text-foreground text-sm text-center">
                But don't worry, it's easy to add a new recipe.
            </p>
            <Button variant="success" className="w-full">
                <BookPlusIcon size={16} />
                New recipe
            </Button>
        </div>
    </div>
}

const RouteComponent: React.FC = () => {
    const { recipes, isLoading } = useRecipesStore();

    const hasRecipes = recipes.length > 0

    if (!hasRecipes) {
        return <EmptyRecipesList />
    }

    return <div className="flex flex-col gap-4 px-4 pt-3">
        <h1 className="text-2xl font-bold self-center">Recipes</h1>

        <Input size={48} placeholder="Search by title, description, ingredients..." />

        <div className="flex flex-col gap-4">
            {recipes.map(recipe => (
                <RecipeCard recipe={recipe} key={recipe.id} />
            ))}

        </div>
    </div>
}


export const Route = createFileRoute('/recipes/')({
    component: RouteComponent,
})