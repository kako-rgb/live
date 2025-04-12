import ContainerOverlay from '@/components/container-overlay'
import { PROJECT_NAME } from '@/config'
import { Button, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const BecomeVendor = () => {
  return (
    <div style={{ backgroundColor: '#F5F5F5' }}>
        <ContainerOverlay paddingVertical={5}>
            <div className='flex flex-col md:flex-row gap-12 items-center justify-between'>
                <div className='flex flex-3/5 flex-col gap-3'>
                    <Typography variant='h5' fontWeight={600}>Become a Vendor on {PROJECT_NAME}</Typography>
                    <div>
                        <Typography color='textSecondary'>Join thousands of vendors selling products and services on our platform.</Typography>
                        <Typography color='textSecondary'>Reach more customers and grow your business with {PROJECT_NAME}</Typography>
                    </div>
                    <div className='flex items-center gap-3'>
                        <Button LinkComponent={Link} href='/auth/register?interest=vendor' variant='contained' sx={{ color: 'white' }}>Sell Products</Button>
                        <Button LinkComponent={Link} href='/auth/register?interest=vendor' variant='contained' color='secondary'>Offer Services</Button>
                    </div>
                </div>
                <img
                    src='/images/banner-two.jpg'
                    alt='Become a Vendor'
                    className='object-cover object-center rounded-xl flex-2/5'
                    style={{ height: '400px', width: '100%' }}
                />
            </div>
        </ContainerOverlay>
    </div>
  )
}

export default BecomeVendor