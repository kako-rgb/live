import { TextField } from '@mui/material';
import { HTMLInputTypeAttribute, ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form'

interface RTF {
    name: string, 
    label: string | ReactNode, 
    placeholder: string, 
    helperText ? : string, 
    type ? : HTMLInputTypeAttribute, 
    required ? : boolean,
    disabled ? : boolean,
    multiline?: boolean,
    rows?: number,
    sx?: object,
    size?: 'small' | 'medium',
    onBlur?: any;
    fullWidth?: boolean;
    variant?: 'outlined' | 'filled' | 'standard',
    id?: string,
    startAdornment?: ReactNode,
    endAdornment?: ReactNode
}

const RHFTextField = ({ name, label, onBlur, size, placeholder, helperText = '', type, required, disabled, fullWidth = true, sx, multiline, rows = 1, variant = 'outlined', id, startAdornment, endAdornment, ...other }: RTF) => {

    const { control } = useFormContext();

  return (
    <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
            <TextField 
              size={size}
              id={id}
              {...field} 
              type={type} 
              onBlur={onBlur} 
              label={label} 
              sx={sx} 
              disabled={disabled} 
              multiline={multiline} 
              required={required} 
              placeholder={placeholder} 
              rows={rows}
              slotProps={{
                input: {
                    startAdornment,
                    endAdornment
                }
              }}
              fullWidth={fullWidth} 
              value={typeof field.value === 'number' && field.value === 0 ? '' : field.value} 
              error={!!error} 
              helperText={error ? error?.message : helperText} 
              variant={variant}
              onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
              {...other} 
            />
        )}
    />
  )
}

export default RHFTextField;