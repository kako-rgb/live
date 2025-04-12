import ContainerOverlay from '@/components/container-overlay'
import Logo from '@/components/logo'
import { PROJECT_NAME } from '@/config'
import { AppBar, Stack, Toolbar, Typography, Link as MuiLink, Badge, IconButton, Divider, useTheme, useMediaQuery } from '@mui/material'
import Link from 'next/link'
import React, { MouseEvent, useState } from 'react'
import { FavoriteBorder, Menu, PersonOutline, ShoppingCartOutlined } from '@mui/icons-material';
import TopBarSearch from './top-bar-search'
import MainDrawer from './main-drawer'
import useBoolean from '@/hooks/useBoolean'
import useMainStore from '@/store/main-store'
import AccountMenu from '../components/account-menu'
import useCartStore from '@/store/cart-store'
import CartDrawer from './cart-drawer'

const TopBar = () => {

    const { cart } = useCartStore();

    const [accountAnchorEl, setAccountAnchorEl] = useState<null | HTMLElement>(null);
    const accountMenuOpen = Boolean(accountAnchorEl);
    const cartDrawerOpen = useBoolean();

    const openAccountMenu = (event: MouseEvent<HTMLElement>) => {
        setAccountAnchorEl(event.currentTarget);
    };

    const closeAccountMenu = () => {
        setAccountAnchorEl(null);
    };

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

    const drawerOpen = useBoolean()

    const { categories } = useMainStore();

    const cartTotal = cart.reduce((acc, curr) => acc + curr.quantity, 0);


  return (
    <>
        {isSmallScreen && <MainDrawer 
            onClose={drawerOpen.onFalse} 
            open={drawerOpen.value} 
        />}
        <AccountMenu
            anchorEl={accountAnchorEl}
            closeMenu={closeAccountMenu}
            open={accountMenuOpen}
        />
        <CartDrawer
            open={cartDrawerOpen.value}
            onClose={cartDrawerOpen.onFalse}
        />
        <AppBar color='inherit' sx={{ py: 2 }}>
            <Toolbar>
                <ContainerOverlay>
                    <Stack gap={3}>

                        <Stack gap={2} alignItems='center' direction='row' justifyContent='space-between'>
                            <Logo showName />
                            {!isSmallScreen && <TopBarSearch />}
                            <Stack gap={2} direction='row' alignItems='center'>
                                <Badge badgeContent={3} color='primary' >
                                    <IconButton size='small'><FavoriteBorder fontSize='small' /></IconButton>
                                </Badge>
                                <Badge badgeContent={cartTotal && <Typography variant='caption' color='white'>{cartTotal}</Typography>} color='primary' >
                                    <IconButton onClick={cartDrawerOpen.onTrue} size='small'><ShoppingCartOutlined fontSize='small' /></IconButton>
                                </Badge>
                                <IconButton
                                    onClick={openAccountMenu}
                                    size='small'
                                >
                                    <PersonOutline fontSize='small' />
                                </IconButton>
                                {isSmallScreen && <IconButton size='small' onClick={drawerOpen.onTrue}><Menu fontSize='small' /></IconButton>}
                            </Stack>
                        </Stack>

                    </Stack>
                </ContainerOverlay>
            </Toolbar>
            {!isSmallScreen && <>
                <Divider sx={{ my: 2 }} />
                <ContainerOverlay>
                    <Stack gap={2} alignItems='center' direction='row'>
                        {categories.filter(each => each.featured).map((cat, index) => <MuiLink key={index} variant='subtitle2' underline='none' color='textSecondary' component={Link} href={`/category/${cat.slug}`}>{cat.name}</MuiLink>)}
                        <MuiLink variant='subtitle2' underline='none' color='textSecondary' component={Link} href='/services'>Services</MuiLink>
                    </Stack>
                </ContainerOverlay>
            </>}
        </AppBar>
    </>
  )
}

export default TopBar