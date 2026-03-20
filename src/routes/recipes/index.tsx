import { RecipeCard } from '@/components/RecipeCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Panel } from '@/components/ui/panel'
import { Skeleton } from '@/components/ui/skeleton'
import { useRecipesStore } from '@/store/recipe'
import { createFileRoute } from '@tanstack/react-router'
import { BookDashedIcon, BookPlusIcon } from 'lucide-react'
import { useEffect, useMemo, useRef } from 'react'


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

    const searchParams = Route.useSearch()

    const searchInputRef = useRef<HTMLInputElement>(null)

    const navigate = Route.useNavigate()

    useEffect(() => {
        if (!isLoading && searchInputRef.current && searchParams.q !== undefined) {
            searchInputRef.current!.value = searchParams.q
            searchInputRef.current!.focus()
        }
    }, [isLoading]);

    const filteredRecipes = useMemo(() => {
        const filtered = recipes.filter(recipe => {
            if (!searchParams.q) return true;

            const q = searchParams.q.toLowerCase()

            return recipe.name.toLowerCase().includes(q)
                || recipe.description.toLowerCase().includes(q)
                || recipe.cuisine.toLowerCase().includes(q)
                || recipe.tags.some(tag => tag.toLowerCase().includes(q));
        });

        filtered.sort((a, b) => {
            const aScore = a.isFavorite ? 1 : 0;
            const bScore = b.isFavorite ? 1 : 0;

            return bScore - aScore;
        });

        return filtered;
    }, [recipes, searchParams.q]);

    const onSearchChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        navigate({
            search: {
                q: ev.target.value
            }
        })
    }

    if (isLoading) {
        return <div className="flex flex-col gap-4 px-4 pt-3">
            <Skeleton className="w-full h-8" />
            <Skeleton className="w-full h-9" />
            <div className="flex flex-col gap-4">
                <Skeleton className="w-full h-20" />
                <Skeleton className="w-full h-20" />
                <Skeleton className="w-full h-20" />
            </div>
        </div>
    }

    if (!hasRecipes) {
        return <EmptyRecipesList />
    }

    return <div className="flex flex-col gap-4 px-4 pt-3">
        <h1 className="text-2xl font-bold self-center">Recipes</h1>

        <Input
            size={48}
            placeholder="Search by title, description, ingredients..."
            value={searchParams.q}
            onChange={onSearchChange}
            ref={searchInputRef} />

        <div className="flex flex-col gap-4">
            {filteredRecipes.map(recipe => (
                <RecipeCard recipe={recipe} key={recipe.id} />
            ))}
        </div>

        {!filteredRecipes.length && <Panel>
            No recipes found for your query
        </Panel>}
    </div>
}


export const Route = createFileRoute('/recipes/')({
    component: RouteComponent,
    validateSearch: (search) => {
        return search.q !== undefined ? { q: `${search.q}` } : {}
    }
})