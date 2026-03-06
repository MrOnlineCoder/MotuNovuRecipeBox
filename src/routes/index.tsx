import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Panel } from '@/components/ui/panel'
import { Separator } from '@/components/ui/separator'
import { createFileRoute } from '@tanstack/react-router'
import { BookPlusIcon, Calendar1Icon, ChefHat, CircleChevronRightIcon, SearchIcon } from 'lucide-react'

const Index: React.FC = () => {
    return <div className="flex flex-col gap-5 justify-center items-center h-full self-center">
        <div className="flex flex-col gap-1 justify-center items-center">
            <ChefHat size={64} />
            <h1 className="text-xl font-bold">What would you like to cook today?</h1>
        </div>


        <Panel>
            <span className="text-sm flex gap-1 items-center text-secondary-foreground">
                <Calendar1Icon size={16} />
                Recipe of the Day
            </span>

            <h2 className="text-lg font-semibold flex w-full justify-between items-center cursor-pointer">
                Pasta Carbonara

                <CircleChevronRightIcon size={24} />
            </h2>
        </Panel>

        <Panel>
            <span className="text-sm flex gap-1 items-center text-secondary-foreground">
                <SearchIcon size={16} />
                Search recipes
            </span>

            <Input placeholder="Search by title, description, ingredients..." />
        </Panel>

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