import { PRIMARY_COLOR } from '@/config'
import { Search } from '@mui/icons-material'
import { Button, IconButton, styled, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'

const SearchContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    width: '50%',
    border: '1px solid #ccc',
    borderRadius: '5px',
    [theme.breakpoints.down('md')]: {
        width: '100%',
    }
}))

const TopBarSearch = ({ isWhiteBg, showSearchText }: { isWhiteBg?: boolean, showSearchText?: boolean }) => {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <SearchContainer sx={{ ...(isWhiteBg && { backgroundColor: 'white' }) }}>
        <input
            placeholder='Search for products, services or vendors...'
            className='flex-1 outline-0'
            style={{ padding: '6px 12px', ...(isWhiteBg && { color: '#000' }) }}
        />
        <div style={{ backgroundColor: PRIMARY_COLOR.main, borderRadius: '0 5px 5px 0' }}>
            {(!showSearchText || isSmallScreen) && <IconButton><Search sx={{ color: 'white' }} /></IconButton>}
            {(showSearchText && !isSmallScreen) && <Button sx={{ color: 'white' }} variant='contained' startIcon={<Search />}>Search</Button>}
        </div>
    </SearchContainer>
  )
}

export default TopBarSearch