import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { MainLayout } from '@/components/layouts/MainLayout'
import { useRecipesStore } from '@/store/recipe';
import { Toaster } from '@/components/ui/sonner';

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    const store = useRecipesStore();

    React.useEffect(() => {
        store.fetchAll();
    }, []);

    return (
        <React.Fragment>
            <MainLayout>
                <Outlet />

                <Toaster />
            </MainLayout>
        </React.Fragment>
    )
}
