import { PROJECT_NAME } from '@/config'
import DashboardComponent from '@/sections/components/dashboard-component'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: `Admin Dashboard | ${PROJECT_NAME}`
}

const AdminDashboardPage = () => {
  return (
    <div className='flex flex-col gap-6'>
      <h1 className='font-bold text-2xl'>Admin Dashboard</h1>
      <DashboardComponent />
    </div>
  )
}

export default AdminDashboardPage