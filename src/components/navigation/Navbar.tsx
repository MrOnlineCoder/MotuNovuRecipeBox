import { cn } from "@/lib/utils";
import { useRecipesStore } from "@/store/recipe";
import { useRouter, useRouterState } from "@tanstack/react-router"
import { BookOpenIcon, HeartIcon, HouseIcon, ShoppingCartIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { useShoppingStore } from "@/store/shopping";

export const Navbar: React.FC = () => {
    const route = useRouterState()

    const router = useRouter()

    const store = useRecipesStore()
    const shopping = useShoppingStore()

    const makeRecipesIcon = (
        active = false
    ) => {
        return <div className="relative">
            <BookOpenIcon size={24} strokeWidth={active ? 2.6 : 1.5} />
            {store.recipes.length > 0 && <Badge variant="default" className="absolute -right-3 -top-2 w-5 h-5">
                {store.recipes.length}
            </Badge>}
        </div>
    }

    const makeShoppingIcon = (
        active = false
    ) => {
        return <div className="relative">
            <ShoppingCartIcon size={24} strokeWidth={active ? 2.6 : 1.5} />
            {shopping.cart.length > 0 && <Badge variant="destructive" className="absolute -right-3 -top-2 w-5 h-5">
                {shopping.cart.length}
            </Badge>}
        </div>
    }

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
            icon: makeRecipesIcon(false),
            activeIcon: makeRecipesIcon(true)
        },
        {
            label: "Shopping",
            path: '/shopping',
            icon: makeShoppingIcon(false),
            activeIcon: makeShoppingIcon(true)
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