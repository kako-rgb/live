import { PROJECT_NAME } from '@/config'
import { getServerToken } from '@/hooks/useServerToken'
import CategoriesList from '@/sections/dashboard/admin/categories/categories-list'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: `Categories | ${PROJECT_NAME}`
}

const CategoriesPage = async () => {

  const token = await getServerToken();

  return (
    <CategoriesList token={token} />
  )
}

export default CategoriesPage