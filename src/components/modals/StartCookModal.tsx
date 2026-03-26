import { useState } from "react"
import { Button } from "../ui/button"
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "../ui/drawer"
import { Input } from "../ui/input"
import { MinusIcon, PlusIcon } from "lucide-react"

export const StartCookModal: React.FC<{
    onClose: () => void
    onConfirm: (servings: number) => void
    baseServings: number
}> = ({
    onClose,
    onConfirm,
    baseServings
}) => {
        const [count, setCount] = useState(baseServings)

        return <Drawer open={true} direction="bottom" dismissible={false} onClose={onClose}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>How many servings do you wish to cook?</DrawerTitle>
                    <DrawerDescription>Ingredients will be adjusted accordingly.</DrawerDescription>
                </DrawerHeader>
                <div className="w-full items-center justify-center flex gap-2">
                    <MinusIcon
                        size={20}
                        onClick={() => setCount(count - 1)} />
                    <Input
                        type="number"
                        value={count}
                        onChange={(e) => setCount(Number(e.target.value))}
                        className="text-center w-32"
                        min="1"
                        max="100" />
                    <PlusIcon size={20}
                        onClick={() => setCount(count + 1)} />
                </div>

                <DrawerFooter>
                    <Button
                        disabled={!count || count < 1 || count > 100}
                        onClick={() => onConfirm(count)}

                    >Start cooking</Button>
                    <Button
                        variant="outline"
                        onClick={onClose}>Cancel</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    }