'use client'

import FormProvider from '@/components/hookform/FormProvider'
import RHFPhoneNumber from '@/components/hookform/RHFPhoneNumber'
import RHFTextField from '@/components/hookform/RHFTextField'
import useAxios from '@/hooks/useAxios'
import useClientUser from '@/hooks/useClientUser'
import useCartStore from '@/store/cart-store'
import { USER } from '@/utils/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid2, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup';

interface CHECKOUT_SECTION_PROPS {
    token: any
}

const CheckoutSection = ({ token }: CHECKOUT_SECTION_PROPS) => {

    const { cart, resetCart } = useCartStore();
    const { enqueueSnackbar } = useSnackbar();
    const user: USER | null | undefined = useClientUser();
    const request = useAxios(token);

    const { replace, push } = useRouter();

    const cartTotal = cart.reduce((acc, cartItem) => {
        const displayPrice = cartItem.product.discountPrice || cartItem.product.price;
        return acc + (displayPrice * cartItem.quantity)
    }, 0)

    const CheckoutSchema = Yup.object().shape({
        customerName: Yup.string().required('Your name is required'),
        customerEmail: Yup.string().required('Your email address is required'),
        customerPhone: Yup.string().required('Your phone number is required'),
        customerAddress: Yup.string(),
    });

    type CheckoutFormType = Yup.InferType<typeof CheckoutSchema>

    const defaultValues: CheckoutFormType = {
        customerEmail: '',
        customerName: '',
        customerPhone: '',
        customerAddress: ''
    }

    const methods = useForm({ resolver: yupResolver(CheckoutSchema), defaultValues });

    const { handleSubmit, setValue, formState: { isSubmitting } } = methods;

    const onSubmit = async (data: CheckoutFormType) => {
        try {
            const requestBody = {
                ...data,
                products: cart.map(item => ({ product: item.product._id, quantity: item.quantity }))
            }
            const response = await request({
                path: '/order',
                method: 'post',
                pathData: requestBody
            })
            resetCart();
            enqueueSnackbar('The Order Has Been Placed', { variant: 'success' })
            push(`/dashboard/customer/orders/${response.data.order?._id}`)
        } catch (err: any) {
            console.log(err)
            const errorMessage = err.response?.data?.message || err?.response?.data || err?.response?.message || err.message || err || 'Something went wrong';
            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    }

    useEffect(() => {
        if (cart.length === 0) {
            replace('/cart')
        }
    }, []);

    useEffect(() => {
        if (user) {
            setValue('customerName', `${user.firstName} ${user.lastName}`);
            setValue('customerEmail', user.email);
            setValue('customerPhone', user.phone || '');
        }
    }, [user])

  return (
    <div className='flex flex-col gap-5'>
        <Typography variant='h5' fontWeight={800}>Checkout</Typography>

        <Grid2 container spacing={2}>

            <Grid2 size={{ xs: 12, md: 8 }}>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Card sx={{ p: 2, borderRadius: 2 }} variant='outlined'>
                        <CardHeader
                            title={<Typography variant='h6' fontWeight={600}>Your Information</Typography>}
                        />
                        <CardContent>
                            <div className='flex flex-col gap-3'>
                                <RHFTextField
                                    name='customerName'
                                    label='Name'
                                    placeholder='Name'
                                    required
                                />
                                <RHFTextField
                                    name='customerEmail'
                                    label='Email Address'
                                    placeholder='Email Address'
                                    type='email'
                                    required
                                />
                                <RHFPhoneNumber
                                    name='customerPhone'
                                    label='Phone Number'
                                    placeholder='Phone Number'
                                    required
                                />
                                <RHFTextField
                                    name='customerAddress'
                                    label='Address'
                                    placeholder='Address'
                                    multiline
                                    rows={4}
                                />
                            </div>
                        </CardContent>
                        <CardActions>
                            <Button variant='contained' type='submit' loading={isSubmitting} sx={{ width: '100%', color: 'white' }}>Place Order</Button>
                        </CardActions>
                    </Card>
                </FormProvider>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 4 }}>
                <Card sx={{ p: 2, borderRadius: 2 }} variant='outlined'>
                    <CardHeader
                        title={<Typography variant='h6' fontWeight={600}>Order Summary</Typography>}
                    />
                    <CardContent>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-2'>
                                {cart.map((item, index) => {
                                    const displayPrice = item.product.discountPrice ? item.product.discountPrice : item.product.price;
                                    return (
                                        <div key={index} className='flex items-center gap-3 justify-between'>
                                            <Typography>{item.product.name}</Typography>
                                            <Typography>{item.quantity} x KSH {displayPrice.toLocaleString('en-US')}</Typography>
                                        </div>
                                )})}
                            </div>
                            <Divider />
                            <div className='flex items-center justify-between gap-3'>
                                <Typography fontWeight={800}>Subtotal</Typography>
                                <Typography fontWeight={800}>KSH {cartTotal.toLocaleString('en-US')}</Typography>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Grid2>

        </Grid2>
    </div>
  )
}

export default CheckoutSection