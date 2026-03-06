import { Navbar } from "../navigation/Navbar"

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className="w-full border-l border-r flex flex-col m-auto max-w-[600px] h-screen">
        <div className="flex flex-col h-full p-1">
            {children}
        </div>


        <Navbar />
    </div>
}