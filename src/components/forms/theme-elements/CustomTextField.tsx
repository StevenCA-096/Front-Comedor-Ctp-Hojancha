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
  name?: Path<T>
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
  placeholder?: string
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
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
  placeholder,
  inputProps,
}: CustomTextFieldProps<T>) => {
  const theme = useTheme()

  // 🔥 SOLUCIÓN: Combinar el onChange de RHF con el personalizado
  const registeredProps = register && name ? register(name) : {}

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Primero ejecuta el onChange de React Hook Form
    if ('onChange' in registeredProps && typeof registeredProps.onChange === 'function') {
      registeredProps.onChange(e)
    }
    // Luego ejecuta el onChange personalizado si existe
    if (onChangeFn) {
      onChangeFn(e)
    }
  }

  return (
    <>
      {externalLabel && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <TextField
        id={id}
        onKeyDown={onKeyDown}
        variant={variant}
        fullWidth
        error={!!error}
        {...registeredProps}
        onChange={handleChange} // 🔥 Usa el onChange combinado
        name={name}
        type={type}
        label={!externalLabel ? label : undefined}
        disabled={disabled}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        value={value}
        placeholder={placeholder}
        InputProps={{
          startAdornment: Icon && (
            <InputAdornment position="start">{Icon}</InputAdornment>
          ),
        }}
        inputProps={inputProps}
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