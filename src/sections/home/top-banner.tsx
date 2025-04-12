'use client'

import { Stack, styled, Typography, useTheme } from '@mui/material'
import React from 'react'
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import ContainerOverlay from '@/components/container-overlay';
import TopBarSearch from '@/layout/main/top-bar-search';

const MainDiv = styled('div')(() => ({
    width: '100%',
    height: '65vh',
    position: 'relative'
}));

const ContentDiv = styled('div')(() => ({
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
}))

const TopBanner = () => {

    const theme = useTheme();
    const isSmallScreen = theme.breakpoints.down('md')

    const SLIDER_IMAGES = [
        '/images/banner-one.jpg',
        '/images/banner-two.jpg',
    ]

    const height = '65vh'

  return (
    <MainDiv>
        <div style={{ width: '100%', height }}>
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination, Autoplay]}
                autoplay={{ 
                    delay: 3000,
                    disableOnInteraction: false
                }}
            >
                {SLIDER_IMAGES.map((image, index) => <SwiperSlide key={index}>
                    <img
                        src={image}
                        style={{ width: '100%', height }}
                        key={index}
                        alt='Home'
                        className="object-cover object-center"
                    />
                </SwiperSlide>)}
            </Swiper>
        </div>
        <ContentDiv>
            <ContainerOverlay>
                <Stack gap={3} alignItems='center' justifyContent='center' sx={{ height: '100%', color: 'white' }}>
                    <Typography variant={isSmallScreen ? 'h4' : 'h3'} fontWeight={800} textAlign='center'>Shop Products & Services <br /> from Top Vendors</Typography>
                    <TopBarSearch isWhiteBg showSearchText />
                </Stack>
            </ContainerOverlay>
        </ContentDiv>
    </MainDiv>
  )
}

export default TopBanner