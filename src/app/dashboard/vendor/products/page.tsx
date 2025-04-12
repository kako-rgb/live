import { PROJECT_NAME } from '@/config'
import { getServerToken } from '@/hooks/useServerToken'
import ProductsList from '@/sections/dashboard/vendor/products/products-list'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: `Vendor Products | ${PROJECT_NAME}`
}

const VendorProductsPage = async () => {

    const token = await getServerToken();

  return (
    <ProductsList token={token} />
  )
}

export default VendorProductsPage