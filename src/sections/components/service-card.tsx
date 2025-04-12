import { SERVICE, SERVICE_PRICING_TYPE_ENUMS } from '@/utils/types'
import { CalendarMonthOutlined, FavoriteBorder, FavoriteOutlined, PinDrop, PinDropOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { Button, Card, CardActions, CardContent, CardMedia, Chip, IconButton, Stack, Link as MuiLink, Rating, Typography, CardActionArea } from '@mui/material'
import Link from 'next/link'
import React from 'react'

interface SERVICE_CARD_PROPS {
    service: SERVICE
}

const ServiceCard = ({ service }: SERVICE_CARD_PROPS) => {

    const priceFrequency = SERVICE_PRICING_TYPE_ENUMS.find(each => each.name === service.pricing.type)?.symbol || ''

    const discountPercentage = service.pricing.discountPrice === 0 ? 0 : Math.round((service.pricing.discountPrice / service.pricing.price) * 100);

    const displayPrice = service.pricing.discountPrice === 0 ? service.pricing.price : service.pricing.discountPrice;
    const lineThroughPrice = service.pricing.discountPrice === 0 ? 0 : service.pricing.price;

  return (
    <Card variant='outlined'>
        <CardActionArea LinkComponent={Link} href={`/service/${service.slug}`}>
            <CardMedia
                component='div'
                sx={{ 
                    height: '300px', 
                    backgroundImage: `url('${service.media[0].link}')`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    padding: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                {service.pricing.discountPrice !== 0 && <Chip sx={{ color: 'white' }} label={`${discountPercentage}% OFF`} variant='filled' size='small' color='secondary' />}
                {service.pricing.discountPrice === 0 && <div />}
                <IconButton color='secondary' sx={{ height: 'fit-content', backgroundColor: 'white' }} size='small'><FavoriteBorder fontSize='small' /></IconButton>
            </CardMedia>
            <CardContent>
                <Stack gap={1}>
                    <Typography noWrap variant='h6' color='textPrimary' fontWeight={600}>{service.name}</Typography>
                    <Stack direction='row' gap={1} alignItems='center'>
                        <Rating size='small' readOnly value={service.rating} precision={0.1} />
                        <Typography variant='body2' color='textSecondary'>(0)</Typography>
                    </Stack>
                    <div className='flex items-center gap-3'>
                        <PinDropOutlined fontSize='small' />
                        <Typography variant='caption' color='textSecondary'>{service.store.business.address}</Typography>
                    </div>
                    <Typography color='textSecondary'>{service.store.name}</Typography>
                    <Stack direction='row' gap={1} alignItems='center'>
                        <Typography variant='subtitle1' fontWeight={600} color='secondary'>Ksh {displayPrice.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 0 })}/{priceFrequency}</Typography>
                        {service.pricing.discountPrice !== 0 && <Typography variant='body2' sx={{ textDecoration: 'line-through' }} color='textSecondary'>Ksh {lineThroughPrice.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 0 })}/{priceFrequency}</Typography>}
                    </Stack>
                </Stack>
            </CardContent>

        </CardActionArea>
    </Card>
  )
}

export default ServiceCard