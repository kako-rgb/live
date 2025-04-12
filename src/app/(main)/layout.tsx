import MainLayout from '@/layout/main'
import React, { ReactNode } from 'react'

const MLayout = ({ children }: { children: ReactNode }) => {
  return (
    <MainLayout>{children}</MainLayout>
  )
}

export default MLayout