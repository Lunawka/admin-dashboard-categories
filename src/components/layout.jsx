import React from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from './header'
import { MetaHead } from './meta-head'

export const Layout = () => {
    return (
        <>
            <MetaHead />
            <Header />
            <main>
                <div className='container mx-auto'>
                    <Outlet />
                </div>
            </main>
        </>
    )
}
