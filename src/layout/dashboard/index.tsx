'use client'

import React, { ReactNode } from 'react'
import DashboardTopBar from './dashboard-top-bar'
import { Box, Drawer, Toolbar, useMediaQuery, useTheme } from '@mui/material'
import useBoolean from '@/hooks/useBoolean'
import DashboardNavigation from './navigation'

interface DASHBOARD_LAYOUT_PROPS {
  children: ReactNode
}

const DashboardLayout = ({children}: DASHBOARD_LAYOUT_PROPS) => {

  const drawerOpen = useBoolean();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div className='flex'>
      <DashboardTopBar openDrawer={drawerOpen.onTrue} />
      <Drawer
        variant={isSmallScreen ? 'temporary' : "permanent"}
        open={drawerOpen.value}
        onClose={drawerOpen.onFalse}
        sx={{
          ...(isSmallScreen && {
            width: '60%',
            [`& .MuiDrawer-paper`]: { width: '60%' },
          }),
          ...(!isSmallScreen && {
            width: '15%',
            pt: { xl: 2 },
            [`& .MuiDrawer-paper`]: { pt: { xl: 2 }, width: '15%', backgroundColor: 'transparent' },
          })
        }}
      >
        <Toolbar />
        <DashboardNavigation toggleDrawer={drawerOpen.onToggle} />
      </Drawer>
      <Box component="main" sx={{ minHeight: '100vh', flexGrow: 1, p: 3, overflow: 'auto' }}>
        <Toolbar />
        {children}
      </Box>
    </div>
  )
}

export default DashboardLayout