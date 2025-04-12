'use client'

import useAxios from '@/hooks/useAxios';
import useBoolean from '@/hooks/useBoolean';
import { PRODUCT } from '@/utils/types'
import { Pagination, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/product-card';

interface CATEGORY_PRODUCTS_PROPS {
    loadedProducts: PRODUCT[],
    loadedTotal: number,
    loadedPages: number,
    perPage: number,
    categoryId: string
}

const CategoryProducts = ({ loadedPages, loadedProducts, loadedTotal, categoryId, perPage }: CATEGORY_PRODUCTS_PROPS) => {

    const request = useAxios();

    const [products, setProducts] = useState<PRODUCT[]>(loadedProducts);
    const [page, setPage] = useState<number>(0);
    const [total, setTotal] = useState<number>(loadedTotal);
    const [pages, setPages] = useState<number>(loadedPages);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value - 1);
    };

    const isLoading = useBoolean();

    const loadProductsHandler = async () => {
        try {
            if (page > 0) isLoading.onTrue();
            const response = await request({
                method: 'get',
                path: `/product/category?page=${page}&perPage=${perPage}&category=${categoryId}`
            });
            setProducts(response.data.products)
        } catch (err) {
            console.log(err);
        } finally {
            isLoading.onFalse();
        }
    }

    useEffect(() => {
        loadProductsHandler();
    }, [page])

    if (isLoading.value) return <Typography textAlign='center'>Loading...</Typography>

  return (
    <div className='flex flex-col gap-5'>
        {products.length > 0 && <>
            <div className='grid gap-8 md:grid-cols-3'>
                 {products.map((each, index) => <ProductCard key={index} product={each} />)}
            </div>

            <Pagination sx={{ alignSelf: 'center' }} count={pages} page={page + 1} onChange={handleChange} color='primary' />
        </>}
    </div>
  )
}

export default CategoryProducts