import ContainerOverlay from '@/components/container-overlay'
import React, { ReactNode } from 'react'

interface LAYOUT_PROPS {
    children: ReactNode
}

const Layout = ({ children }: LAYOUT_PROPS) => {
  return (
    <ContainerOverlay paddingVertical={5}>{children}</ContainerOverlay>
  )
}

export default Layout