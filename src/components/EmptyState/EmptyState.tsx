import { Box, Typography, alpha, useTheme } from '@mui/material'
import { IconPlus } from '@tabler/icons-react'
import CustomButton from '@/components/Buttons/CustomButton'
import { PlaylistAdd } from '@mui/icons-material'

interface EmptyStateProps {
  /**
   * Function executed when create button is pressed/clicked
   */
  onCreateClick?: () => void
  /**
   * Text to show
   */
  text?: string
  /**
   * button label
   */
  buttonLabel?: string
  /**
   * If true, hides the button
   */
  hideButton?: boolean
  /**
   * Custom icon
   */
  icon?: React.ReactNode
  /**
   * icon size
   */
  iconSize?: number
}

const EmptyState = ({
  onCreateClick,
  text = 'Sin registros, haga click en crear para hacer el primer registro',
  buttonLabel = 'Crear',
  hideButton = false,
  icon,
  iconSize = 80,
}: EmptyStateProps) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 3,
        textAlign: 'center',
        borderRadius: 2,
        bgcolor: alpha(theme.palette.primary.main, 0.02),
        border: `2px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
      }}
    >
      {/* Icono */}
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: iconSize + 40,
          height: iconSize + 40,
          borderRadius: '50%',
          bgcolor: alpha(theme.palette.primary.main, 0.1),
        }}
      >
        {icon || <PlaylistAdd style={{ color: theme.palette.primary.main }} />}
      </Box>

      {/* Texto */}
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{
          mb: 3,
          maxWidth: 500,
          fontWeight: 500,
        }}
      >
        {text}
      </Typography>

      {/* Botón */}
      {!hideButton && onCreateClick && (
        <CustomButton
          label={buttonLabel}
          icon={<IconPlus size={20} />}
          onClickFn={onCreateClick}
          sx={{
            px: 4,
            py: 1.5,
          }}
        />
      )}
    </Box>
  )
}

export default EmptyState