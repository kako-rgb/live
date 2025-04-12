'use client'

import useClientUser from "@/hooks/useClientUser"
import { ROLE, USER } from "@/utils/types"
import { ErrorOutline, HomeOutlined } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import Link from "next/link"
import { ReactNode } from "react"

interface ROLES_GUARD_PROPS {
    children: ReactNode,
    roles: ROLE[]
}

const RolesGuard = ({ children, roles }: ROLES_GUARD_PROPS) => {

    const user: USER | null | undefined = useClientUser();

    if (user && roles.includes(user.role)) return children

  return (
    <div className="h-screen w-full flex items-center justify-center p-6 md:p-12">

        <div className='w-full md:w-1/2 py-6 px-6 md:px-10 border border-gray-300 rounded-lg flex flex-col gap-6'>

            <div className="h-[60px] w-[60px] rounded-full bg-red-200 self-center flex items-center justify-center">
                <ErrorOutline fontSize="large" color="error" />
            </div>
            <Typography variant="h4" fontWeight={800} textAlign='center'>Access Denied</Typography>
            <Typography color='textSecondary' textAlign='center'>You don't have permission to access this page. This could be because:</Typography>
            <ul className="list-disc marker:text-gray-600">
                <li><Typography color='textSecondary'>You need to be logged in to view this content.</Typography></li>
                <li><Typography color='textSecondary'>Your account doesn't have the required permissions</Typography></li>
                <li><Typography color='textSecondary'>You're trying to access another user's private information</Typography></li>
            </ul>
            <Button startIcon={<HomeOutlined />} variant="outlined" color='inherit' LinkComponent={Link} href='/'>Go To Home Page</Button>

        </div>

    </div>
  )
}

export default RolesGuard