import { useMemo, useState } from "react"
import { Button } from "../ui/button"
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "../ui/drawer"
import { Input } from "../ui/input"
import { useRecipesStore } from "@/store/recipe"
import { useNavigate } from "@tanstack/react-router"
import { RecipeCard } from "../RecipeCard"

export const NewRecipeModal: React.FC<{
    onClose: () => void
}> = ({
    onClose
}) => {
        const [name, setName] = useState('')
        const [busy, setBusy] = useState(false)

        const store = useRecipesStore()

        const navigate = useNavigate()

        const create = async () => {
            if (!name) return;

            setBusy(true)

            const newRecipe = await store.create(name);

            setBusy(false)

            if (newRecipe) {
                navigate({
                    to: '/recipes/$id/edit',
                    params: {
                        id: newRecipe.id
                    }
                })
            }

            onClose()
        }

        const possibleDuplicate = useMemo(() => {
            if (!name) return null;
            if (name.length < 3) return null;

            return store.recipes.find(r => r.name.toLowerCase().startsWith(name.toLowerCase())) ?? null;
        }, [name, store.recipes]);

        return <Drawer open={true} direction="bottom" dismissible={false} onClose={onClose}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>New recipe</DrawerTitle>
                    <DrawerDescription>Write a name for your recipe.</DrawerDescription>
                </DrawerHeader>
                <div className="w-full items-center justify-center flex flex-col gap-2 px-4">
                    <Input
                        placeholder="Enter new recipe name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full" />

                    {!!possibleDuplicate && <div className="flex flex-col gap-1 w-full">
                        <span className="text-xs text-secondary-foreground">Possibly existing recipe:</span>

                        <RecipeCard recipe={possibleDuplicate} />
                    </div>}
                </div>

                <DrawerFooter>
                    <Button
                        disabled={!name || busy}
                        onClick={create}
                        variant="success"

                    >
                        {busy ? 'Creating...' : 'Create recipe'}
                    </Button>
                    <Button
                        variant="outline"
                        disabled={busy}
                        onClick={onClose}>Cancel</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    }