import Markdown from '@/components/markdown'
import { PRIMARY_COLOR } from '@/config'
import useCartStore from '@/store/cart-store'
import { PRODUCT } from '@/utils/types'
import { Add, FavoriteBorderOutlined, FavoriteOutlined, Remove, Share, ShareOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { Button, Chip, IconButton, Rating, Typography, Link as MuiLink } from '@mui/material'
import Link from 'next/link'
import React from 'react'

interface PRODUCT_CONTENT_PROPS {
  product: PRODUCT
}

const ProductContent = ({ product }: PRODUCT_CONTENT_PROPS) => {

  const discountPercentage = product.discountPrice === 0 ? 0 : Math.round(((product.price - product.discountPrice) / product.price) * 100);

  const displayPrice = product.discountPrice === 0 ? product.price : (product.discountPrice || 0);
  const lineThroughPrice = product.discountPrice === 0 ? 0 : product.price;

  const { cart, updateCart } = useCartStore();

  const itemInCart = cart.find(each => each.product._id === product._id);

  return (
    <div className='flex flex-col gap-4'>

      <div>
        <Typography variant='h3' fontWeight={800}>{product.name}</Typography>
        <MuiLink underline='hover' component={Link} href={`/store/${product.store.slug}`}>Sold By {product.store.name}</MuiLink>
      </div>
      <Rating value={product.rating} readOnly />
      <div className='flex gap-3 items-center'>
        <Typography className='h4' fontSize={25} fontWeight={700} color='primary'>KSH {displayPrice.toLocaleString('en-US')}</Typography>
        {product.discountPrice !== 0 && <>
          <Typography className='h5' color='textDisabled' fontWeight={600} sx={{ textDecoration: 'line-through' }}>KSH {lineThroughPrice.toLocaleString('en-US')}</Typography>
          <Chip
            sx={{ color: 'white' }}
            label={`${discountPercentage}% OFF`}
            variant='filled'
            color='primary'
          />
        </>}
      </div>

      <Markdown>
        {product.description}
      </Markdown>

      <div className='flex gap-3 items-center'>
        {!itemInCart && <Button 
          startIcon={<ShoppingCartOutlined />}
          variant='contained' 
          onClick={() => { updateCart(product, 'plus') }}
          sx={{ flex: 1, color: 'white' }}
        >
          Add To Cart
        </Button>}

        {itemInCart && <div className='flex items-center gap-3'>
          <IconButton sx={{ backgroundColor: PRIMARY_COLOR[100] }} onClick={() => { updateCart(product, 'minus') }}><Remove color='primary' /></IconButton>
          <Typography>{itemInCart.quantity}</Typography>
          <IconButton onClick={() => { updateCart(product, 'plus') }} sx={{ backgroundColor: PRIMARY_COLOR[100] }}><Add color='primary' /></IconButton>
        </div>}

        <Button startIcon={<FavoriteBorderOutlined />} variant='outlined' color='inherit' sx={{ flex: 1 }}>Add To Wishlist</Button>
        <IconButton sx={{ border: '1px solid #000', borderRadius: '10px' }}><ShareOutlined sx={{ color: 'black' }} /></IconButton>
      </div>
    </div>
  )
}

export default ProductContent