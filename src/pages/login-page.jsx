import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Login } from '../components/login/login'
import { MetaHead } from '../components/meta-head'
import { routes } from '../config/routes'

export const LoginPage = () => {
    const isAuth = !!localStorage.getItem('accessToken')

    const nagivate = useNavigate()

    useEffect(() => {
        if (isAuth) {
            nagivate(routes.users)
        }
    }, [])

    return (
        <>
            <MetaHead />
            <Login />
        </>
    )
}
