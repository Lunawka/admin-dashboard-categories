import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from 'antd'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { object, string } from 'zod'

import { api } from '../../api/api'
import { routes } from '../../config/routes'

const loginShchema = object({
    email: string().email('Invalid email').min(1, 'Email is required'),
    password: string().min(1, 'Password is required')
})

export const LoginForm = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm({
        mode: 'onSubmit',
        resolver: zodResolver(loginShchema)
    })

    const navigate = useNavigate()

    const onLogin = async (formData) => {
        setLoading(true)
        setError('')

        const response = await api
            .post('/auth/login/', formData)
            .then((data) => {
                const { access_token, refresh_token } = data.data

                localStorage.setItem('accessToken', access_token)
                localStorage.setItem('refreshToken', refresh_token)

                reset()
                navigate(routes.users)
                setLoading(false)
            })
            .catch((err) => {
                setError(err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <form
            className='flex flex-col gap-y-4'
            onSubmit={handleSubmit(onLogin)}>
            <InputGroup
                control={control}
                errors={errors}
                id='email'
                placeholder='johndoe2020@gmail.com'
                inputMode='email'
                type='email'
            />

            <InputGroup
                control={control}
                errors={errors}
                id='password'
                placeholder='..........'
                type='password'
            />

            <Button
                loading={loading}
                size='large'
                htmlType='submit'
                type='primary'>
                Log In
            </Button>
            {error ? (
                <div className='rounded-md bg-red-100 p-4 text-center text-red-500'>
                    {error}
                </div>
            ) : null}
        </form>
    )
}

const InputGroup = ({
    control,
    inputMode = 'text',
    type = 'text',
    placeholder,
    id,
    errors
}) => {
    return (
        <div className='flex flex-col items-start gap-y-1'>
            <label
                className='capitalize'
                htmlFor={id}>
                {id}
            </label>
            <Controller
                name={id}
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        id={id}
                        size='large'
                        placeholder={placeholder}
                        type={type}
                        inputMode={inputMode}
                    />
                )}
            />

            {errors?.[id] ? (
                <div className='mt-1 text-red-500'>{errors?.[id].message}</div>
            ) : null}
        </div>
    )
}
