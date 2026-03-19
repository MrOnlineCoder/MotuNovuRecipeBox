import { Button } from "../ui/button"

export const RecipeCookNavbar: React.FC<{
    title: string;
    onNextStep: () => void;
}> = (props) => {
    return <div className="w-full px-2 py-3 bg-gray-50 flex h-16 border-t items-center justify-between">
        <Button variant="success" size="lg" className="w-full" onClick={props.onNextStep}>
            {props.title}
        </Button>
    </div>
}