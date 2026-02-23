import { Box, Button, Paper, Typography, Divider } from '@mui/material'
import { IconCheck, IconAlertCircle, IconRefresh } from '@tabler/icons-react'
import type { ImportResult } from '../types/import.types'

interface ImportSummaryProps {
  result: ImportResult
  onReset: () => void
}

const ImportSummary = ({ result, onReset }: ImportSummaryProps) => {
  const isPartial = result.failed > 0

  return (
    <Paper sx={{ p: 4, textAlign: 'center', maxWidth: 560, mx: 'auto' }}>
      <Box
        sx={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          bgcolor: isPartial ? 'warning.100' : 'success.100',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 3,
        }}
      >
        {isPartial ? (
          <IconAlertCircle size={36} color="#ed6c02" />
        ) : (
          <IconCheck size={36} color="#2e7d32" />
        )}
      </Box>

      <Typography variant="h5" fontWeight={700} gutterBottom>
        {isPartial ? 'Importación parcialmente completada' : '¡Importación exitosa!'}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        {isPartial
          ? 'Algunos registros no pudieron ser importados.'
          : 'Todos los registros fueron importados correctamente.'}
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 4 }}>
        <Box>
          <Typography variant="h3" fontWeight={800} color="success.main">
            {result.success}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Importados
          </Typography>
        </Box>
        {result.responsiblesCreated > 0 && (
          <Box>
            <Typography variant="h3" fontWeight={800} color="info.main">
              {result.responsiblesCreated}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Responsables creados
            </Typography> 
          </Box>
        )}
        {result.failed > 0 && (
          <Box>
            <Typography variant="h3" fontWeight={800} color="error.main">
              {result.failed}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Fallidos
            </Typography>
          </Box>
        )}
      </Box>

      {result.errors && result.errors.length > 0 && (
        <Box
          sx={{
            textAlign: 'left',
            bgcolor: 'error.50',
            borderRadius: 2,
            p: 2,
            mb: 3,
            maxHeight: 160,
            overflowY: 'auto',
          }}
        >
          <Typography variant="caption" fontWeight={600} color="error.main" gutterBottom display="block">
            Errores durante la importación:
          </Typography>
          {result.errors.map((err, i) => (
            <Typography key={i} variant="caption" color="error.dark" display="block">
              • Fila {err.row}: {err.message}
            </Typography>
          ))}
        </Box>
      )}

      <Button
        variant="contained"
        startIcon={<IconRefresh size={16} />}
        onClick={onReset}
        fullWidth
      >
        Nueva importación
      </Button>
    </Paper>
  )
}

export default ImportSummary
