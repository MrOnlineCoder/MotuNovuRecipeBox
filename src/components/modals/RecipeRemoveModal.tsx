import { Button } from "../ui/button"
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "../ui/drawer"

export const RecipeRemoveModal: React.FC<{
    onConfirm: () => void
    onClose: () => void
}> = ({ onConfirm, onClose }) => {

    return <Drawer open={true} direction="bottom" dismissible={false} onClose={onClose}>
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>Are you sure you want to delete this recipe?</DrawerTitle>
                <DrawerDescription>
                    This cannot be undone.
                </DrawerDescription>
            </DrawerHeader>

            <DrawerFooter>
                <Button
                    onClick={onConfirm}
                    variant="destructive"
                >Confirm</Button>
                <Button
                    variant="outline"
                    onClick={onClose}>Cancel</Button>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
}