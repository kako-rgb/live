import { PRODUCT } from '@/utils/types'
import { Rating, Typography } from '@mui/material'
import React from 'react'

interface CUSTOMER_REVIEWS_PROPS {
    product: PRODUCT
}

const CustomerReviews = ({ product }: CUSTOMER_REVIEWS_PROPS) => {
  return (
    <div className='flex flex-col gap-4'>
        <Typography variant='h5' fontWeight={600}>Customer Reviews</Typography>
        <Rating
            size='small'
            readOnly
            value={product.rating}
        />
    </div>
  )
}

export default CustomerReviews