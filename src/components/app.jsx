import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { routes } from '../config/routes'
import { ErrorPage } from '../pages/error-page'
import { LoginPage } from '../pages/login-page'
import { CategoriesPage } from '../pages/categories-page'
import { ProductsPage } from '../pages/products-page'
import { UserPage } from '../pages/user-page'
import { UsersPage } from '../pages/users-page'
import { RequireAuthProvider } from '../providers/require-auth-provider'

import { Layout } from './layout'

export const App = () => {
    const router = createBrowserRouter([
        {
            path: routes.users,
            element: <Layout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    index: true,
                    element: (
                        <RequireAuthProvider>
                            <UsersPage />
                        </RequireAuthProvider>
                    )
                },
                {
                    path: routes.user,
                    element: (
                        <RequireAuthProvider>
                            <UserPage />
                        </RequireAuthProvider>
                    )
                },
                {
                    path: routes.products,
                    element: (
                        <RequireAuthProvider>
                            <ProductsPage />
                        </RequireAuthProvider>
                    )
                },
                {
                    path: routes.categories,
                    element: (
                        <RequireAuthProvider>
                            <CategoriesPage />
                        </RequireAuthProvider>
                    )
                }
            ]
        },
        {
            path: routes.login,
            element: <LoginPage />
        },
        {
            path: '*',
            element: <ErrorPage />
        }
    ])

    return <RouterProvider router={router} />
}
