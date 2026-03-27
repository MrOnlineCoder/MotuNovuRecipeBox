import { SearchFiltersModal, type RecipeSearchFilters } from '@/components/modals/SearchFiltersModal'
import { RecipeCard } from '@/components/RecipeCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Panel } from '@/components/ui/panel'
import { Skeleton } from '@/components/ui/skeleton'
import { makeCaseInsensitiveSearchFilterer, makeMultiCriteriaSorter } from '@/lib/utils'
import { useRecipesStore } from '@/store/recipe'
import { createFileRoute } from '@tanstack/react-router'
import { BookDashedIcon, BookPlusIcon, FilterIcon } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'


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

    const [filters, setFilters] = useState<RecipeSearchFilters>({
        cuisine: null,
        difficulty: null,
        tag: null,
        isFavorite: null,
    })

    const [filtersModalOpen, setFiltersModalOpen] = useState(false)

    useEffect(() => {
        if (!isLoading && searchInputRef.current && searchParams.q !== undefined) {
            searchInputRef.current!.value = searchParams.q
            searchInputRef.current!.focus()
        }
    }, [isLoading]);

    const filteredRecipes = useMemo(() => {
        const filtered = recipes.filter(recipe => {
            if (filters.cuisine && recipe.cuisine !== filters.cuisine) {
                return false;
            }

            if (filters.difficulty && recipe.difficulty !== filters.difficulty) {
                return false;
            }

            if (filters.tag && !recipe.tags.includes(filters.tag)) {
                return false;
            }

            if (filters.isFavorite !== null && !filters.isFavorite) {
                return false;
            }

            return true;
        }).filter(
            makeCaseInsensitiveSearchFilterer(
                searchParams.q ?? '',
                ['name', 'description', 'tags']
            )
        );

        filtered.sort(
            makeMultiCriteriaSorter(
                [
                    {
                        key: 'isFavorite',
                        order: 'desc'
                    },
                    {
                        key: 'cookTime',
                        order: 'asc'
                    },
                    {
                        key: 'difficulty',
                        order: 'asc'
                    }
                ]
            )
        );

        return filtered;
    }, [recipes, searchParams.q, filters]);

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

    const hasAnyFiltersPresent = Object.values(filters).some(v => v !== null)

    return <div className="flex flex-col gap-4 px-4 pt-3">
        <h1 className="text-2xl font-bold self-center">Recipes</h1>

        <div className="w-full flex gap-1">
            <Input
                size={48}
                placeholder="Search by title, description, ingredients..."
                value={searchParams.q}
                onChange={onSearchChange}
                ref={searchInputRef} />
            <Button variant={hasAnyFiltersPresent ? 'default' : 'outline'} onClick={() => setFiltersModalOpen(true)}>
                <FilterIcon />
            </Button>
        </div>


        <div className="flex flex-col gap-4 pb-3">
            {filteredRecipes.map(recipe => (
                <RecipeCard recipe={recipe} key={recipe.id} />
            ))}
        </div>

        {!filteredRecipes.length && <Panel>
            No recipes found for your query
        </Panel>}

        {filtersModalOpen && <SearchFiltersModal
            initialValues={filters}
            onApply={(newFilters) => {
                setFilters(newFilters);
                setFiltersModalOpen(false);
            }}
            onClose={() => setFiltersModalOpen(false)} />}
    </div>
}


export const Route = createFileRoute('/recipes/')({
    component: RouteComponent,
    validateSearch: (search) => {
        return search.q !== undefined ? { q: `${search.q}` } : {}
    }
})