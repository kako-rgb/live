'use client'

import ContainerOverlay from '@/components/container-overlay'
import { Stack, Typography } from '@mui/material'
import React from 'react'
import ProductCard from '../components/product-card'
import useMainStore from '@/store/main-store'

const TrendingProducts = () => {

  const { topProducts } = useMainStore();

  return (
    <ContainerOverlay paddingVertical={5}>
        <Stack gap={5}>
            <Typography variant='h5' fontWeight={600}>Trending Products</Typography>

            <div className='grid gap-8 md:grid-cols-3'>
                {topProducts.map((each, index) => <ProductCard key={index} product={each} />)}
            </div>
        </Stack>
    </ContainerOverlay>
  )
}

export default TrendingProducts