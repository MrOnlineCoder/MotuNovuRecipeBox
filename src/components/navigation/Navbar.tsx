import { cn } from "@/lib/utils";
import { useRouter, useRouterState } from "@tanstack/react-router"
import { BookOpenIcon, HeartIcon, HouseIcon, ShoppingCartIcon } from "lucide-react";

export const Navbar: React.FC = () => {
    const route = useRouterState()

    const router = useRouter()

    const buttons = [
        {
            label: "Home",
            path: '/',
            icon: <HouseIcon size={24} />,
            activeIcon: <HouseIcon size={24} strokeWidth={2.6} />
        },
        {
            label: "Recipes",
            path: '/recipes',
            icon: <BookOpenIcon size={24} />,
            activeIcon: <BookOpenIcon size={24} strokeWidth={2.6} />
        },
        {
            label: "Shopping",
            path: '/shopping',
            icon: <ShoppingCartIcon size={24} />,
            activeIcon: <ShoppingCartIcon size={24} strokeWidth={2.6} />
        }
    ];

    const changeRoute = (index: number) => {
        const button = buttons[index]

        router.navigate({
            to: button.path,
        })
    }

    const activeRouteIndex = buttons.findIndex(button => button.path === route.location.pathname)

    return <div className="w-full p-2 bg-gray-50 flex h-16 border-t justify-center items-center">
        {buttons.map((button, index) => (
            <div
                className="flex flex-col items-center gap-1 min-w-24 w-24 cursor-pointer"
                key={button.label}
                onClick={() => changeRoute(index)}>
                {index === activeRouteIndex ? button.activeIcon : button.icon}
                <span className={
                    cn("text-sm", {
                        "font-bold": index === activeRouteIndex,
                    })
                }>{button.label}</span>
            </div>
        ))}
    </div >
}