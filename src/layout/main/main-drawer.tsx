import { PROJECT_NAME } from '@/config'
import useMainStore from '@/store/main-store'
import { Close } from '@mui/icons-material'
import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

interface MAIN_DRAWER_PROPS {
    open: boolean
    onClose: () => void
}

const MainDrawer = ({ onClose, open }: MAIN_DRAWER_PROPS) => {

    const { categories } = useMainStore();

  return (
    <Drawer
        open={open}
        onClose={onClose}
        sx={{
            width: '60%',
            [`& .MuiDrawer-paper`]: { width: '60%' },
        }}
    >
        <div style={{ padding: '12px' }} className='flex flex-col gap-3'>
            <div className='flex gap-2 items-center justify-between'>
                <Typography color='primary' variant='h6' fontWeight={600}>{PROJECT_NAME}</Typography>
                <IconButton onClick={onClose}><Close /></IconButton>
            </div>
            <Divider />
            <Typography variant='subtitle1' fontWeight={600}>Categories</Typography>
            <List component='nav'>
                {categories.filter((each) => each.featured).map((each, index) => <ListItemButton key={index} LinkComponent={Link} href={`/category/${each.slug}`} onClick={onClose}>
                    <ListItemText
                        primary={each.name}
                    />
                </ListItemButton>)}
            </List>
        </div>

    </Drawer>
  )
}

export default MainDrawer