import Logo from '@/components/logo'
import React, { ReactNode } from 'react'

interface AUTH_LAYOUT_PROPS {
    children: ReactNode
}

const AuthLayout = ({ children }: AUTH_LAYOUT_PROPS) => {
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center gap-10 p-6 md:p-12'>
        <Logo />
        <div className='w-full md:w-1/2 xl:w-1/3 p-6 border border-gray-300 rounded-lg'>{children}</div>
    </div>
  )
}

export default AuthLayout