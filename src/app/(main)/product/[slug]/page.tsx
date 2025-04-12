import ContainerOverlay from '@/components/container-overlay';
import { PROJECT_NAME } from '@/config';
import useAxios from '@/hooks/useAxios';
import SingleProduct from '@/sections/single-product';
import { PRODUCT } from '@/utils/types';
import { Metadata } from 'next'
import React from 'react'
import { headers } from 'next/headers';

type PROPS = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PROPS): Promise<Metadata> {

    headers();

    const { slug } = await params;

    const request = useAxios();

    const response = await request({
        method: 'get',
        path: `/product/${slug}`
    });

    const product: PRODUCT = response.data.product;

    return {
        title: `${product.name} | ${PROJECT_NAME}`,
        description: product.description,
    }
}

const SingleProductPage = async ({ params }: PROPS) => {

    const { slug } = await params;

    const request = useAxios();

    const response = await request({
        method: 'get',
        path: `/product/${slug}`
    });

    const product = response.data.product;
    const relatedProducts = response.data.relatedProducts;

  return (
    <ContainerOverlay paddingVertical={5}>
        <SingleProduct product={product} relatedProducts={relatedProducts} />
    </ContainerOverlay>
  )
}

export default SingleProductPage