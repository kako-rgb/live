import RolesGuard from '@/layout/components/roles-guard'
import React, { ReactNode } from 'react'

interface LAYOUT_PROPS {
    children: ReactNode
}

const Layout = ({ children }: LAYOUT_PROPS) => {
  return (
    <RolesGuard roles={['Customer']}>{children}</RolesGuard>
  )
}

export default Layout