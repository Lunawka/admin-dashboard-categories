import React from 'react'
import { Link } from 'react-router-dom'

import { routes } from '../config/routes'

export const ErrorPage = () => {
    return (
        <div className='flex items-center justify-center flex-col gap-y-6 h-screen'>
            <h1 className='bg-red-50 p-10 rounded-md text-red-500 text-center text-4xl'>
                {' '}
                This page do not exit
            </h1>
            <Link
                className='px-4 py-2 bg-slate-800 text-slate-50 rounded-md hover:bg-slate-700 transition-colors '
                to={routes.home}>
                Go to home page
            </Link>
        </div>
    )
}
