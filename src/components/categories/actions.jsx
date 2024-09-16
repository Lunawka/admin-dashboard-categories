import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Modal } from 'antd'
import { Edit, Loader2, Trash } from 'lucide-react'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { object, string } from 'zod'

import { api } from '../../api/api'

export const Actions = ({ product }) => {
    return (
        <div className='flex items-center gap-2'>
            <EditModal product={product} />
            <DeleteModal product={product} />
        </div>
    )
}

const DeleteModal = ({ product }) => {
    const queryClient = useQueryClient()

    const showModal = () => {
        setIsModalOpen(true)
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const { mutate: removeProduct, isLoading } = useMutation({
        mutationFn: (productKey) => api.delete(`categories/${productKey}`),
        onSuccess: () => {
            queryClient.invalidateQueries('categories')
            handleCancel()
        }
    })

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleDeleteProduct = () => {
        removeProduct(product?.key)
    }

    return (
        <>
            <Button
                type='primary'
                danger
                onClick={showModal}>
                <Trash className='size-4' />
            </Button>
            <Modal
                title={
                    <>
                        Delete
                        <span className='font-bold text-blue-600'> {product.title}</span>
                    </>
                }
                footer={[
                    <Button
                        key='back'
                        onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button
                        disabled={isLoading}
                        key='submit'
                        type='primary'
                        danger
                        onClick={handleDeleteProduct}>
                        {isLoading ? (
                            <Loader2 className='size-4 animate-spin' />
                        ) : (
                            'Delete'
                        )}
                    </Button>
                ]}
                open={isModalOpen}
                onCancel={handleCancel}></Modal>
        </>
    )
}

const editProductSchema = object({
    name: string().min(1, 'Title is required'),
    image: string().min(1, 'Image is required')
})

const EditModal = ({ product }) => {
    const {
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        mode: 'onSubmit',
        resolver: zodResolver(editProductSchema),
        defaultValues: {
            name: product?.title,
            image: product?.image
        }
    })

    const queryClient = useQueryClient()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => setIsModalOpen(true)

    const handleCancel = () => setIsModalOpen(false)

    const { mutate: editProduct, isLoading: isProductEditing } = useMutation({
        mutationFn: ({ patchData, productId }) => {
            api.put(`/categories/${productId}`, patchData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries('categories')
            handleCancel()
        }
    })

    const handleEditProduct = (formData) => {
        editProduct({
            patchData: formData,
            productId: product?.key
        })
    }

    return (
        <>
            <Button
                type='primary'
                onClick={showModal}>
                <Edit className='size-4' />
            </Button>
            <Modal
                footer={[]}
                name={
                    <>
                        Edit
                        <span className='font-bold text-blue-600'> {product.title}</span>
                    </>
                }
                open={isModalOpen}
                onCancel={handleCancel}>
                <form
                    onSubmit={handleSubmit(handleEditProduct)}
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
                            disabled={isProductEditing}
                            htmlType='submit'
                            type='primary'>
                            {isProductEditing ? (
                                <Loader2 className='size-4 animate-spin' />
                            ) : (
                                'Edit'
                            )}
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
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
