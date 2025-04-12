import ContainerOverlay from '@/components/container-overlay';
import { PROJECT_NAME } from '@/config';
import useAxios from '@/hooks/useAxios';
import CategoryProducts from '@/sections/single-category/category-products';
import useMainStore from '@/store/main-store';
import { Typography } from '@mui/material';
import { Metadata } from 'next';
import React from 'react'

type PROPS = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PROPS): Promise<Metadata> {
    const { slug } = await params;

    const request = useAxios();

    const response = await request({
        method: 'get',
        path: `/category/${slug}`
    })
  
    const foundCategory = response.data.category
    return {
      title: `${foundCategory?.name} | ${PROJECT_NAME}`,
    }
}

const SingleCategoryPage = async ({ params }: PROPS) => {

    const { slug } = await params;

    const perPage = 15

    const request = useAxios();

    const categoryRequest = await request({
        method: 'get',
        path: `/category/${slug}`
    })

    const { category } = categoryRequest.data;

    const catProductsRequest = await request({
        method: 'get',
        path: `/product/category?page=0&perPage=${perPage}&category=${category._id}`
    })
    

  return (
    <ContainerOverlay paddingVertical={5}>
        <div className='flex flex-col gap-5'>
            <Typography variant='h5' fontWeight='600'>{category.name} Products</Typography>
            <CategoryProducts
                categoryId={category._id}
                loadedPages={catProductsRequest.data.pages}
                loadedProducts={catProductsRequest.data.products}
                loadedTotal={catProductsRequest.data.total}
                perPage={perPage}
            />
        </div>
    </ContainerOverlay>
  )
}

export default SingleCategoryPage