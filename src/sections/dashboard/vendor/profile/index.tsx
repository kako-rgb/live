'use client'

import useClientUser from '@/hooks/useClientUser'
import { USER } from '@/utils/types';
import { Avatar, Card, CardContent, CardHeader, Chip, Typography } from '@mui/material'
import React from 'react'
import ProfileTabs from './profile-tabs';

const VendorProfile = () => {

    const user: USER | null | undefined = useClientUser();

  return (
    <div className='flex flex-col gap-6'>

        <div>
            <Typography variant='h4' fontWeight={800}>Vendor Profile</Typography>
            <Typography color='textSecondary'>Manage your vendor account information</Typography>
        </div>

        <Card variant='outlined' sx={{ p: 3, borderRadius: 3 }}>
            <CardContent>
                <div className='grid md:grid-cols-3'>

                    <div className='flex flex-col gap-3'>
                        <Avatar sx={{ height: 50, width: 50 }} />
                        <div>
                            <Typography variant='h5' fontWeight={600}>{user?.firstName}</Typography>
                            <Typography color='textSecondary'>{user?.firstName}</Typography>
                        </div>
                    </div>

                    <div className='flex flex-col gap-8'>
                        <div className='flex-1'>
                            <Typography color='textSecondary' variant='body2'>Email</Typography>
                            <Typography>{user?.email}</Typography>
                        </div>
                        <div className='flex-1'>
                            <Typography color='textSecondary' variant='body2'>Phone Number</Typography>
                            <Typography>+{user?.phone}</Typography>
                        </div>
                    </div>

                    <div className='flex flex-col gap-8'>
                        <div className='flex-1'>
                            <Typography color='textSecondary' variant='body2'>Member Since</Typography>
                            <Typography>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-Us', { dateStyle: 'medium' }) : 'N/A'}</Typography>
                        </div>
                        <div className='flex-1'>
                            <Typography color='textSecondary' variant='body2'>Status</Typography>
                            <Chip label='Active' color='success' size='small' variant='outlined' />
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>

        <ProfileTabs />

    </div>
  )
}

export default VendorProfile