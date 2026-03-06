import { Input } from '@/components/ui/input'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/recipes')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div className="flex flex-col gap-4 px-12 pt-3">
        <h1 className="text-2xl font-bold self-center">Recipes</h1>

        <Input size={48} placeholder="Search by title, description, ingredients..." />
    </div>
}
