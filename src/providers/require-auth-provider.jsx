import { Navigate, useLocation } from 'react-router-dom'

import { routes } from '../config/routes'

export const RequireAuthProvider = ({ children }) => {
    const location = useLocation()

    const isAuth = !!localStorage.getItem('accessToken')

    if (!isAuth) {
        return (
            <Navigate
                to={routes.login}
                state={{ from: location }}
                replace
            />
        )
    }

    return children
}
