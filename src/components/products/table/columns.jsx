import { Tooltip } from 'antd'

import { trunc } from '../../../utils/utils'

import { Actions } from './cells/actions'

export const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title'
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price'
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        render: (_, record) => (
            <Tooltip title={record.description}>
                <span>{trunc(record.description, 50)}</span>
            </Tooltip>
        )
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        render: (_, record) => record.category.name
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: (_, record) => <Actions product={record} />
    }
]
