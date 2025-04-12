import FormProvider from '@/components/hookform/FormProvider';
import { RHFCheckbox } from '@/components/hookform/RHFCheckbox';
import { RHFSelect } from '@/components/hookform/RHFSelect';
import RHFTextField from '@/components/hookform/RHFTextField';
import { RHFUploadAvatar } from '@/components/hookform/RHFUpload';
import useAxios from '@/hooks/useAxios';
import useMainStore from '@/store/main-store';
import { storage } from '@/utils/firebase';
import { CATEGORY } from '@/utils/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, MenuItem } from '@mui/material';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

interface CATEGORY_FORM_PROPS {
  open: boolean
  onClose: () => void
  selectedCategory: CATEGORY | null
  token: any
}

const CategoryForm = ({ onClose, open, selectedCategory, token }: CATEGORY_FORM_PROPS) => {

  const { updateCategory } = useMainStore();

  const { enqueueSnackbar } = useSnackbar();

  const request = useAxios(token);

  const CategorySchema = Yup.object().shape({
    name: Yup.string().required('Category name is required'),
    type: Yup.string(),
    description: Yup.string(),
    image: Yup.mixed(),
    featured: Yup.boolean()
  })

  type CategoryFormType = Yup.InferType<typeof CategorySchema>

  const defaultValues: CategoryFormType = {
    name: '',
    type: 'Product',
    description: '',
    image: '',
    featured: false
  }

  const methods = useForm({ resolver: yupResolver(CategorySchema), defaultValues });

  const { handleSubmit, reset, setValue, formState: { isSubmitting } } = methods;

  const selectImage = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    const newFile = Object.assign(file, { preview: URL.createObjectURL(file), });
    if (file) setValue('image', newFile, { shouldValidate: true });
  }, [setValue]);

  const uploadImage = async (file: any) => {
    const documentRef = ref(storage, `duka/categories/${file.name}`);
    const res = await uploadBytes(documentRef, file);
    const documentUrl = await getDownloadURL(res.ref);
    return documentUrl;
  }

  const onSubmit = async (data: CategoryFormType) => {
    try {
      const submitForm = data;
      if (data?.image && data?.image?.name) {
        const url = await uploadImage(data?.image);
        submitForm.image = url;
      };
      const response = await request({
        path: selectedCategory ? `/admin/category/${selectedCategory._id}` : '/admin/category',
        method: selectedCategory ? "patch" : 'post',
        pathData: submitForm
      })
      updateCategory(response.data.category);
      reset();
      enqueueSnackbar(`Category has been ${selectedCategory ? 'edited' : 'added'} successfully`, { variant: 'success' });
      onClose();
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err.message;
      enqueueSnackbar(errorMessage, { variant: 'error' })
    } 
  }

  useEffect(() => {
    if (selectedCategory) {
      setValue('name', selectedCategory.name);
      setValue('type', selectedCategory.type);
      setValue('description', selectedCategory.description);
      setValue('image', selectedCategory.image);
      setValue('featured', selectedCategory.featured);
    }
  }, [selectedCategory])

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle textAlign='center'>{selectedCategory ? 'Edit' : 'Add'} Category</DialogTitle>
        <Divider />
        <DialogContent>
          <div className='flex flex-col gap-3'>
            <RHFTextField
              name='name'
              label='Category Name'
              placeholder='Category Name'
              required
            />
            <RHFSelect
              name='type'
              label='Category Type'
              placeholder='Category Type'
            >
              <MenuItem value='Product'>Product</MenuItem>
              <MenuItem value='Service'>Service</MenuItem>
            </RHFSelect>
            <RHFTextField
              name='description'
              label='Description'
              placeholder='Description'
              multiline
              rows={4}
            />
            <RHFUploadAvatar
              name='image'
              placeholder='Select Image'
              onDrop={selectImage}
            />
            <RHFCheckbox
              name='featured'
              label='Featured'
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button disabled={isSubmitting} onClick={onClose}>Cancel</Button>
          <Button variant='contained' type='submit' loading={isSubmitting}>Save</Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  )
}

export default CategoryForm