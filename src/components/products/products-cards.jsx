import { Badge, Card, Carousel, Tooltip } from 'antd'
import Meta from 'antd/es/card/Meta'

import { trunc } from '../../utils/utils'
import { ImageWithFallback } from '../shared/image-with-fallback'

export const ProductsCards = ({ products, loading }) => {
    return (
        <div className='mt-10 grid grid-cols-4 gap-4 p-4'>
            {products?.map((product) => {
                return (
                    <Card
                        loading={loading}
                        hoverable
                        cover={
                            <Carousel
                                arrows
                                afterChange={() => {}}>
                                {product.images.map((img) => (
                                    <ImageWithFallback
                                        src={img}
                                        alt={product.title}
                                    />
                                ))}
                            </Carousel>
                        }>
                        <Meta
                            title={product.title}
                            description={
                                <Tooltip title={product.description}>
                                    <span>{trunc(product.description, 50)}</span>
                                </Tooltip>
                            }
                        />
                        <Badge
                            color='#2563eb'
                            showZero
                            count={product.price + ' $'}
                            className='mt-4'></Badge>
                    </Card>
                )
            })}
        </div>
    )
}
