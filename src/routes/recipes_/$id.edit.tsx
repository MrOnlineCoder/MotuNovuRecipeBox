import { RecipeRemoveModal } from '@/components/modals/RecipeRemoveModal'
import { RecipeEditHeader } from '@/components/navigation/RecipeEditHeader'
import { PhotoUploader } from '@/components/PhotoUploader'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { SimpleCombobox } from '@/components/ui/combobox'
import { Input } from '@/components/ui/input'
import { SimpleSelect } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { RecipeDifficulty, RecipeIngredientUnit, type Recipe } from '@/entities/recipe'
import { isIngredientQuantitative } from '@/lib/ingredients'
import { useRecipesStore } from '@/store/recipe'
import { createFileRoute } from '@tanstack/react-router'
import { ClipboardClock, ClockIcon, EarthIcon, PlusIcon, TagIcon, TrashIcon, UploadIcon, ZapIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/recipes_/$id/edit')({
    component: RouteComponent,
})

export type RecipeEditFields = {
    name: string | null;
    description: string | null;
    ingredients: Recipe['ingredients'] | null;
    instructions: Recipe['instructions'] | null;
    notes: Recipe['notes'] | null;
    cookTime: number | null;
    prepTime: number | null;
    tags: string[] | null;
    cuisine: Recipe['cuisine'] | null;
    photoUrl: string | null;
    difficulty: Recipe['difficulty'] | null;
    servings: number | null;
}

