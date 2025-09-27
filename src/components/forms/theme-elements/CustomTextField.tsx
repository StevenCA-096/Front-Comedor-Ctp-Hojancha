import {
  TextField,
  InputAdornment,
  FormHelperText,
  FormLabel,
  useTheme,
} from '@mui/material'
import type { ReactNode } from 'react'
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form'

interface CustomTextFieldProps<T extends FieldValues> {
  externalLabel?: boolean
  label: string
  name?: Path<T> // 🔹 ahora opcional
  register?: UseFormRegister<T>
  type?: string
  Icon?: ReactNode
  error?: boolean
  errorMessage?: string
  disabled?: boolean
  autoFocus?: boolean
  onChangeFn?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  autoComplete?: string
  variant?: 'outlined' | 'filled' | 'standard'
  value?: string | number
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>
  id?: string
}

const CustomTextField = <T extends FieldValues>({
  externalLabel = false,
  label,
  name,
  register,
  type = 'text',
  Icon = null,
  error = false,
  errorMessage = '',
  disabled = false,
  autoFocus = false,
  onChangeFn,
  autoComplete = '',
  variant = 'outlined',
  value,
  onKeyDown,
  id,
}: CustomTextFieldProps<T>) => {
  const theme = useTheme()

  return (
    <>
      {externalLabel && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <TextField
        id={id}
        onKeyDown={onKeyDown}
        variant={variant}
        fullWidth
        error={!!error}
        {...(register && name ? register(name) : {})} 
        name={name}
        type={type}
        label={!externalLabel ? label : undefined}
        disabled={disabled}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        onChange={onChangeFn}
        value={value}
        InputProps={{
          startAdornment: Icon && (
            <InputAdornment position="start">{Icon}</InputAdornment>
          ),
        }}
      />

      <FormHelperText
        sx={{
          color: error ? theme.palette.error.main : 'transparent',
        }}
      >
        {errorMessage || 'error'}
      </FormHelperText>
    </>
  )
}

export default CustomTextField
