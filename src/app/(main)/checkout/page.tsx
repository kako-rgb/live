import ContainerOverlay from '@/components/container-overlay'
import { PROJECT_NAME } from '@/config'
import { getServerToken } from '@/hooks/useServerToken'
import CheckoutSection from '@/sections/checkout'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: `Checkout | ${PROJECT_NAME}`
}

const CheckoutPage = async () => {

    const token = await getServerToken();

  return (
    <ContainerOverlay paddingVertical={5}>
        <CheckoutSection token={token} />
    </ContainerOverlay>
  )
}

export default CheckoutPage