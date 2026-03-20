import { cn } from "@/lib/utils"

export const Panel = ({ children, onClick, className }: { children: React.ReactNode, onClick?: () => void, className?: string }) => {
    return <div onClick={onClick} className={
        cn("border-secondary border rounded-sm p-2 flex flex-col gap-2 w-full self-center bg-accent", className)
    }>
        {children}
    </div>
}