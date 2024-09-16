import React from 'react'

import { LoginForm } from './login-form'

export const Login = () => {
    return (
        <div className='flex h-screen flex-col items-center justify-center gap-y-6 bg-blue-500'>
            <div className='flex flex-col gap-y-6 rounded-md bg-blue-50 p-8'>
                <h1 className='text-center text-3xl text-blue-950'>Login to Dashboard</h1>
                <LoginForm />
            </div>
        </div>
    )
}
