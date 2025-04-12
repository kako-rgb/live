'use client'

import FormProvider from '@/components/hookform/FormProvider';
import RHFEditor from '@/components/hookform/RHFEditor';
import { RHFSelect } from '@/components/hookform/RHFSelect';
import RHFTextField from '@/components/hookform/RHFTextField';
import RHFUpload from '@/components/hookform/RHFUpload';
import useAxios from '@/hooks/useAxios';
import useMainStore from '@/store/main-store';
import { compressImageHandler, randomString } from '@/utils/data';
import { storage } from '@/utils/firebase';
import { PRODUCT } from '@/utils/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, Button, Card, CardContent, CardHeader, Grid2, MenuItem, TextField, Typography } from '@mui/material';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

interface PRODUCT_FORM_PROPS {
    token: any
    product: PRODUCT | null
}

const ProductForm = ({ token, product }: PRODUCT_FORM_PROPS) => {

    const { categories } = useMainStore();
    const { push } = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const request = useAxios(token);

    const [uploadProgress, setUploadProgress] = useState<number>(0);
	const [filesToUpload, setFilesToUpload] = useState<any[]>([]);
    const [newAttribute, setNewAttribute] = useState({ name: '', values: [] })

    const ProductSchema = Yup.object().shape({
        name: Yup.string().required('Product name is required'),
        category: Yup.string().required('Product category is required'),
        description: Yup.string(),
        media: Yup.mixed(),
        sku: Yup.string(),
        stock: Yup.string(),
        price: Yup.string().required('Product price is required'),
        discountPrice: Yup.string(),
        attributes: Yup.array().of(Yup.object().shape({
            name: Yup.string(),
            values: Yup.array().of(Yup.string())
        })),
        shippingWeight: Yup.string(),
        shippingHeight: Yup.string(),
        shippingWidth: Yup.string(),
        shippingLength: Yup.string()
    });

    type ProductFormType = Yup.InferType<typeof ProductSchema>

    const defaultValues: ProductFormType = {
        name: '',
        category: '',
        description: '',
        media: '',
        sku: '',
        stock: '0',
        price: '0',
        discountPrice: '0',
        attributes: [],
        shippingWeight: '',
        shippingHeight: '',
        shippingWidth: '',
        shippingLength: ''
    }

    const methods = useForm({ resolver: yupResolver(ProductSchema), defaultValues });

    const { handleSubmit, reset, watch, setValue, formState: { isSubmitting } } = methods;

    const values = watch();

    const addAttributeHandler = () => {
        setValue('attributes', [...values?.attributes || [], newAttribute]);
        setNewAttribute({ name: '', values: [] });
    }

    const changeAttributeName = (index: number, value: string) => {
        const newAttributes = values.attributes || [];
        newAttributes[index].name = value;
        setValue('attributes', newAttributes);
    }

    const changeAttributeValues = (index: number, value: string[]) => {
        const newAttributes = values.attributes || [];
        newAttributes[index].values = value;
        setValue('attributes', newAttributes);
    }

    const deleteAttributeHandler = (index: number) => {
        setValue('attributes', values.attributes?.filter((_, i) => i !== index));
    }

    const addImage = useCallback((acceptedFiles: any) => {
        const files = values.media || [];
        const newFiles = acceptedFiles.map((file: any) => Object.assign(file, { preview: URL.createObjectURL(file) }));
        setValue("media", [...files, ...newFiles], { shouldValidate: true });
    }, [setValue, values.media]);

	const removeImages = useCallback((inputFile: any) => {
        const filtered = values.media?.filter((file: any) => (file?.name || file?.link || file) !== (inputFile?.name || inputFile?.link || inputFile));
        setValue("media", filtered);
    }, [setValue, values]);

    const uploadImages = async (files: any) => {
		const uploadedImages = files;
		for (let i = 0; i < files.length; i += 1) {
			if (files[i]?.name) {
				const fileName = `duka/products/${randomString(6)}-${files[i].name}`;
				const documentRef = ref(storage, fileName);
				const smallSizeDocument = await compressImageHandler(files[i])
				const res = await uploadBytes(documentRef, smallSizeDocument);
				const documentUrl = await getDownloadURL(res.ref);
				const foundImageIndex = filesToUpload.findIndex((each) => each === files[i]);
				if (foundImageIndex !== -1) {
					setUploadProgress(((foundImageIndex + 1) / filesToUpload.length) * 100);
				}
				uploadedImages[i] = { link: documentUrl, ref: fileName };
			}
		}
		return uploadedImages;
	};

    const onSubmit = async (data: ProductFormType) => {
        try {
			const submitForm = data
			if (submitForm.media) {
				const uploadedImages = await uploadImages(data.media);
				submitForm.media = uploadedImages;
			}
            console.log(submitForm);
            await request({
                method: product ? 'patch' : 'post',
                path: product ? `/vendor/product/${product._id}` : '/vendor/product',
                pathData: submitForm
            });
            enqueueSnackbar(`Product has been ${product ? 'edited' : 'added'} successfully`, { variant: 'success' });
            push('/dashboard/vendor/products')
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message || err.message;
            enqueueSnackbar(errorMessage, { variant: 'error' })
        }
    }

    useEffect(() => {
        if (product) {
            setValue('name', product.name);
            setValue('category', product.category?._id || '');
            setValue('description', product.description);
            setValue("media", product.media);
            setValue('sku', product.sku);
            setValue('stock', `${product.stock || '0'}`);
            setValue('price', `${product.price}`);
            setValue('discountPrice', `${product.discountPrice || '0'}`);
            setValue('attributes', product.attributes);
            setValue('shippingWeight', `${product.shipping.weight || '0'}`);
            setValue('shippingHeight', `${product.shipping.height || '0'}`);
            setValue('shippingWidth', `${product.shipping.width || '0'}`);
            setValue('shippingLength', `${product.shipping.length || '0'}`);
        }
    }, [product])

    useEffect(() => {
        if (values.media && Array.isArray(values.media)) {
            const restImages = values?.media?.filter((each: any) => each.name) || [];
            const theFiles: any[] = restImages;
            setFilesToUpload(theFiles);
        }
	}, [values.media, setFilesToUpload]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-5'>

            <div className='flex items-center justify-between gap-5'>
                <Typography variant='h5' fontWeight={800}>{product ? 'Edit' : 'Add'} Product</Typography>
                <Button variant='contained' type='submit' loading={isSubmitting}>Publish</Button>
            </div>

            <Grid2 container spacing={2}>
                {/* Basic Information */}
                <Grid2 size={{ xs: 12, md: 8 }}>
                    <Card variant='outlined'>
                        <CardHeader title={<Typography variant='h6' fontWeight={700}>Basic Information</Typography>} />
                        <CardContent>
                            <div className='flex flex-col gap-4'>
                                <RHFTextField
                                    name='name'
                                    label='Product Name'
                                    placeholder='Product Name'
                                    required
                                />
                                <RHFEditor
                                    name='description'
                                    placeholder='Enter the product description'
                                />
                            </div>
                        </CardContent>
                    </Card>
                </Grid2>
                {/* Category And Pricing  */}
                <Grid2 size={{ xs: 12, md: 4 }} container spacing={2}>
                    <Grid2 size={12}>
                        <Card variant='outlined'>
                            <CardHeader title={<Typography variant='h6' fontWeight={700}>Organization</Typography>} />
                            <CardContent>
                                <RHFSelect
                                    name='category'
                                    label='Select Category'
                                    placeholder='Select Category'
                                    required
                                >
                                    {categories.map((category, index) => <MenuItem key={index} value={category._id}>{category.name}</MenuItem>)}
                                </RHFSelect>
                            </CardContent>
                        </Card>
                    </Grid2>
                    <Grid2 size={12}>
                        <Card variant='outlined'>
                            <CardHeader title={<Typography variant='h6' fontWeight={700}>Pricing</Typography>} />
                            <CardContent>
                                <div className='flex flex-col gap-3'>
                                    <RHFTextField
                                        name='price'
                                        label='Product Price'
                                        placeholder='Product Price'
                                        type='number'
                                        required
                                    />
                                    <RHFTextField
                                        name='discountPrice'
                                        label='Discounted Price (Optional)'
                                        placeholder='Discounted Price (Optional)'
                                        type='number'
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </Grid2>
                </Grid2>
            </Grid2>

            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, md: 8 }}>
                    <Card variant='outlined'>
                        <CardHeader title={<Typography variant='h6' fontWeight={700}>Media</Typography>} />
                        <CardContent>
                            <RHFUpload
                                name="media"
                                accept={{ "image/*": [] }}
                                onDrop={addImage}
                                multiple
                                onRemove={removeImages}
                                placeholder="Select media"
                            />
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <Card variant='outlined'>
                        <CardHeader title={<Typography variant='h6' fontWeight={700}>Inventory</Typography>} />
                        <CardContent>
                            <div className='flex flex-col gap-4'>
                                <RHFTextField
                                    name='sku'
                                    label='Product SKU'
                                    placeholder='Product SKU'
                                />
                                <RHFTextField
                                    name='stock'
                                    label='Product Stock'
                                    placeholder='Product Stock'
                                    type='number'
                                />
                            </div>
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>
            
            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    <Card variant='outlined'>
                        <CardHeader title={<Typography variant='h6' fontWeight={700}>Shipping</Typography>} />
                        <CardContent>
                            <div className='flex flex-col gap-3'>
                                <RHFTextField
                                    name='shippingWeight'
                                    label='Weight (kg)'
                                    placeholder='Weight (kg)'
                                    type='number'
                                />
                                <RHFTextField
                                    name='shippingHeight'
                                    label='Height (cm)'
                                    placeholder='Height (cm)'
                                    type='number'
                                />
                                <RHFTextField
                                    name='shippingWidth'
                                    label='Width (cm)'
                                    placeholder='Width (cm)'
                                    type='number'
                                />
                                <RHFTextField
                                    name='shippingLength'
                                    label='Length (cm)'
                                    placeholder='Length (cm)'
                                    type='number'
                                />
                            </div>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 8 }}>
                    <Card variant='outlined'>
                        <CardHeader title={<Typography variant='h6' fontWeight={700}>Attributes</Typography>} />
                        <CardContent>
                            <div className='flex flex-col gap-3'>
                            {values.attributes?.map((attribute, index) => (
                                <div key={index} className='flex gap-3'>
                                    <TextField
                                        name='attribute_name'
                                        value={attribute.name}
                                        onChange={(e) => { changeAttributeName(index, e.target.value) }}
                                        placeholder='Attribute Name'
                                        fullWidth
                                        size='small'
                                    />
                                    <Autocomplete
                                        value={attribute.values}
                                        freeSolo
                                        multiple
                                        options={[]}
                                        onChange={(_, newValue) => { changeAttributeValues(index, newValue as any) }}
                                        fullWidth
                                        size='small'
                                        renderInput={(params) => <TextField {...params}
                                            name='attribute_values'
                                            label='Values' 
                                            helperText='Press Enter To Add To List' 
                                        />}
                                    />
                                    <Button sx={{ height: 'fit-content' }} color='error' variant='contained' onClick={deleteAttributeHandler.bind(null, index)}>Delete</Button>
                                </div>
                            ))}
                            <div className='flex gap-3'>
                                <TextField
                                    name='attribute_name'
                                    value={newAttribute.name}
                                    onChange={(e) => { setNewAttribute(prev => ({ ...prev, name: e.target.value })) }}
                                    placeholder='Attribute Name'
                                    fullWidth
                                    size='small'
                                />
                                <Autocomplete
                                    value={newAttribute.values}
                                    freeSolo
                                    multiple
                                    options={[]}
                                    onChange={(_, newValue) => { setNewAttribute(prev => ({ ...prev, values: newValue as any })) }}
                                    fullWidth
                                    size='small'
                                    renderInput={(params) => <TextField 
                                        {...params} 
                                        label='Values' 
                                        helperText='Press Enter To Add To List' 
                                        name='attribute_values'
                                    />}
                                />
                                <Button sx={{ height: 'fit-content' }} disabled={!newAttribute.name || newAttribute.values.length === 0} variant='contained' onClick={addAttributeHandler}>Add</Button>
                            </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>

        </div>
    </FormProvider>
  )
}

export default ProductForm