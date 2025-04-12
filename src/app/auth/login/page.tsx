import { PROJECT_NAME } from '@/config'
import { getServerToken } from '@/hooks/useServerToken'
import GuestGuard from '@/layout/components/guest-guard'
import LoginForm from '@/sections/auth/login-form'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: `Login | ${PROJECT_NAME}`
}

const LoginPage = async () => {

  let token = await getServerToken()

  return (
    <GuestGuard token={token}>
      <LoginForm />
    </GuestGuard>
  )
}

export default LoginPage