import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Modal } from 'antd'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { object, string } from 'zod'

import { api } from '../../api/api'

import { CategoriesTable } from './categories-table'

const getCategories = async () => {
    const response = await api.get('/categories')
    return response.data
}
const saveCategoriesSchema = object({
    name: string().min(1, 'Title is required'),
    image: string().min(1, 'Image is required')
})

export const Categories = () => {
    const { mutate: saveCategories, isLoading: isCategoriesSaving } = useMutation({
        mutationFn: ({ patchData }) => {
            api.post(`/categories/`, patchData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries('categories')
            handleCancel()
        }
    })
    const queryClient = useQueryClient()

    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        mode: 'onSubmit',
        resolver: zodResolver(saveCategoriesSchema),
        defaultValues: {
            name: '',
            image: ''
        }
    })
    const [tableParams, setTableParams] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const showModal = () => setIsModalOpen(true)

    const handleCancel = () => setIsModalOpen(false)

    const { isLoading, data: categories } = useQuery({
        queryFn: () => getCategories(),
        queryKey: ['categories']
    })

    const handleSaveCategories = (formData) => {
        saveCategories({
            patchData: formData
        })
    }

    return (
        <div className='mt-10'>
            <Button
                onClick={showModal}
                type='primary'
                className='rounded-sm bg-blue-600 px-4 py-2 text-blue-50'>
                Create a category
            </Button>
            <Modal
                footer={[]}
                name={<>New category</>}
                open={isModalOpen}
                onCancel={handleCancel}>
                <form
                    onSubmit={handleSubmit(handleSaveCategories)}
                    className='flex flex-col gap-y-4'>
                    <InputGroup
                        control={control}
                        errors={errors}
                        id='name'
                        placeholder='New Balance 530'
                    />
                    <InputGroup
                        control={control}
                        errors={errors}
                        id='image'
                        placeholder='Best sneaker for 2023...'
                    />
                    <div className='mt-4 flex items-center justify-end gap-x-2'>
                        <Button
                            htmlType='button'
                            key='back'
                            onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button
                            disabled={isCategoriesSaving}
                            htmlType='submit'
                            type='primary'>
                            Save
                        </Button>
                    </div>
                </form>
            </Modal>
            <CategoriesTable
                categories={categories}
                loading={isLoading}
                tableParams={tableParams}
                setTableParams={setTableParams}
            />
        </div>
    )
}

const InputGroup = ({
    control,
    inputMode = 'text',
    type = 'text',
    placeholder,
    id,
    errors
}) => {
    return (
        <div className='flex flex-col items-start gap-y-1'>
            <label
                className='capitalize'
                htmlFor={id}>
                {id}
            </label>
            <Controller
                name={id}
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        id={id}
                        size='large'
                        placeholder={placeholder}
                        type={type}
                        inputMode={inputMode}
                    />
                )}
            />

            {errors?.[id] ? (
                <div className='mt-1 text-red-500'>{errors?.[id].message}</div>
            ) : null}
        </div>
    )
}
