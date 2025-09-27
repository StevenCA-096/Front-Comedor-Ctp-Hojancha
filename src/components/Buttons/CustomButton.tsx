import { Button, CircularProgress } from '@mui/material'
import type { ButtonProps } from '@mui/material/Button'
import type { SxProps, Theme } from '@mui/material/styles'
import type { ReactNode } from 'react'

interface CustomButtonProps {
  sx?: SxProps<Theme>
  label?: string
  onClickFn?: () => void
  fullWidth?: boolean
  type?: ButtonProps['type']
  loading?: boolean
  endIcon?: ReactNode
  dissableRipple?: boolean
  color?: ButtonProps['color']
  icon?: ReactNode
  size?: ButtonProps['size']
}

const CustomButton = ({
  sx = {},
  label,
  onClickFn,
  fullWidth = false,
  type = 'button',
  loading = false,
  endIcon = <></>,
  dissableRipple = false,
  color = 'primary',
  icon = null,
  size = 'medium',
}: CustomButtonProps) => {
  return (
    <Button
      fullWidth={fullWidth}
      onClick={onClickFn}
      variant="contained"
      endIcon={endIcon}
      type={type}
      color={color}
      sx={sx}
      disabled={loading}
      startIcon={!loading && label && icon}
      disableRipple={dissableRipple}
      size={size}
    >
      {loading && <CircularProgress sx={{ mr: 1 }} size={20} />}
      {label || icon}
    </Button>
  )
}

export default CustomButton
