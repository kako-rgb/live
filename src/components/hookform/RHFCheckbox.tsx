import { Controller, useFormContext } from 'react-hook-form';

// @mui
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel, { formControlLabelClasses } from '@mui/material/FormControlLabel';
import { ReactNode } from 'react';
import { PaletteColorOptions } from '@mui/material';

// ----------------------------------------------------------------------

interface RHF_CHECKBOX_PROPS {
    name: string;
    helperText?: string;
    color?: CheckboxProps['color'];
    label?: string | ReactNode;
}

export function RHFCheckbox({ name, helperText, label, color = 'default', ...other }: RHF_CHECKBOX_PROPS) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <FormControlLabel 
            label={label} 
            control={<Checkbox 
                {...field}
                color='primary'
                checked={field.value} 
            />} 
            {...other} 
        />

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </div>
      )}
    />
  );
}

// ----------------------------------------------------------------------

interface RHF_MULTI_CHECKBOX_PROPS {
    name: string,
    options: { label: string, value: string }[],
    label?: string,
    row?: boolean
    helperText?: string,
    spacing?: string | number,
    sx?: Record<string, any>,
}

export function RHFMultiCheckbox({ 
    row, 
    name, 
    label, 
    options, 
    spacing, 
    helperText, 
    sx, 
    ...other 
}: RHF_MULTI_CHECKBOX_PROPS) {
  const { control } = useFormContext();

  const getSelected = (selectedItems: any[], item: any) =>
    selectedItems.includes(item)
      ? selectedItems.filter((value) => value !== item)
      : [...selectedItems, item];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset">
          {label && (
            <FormLabel component="legend" sx={{ typography: 'body2' }}>
              {label}
            </FormLabel>
          )}

          <FormGroup
            sx={{
              ...(row && {
                flexDirection: 'row',
              }),
              [`& .${formControlLabelClasses.root}`]: {
                '&:not(:last-of-type)': {
                  mb: spacing || 0,
                },
                ...(row && {
                  mr: 0,
                  '&:not(:last-of-type)': {
                    mr: spacing || 2,
                  },
                }),
              },
              ...sx,
            }}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <Checkbox
                    checked={field.value.includes(option.value)}
                    onChange={() => field.onChange(getSelected(field.value, option.value))}
                  />
                }
                label={option.label}
                {...other}
              />
            ))}
          </FormGroup>

          {(!!error || helperText) && (
            <FormHelperText error={!!error} sx={{ mx: 0 }}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
