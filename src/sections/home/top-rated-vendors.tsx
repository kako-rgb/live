'use client'

import ContainerOverlay from '@/components/container-overlay'
import { Stack } from '@mui/material'
import React from 'react'
import VendorCard from '../components/vendor-card'
import SectionTitle from '@/components/section-title'

interface TopRatedVendorsProps {
  stores?: any[];
}

export default function TopRatedVendors({ stores = [] }: TopRatedVendorsProps) {
  return (
    <ContainerOverlay>
      <Stack spacing={4}>
        <SectionTitle
          title="Top Rated Vendors"
          subtitle="Lorem ipsum dolor sit amet consectetur adipiscing elit"
        />
        <div className='grid gap-8 md:grid-cols-3'>
          {stores?.map((each, index) => (
            <VendorCard key={index} vendor={each} />
          ))}
        </div>
      </Stack>
    </ContainerOverlay>
  );
}