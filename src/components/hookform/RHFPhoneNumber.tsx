import { Controller, useFormContext } from 'react-hook-form';
import { MuiTelInput } from 'mui-tel-input'

interface RPN {
    name: string;
    label?: string;
    size?: "small" | "medium";
    required?: boolean;
    fullWidth?: boolean
    placeholder?: string
    variant?: 'outlined' | 'filled' | 'standard'
}

const RHFPhoneNumber = ({ 
    name, 
    label, 
    size, 
    required, 
    fullWidth, 
    placeholder,
    variant = 'outlined'
}: RPN) => {
    const { control } = useFormContext();
  return (
    <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
            <MuiTelInput
                value={field.value}
                onChange={field.onChange}
                defaultCountry='KE'
                label={label}
                placeholder={placeholder}
                error={!!error}
                helperText={error && error?.message}
                size={size}
                required={required}
                fullWidth={fullWidth}
                variant={variant}
            />
        )}
    />
  )
}

export default RHFPhoneNumber