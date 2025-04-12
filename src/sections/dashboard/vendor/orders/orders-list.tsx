'use client'

import { StyledTableCell, StyledTableRow } from '@/components/table/styles'
import useAxios from '@/hooks/useAxios'
import useBoolean from '@/hooks/useBoolean'
import { ORDER } from '@/utils/types'
import { Visibility } from '@mui/icons-material'
import { CircularProgress, IconButton, Table, TableBody, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'

interface ORDERS_LIST_PROPS {
    token: any
}

const OrdersList = ({ token }: ORDERS_LIST_PROPS) => {

    const request = useAxios(token)
    
    const { enqueueSnackbar } = useSnackbar();

    const isLoading = useBoolean(true);

    const [orders, setOrders] = useState<ORDER[]>([]);
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

    const getOrdersHandler = async () => {
        try {
            isLoading.onTrue();
            const response = await request({
                method: 'get',
                path: `/order/vendor?page=${page}&perPage=${perPage}`
            });
            setOrders(response.data.orders);
            setTotal(response.data.total)
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err?.response?.data || err?.response?.message || err.message || err || 'Something went wrong';
            enqueueSnackbar(errorMessage, { variant: 'error' });
        } finally {
            isLoading.onFalse();
        }
    }

    useEffect(() => {
        getOrdersHandler();
    }, [page, perPage])

  return (
    <div className='flex flex-col gap-5'>

        <Typography variant='h5' fontWeight={600}>Placed Orders</Typography>

        {isLoading.value && <CircularProgress />}
        {!isLoading.value && <>
            {orders.length === 0 && <Typography textAlign='center'>Orders have not yet been placed.</Typography>}
            {orders.length > 0 && <TableContainer sx={{ minWidth: '700px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Order ID</StyledTableCell>
                            <StyledTableCell align='right'>Date</StyledTableCell>
                            <StyledTableCell align='right'>Items</StyledTableCell>
                            <StyledTableCell align='right'>Total</StyledTableCell>
                            <StyledTableCell align='right'>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order, index) => {
                            return (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>{order.number}</StyledTableCell>
                                    <StyledTableCell align='right'>{new Date(order.createdAt).toLocaleDateString('en-UK', { dateStyle: 'short' })}</StyledTableCell>
                                    <StyledTableCell align='right'>{order.products.length.toLocaleString('en-US')}</StyledTableCell>
                                    <StyledTableCell align='right'>KSH {order.price.current.toLocaleString('en-US')}</StyledTableCell>
                                    <StyledTableCell align='right'><IconButton><Visibility fontSize='small' /></IconButton></StyledTableCell>
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

export default OrdersList