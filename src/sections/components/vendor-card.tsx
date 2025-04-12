import { STORE } from '@/utils/types'
import { Button, Card, CardActions, CardContent, CardMedia, Rating, Stack, styled, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

interface VENDOR_CARD_PROPS {
    vendor: STORE
}

const VendorImageContainer = styled('div')(() => ({
    position: 'absolute',
    height: '100px',
    width: '100px',
    borderRadius: '50%',
    top: '100%',
    right: '50%',
    transform: 'translate(50%, -50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
}))

const VendorCard = ({ vendor }: VENDOR_CARD_PROPS) => {
  return (
    <Card variant='outlined'>
        <CardMedia
            component='div'
            sx={{ 
                height: '150px', 
                backgroundImage: `url('${vendor.logo?.link || '/images/default-user.png'}')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                padding: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                position: 'relative',
            }}
        >
            <VendorImageContainer>
                <img
                    src={vendor.logo?.link || '/images/default-user.png'}
                    alt={vendor.name}
                    style={{
                        height: '90%',
                        width: '90%',
                        borderRadius: '50%',
                    }}
                />
            </VendorImageContainer>
        </CardMedia>
        <CardContent sx={{ marginTop: '40px' }}>
            <Stack gap={1} alignItems='center'>
                <Typography variant='h6' fontWeight={600}>{vendor.name}</Typography>
                <Typography variant='body2' color='textSecondary'>{vendor.business.category}</Typography>
                <Stack gap={1} alignItems='center' direction='row'>
                    <Rating size='small' readOnly value={vendor.rating} precision={0.1} />
                    {/* <div style={{ height: '6px', width: '6px', borderRadius: '50%', background: '#000' }} /> */}
                    {/* <Typography variant='body2'>{vendor.products.toLocaleString('en-US')} products</Typography> */}
                </Stack>
            </Stack>
        </CardContent>
        <CardActions>
            <Button LinkComponent={Link} href={`/store/${vendor.slug}`} sx={{ width: '100%' }} variant='outlined'>Visit Store</Button>
        </CardActions>
    </Card>
  )
}

export default VendorCard