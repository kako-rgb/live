import useCartStore from '@/store/cart-store';
import { Close } from '@mui/icons-material';
import { Avatar, Button, Divider, Drawer, IconButton, Link as MuiLink, List, ListItem, ListItemAvatar, ListItemText, Typography, useMediaQuery, useTheme } from '@mui/material';
import Link from 'next/link';
import React from 'react'

interface CART_DRAWER_PROPS {
    open: boolean;
    onClose: () => void;
}

const CartDrawer = ({ onClose, open }: CART_DRAWER_PROPS) => {

    const { cart, updateCart } = useCartStore();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));

    let drawerWidth = '30%';
    if (isMediumScreen) drawerWidth = '40%'
    if (isSmallScreen) drawerWidth = '60%'

    const cartTotal = cart.reduce((acc, cartItem) => {
        const displayPrice = cartItem.product.discountPrice || cartItem.product.price;
        return acc + (displayPrice * cartItem.quantity)
    }, 0)

  return (
    <Drawer
        anchor='right'
        open={open}
        onClose={onClose}
        sx={{
            width: drawerWidth,
            [`& .MuiDrawer-paper`]: {
                width: drawerWidth
            }
        }}
    >
        <div className='flex flex-col gap-4 p-6 h-screen'>
            <IconButton sx={{ alignSelf: 'flex-end' }} size='small' onClick={onClose}><Close fontSize='small' /></IconButton>
            {cart.length === 0 && <Typography textAlign='center'>Your cart is empty</Typography>}
            {cart.length > 0 && <>
                <Typography variant='h6' fontWeight={800}>Your Cart</Typography>
                <Divider />
                <div className='h-full w-full overflow-auto'>
                    <List>

                        {cart.map((item, index) => {

                            const displayPrice = item.product.discountPrice || item.product.price;

                            return (
                                <ListItem 
                                    key={index}
                                    secondaryAction={<IconButton onClick={() => { updateCart(item.product, 'remove') }} edge='end' size='small'><Close fontSize='small' /></IconButton>}
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            src={item.product.media[0].link}
                                            alt={item.product.name}
                                            sx={{ width: 50, height: 50 }}
                                            variant='rounded'
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={<MuiLink variant='subtitle1' color='textPrimary' underline='none' fontWeight={600} component={Link} href={`/product/${item.product.slug}`}>{item.product.name}</MuiLink>}
                                        secondary={<Typography variant='body2' color='textSecondary'>{item.quantity} X KSH {displayPrice.toLocaleString('en-US')}</Typography>}
                                    />
                                </ListItem>
                            )
                        })}
                    </List>
                </div>
                <Divider />
                <div className='flex items-center gap-3 justify-between'>
                    <Typography>Subtotal</Typography>
                    <Typography fontWeight={800}>KSH {cartTotal.toLocaleString('en-US')}</Typography>
                </div>
                <div className='flex items-center gap-3'>
                    <Button LinkComponent={Link} href='/cart' onClick={onClose} color='inherit' variant='outlined' className='flex-1'>View Cart</Button>
                    <Button LinkComponent={Link}  href='/checkout' onClick={onClose} sx={{ color: 'white' }} variant='contained' className='flex-1'>Checkout</Button>
                </div>
            </>}
        </div>
    </Drawer>
  )
}

export default CartDrawer