import { PROJECT_NAME } from '@/config';
import { getServerToken } from '@/hooks/useServerToken'
import ProductForm from '@/sections/dashboard/vendor/products/product-form';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: `Create New Product | ${PROJECT_NAME}`
}

const AddProductPage = async () => {

    const token = await getServerToken();

  return (
    <ProductForm token={token} product={null} />
  )
}

export default AddProductPage