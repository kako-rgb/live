import { Rating, Typography } from '@mui/material';
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

interface RHF_RATING_PROPS {
    name: string,
    label?: string,
    size?: 'large' | "medium" | "small",
    precision?: number
}

const RHFRating = ({
    name,
    label,
    size,
    precision
}: RHF_RATING_PROPS) => {

    const { control } = useFormContext();

  return (
    <Controller
        name={name}
        control={control}
        render={({ field }) => {
            return <div className='flex flex-col gap-2'>
                {label && <Typography variant='body2'>{label}</Typography>}
                <Rating
                    name={name}
                    value={field.value}
                    onChange={(_, value) => field.onChange(value)}
                    size={size}
                    precision={precision}
                />
            </div>
        }}
    />
  )
}

export default RHFRating