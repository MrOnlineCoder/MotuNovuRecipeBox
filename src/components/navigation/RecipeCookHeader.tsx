import { ChevronLeftCircleIcon } from "lucide-react"
import { SimpleSelect } from "../ui/select"

export const RecipeCookHeader: React.FC<{
    onBack: () => void
    servings?: number
    onServingsChange?: (servings: number) => void
}> = ({ onBack, servings, onServingsChange }) => {
    return <div className="w-full p-2 bg-gray-50 flex h-16 border-t items-center justify-between">
        <div className="flex gap-2 items-center cursor-pointer" onClick={onBack}>
            <ChevronLeftCircleIcon size={24} />
        </div>

        <SimpleSelect
            className="w-32"
            onChange={e => onServingsChange?.(e)}
            defaultValue={servings ?? 1}
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
    </div>
}