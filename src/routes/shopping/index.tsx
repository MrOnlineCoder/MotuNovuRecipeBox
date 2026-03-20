import { Panel } from '@/components/ui/panel'
import { useShoppingStore } from '@/store/shopping';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/shopping/')({
    component: RouteComponent,
})

const EmptyShoppingCart = () => {
    return <div className="flex flex-col gap-4 px-4 pt-3">
        <h1 className="text-2xl font-bold self-center">Shopping List Generator</h1>

        <Panel className="justify-center">
            Your shopping cart is empty now. Add at least 1 recipe to make a shopping list.
        </Panel>
    </div>
}

function RouteComponent() {
    const shopping = useShoppingStore()

    const cart = shopping.cart;

    const isCartEmpty = cart.length === 0;

    if (isCartEmpty) {
        return <EmptyShoppingCart />
    }

    return <div className="flex flex-col gap-4 px-4 pt-3">
        <h1 className="text-2xl font-bold self-center">Shopping List Generator</h1>


    </div>
}
