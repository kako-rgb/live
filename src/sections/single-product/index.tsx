'use client'

import { PRODUCT } from '@/utils/types'
import React from 'react'
import ProductCarousel from './product-carousel'
import ProductContent from './product-content'
import ProductRelated from './product-related'
import ProductReviews from './product-reviews'

interface SINGLE_PRODUCT_PROPS {
    product: PRODUCT,
    relatedProducts: PRODUCT[]
}

const SingleProduct = ({ product, relatedProducts }: SINGLE_PRODUCT_PROPS) => {
  return (
    <div className='flex flex-col gap-5'>
        <div className='grid gap-6 grid-cols-2'>
            <ProductCarousel product={product} />
            <ProductContent product={product} />
        </div>
        <ProductReviews product={product} />
        <ProductRelated products={relatedProducts} />
    </div>
  )
}

export default SingleProduct