import React from 'react'
import { Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { PROJECT_NAME } from '@/config';

const Logo = ({ size = 80, showName }: { size?: number, showName?: boolean }) => {
  return (
    <MuiLink className='flex items-center' component={Link} href='/' variant='h5' underline='none' fontWeight={600}>
      {/* <Image
        src='/logo.png'
        alt='Logo'
        height={size}
        width={size}
      /> */}
      {PROJECT_NAME}
      {/* {showName && PROJECT_NAME} */}
    </MuiLink>
  )
}

export default Logo