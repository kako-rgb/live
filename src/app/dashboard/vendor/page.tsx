import DashboardComponent from '@/sections/components/dashboard-component'
import React from 'react'

const VendorDashboardPage = () => {
  return (
    <div className='flex flex-col gap-6'>
      <h1 className='font-bold text-2xl'>Dashboard</h1>
      <DashboardComponent />
    </div>
  )
}

export default VendorDashboardPage