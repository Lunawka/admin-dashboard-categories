import { Button } from 'antd'
import React, { useState } from 'react'
import { useQuery } from 'react-query'

import { api } from '../../api/api'
import { useTableView } from '../../providers/table-view-provider'

import { UsersTable } from './table/users-table'
import { UsersCards } from './users-cards'

const getUsers = async (query) => {
    const queryParams = new URLSearchParams(query)?.toString()

    const response = await api.get('/users?' + queryParams)
    return response.data
}

export const Users = () => {
    const { tableView, onTableViewSwitch } = useTableView()

    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 0,
            pageSize: 10,
            total: 100
        }
    })

    const { isLoading, data: users } = useQuery({
        queryFn: () =>
            getUsers({
                limit: tableParams?.pagination?.pageSize,
                offset:
                    tableParams?.pagination?.pageSize * tableParams?.pagination?.current
            }),
        queryKey: ['users', { tableParams }]
    })

    // const {
    //     data: users,
    //     loading,
    //     count
    // } = useGetData({
    //     endpoint: '/users',
    //     queryParamsObject: {
    //         limit: tableParams?.pagination?.pageSize,
    //         offset: tableParams?.pagination?.pageSize * tableParams?.pagination?.current
    //     }
    // })

    return (
        <div className='mt-10'>
            <Button
                type='primary'
                onClick={onTableViewSwitch}
                className='rounded-sm bg-blue-600 px-4 py-2 text-blue-50'>
                Switch to {tableView ? 'Cards View' : 'Table View'}
            </Button>
            {tableView ? (
                <UsersTable
                    users={users}
                    loading={isLoading}
                    tableParams={tableParams}
                    setTableParams={setTableParams}
                />
            ) : (
                <UsersCards
                    users={users}
                    loading={isLoading}
                />
            )}
        </div>
    )
}
