'use client'

import { useRouter } from 'next/navigation'
import React, { ReactNode, useEffect } from 'react'

interface GUEST_GUARD_PROPS {
    token: any,
    children: ReactNode
}

const GuestGuard = ({ children, token }: GUEST_GUARD_PROPS) => {

    const { replace } = useRouter();

    
    useEffect(() => {
        if (token) replace('/dashboard')
    }, [token])

  return children
}

export default GuestGuard