export const Panel = ({ children }: { children: React.ReactNode }) => {
    return <div className="border-secondary border rounded-sm p-2 flex flex-col gap-2 w-full self-center bg-accent">
        {children}
    </div>
}