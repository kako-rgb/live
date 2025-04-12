import { PROJECT_NAME } from '@/config'
import useMainStore from '@/store/main-store'
import { Facebook, Instagram, LinkedIn, X } from '@mui/icons-material'
import { Container, Divider, Typography, Link as MuiLink } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const Footer = () => {

    const { categories } = useMainStore();

  return (
    <div style={{ background: '#f5f5f5', padding: '40px 0' }}>
        <Container>
            <div className='grid gap-8 md:grid-cols-3'>
                <div className='flex flex-col gap-6'>
                    <Typography variant='h6' fontWeight={800}>About {PROJECT_NAME}</Typography>
                    <Typography color='textSecondary' fontWeight={600}>{PROJECT_NAME} is a leading multivendor marketplace offering a wide range of products and services from trusted vendors across the globe.</Typography>
                </div>
                <div className='flex flex-col gap-6'>
                    <Typography variant='h6' fontWeight={800}>Quick Links</Typography>
                    <div className='flex flex-col gap-1'>
                        <MuiLink component={Link} href='/about' color='textSecondary' underline='hover'>About Us</MuiLink>
                        <MuiLink component={Link} href='/contact' color='textSecondary' underline='hover'>Contact Us</MuiLink>
                        <MuiLink component={Link} href='/terms-and-conditions' color='textSecondary' underline='hover'>Terms & Conditions</MuiLink>
                        <MuiLink component={Link} href='/privacy-policy' color='textSecondary' underline='hover'>Privacy Policy</MuiLink>
                        <MuiLink component={Link} href='/faqs' color='textSecondary' underline='hover'>FAQs</MuiLink>
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    <Typography variant='h6' fontWeight={800}>Categories</Typography>
                    <div className='flex flex-col gap-1'>
                        {categories.filter(each => each.featured).map((each, index) => <MuiLink key={index} component={Link} href={`/category/${each.slug}`} color='textSecondary' underline='hover'>{each.name}</MuiLink>)}
                    </div>
                </div>
            </div>
        </Container>
        <Divider sx={{ my: 4 }} />
        <Container>
            <div className='flex flex-col md:flex-row gap-5 items-center justify-between'>
                <Typography color='textSecondary' variant='body2'>&copy; {new Date().getFullYear()} {PROJECT_NAME}. All rights reserved</Typography>
                <div className='flex gap-2 items-center'>
                    <Facebook />
                    <Instagram />
                    <X />
                    <LinkedIn />
                </div>
            </div>
        </Container>
    </div>
  )
}

export default Footer