import { PRODUCT } from '@/utils/types'
import { FavoriteBorder } from '@mui/icons-material'
import { Card, CardContent, CardMedia, Chip, IconButton, Stack, Link as MuiLink, Rating, Typography, CardActionArea } from '@mui/material'
import Link from 'next/link'
import React from 'react'

interface PRODUCT_CARD_PROPS {
    product: PRODUCT
}

const ProductCard = ({ product }: PRODUCT_CARD_PROPS) => {

    const discountPercentage = product.discountPrice === 0 ? 0 : Math.round(((product.price - product.discountPrice) / product.price) * 100);

    const displayPrice = product.discountPrice === 0 ? product.price : (product.discountPrice || 0);
    const lineThroughPrice = product.discountPrice === 0 ? 0 : product.price;

  return (
    <Card variant='outlined'>
        <CardActionArea LinkComponent={Link} href={`/product/${product.slug}`}>
            <CardMedia
                component='div'
                sx={{ 
                    height: '300px', 
                    backgroundImage: `url('${product.media[0].link}')`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    padding: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                {product.discountPrice !== 0 && <Chip sx={{ color: 'white' }} label={`${discountPercentage}% OFF`} variant='filled' size='small' color='primary' />}
                {product.discountPrice === 0 && <div />}
                <IconButton color='primary' sx={{ height: 'fit-content', backgroundColor: 'white' }} size='small'><FavoriteBorder fontSize='small' /></IconButton>
            </CardMedia>
            <CardContent>
                <Stack gap={1}>
                    <Typography noWrap variant='h6' color='textPrimary' fontWeight={600}>{product.name}</Typography>
                    <Stack direction='row' gap={1} alignItems='center'>
                        <Rating size='small' readOnly value={product.rating} precision={0.1} />
                        <Typography variant='body2' color='textSecondary'>({0})</Typography>
                    </Stack>
                    <Typography color='textSecondary'>{product.store.name}</Typography>
                    <Stack direction='row' gap={1} alignItems='center'>
                        <Typography variant='subtitle1' fontWeight={600} color='primary'>Ksh {displayPrice.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 0 })}</Typography>
                        {product.discountPrice !== 0 && <Typography variant='body2' sx={{ textDecoration: 'line-through' }} color='textSecondary'>Ksh {lineThroughPrice.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 0 })}</Typography>}
                    </Stack>
                </Stack>
            </CardContent>
        </CardActionArea>
    </Card>
  )
}

export default ProductCard