import { Navbar } from "../navigation/Navbar"

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className="w-full border-l border-r flex flex-col m-auto max-w-[600px] h-[100dvh]">
        <div className="flex flex-col h-full px-1 overflow-auto">
            {children}
        </div>


        <Navbar />
    </div>
}