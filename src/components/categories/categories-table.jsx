import React from 'react';
import { Table} from 'antd'

import { Actions } from './actions'



// import { z } from 'zod';

// const schema = z.object({
//   image: z.string().url(),
//   title: z.string().min(1, 'Title is required'),
//   actions: z.string().min(1, 'Action is required'),
// });

const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title'
    },
    {
        title: 'Image',
        dataIndex: 'image',
        key: 'image'
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: (_, record) => <Actions product={record} />
    }
]




export const CategoriesTable = ({ categories, loading, setTableParams }) => {
    const dataSource = categories?.map((category) => ({
        key: category.id,
        title: category.name,
        image: category.image
    }))

    const handleTableChange = () => {
        setTableParams()
    }

    return (
        
        <Table
            onChange={handleTableChange}
            bordered
            className='mt-10'
            dataSource={dataSource}
            columns={columns}
            loading={loading}
        />
    )
}
