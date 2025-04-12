import { Divider } from '@mui/material'
import React from 'react'
import ReviewForm from './review-form'
import CustomerReviews from './customer-reviews'
import { PRODUCT } from '@/utils/types'

interface PRODUCT_REVIEWS_PROPS {
  product: PRODUCT
}

const ProductReviews = ({ product }: PRODUCT_REVIEWS_PROPS) => {
  return (
    <div className='flex flex-col md:flex-row gap-10'>
      <div className='flex-1'><CustomerReviews product={product} /></div>
      <Divider orientation='vertical' flexItem />
      <div className='flex-1'><ReviewForm /></div>
    </div>
  )
}

export default ProductReviews