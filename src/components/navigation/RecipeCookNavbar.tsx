import { AlarmClockIcon, ClockIcon } from "lucide-react";
import { Button } from "../ui/button"
import { formatSecondsDuration } from "@/lib/format";

export const RecipeCookNavbar: React.FC<{
    title: string;
    onNextStep: () => void;
    timeLeft: number | null;
}> = (props) => {
    return <div className="w-full px-2 py-3 bg-gray-50 flex flex-col h-fit gap-3 border-t items-center justify-between">
        {props.timeLeft !== null && <div className="flex gap-1 font-bold text-blue-900">
            <AlarmClockIcon />
            {props.timeLeft > 0 ? formatSecondsDuration(props.timeLeft) : "Time's up!"}
        </div>}
        <Button variant="success" size="lg" className="w-full" onClick={props.onNextStep}>
            {props.title}
        </Button>
    </div>
}