import DashboardLayout from '@/layout/dashboard'
import React, { ReactNode } from 'react'

interface LAYOUT_PROPS {
    children: ReactNode
}

const Layout = ({ children }: LAYOUT_PROPS) => {
  return (
    <DashboardLayout>{children}</DashboardLayout>
  )
}

export default Layout