function RouteComponent() {
    const params = Route.useParams()
    const query = Route.useSearch()
    const store = useRecipesStore()

    const [busy, setBusy] = useState(false);

    const [removeModalShown, setRemoveModalShown] = useState(false);

    const navigate = Route.useNavigate()

    const goBack = () => {
        navigate({
            to: '/recipes/$id',
            params: {
                id: params.id
            }
        })
    }

    const [fields, setFields] = useState<RecipeEditFields>({
        name: null,
        description: null,
        ingredients: [
            {
                name: '',
                quantity: 1,
                unit: RecipeIngredientUnit.GRAMS
            }
        ],
        instructions: [
            {
                text: '',
                timer: null,
                isOptional: false
            }
        ],
        notes: null,
        cookTime: null,
        prepTime: null,
        tags: null,
        cuisine: null,
        difficulty: null,
        photoUrl: null,
        servings: null,
    });

    const removeRecipe = async () => {
        setBusy(true);
        setRemoveModalShown(false);

        await store.remove(params.id);

        toast.success('Recipe deleted');

        navigate({
            to: '/recipes'
        });
    }

    const saveChanges = async () => {
        setBusy(true);

        await store.update(
            params.id,
            fields as Partial<Recipe>
        );

        setBusy(false);

        goBack();

        toast.success('Recipe updated successfully');
    }

    const updateField = (field: keyof RecipeEditFields, value: any) => {
        setFields(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const updateIngredientField = (index: number, field: keyof Recipe['ingredients'][number], value: any) => {
        const ingredients = (fields.ingredients ?? []).slice();

        ingredients[index] = {
            ...ingredients[index],
            [field]: value
        }

        updateField('ingredients', ingredients);
    }

    const addNewIngredient = () => {
        const ingredients = (fields.ingredients ?? []).slice();

        ingredients.push({
            name: '',
            quantity: 1,
            unit: RecipeIngredientUnit.GRAMS
        });

        updateField('ingredients', ingredients);
    }

    const removeIngredient = (index: number) => {
        const ingredients = (fields.ingredients ?? []).slice();

        ingredients.splice(index, 1);

        updateField('ingredients', ingredients);
    }

    const addNewInstruction = () => {
        const instructions = (fields.instructions ?? []).slice();

        instructions.push({
            text: '',
            timer: null,
            isOptional: true
        });

        updateField('instructions', instructions);
    }

    const removeInstruction = (index: number) => {
        const instructions = (fields.instructions ?? []).slice();

        instructions.splice(index, 1);

        updateField('instructions', instructions);
    }

    const updateInstructionField = (index: number, field: keyof Recipe['instructions'][number], value: any) => {
        const instructions = (fields.instructions ?? []).slice();

        instructions[index] = {
            ...instructions[index],
            [field]: value
        }

        updateField('instructions', instructions);
    }

    useEffect(() => {
        const recipe = store.recipes.find(r => r.id === params.id);

        if (recipe) {
            setFields({
                ...recipe
            });
        }
    }, [params.id, store.recipes]);

    const knownCuisines = store.getPossibleCuisines();
    const knownTags = store.getPossibleTags();

    const canSaveChanges = useMemo(() => {
        return !!fields.name && !!fields.description && !!fields.ingredients && !!fields.instructions && !!fields.cookTime !== null && !!fields.prepTime !== null && !!fields.cuisine && !!fields.difficulty;
    }, [fields]);

    const availableIngredientUnits = useMemo(() => {
        return Object.entries(RecipeIngredientUnit).map(([_key, value]) => ({
            label: value,
            value: value
        }));
    }, [])

    return <div className="flex flex-col gap-4">
        <RecipeEditHeader onRemove={() => setRemoveModalShown(true)} isBusy={busy} canSave={canSaveChanges} onBack={goBack} onSave={saveChanges} />

        <div className="px-2 py-3 flex flex-col gap-5">
            <PhotoUploader photoUrl={fields.photoUrl} onUploaded={e => updateField('photoUrl', e)} />

            <div className="flex flex-col gap-1.5">
                <Input
                    className="h-8"
                    placeholder="Recipe title"
                    value={fields.name!}
                    onChange={e => updateField('name', e.target.value)}
                />

                <Textarea
                    placeholder="Recipe description"
                    className="h-32"
                    value={fields.description!}
                    onChange={e => updateField('description', e.target.value)} />
            </div>

            <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-1">
                    <div className="flex gap-1.5 items-center">
                        <ZapIcon size={20} />
                        <SimpleSelect
                            className="w-full"
                            onChange={e => updateField('difficulty', e)}
                            value={fields.difficulty ?? ''}
                            defaultValue={fields.difficulty ?? ''}
                            placeholder="Difficulty"
                            options={
                                [
                                    { label: 'Easy', value: RecipeDifficulty.EASY },
                                    { label: 'Medium', value: RecipeDifficulty.MEDIUM },
                                    { label: 'Hard', value: RecipeDifficulty.HARD },
                                ]
                            } />
                    </div>
                    <div className="flex gap-1.5 items-center">

                        <ClipboardClock size={20} />
                        <SimpleSelect
                            className="w-full"
                            onChange={e => updateField('prepTime', e)}
                            value={fields.prepTime ?? ''}
                            defaultValue={fields.prepTime ?? ''}
                            placeholder="Prep time"
                            options={
                                [
                                    { label: 'No prep needed', value: 0 },
                                    { label: '1 min prep time', value: 1 },
                                    { label: '5 min prep time', value: 5 },
                                    { label: '10 min prep time', value: 10 },
                                    { label: '15 min prep time', value: 15 },
                                    { label: '30 min prep time', value: 30 },
                                    { label: '45 min prep time', value: 45 },
                                    { label: '1 hour prep time', value: 60 },
                                    { label: '2 hours prep time', value: 120 },
                                ]
                            } />
                    </div>
                    <div className="flex gap-1.5 items-center">
                        <ClockIcon size={20} />
                        <SimpleSelect
                            className="w-full"
                            onChange={e => updateField('cookTime', e)}
                            value={fields.cookTime ?? ''}
                            defaultValue={fields.cookTime ?? ''}
                            placeholder="Cook time"
                            options={
                                [
                                    { label: 'No cook needed', value: 0 },
                                    { label: '1 min cook time', value: 1 },
                                    { label: '5 min cook time', value: 5 },
                                    { label: '10 min cook time', value: 10 },
                                    { label: '15 min cook time', value: 15 },
                                    { label: '30 min cook time', value: 30 },
                                    { label: '45 min cook time', value: 45 },
                                    { label: '1 hour cook time', value: 60 },
                                    { label: '1.5 hours cook time', value: 90 },
                                    { label: '2 hours cook time', value: 120 },
                                    { label: '3 hours cook time', value: 180 },
                                    { label: '4 hours cook time', value: 240 },
                                    { label: '5 hours cook time', value: 300 },
                                    { label: '6 hours cook time', value: 360 },
                                    { label: '8 hours cook time', value: 480 },
                                    { label: '10 hours cook time', value: 600 },
                                    { label: '12 hours cook time', value: 720 },
                                ]
                            } />
                    </div>
                    <div className="flex gap-1.5 items-center">
                        <EarthIcon size={20} />
                        <SimpleCombobox className="w-full" items={knownCuisines} placeholder="Cuisine" onChange={e => updateField('cuisine', e)} value={fields.cuisine} />
                    </div>
                    <div className="flex gap-1.5 items-center">
                        <TagIcon size={20} />
                        <SimpleCombobox className="w-full" items={knownTags} placeholder="Tags" onChange={e => updateField('tags', e)} value={fields.tags} multiple />
                    </div>

                </div>

            </div>

            <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold flex items-center justify-between gap-2">
                    Ingredients <SimpleSelect
                        className="w-32"
                        onChange={e => updateField('servings', e)}
                        defaultValue={fields.servings ?? 1}
                        placeholder="Servings"
                        options={
                            [
                                { label: '1 serving', value: 1 },
                                { label: '2 servings', value: 2 },
                                { label: '3 servings', value: 3 },
                                { label: '4 servings', value: 4 },
                                { label: '5 servings', value: 5 },
                                { label: '6 servings', value: 6 },
                                { label: '7 servings', value: 7 },
                                { label: '8 servings', value: 8 },
                                { label: '9 servings', value: 9 },
                                { label: '10 servings', value: 10 },
                            ]
                        } />
                </h3>
                <Separator />
                <div className="flex flex-col gap-2 justify-center">
                    {fields.ingredients!.map((ingredient, index) => {
                        return <div className="flex items-center gap-0.5">
                            <Input className="w-full" placeholder="Ingredient name" value={
                                ingredient.name
                            } onChange={e => updateIngredientField(index, 'name', e.target.value)} />

                            {isIngredientQuantitative(ingredient) && <Input
                                placeholder="Quantity"
                                type="number" value={
                                    ingredient.quantity
                                }
                                className="w-24"
                                onChange={e => updateIngredientField(index, 'quantity', parseFloat(e.target.value))} />}

                            <SimpleSelect
                                className="w-32"
                                onChange={e => updateIngredientField(index, 'unit', e)}
                                defaultValue={ingredient.unit}
                                placeholder="Unit"
                                options={
                                    availableIngredientUnits
                                } />

                            {fields.ingredients!.length > 1 && <TrashIcon className="text-red-500 min-w-8" size={24} onClick={
                                () => removeIngredient(index)
                            } />}
                        </div>
                    })}

                    <Button variant="success" onClick={addNewIngredient}>
                        <PlusIcon size={16} />
                        Add ingredient
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold flex items-center justify-between gap-2">
                    Instructions
                </h3>
                <Separator />
                <div className="flex flex-col gap-3 justify-center">
                    {fields.instructions!.map((instruction, index) => {
                        return <div className="flex items-center gap-1">
                            <div className="flex flex-col gap-0.5">
                                <div className="flex justify-center items-center w-8 h-8 min-w-8 min-h-8 rounded-full border-2 border-secondary font-bold text-lg">
                                    {index + 1}
                                </div>
                                {fields.instructions!.length > 1 && <TrashIcon className="text-red-500 min-w-8" size={20} onClick={
                                    () => removeInstruction(index)
                                } />}
                            </div>

                            <div className="w-full flex flex-col gap-0.5">
                                <Textarea className="w-full" placeholder={`Step ${index + 1} description`} value={instruction.text} onChange={e => updateInstructionField(index, 'text', e.target.value)} />
                                <div className="flex items-center gap-0.5">
                                    <SimpleSelect
                                        placeholder="Timer (optional)"
                                        className="w-64"
                                        onChange={e => updateInstructionField(index, 'timer', e)}
                                        defaultValue={instruction.timer ?? ''}
                                        options={
                                            [
                                                { label: 'No timer', value: null },
                                                { label: '1 min', value: 1 * 60 },
                                                { label: '2 min', value: 2 * 60 },
                                                { label: '3 min', value: 3 * 60 },
                                                { label: '5 min', value: 5 * 60 },
                                                { label: '7 min', value: 7 * 60 },
                                                { label: '10 min', value: 10 * 60 },
                                                { label: '15 min', value: 15 * 60 },
                                                { label: '20 min', value: 20 * 60 },
                                                { label: '30 min', value: 30 * 60 },
                                                { label: '45 min', value: 45 * 60 },
                                                { label: '1 hour', value: 60 * 60 },
                                                { label: '1.5 hours', value: 90 * 60 },
                                                { label: '2 hours', value: 120 * 60 },
                                                { label: '2.5 hours', value: 150 * 60 },
                                                { label: '3 hours', value: 180 * 60 },
                                                { label: '3.5 hours', value: 210 * 60 },
                                                { label: '4 hours', value: 240 * 60 },
                                                { label: '5 hours', value: 300 * 60 },
                                                { label: '6 hours', value: 360 * 60 },
                                            ]
                                        }
                                    />
                                    <Checkbox checked={instruction.isOptional} onChange={e => updateInstructionField(index, 'isOptional', e.target.value)} /> Optional
                                </div>
                            </div>

                        </div>
                    })}

                    <Button variant="success" onClick={addNewInstruction}>
                        <PlusIcon size={16} />
                        Add instruction
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold flex items-center justify-between gap-2">
                    Notes
                </h3>
                <Separator />
                <Textarea placeholder="Additional notes for the recipe" className="w-full h-32" rows={8} value={fields.notes!} onChange={e => updateField('notes', e.target.value)} />
            </div>
        </div>

        {!!removeModalShown && <RecipeRemoveModal onClose={() => setRemoveModalShown(false)} onConfirm={removeRecipe} />}
    </div>
}