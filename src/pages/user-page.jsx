import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import { api } from '../api/api'

const getUser = async (id) => {
    const response = await api.get(`/users/${id}`)
    return response.data
}

export const UserPage = () => {
    const { id } = useParams()

    const { data: user, isLoading } = useQuery({
        queryFn: () => getUser(id),
        queryKey: ['user']
    })

    if (isLoading) {
        return <UserSkeleton />
    }

    return (
        <article className='mx-auto mt-20 size-60 rounded-lg bg-blue-500 p-4'>
            <img
                className='mx-auto size-20 rounded-full'
                src={user.avatar}
                alt={user.name}
            />
            <h1 className='mt-4 text-center text-3xl text-white'>{user.name}</h1>
            <div className='mt-2 text-center text-xl text-slate-300'>{user.email}</div>
        </article>
    )
}

const UserSkeleton = () => {
    return (
        <article className='mx-auto mt-20 size-60 rounded-lg bg-blue-500 p-4'>
            <div className='mx-auto size-20 animate-pulse rounded-full bg-blue-200' />
            <div className='mx-auto mt-4 h-6 w-32 animate-pulse rounded-md bg-blue-200'></div>
            <div className='mx-auto mt-2 h-6 w-20 animate-pulse rounded-md bg-blue-200'></div>
        </article>
    )
}
