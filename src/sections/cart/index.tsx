'use client'

import useCartStore from '@/store/cart-store'
import { Add, Close, Delete, LocalMallOutlined, Remove } from '@mui/icons-material';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid2, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react'

const CartSection = () => {

    const { cart, updateCart } = useCartStore();

    const cartTotal = cart.reduce((acc, cartItem) => {
        const displayPrice = cartItem.product.discountPrice || cartItem.product.price;
        return acc + (displayPrice * cartItem.quantity)
    }, 0)

    const cartTotalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className='flex flex-col gap-5'>
        <Typography variant='h5' fontWeight={800}>Your cart</Typography>

        {cart.length === 0 && <div className='flex flex-col gap-3 items-center'>

            <div className='h-[65px] w-[65px] rounded-full bg-gray-100 flex items-center justify-center'>
                <LocalMallOutlined fontSize='large' sx={{ color: 'grey' }} />
            </div>
            <Typography variant='h6' fontWeight={600}>Your Cart Is Empty</Typography>
            <Typography color='textSecondary'>Looks like you haven't added anything to your cart</Typography>
            <Button sx={{ color: 'white' }} variant='contained' LinkComponent={Link} href='/'>Start Shopping</Button>

        </div>}

        {cart.length > 0 && <Grid2 container spacing={2}>

            <Grid2 size={{ xs: 12, md: 8 }}>
                <Card sx={{ p: 2, borderRadius: 2 }} variant='outlined'>
                    <CardContent>
                        <List>
                            {cart.map((item, index) => {
    
                                const displayPrice = item.product.discountPrice || item.product.price;
    
                                return (
                                    <>
                                        <ListItem
                                            key={index}
                                            secondaryAction={<div className='flex flex-col gap-3'>
                                                <div className='flex items-center gap-3'>
                                                    <IconButton size='small' onClick={() => { updateCart(item.product, 'minus') }}><Remove /></IconButton>
                                                    <Typography>{item.quantity}</Typography>
                                                    <IconButton size='small' onClick={() => { updateCart(item.product, 'plus') }}><Add /></IconButton>
                                                </div>
                                                <Button variant='outlined' onClick={() => { updateCart(item.product, 'remove') }} color='error' startIcon={<Delete />}>Remove</Button>
                                            </div>}
                                        >
                                            <ListItemAvatar>
                                                <Avatar
                                                    src={item.product.media[0].link}
                                                    alt={item.product.name}
                                                    sx={{ width: 80, height: 80, mr: 2 }}
                                                    variant='rounded'
                                                />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={<Typography variant='subtitle1' fontWeight={600}>{item.product.name}</Typography>}
                                                secondary={<Typography variant='body2' color='textSecondary'>{item.quantity} X KSH {displayPrice.toLocaleString('en-US')}</Typography>}
                                            />
                                        </ListItem>
                                        {(index + 1) < cart.length && <Divider component='li' sx={{ mt: 1 }} />}
                                    </>
                                )
                            })}
                        </List>
                    </CardContent>
                </Card>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 4 }}>
                <Card sx={{ p: 2, borderRadius: 2 }} variant='outlined'>
                    <CardHeader
                        title={<Typography variant='h5' fontWeight={600}>Order Summary</Typography>}
                    />
                    <CardContent>
                        <div className='flex flex-col gap-4'>
                            <div className='flex items-center justify-between gap-3'>
                                <Typography color='textSecondary'>Subtotal ({cartTotalItems} items)</Typography>
                                <Typography fontWeight={600}>KSH {cartTotal.toLocaleString('en-US')}</Typography>
                            </div>
                            <Divider />
                            <div className='flex items-center justify-between gap-3'>
                                <Typography fontWeight={600}>Total</Typography>
                                <Typography fontWeight={600}>KSH {cartTotal.toLocaleString('en-US')}</Typography>
                            </div>
                        </div>
                    </CardContent>
                    <CardActions>
                        <div className='flex flex-col gap-3 w-full'>
                            <Button LinkComponent={Link} href='/checkout' className='w-full' sx={{ color: 'white' }} variant='contained'>Proceed To Checkout</Button>
                            <Button LinkComponent={Link} href='/' className='w-full'>Continue Shopping</Button>
                        </div>
                    </CardActions>
                </Card>
            </Grid2>

        </Grid2>}

    </div>
  )
}

export default CartSection