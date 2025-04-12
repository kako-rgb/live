import { PRODUCT } from '@/utils/types'
import { Typography } from '@mui/material'
import React from 'react'
import ProductCard from '../components/product-card'

interface PRODUCT_RELATED_PROPS {
  products: PRODUCT[]
}

const ProductRelated = ({ products }: PRODUCT_RELATED_PROPS) => {
  return (
    <div className='flex flex-col gap-3'>
      <Typography variant='h5' fontWeight={600}>You might also like</Typography>
      <div className='grid gap-8 md:grid-cols-3'>
        {products.map((each, index) => <ProductCard product={each} key={index} />)}
      </div>
    </div>
  )
}

export default ProductRelated