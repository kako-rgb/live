import { PRODUCT } from '@/utils/types'
import React from 'react'
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from 'next/image';

interface PRODUCT_CAROUSEL_PROPS {
    product: PRODUCT
}

const ProductCarousel = ({ product }: PRODUCT_CAROUSEL_PROPS) => {
  return (
    <div className='w-full flex flex-col gap-3'>
        <Swiper
            spaceBetween={0}
            slidesPerView={1}
            style={{ width: '100%' }}
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination, Autoplay]}
            autoplay={{ 
                delay: 3000,
                disableOnInteraction: false
            }}
        >
            {product.media.map((image, index) => <SwiperSlide key={index}>
                <img
                    src={image.link}
                    key={index}
                    alt='Home'
                    className="w-full h-[70vh] rounded-lg object-cover object-center"
                />
            </SwiperSlide>)}
        </Swiper>

        <div className='flex flex-wrap gap-3'>
            {product.media.map((image, index) => <Image
                key={index}
                src={image.link || ''}
                alt={image.ref || ''}
                height={80}
                width={80}
                className='w-20 h-20 rounded-lg object-cover object-center'
            />)}
        </div>
    </div>
  )
}

export default ProductCarousel