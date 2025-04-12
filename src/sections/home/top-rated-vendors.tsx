'use client'

import ContainerOverlay from '@/components/container-overlay'
import { VENDORS } from '@/utils/data'
import { Stack, Typography } from '@mui/material'
import React from 'react'
import VendorCard from '../components/vendor-card'
import { STORE } from '@/utils/types'

interface TOP_RATED_VENDORS_PROPS {
  stores: STORE[]
}

const TopRatedVendors = ({ stores }: TOP_RATED_VENDORS_PROPS) => {
  return (
    <ContainerOverlay paddingVertical={5}>
        <Stack gap={5}>
            <Typography variant='h5' fontWeight={600}>Top-Rated Vendors</Typography>

            <div className='grid gap-8 md:grid-cols-3'>
                {stores.map((each, index) => <VendorCard key={index} vendor={each} />)}
            </div>
        </Stack>
    </ContainerOverlay>
  )
}

export default TopRatedVendors