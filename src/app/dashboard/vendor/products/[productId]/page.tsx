import { PROJECT_NAME } from '@/config'
import useAxios from '@/hooks/useAxios'
import { getServerToken } from '@/hooks/useServerToken'
import ProductForm from '@/sections/dashboard/vendor/products/product-form'
import { Metadata } from 'next'
import React from 'react'

type PROPS = {
  params: Promise<{ productId: string }>
}

export const metadata: Metadata = {
  title: `Edit Product | ${PROJECT_NAME}`
}

const EditProductPage = async ({ params }: PROPS) => {

  const { productId } = await params

  const token = await getServerToken();

  const request = useAxios(token);

  const response = await request({
    method: 'get',
    path: `/vendor/product/${productId}`
  })

  return (
    <ProductForm token={token} product={response.data.product} />
  )
}

export default EditProductPage