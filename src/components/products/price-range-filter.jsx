import { Slider } from 'antd'
import React from 'react'

export const PriceRangeFilter = ({ setRange, range }) => {
    const marks = {
        5: '5 $',
        200: '200$'
    }

    return (
        <div className='flex flex-col'>
            <h4 className='text-sm'>Price range filter</h4>
            <Slider
                marks={marks}
                className='w-56'
                onChange={(value) => {
                    setRange(value)
                }}
                max={200}
                min={5}
                range
                defaultValue={range}
            />
        </div>
    )
}
