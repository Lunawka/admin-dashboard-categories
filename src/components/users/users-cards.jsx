import { Button, Card } from 'antd'
import Meta from 'antd/es/card/Meta'

import { ImageWithFallback } from '../shared/image-with-fallback'

export const UsersCards = ({ users, loading }) => {
    return (
        <div className='mt-10 grid grid-cols-4 gap-4 p-4'>
            {users?.map((user) => {
                return (
                    <Card
                        loading={loading}
                        hoverable
                        cover={
                            <ImageWithFallback
                                src={user.avatar}
                                alt={user.name}
                            />
                        }>
                        <Meta
                            title={user.name}
                            description={user.email}
                        />
                        <Button
                            className='mt-4'
                            type='primary'
                            danger={user.role === 'admin'}
                            ghost>
                            {user.role}
                        </Button>
                    </Card>
                )
            })}
        </div>
    )
}
