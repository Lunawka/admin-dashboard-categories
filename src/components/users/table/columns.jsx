import { Avatar, Button } from 'antd'
import { ArrowRight } from 'lucide-react'

import { routes } from '../../../config/routes'

export const columns = [
    {
        title: 'Avatar',
        dataIndex: 'avatar',
        key: 'avatar',
        width: '60px',
        render: (_, record) =>
            record.avatar ? (
                <Avatar
                    size='large'
                    src={record.avatar}
                    alt={record.name}
                />
            ) : (
                <Avatar size='large'>{record.name.charAt(0).toUppercase()}</Avatar>
            )
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        width: '100px',
        render: (_, record) => (
            <Button
                type='primary'
                danger={record.role === 'admin'}
                ghost>
                {record.role}
            </Button>
        )
    },
    {
        title: '',
        key: 'link',
        width: '60px',
        render: (_, record) => (
            <div className='flex justify-end'>
                <Button
                    type='primary'
                    href={routes.users + record.key}>
                    <ArrowRight className='size-4' />
                </Button>
            </div>
        )
    }
]
