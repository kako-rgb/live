'use client'

import ContainerOverlay from '@/components/container-overlay'
import { Stack, Typography } from '@mui/material'
import React from 'react'
import ServiceCard from '../components/service-card'
import useMainStore from '@/store/main-store'

const PopularServices = () => {

  const { topServices } = useMainStore();

  return (
    <ContainerOverlay paddingVertical={5}>
        <Stack gap={5}>
            <Typography variant='h5' fontWeight={600}>Popular Services</Typography>

            <div className='grid gap-8 md:grid-cols-3'>
                {topServices.map((each, index) => <ServiceCard key={index} service={each} />)}
            </div>
        </Stack>
    </ContainerOverlay>
  )
}

export default PopularServices