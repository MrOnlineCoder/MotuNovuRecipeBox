import { RecipeDifficulty } from "@/entities/recipe"
import { Button } from "../ui/button"
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "../ui/drawer"
import { SimpleSelect } from "../ui/select"
import { useState } from "react"
import { useRecipesStore } from "@/store/recipe"

export interface RecipeSearchFilters {
    cuisine: string | null
    difficulty: RecipeDifficulty | null
    tag: string | null
    isFavorite: boolean | null
}

export const SearchFiltersModal: React.FC<{
    initialValues: RecipeSearchFilters
    onApply: (filters: RecipeSearchFilters) => void
    onClose: () => void
}> = ({ onApply, onClose, initialValues }) => {
    const store = useRecipesStore()

    const [filters, setFilters] = useState<RecipeSearchFilters>(
        initialValues
    );

    const updateFilterValue = (key: keyof RecipeSearchFilters, value: any) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const cuisineOptions = store.getPossibleCuisines().map(c => ({ label: c, value: c }))
    const tagOptions = store.getPossibleTags().map(t => ({ label: t, value: t }))

    return <Drawer open={true} direction="bottom" dismissible={false} onClose={onClose}>
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>Apply search filters</DrawerTitle>
            </DrawerHeader>

            <div className="flex flex-col gap-3 w-full px-4">
                <SimpleSelect
                    className="w-full bg-primary-foreground"
                    onChange={e => updateFilterValue('cuisine', e)}
                    defaultValue={filters.cuisine ?? ''}
                    placeholder="Cuisine filter"
                    options={
                        [
                            { label: 'Any cuisine', value: null },
                            ...cuisineOptions
                        ]
                    } />

                <SimpleSelect
                    className="w-full bg-primary-foreground"
                    onChange={e => updateFilterValue('difficulty', e)}
                    defaultValue={filters.difficulty ?? ''}
                    placeholder="Difficulty filter"
                    options={
                        [
                            { label: 'Any difficulty', value: null },
                            { label: 'Easy', value: RecipeDifficulty.EASY },
                            { label: 'Medium', value: RecipeDifficulty.MEDIUM },
                            { label: 'Hard', value: RecipeDifficulty.HARD },
                        ]
                    } />

                <SimpleSelect
                    className="w-full bg-primary-foreground"
                    onChange={e => updateFilterValue('tag', e)}
                    defaultValue={filters.tag ?? ''}
                    placeholder="Tag filter"
                    options={
                        [
                            { label: 'Any tag', value: null },
                            ...tagOptions
                        ]
                    } />

            </div>

            <DrawerFooter>
                <Button
                    onClick={() => onApply(filters)}
                    variant="default"
                >Apply</Button>
                <Button
                    variant="outline"
                    onClick={onClose}>Cancel</Button>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
}