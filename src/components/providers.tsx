'use client'

import React, { ReactNode, useEffect } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import ThemeProvider from '@/utils/theme';
import { SessionProvider } from 'next-auth/react';
import { SnackbarProvider } from 'notistack';
import NextTopLoader from 'nextjs-toploader';
import { PRIMARY_COLOR } from '@/config';
import useMainStore from '@/store/main-store';
import { axiosInstance } from '@/hooks/useAxios';

const Providers = ({ children }: { children: ReactNode }) => {

  const { setCategories } = useMainStore();

  const getCategoriesHandler = async () => {
    try {
      const response = await axiosInstance.get('/category');
      setCategories(response.data.categories);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCategoriesHandler();
  }, [])

  return (
    <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <SessionProvider>
        <NextTopLoader color={PRIMARY_COLOR.main} showSpinner={false} />
        <AppRouterCacheProvider>
            <ThemeProvider>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </SessionProvider>
    </SnackbarProvider>
  )
}

export default Providers