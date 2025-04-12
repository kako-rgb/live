'use client'

import ContainerOverlay from '@/components/container-overlay'
import { PRIMARY_COLOR } from '@/config'
import useMainStore from '@/store/main-store'
import { Box, Button, Stack, styled, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'

const SingleCategoryContainer = styled(Box)(() => ({
    padding: '24px 6px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    cursor: 'pointer',
    transition: 'all 0.5s',
    backgroundColor: '#F9FAFB',
    borderRadius: '12px',
    textAlign: 'center',
    ['&:hover']: {
        boxShadow: '0 8px 10px rgba(0, 0, 0, 0.3)'
    },

}))

const CategorySection = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

    const { categories } = useMainStore();

    const { push } = useRouter();

  return (
    <ContainerOverlay paddingVertical={5}>
        <Stack gap={5}>
            <Typography variant='h5' fontWeight={600}>Shop By Category</Typography>

            <div className='grid gap-8 grid-cols-2 md:grid-cols-6'>
                {categories.filter(each => each.featured).map((cat, index) => <SingleCategoryContainer onClick={() => { push(`/category/${cat.slug}`) }} key={index}>
                    <img src={cat.image} alt={cat.name} className='w-[50px] h-[50px]' />
                    <Typography variant='body2'>{cat.name}</Typography>
                </SingleCategoryContainer>)}
            </div>

            {/* <Stack
                direction='row'
                sx={{
                    borderRadius: '12px',
                }}
            >
                <Stack 
                    sx={{ 
                        flex: 5, 
                        color: 'white', 
                        backgroundColor: PRIMARY_COLOR.main, 
                        px: 6, 
                        py: 4, 
                        borderTopLeftRadius: '12px', 
                        borderBottomLeftRadius: '12px',
                        ...(isSmallScreen && { borderRadius: '12px' })
                    }} 
                    justifyContent='center' 
                    gap={2}
                >
                    <Typography variant='h5' fontWeight={800}>Summer Sale is Live!</Typography>
                    <Typography sx={{ width: isSmallScreen ? "100%" : '60%' }}>
                        Enjoy up to 50% off on thousands of products across all categories. Limited time offer, show now before stock runs out!
                    </Typography>
                    <Button sx={{ backgroundColor: 'white', width: 'fit-content', px: 2 }}>Show Now</Button>
                </Stack>
                {!isSmallScreen && <div style={{ flex: 3, height: '50vh' }}>
                    <img
                        src='/images/banner-one.jpg'
                        style={{ height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                    />
                </div>}
            </Stack> */}
        </Stack>
    </ContainerOverlay>
  )
}

export default CategorySection