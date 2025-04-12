'use client'

import FormProvider from '@/components/hookform/FormProvider';
import { RHFCheckbox } from '@/components/hookform/RHFCheckbox';
import RHFPhoneNumber from '@/components/hookform/RHFPhoneNumber';
import { RHFSelect } from '@/components/hookform/RHFSelect';
import RHFTextField from '@/components/hookform/RHFTextField';
import { PROJECT_NAME } from '@/config';
import { axiosInstance } from '@/hooks/useAxios';
import { yupResolver } from '@hookform/resolvers/yup';
import { Lock, Mail, Person, Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Button, IconButton, InputAdornment, Typography, Link as MuiLink, MenuItem } from '@mui/material';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const RegisterForm = () => {

    const { enqueueSnackbar } = useSnackbar();
    const { replace } = useRouter();
    const searchParams = useSearchParams();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const interest = searchParams.get('interest')

    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string().required('Enter your first name'),
        lastName: Yup.string().required('Enter your last name'),
        phone: Yup.string().required('Enter your phone number'),
        businessName: Yup.string(),
        businessType: Yup.string(),
        email: Yup.string().required('Enter your email address').email('Enter a valid email address'),
        password: Yup.string().required('Enter your password'),
        agree: Yup.boolean().oneOf([true], 'You must agree to the terms and conditions')
    });

    type RegisterTypeForm = Yup.InferType<typeof RegisterSchema>;

    const initialValues: RegisterTypeForm = {
        firstName: '',
        lastName: '',
        phone: '',
        businessName: '',
        businessType: '',
        email: '',
        password: '',
        agree: false
    }

    const methods = useForm({ resolver: yupResolver(RegisterSchema), defaultValues: initialValues });

    const { handleSubmit, setError, formState: { errors, isSubmitting } } = methods;

    const onSubmit = async (data: any) => {
        try {
            let url = '/customer/auth/register';
            if (interest === 'vendor') url = '/vendor/auth/register';
            await axiosInstance.post(url, data);
            const response = await signIn('credentials', { ...data, redirect: false, });
            if (!response?.ok) throw new Error('Please check your credentials and try again');
            else if (response.ok) {
                enqueueSnackbar(`Welcome To ${PROJECT_NAME}`, { variant: 'success' })
                replace('/dashboard');
            }
        } catch (error: any) {
            console.log(error);
            setError('root', { ...error, message: error?.content || error.message || error, });
        }
    }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-4'>
            <div>
                <Typography variant='h5' fontWeight={600} gutterBottom>Sign Up</Typography>
                <Typography color='textSecondary'>Enter your information to create an account.</Typography>
            </div>
            {!!errors.root && <Alert severity="error">{errors.root.message}</Alert>}
            <div className='flex gap-4 items-center'>
                <RHFTextField
                    name='firstName'
                    label='First Name'
                    placeholder='First Name'
                    size='small'
                    required
                    startAdornment={<InputAdornment position='start'><Person fontSize='small' /></InputAdornment>}
                />
                <RHFTextField
                    name='lastName'
                    label='Last Name'
                    placeholder='Last Name'
                    required
                    size='small'
                    startAdornment={<InputAdornment position='start'><Person fontSize='small' /></InputAdornment>}
                />
            </div>
            {interest === 'vendor' && <>
                <RHFTextField
                    name='businessName'
                    label='Business Name'
                    placeholder='Business Name'
                    size='small'
                    required={interest === 'vendor'}
                />
                <RHFSelect
                    name='businessType'
                    label='Business Type'
                    placeholder='Business Type'
                    size='small'
                    required={interest === 'vendor'}
                >
                    <MenuItem value='Individual / Sole Proprietor'>Individual / Sole Proprietor</MenuItem>
                    <MenuItem value='LLC'>LLC</MenuItem>
                    <MenuItem value='Corporation'>Corporation</MenuItem>
                    <MenuItem value='Partnership'>Partnership</MenuItem>
                </RHFSelect>
            </>}
            <RHFPhoneNumber
                name='phone'
                label='Phone Number'
                placeholder='Phone Number'
                required
                size='small'
            />
            <RHFTextField
                name='email'
                label='Email Address'
                placeholder='Email Address'
                type='email'
                required
                size='small'
                startAdornment={<InputAdornment position='start'><Mail fontSize='small' /></InputAdornment>}
            />
            <RHFTextField
                required
                name="password"
                label="Password"
                placeholder='Password'
                size='small'
                type={showPassword ? 'text' : 'password'}
                startAdornment={<InputAdornment position='start'><Lock fontSize='small' /></InputAdornment>}
                endAdornment={<InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff fontSize='small' /> : <Visibility fontSize='small' />}
                    </IconButton>
                </InputAdornment>}
            />
            <RHFCheckbox
                name='agree'
                color='primary'
                label={<Typography variant='body2'>I agree to the <MuiLink component={Link} href='/terms-and-conditions'>Terms & Conditions</MuiLink></Typography>}
            />
            <Button type='submit' variant='contained' loading={isSubmitting} sx={{ color: 'white' }}>Sign Up</Button>
            <Typography textAlign='center' variant='caption' color='textSecondary'>
                Already have an account?
                {' '}
                <MuiLink underline='none' component={Link} href='/auth/login'>Login</MuiLink>
            </Typography>
        </div>
    </FormProvider>
  )
}

export default RegisterForm