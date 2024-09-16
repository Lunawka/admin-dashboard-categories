import { Table } from 'antd'

import { columns } from './columns'

export const ProductsTable = ({ products, loading, tableParams, setTableParams }) => {
    const dataSource = products?.map((product) => ({
        key: product.id,
        title: product.title,
        price: product.price,
        category: product.category,
        description: product.description
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
