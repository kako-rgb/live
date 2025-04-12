import { PROJECT_NAME } from '@/config'
import VendorProfile from '@/sections/dashboard/vendor/profile'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: `Vendor Profile | ${PROJECT_NAME}`
}

const VendorProfilePage = () => {
  return (
    <VendorProfile />
  )
}

export default VendorProfilePage