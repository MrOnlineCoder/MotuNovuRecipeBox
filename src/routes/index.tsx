import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Panel } from '@/components/ui/panel'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useRecipesStore } from '@/store'
import { createFileRoute, Link } from '@tanstack/react-router'
import { BookPlusIcon, Calendar1Icon, ChefHat, CircleChevronRightIcon, SearchIcon } from 'lucide-react'
import { useMemo } from 'react'

const Index: React.FC = () => {
    const {
        isLoading,
        recipes
    } = useRecipesStore()

    const hasRecipes = recipes.length > 0;

    const recipeOfTheDay = useMemo(() => {
        if (!hasRecipes) return null;

        const index = new Date().getDate() % recipes.length;

        return recipes[index];
    }, [hasRecipes]);

    if (isLoading) {
        return <div className="flex flex-col gap-5 justify-center items-center h-full self-center px-4 w-full">

            <Skeleton className="w-full h-24" />

            <Skeleton className="w-full h-20" />

            <Skeleton className="w-full h-20" />
        </div>
    }

    return <div className="flex flex-col gap-5 justify-center items-center h-full self-center px-4">


        {!hasRecipes && <>
            <div className="flex flex-col gap-1 justify-center items-center">
                <ChefHat size={64} />
                <h1 className="text-xl font-bold">
                    Seems your cookbook is empty
                </h1>
                <h3 className="text-lg">But no worries, it's easy to fix it!</h3>
            </div>
        </>}

        {hasRecipes && <>
            <div className="flex flex-col gap-1 justify-center items-center">
                <ChefHat size={64} />
                <h1 className="text-xl font-bold">What would you like to cook today?</h1>
            </div>

            <Panel>
                <span className="text-sm flex gap-1 items-center text-secondary-foreground">
                    <Calendar1Icon size={16} />
                    Recipe of the Day
                </span>

                <Link to="/recipes/$id" params={{ id: recipeOfTheDay!.id }} className="w-full">
                    <h2 className="text-lg font-semibold flex w-full justify-between items-center cursor-pointer">
                        {recipeOfTheDay!.name}

                        <CircleChevronRightIcon size={24} />
                    </h2>
                </Link>
            </Panel>

            <Link to="/recipes" search={{ q: '' }} className="w-full">
                <Panel>
                    <span className="text-sm flex gap-1 items-center text-secondary-foreground">
                        <SearchIcon size={16} />
                        Search recipes
                    </span>

                    <Input placeholder="Search by title, description, ingredients..." />
                </Panel>
            </Link>


        </>
        }

        <Separator />

        <Button variant="success" className="w-full">
            <BookPlusIcon size={16} />
            New recipe
        </Button>
    </div>
}

export const Route = createFileRoute('/')({
    component: Index,
})