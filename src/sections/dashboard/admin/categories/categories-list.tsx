'use client'

import { StyledTableCell, StyledTableRow } from '@/components/table/styles';
import useBoolean from '@/hooks/useBoolean';
import useMainStore from '@/store/main-store'
import { CATEGORY } from '@/utils/types';
import { Edit } from '@mui/icons-material';
import { Button, IconButton, Table, TableBody, TableContainer, TableHead, Typography } from '@mui/material'
import React, { useState } from 'react'
import CategoryForm from './category-form';

interface CATEGORIES_LIST_PROPS {
    token: any
}

const CategoriesList = ({ token }: CATEGORIES_LIST_PROPS) => {

    const { categories } = useMainStore();

    const [selectedCategory, setSelectedCategory] = useState<CATEGORY | null>(null);
    const formOpen = useBoolean();

    const openEditCategory = (category: CATEGORY) => {
        setSelectedCategory(category);
        formOpen.onTrue();
    }

    const closeEditCategory = () => {
        setSelectedCategory(null);
        formOpen.onFalse();
    }

  return (
    <>

        <CategoryForm 
            onClose={closeEditCategory}
            open={formOpen.value}
            selectedCategory={selectedCategory}
            token={token} 
        />

        <div className='flex flex-col gap-6'>

            <div className='flex items-center justify-between gap-3'>
                <Typography variant='h5' fontWeight={600}>Categories</Typography>
                <Button onClick={formOpen.onTrue} variant='outlined'>Add Category</Button>
            </div>

            <TableContainer>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Category</StyledTableCell>
                            <StyledTableCell align='right'>Image</StyledTableCell>
                            <StyledTableCell align='right'>Featured</StyledTableCell>
                            <StyledTableCell align='right'>Actions</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category, index) => <StyledTableRow key={index}>
                            <StyledTableCell>{category.name}</StyledTableCell>
                            <StyledTableCell align='right'>
                                <div className='flex justify-end'>
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className='w-12 h-12 object-cover rounded-lg'
                                    />
                                </div>
                            </StyledTableCell>
                            <StyledTableCell align='right'>{category.featured ? 'Yes' : 'No'}</StyledTableCell>
                            <StyledTableCell align='right'>
                                <IconButton onClick={() => { openEditCategory(category) }} size='small'><Edit fontSize='small' /></IconButton>
                            </StyledTableCell>
                        </StyledTableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </>
  )
}

export default CategoriesList