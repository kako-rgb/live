import { getServerToken, userServerUser } from '@/hooks/useServerToken'
import RoleRedirect from '@/layout/components/role-redirect';
import { USER } from '@/utils/types';
import React from 'react'

const DashboardPage = async () => {

    const user: USER = await userServerUser();
    const token = await getServerToken();

  return (
    <RoleRedirect user={user} token={token}>
      <p>Dashboard</p>
    </RoleRedirect>
  )
}

export default DashboardPage