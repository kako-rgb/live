import Logo from '@/components/logo'
import useClientUser from '@/hooks/useClientUser'
import { USER } from '@/utils/types'
import { Menu, Person } from '@mui/icons-material'
import { AppBar, Button, Divider, IconButton, Toolbar, useMediaQuery, useTheme } from '@mui/material'
import React, { MouseEvent, useState } from 'react'
import AccountMenu from '../components/account-menu'

interface DASHBBOARD_TOP_BAR_PROPS {
    openDrawer: () => void
}

const DashboardTopBar = ({ openDrawer }: DASHBBOARD_TOP_BAR_PROPS) => {

    const user: USER | null | undefined = useClientUser();

    const [accountAnchorEl, setAccountAnchorEl] = useState<null | HTMLElement>(null);
    const accountMenuOpen = Boolean(accountAnchorEl);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const openAccountMenu = (event: MouseEvent<HTMLElement>) => {
        setAccountAnchorEl(event.currentTarget);
    };

    const closeAccountMenu = () => {
        setAccountAnchorEl(null);
    };

  return (
    <>
        <AccountMenu
            anchorEl={accountAnchorEl}
            closeMenu={closeAccountMenu}
            open={accountMenuOpen}
        />
        <AppBar elevation={0} color='inherit'>
            <Toolbar>
                <div className='flex items-center justify-between gap-10 w-full'>
                    <Logo />
                    <div className='flex items-center gap-3'>
                        {isSmallScreen && <IconButton size='small' onClick={openDrawer}><Menu fontSize='small' /></IconButton>}
                        <Button onClick={openAccountMenu} color='inherit' startIcon={<Person />}>Hello {user?.firstName}</Button>
                    </div>
                </div>
            </Toolbar>
            <Divider />
        </AppBar>
    </>
  )
}

export default DashboardTopBar