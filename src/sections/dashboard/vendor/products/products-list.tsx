'use client'

import { StyledTableCell, StyledTableRow } from '@/components/table/styles'
import useAxios from '@/hooks/useAxios'
import useBoolean from '@/hooks/useBoolean'
import { PRODUCT } from '@/utils/types'
import { Edit } from '@mui/icons-material'
import { Button, CircularProgress, IconButton, Table, TableBody, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import Link from 'next/link'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'

interface PRODUCTS_LIST_PROPS {
    token: any
}

const ProductsList = ({ token }: PRODUCTS_LIST_PROPS) => {

    const request = useAxios(token)

    const { enqueueSnackbar } = useSnackbar();

    const isLoading = useBoolean(true);

    const [products, setProducts] = useState<PRODUCT[]>([]);
    const [perPage, setPerPage] = useState<number>(10);
    const [page, setPage] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getProductsHandler = async () => {
        try {
            isLoading.onTrue();
            const response = await request({
                method: 'get',
                path: `/vendor/product?page=${page}&perPage=${perPage}`
            });
            setProducts(response.data.products);
            setTotal(response.data.total)
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err?.response?.data || err?.response?.message || err.message || err || 'Something went wrong';
            enqueueSnackbar(errorMessage, { variant: 'error' });
        } finally {
            isLoading.onFalse();
        }
    }

    useEffect(() => {
        getProductsHandler();
    }, [page, perPage])

  return (
    <div className='flex flex-col gap-5'>

        <div className='flex items-center justify-between gap-3'>
            <Typography variant='h5' fontWeight={600}>Your Products</Typography>
            <Button LinkComponent={Link} href='/dashboard/vendor/products/add' variant='outlined'>Add Product</Button>
        </div>

        {isLoading.value && <CircularProgress />}
        {!isLoading.value && <>
            {products.length === 0 && <Typography textAlign='center'>You have not yet added any product</Typography>}
            {products.length > 0 && <TableContainer sx={{ minWidth: '700px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Product</StyledTableCell>
                            <StyledTableCell align='right'>Category</StyledTableCell>
                            <StyledTableCell align='right'>Stock</StyledTableCell>
                            <StyledTableCell align='right'>Price</StyledTableCell>
                            <StyledTableCell align='right'>Discounted Price</StyledTableCell>
                            <StyledTableCell align='right'>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product, index) => {
                            return (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>{product.name}</StyledTableCell>
                                    <StyledTableCell align='right'>{product.category?.name}</StyledTableCell>
                                    <StyledTableCell align='right'>{product.stock?.toLocaleString('en-US')} units</StyledTableCell>
                                    <StyledTableCell align='right'>KSH {product.price.toLocaleString('en-US')}</StyledTableCell>
                                    <StyledTableCell align='right'>KSH {product.discountPrice.toLocaleString('en-US')}</StyledTableCell>
                                    <StyledTableCell align='right'><IconButton LinkComponent={Link} href={`/dashboard/vendor/products/${product._id}`}><Edit fontSize='small' /></IconButton></StyledTableCell>
                                </StyledTableRow>
                            )
                        })}
                    </TableBody>
                    <TableFooter>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 20, 50]}
                            count={total}
                            rowsPerPage={perPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableFooter>
                </Table>
            </TableContainer>}
        </>}

    </div>
  )
}

export default ProductsList