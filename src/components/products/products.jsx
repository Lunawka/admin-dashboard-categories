import { Button } from 'antd'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useDebounceValue } from 'usehooks-ts'

import { api } from '../../api/api'
import { useTableView } from '../../providers/table-view-provider'
import { SearchBar } from '../shared/search-bar'

import { CategoryFilter } from './category-filters'
import { PriceRangeFilter } from './price-range-filter'
import { ProductsCards } from './products-cards'
import { ProductsTable } from './table/products-table'

const getProducts = async (queryParamsObject) => {
    const queryParams = new URLSearchParams(queryParamsObject)?.toString()

    const response = await api.get('/products?' + queryParams)
    return response.data
}

export const Products = () => {
    const { tableView, onTableViewSwitch } = useTableView()

    const [search, setSearch] = useDebounceValue('', 200)
    const [category, setCategory] = useState(0)
    const [priceRange, setPriceRange] = useState([5, 200])

    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 0,
            pageSize: 10,
            total: 100
        }
    })

    const { isLoading, data: products } = useQuery({
        queryFn: () =>
            getProducts({
                limit: tableParams?.pagination?.pageSize,
                offset:
                    tableParams?.pagination?.pageSize * tableParams?.pagination?.current,
                title: search,
                categoryId: category ? category : '',
                price_min: priceRange[0],
                price_max: priceRange[1]
            }),
        queryKey: ['products', { search, category, priceRange, tableParams }]
    })

    // const {
    //     data: products,
    //     loading,
    //     count
    // } = useGetData({
    //     endpoint: '/products',
    //     queryParamsObject: {
    //         limit: tableParams?.pagination?.pageSize,
    //         offset: tableParams?.pagination?.pageSize * tableParams?.pagination?.current,
    //         title: search,
    //         categoryId: category ? category : '',
    //         price_min: priceRange[0],
    //         price_max: priceRange[1]
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
                <>
                    <div className='mt-10 flex items-center justify-between gap-6'>
                        <SearchBar
                            search={search}
                            setSearch={setSearch}
                        />
                        <CategoryFilter
                            setCategory={setCategory}
                            category={category}
                        />
                        <PriceRangeFilter
                            range={priceRange}
                            setRange={setPriceRange}
                        />
                    </div>
                    <ProductsTable
                        products={products}
                        loading={isLoading}
                        tableParams={tableParams}
                        setTableParams={setTableParams}
                    />
                </>
            ) : (
                <ProductsCards
                    products={products}
                    loading={isLoading}
                />
            )}
        </div>
    )
}
