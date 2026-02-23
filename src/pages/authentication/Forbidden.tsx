import { Box, Button, Grid2, Typography, useTheme } from '@mui/material'
import { alpha } from '@mui/system'
import { LockOutlined, ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import PageContainer from '@/components/container/page/PageContainer'

const Forbidden = () => {
  const theme = useTheme()
  const navigate = useNavigate()

  return (
    <PageContainer>
      <Grid2 container justifyContent="center" alignItems="center">
        <Grid2 size={{ xs: 12, sm: 8, md: 5 }}>
          <Box
            sx={{
              textAlign: 'center',
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              border: `1px solid ${theme.palette.divider}`,
              bgcolor: 'background.paper',
              boxShadow: `0 8px 40px ${alpha(theme.palette.common.black, 0.08)}`,
            }}
          >
            {/* Icon */}
            <Box
              sx={{
                width: 96,
                height: 96,
                borderRadius: '50%',
                bgcolor: alpha(theme.palette.error.main, 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
              }}
            >
              <LockOutlined
                sx={{ fontSize: 48, color: 'error.main' }}
              />
            </Box>

            {/* Code */}
            <Typography
              variant="h1"
              fontWeight={800}
              sx={{
                fontSize: { xs: '5rem', md: '7rem' },
                lineHeight: 1,
                color: alpha(theme.palette.error.main, 0.15),
                letterSpacing: '-4px',
                mb: 1,
                userSelect: 'none',
              }}
            >
              403
            </Typography>

            {/* Title */}
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Acceso denegado
            </Typography>

            {/* Description */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 340, mx: 'auto', lineHeight: 1.7 }}
            >
              No tenés los permisos necesarios para acceder a esta sección.
              Si creés que esto es un error, contactá al administrador.
            </Typography>

            {/* Actions */}
            <Grid2 container spacing={2} justifyContent="center">
              <Grid2 size={{ xs: 12, sm: 'auto' }}>
                <Button
                  variant="contained"
                  startIcon={<ArrowBack />}
                  onClick={() => navigate(-1)}
                  fullWidth
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 2,
                    px: 4,
                  }}
                >
                  Volver
                </Button>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 'auto' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/')}
                  fullWidth
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 2,
                    px: 4,
                  }}
                >
                  Ir al inicio
                </Button>
              </Grid2>
            </Grid2>
          </Box>
        </Grid2>
      </Grid2>
    </PageContainer>
  )
}

export default Forbidden