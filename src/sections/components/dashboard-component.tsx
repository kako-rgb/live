import { ArrowDownward, ArrowUpward, BadgeRounded, Group, Money, ShoppingCart } from '@mui/icons-material'
import { Card, CardContent } from '@mui/material'
import React from 'react'

const DashboardComponent = () => {
  return (
    <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        <Card variant='outlined'>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Sales</p>
                <h3 className="text-2xl font-bold mt-1">$12,426</h3>
                <div className="flex items-center mt-1 text-green-600 dark:text-green-400">
                  <ArrowUpward className="h-4 w-4 mr-1" />
                  <span className="text-xs font-medium">12% from last month</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#FF6F00]/10 flex items-center justify-center">
                <Money className="h-6 w-6 text-[#FF6F00]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant='outlined'>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</p>
                <h3 className="text-2xl font-bold mt-1">156</h3>
                <div className="flex items-center mt-1 text-green-600 dark:text-green-400">
                  <ArrowUpward className="h-4 w-4 mr-1" />
                  <span className="text-xs font-medium">8% from last month</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#2E7D32]/10 flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-[#2E7D32]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant='outlined'>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Products</p>
                <h3 className="text-2xl font-bold mt-1">48</h3>
                <div className="flex items-center mt-1 text-green-600 dark:text-green-400">
                  <ArrowUpward className="h-4 w-4 mr-1" />
                  <span className="text-xs font-medium">4 new this month</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#1565C0]/10 flex items-center justify-center">
                <BadgeRounded className="h-6 w-6 text-[#1565C0]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant='outlined'>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Customers</p>
                <h3 className="text-2xl font-bold mt-1">1,245</h3>
                <div className="flex items-center mt-1 text-red-600 dark:text-red-400">
                  <ArrowDownward className="h-4 w-4 mr-1" />
                  <span className="text-xs font-medium">3% from last month</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#FF6F00]/10 flex items-center justify-center">
                <Group className="h-6 w-6 text-[#FF6F00]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardComponent