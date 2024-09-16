import { Button } from 'antd'
import React, { useState } from 'react'
import { useQuery } from 'react-query'

import { api } from '../../api/api'

import { CategoriesTable } from './categories-table'

const getCategories = async () => {
    const response = await api.get('/categories')
    return response.data
}

export const Categories = () => {
    const [tableParams, setTableParams] = useState()

    const { isLoading, data: categories } = useQuery({
        queryFn: () => getCategories(),
        queryKey: ['categories']
    })

    return (
        <div className='mt-10'>
            <Button
                type='primary'
                className='rounded-sm bg-blue-600 px-4 py-2 text-blue-50'>
            </Button>
            <CategoriesTable
                categories={categories}
                loading={isLoading}
                tableParams={tableParams}
                setTableParams={setTableParams}
            />
        </div>
    )
}
