import React, { useState } from 'react'
import ProfileStoreTab from './profile-store-tab'
import ProfileAccountTab from './profile-account-tab'
import { Tab, Tabs } from '@mui/material';

const ProfileTabs = () => {

    const [tabValue, setTabValue] = useState<number>(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const TABS = [
        <ProfileAccountTab />,
        <ProfileStoreTab />,
    ]

  return (
    <div className='flex flex-col gap-6'>
        <Tabs value={tabValue} onChange={handleChange} variant='fullWidth'>
            <Tab sx={{ textTransform: 'capitalize' }} label='Account' />
            <Tab sx={{ textTransform: 'capitalize' }} label='Store' />
        </Tabs>
        {TABS[tabValue]}
    </div>
  )
}

export default ProfileTabs