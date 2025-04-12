import useClientUser from '@/hooks/useClientUser'
import { USER } from '@/utils/types'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Link as MuiLink, Typography } from '@mui/material'
import React from 'react'
import { ADMIN_PAGES, CUSTOMER_PAGES, VENDOR_PAGES } from './pages'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Person, PersonOutline } from '@mui/icons-material'

interface DASHBOARD_NAVIGATION_PROPS {
    toggleDrawer: () => void;
}

const DashboardNavigation = ({ toggleDrawer }: DASHBOARD_NAVIGATION_PROPS) => {

    const pathname = usePathname();

    const user: USER | null | undefined = useClientUser();

    let pages = CUSTOMER_PAGES;
    if (user?.role === 'Vendor') pages = VENDOR_PAGES
    else if (user?.role === 'Admin') pages = ADMIN_PAGES

  return (
    <div className='h-[85vh] flex flex-col justify-between'>
        <List component='nav'>
            {pages.map((page, index) => (
                <MuiLink color='inherit' onClick={toggleDrawer} component={Link} href={page.path} underline="none" key={index}>
                    <ListItem  sx={{ '& svg': { color: pathname === page.path ? 'primary.main': 'inherit' } }} disablePadding>
                        <ListItemButton selected={pathname === page.path}>
                            <ListItemIcon>{page.icon}</ListItemIcon>
                            <ListItemText 
                                primary={<Typography color={pathname === page.path ? 'primary' : 'inherit'}>{page.title}</Typography>}
                            />
                        </ListItemButton>
                    </ListItem>   
                </MuiLink>
            ))}
            
        </List>
        <List component='nav'>
            <MuiLink color='inherit' onClick={toggleDrawer} component={Link} href={`/dashboard/${user?.role.toLowerCase()}/profile`} underline="none">
                <ListItem  sx={{ '& svg': { color: 'inherit' } }} disablePadding>
                    <ListItemButton selected={pathname === `/dashboard/${user?.role.toLowerCase()}/profile`}>
                        <ListItemIcon><PersonOutline /></ListItemIcon>
                        <ListItemText 
                            primary={<Typography color='textSecondary' noWrap>{user?.firstName} {user?.lastName}</Typography>}
                            secondary={<Typography color='textSecondary' noWrap variant='body2'>View Profile</Typography>}
                        />
                    </ListItemButton>
                </ListItem> 
            </MuiLink>
        </List>
    </div>
  )
}

export default DashboardNavigation