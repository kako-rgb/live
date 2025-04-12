import { Container } from '@mui/material'
import React, { ReactNode } from 'react'

interface CONTAINER_OVERLAY_PROPS {
    children?: ReactNode,
    backgroundColor?: string,
    paddingVertical?: number
}

const ContainerOverlay = ({ backgroundColor, children, paddingVertical }: CONTAINER_OVERLAY_PROPS) => {
  return (
    <Container sx={{ 
        backgroundColor, 
        height: '100%',
        py: paddingVertical,
    }}>{children}</Container>
  )
}

export default ContainerOverlay