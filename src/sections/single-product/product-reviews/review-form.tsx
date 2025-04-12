import { useForm } from 'react-hook-form';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import FormProvider from '@/components/hookform/FormProvider';
import { Alert, Typography } from '@mui/material';
import RHFRating from '@/components/hookform/RHFRating';
import RHFTextField from '@/components/hookform/RHFTextField';

const ReviewForm = () => {

    const { enqueueSnackbar } = useSnackbar();

    const [errorMessage, setErrorMessage] = useState<string>('')

    const ReviewSchema = Yup.object().shape({
        name: Yup.string().required('Your name is required'),
        rating: Yup.number(),
        title: Yup.string().required('Title is required'),
        description: Yup.string(),
    });

    type ReviewFormType = Yup.InferType<typeof ReviewSchema>

    const defaultValues: ReviewFormType = {
        name: '',
        title: '',
        description: '',
        rating: 0
    }

    const methods = useForm({ resolver: yupResolver(ReviewSchema), defaultValues });

    const { handleSubmit, reset, formState: { isSubmitting } } = methods;

    const onSubmit = async (data: ReviewFormType) => {
        try {
            setErrorMessage('');
            console.log(data)
            reset();
            enqueueSnackbar('Your review has been submitted', { variant: 'success' })
        } catch (err: any) {
            const erMes = err.response?.data?.message || err.message || err || 'An error occurred';
            setErrorMessage(erMes)
        }
    }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-3'>
            <Typography variant='h5' fontWeight={600}>Write a Review</Typography>
            {!!errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
            <RHFRating
                name='rating'
                label='Rating'
                precision={0.5}
            />
            <RHFTextField
                name='name'
                label='Your Name'
                placeholder='Your Name'
                required
            />
            <RHFTextField
                name='title'
                label='Review'
                placeholder='Review'
                required
            />
            <RHFTextField
                name='description'
                label='Comments (Optional)'
                placeholder='Comments (Optional)'
                multiline
                rows={4}
            />
        </div>
    </FormProvider>
  )
}

export default ReviewForm