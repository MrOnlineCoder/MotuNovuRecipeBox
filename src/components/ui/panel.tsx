export const Panel = ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => {
    return <div onClick={onClick} className="border-secondary border rounded-sm p-2 flex flex-col gap-2 w-full self-center bg-accent">
        {children}
    </div>
}