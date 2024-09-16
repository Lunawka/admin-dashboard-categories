import { Table } from 'antd'

import { columns } from './columns'

export const UsersTable = ({ users, loading, tableParams, setTableParams }) => {
    const dataSource = users?.map((user) => ({
        key: user.id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        role: user.role
    }))

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : sorter.field
        })
    }

    return (
        <Table
            onChange={handleTableChange}
            bordered
            className='mt-10'
            dataSource={dataSource}
            columns={columns}
            loading={loading}
            pagination={tableParams?.pagination}
        />
    )
}
