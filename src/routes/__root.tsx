import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { MainLayout } from '@/components/layouts/MainLayout'
import { useRecipesStore } from '@/store';

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
            </MainLayout>
        </React.Fragment>
    )
}
