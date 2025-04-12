import RolesGuard from '@/layout/components/roles-guard'
import React, { ReactNode } from 'react'

interface LAYOUT_PROPS {
    children: ReactNode
}

const Layout = async ({ children }: LAYOUT_PROPS) => {

  return (
    <RolesGuard roles={['Vendor']}>{children}</RolesGuard>
  )
}

export default Layout