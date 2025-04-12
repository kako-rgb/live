'use client'

import React, { ReactNode } from 'react'
import TopBar from './top-bar'
import Footer from './footer'
import { useMediaQuery, useTheme } from '@mui/material'

interface MAIN_LAYOUT_PROPS {
    children?: ReactNode
}

const MainLayout = ({ children }: MAIN_LAYOUT_PROPS) => {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <>
        <TopBar />
        <main style={{ marginTop: isSmallScreen ? '100px' : '150px' }}>{children}</main>
        <Footer />
    </>
  )
}

export default MainLayout