import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Box, Typography, Paper, CircularProgress, Alert } from '@mui/material'
import { IconUpload, IconFileSpreadsheet, IconFileTypeCsv } from '@tabler/icons-react'

interface FileUploadZoneProps {
  onFileAccepted: (file: File) => void
  isProcessing: boolean
}

const ACCEPTED_FORMATS = {
  'text/csv': ['.csv'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  'application/vnd.ms-excel': ['.xls'],
}

const FileUploadZone = ({ onFileAccepted, isProcessing }: FileUploadZoneProps) => {
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setError(null)
      if (rejectedFiles.length > 0) {
        setError('Formato no soportado. Por favor usa archivos .csv, .xlsx o .xls')
        return
      }
      if (acceptedFiles.length > 0) {
        onFileAccepted(acceptedFiles[0])
      }
    },
    [onFileAccepted]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FORMATS,
    multiple: false,
    disabled: isProcessing,
  })

  return (
    <Box>
      <Paper
        {...getRootProps()}
        sx={{
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'divider',
          borderRadius: 3,
          p: 6,
          textAlign: 'center',
          cursor: isProcessing ? 'not-allowed' : 'pointer',
          bgcolor: isDragActive ? 'primary.50' : 'background.paper',
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: 'primary.main',
            bgcolor: 'primary.50',
          },
        }}
        elevation={0}
      >
        <input {...getInputProps()} />

        {isProcessing ? (
          <Box>
            <CircularProgress size={48} sx={{ mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Procesando archivo...
            </Typography>
          </Box>
        ) : (
          <Box>
            <IconUpload
              size={48}
              stroke={1.5}
              color={isDragActive ? '#1976d2' : '#9e9e9e'}
              style={{ marginBottom: 16 }}
            />
            <Typography variant="h6" fontWeight={600} gutterBottom>
              {isDragActive ? 'Suelta el archivo aquí' : 'Arrastra tu archivo aquí'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              o haz clic para seleccionar
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                <IconFileTypeCsv size={20} />
                <Typography variant="caption">.CSV</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                <IconFileSpreadsheet size={20} />
                <Typography variant="caption">.XLSX / .XLS</Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3, mt: 3 }} variant="outlined">
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          Columnas reconocidas para Estudiante
        </Typography>
        <Typography variant="caption" color="text.secondary" component="div" sx={{ mb: 1 }}>
          Las columnas pueden estar en inglés o español indistintamente.
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {STUDENT_COLUMNS.map((col) => (
            <Box
              key={col}
              component="span"
              sx={{
                px: 1,
                py: 0.25,
                borderRadius: 1,
                bgcolor: 'primary.50',
                color: 'primary.dark',
                fontSize: 11,
                fontFamily: 'monospace',
              }}
            >
              {col}
            </Box>
          ))}
        </Box>

        <Typography variant="subtitle2" fontWeight={600} sx={{ mt: 2 }} gutterBottom>
          Columnas reconocidas para Responsable (opcional)
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {RESPONSIBLE_COLUMNS.map((col) => (
            <Box
              key={col}
              component="span"
              sx={{
                px: 1,
                py: 0.25,
                borderRadius: 1,
                bgcolor: 'success.50',
                color: 'success.dark',
                fontSize: 11,
                fontFamily: 'monospace',
              }}
            >
              {col}
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  )
}

const STUDENT_COLUMNS = [
  'cedula / dni',
  'nombre / name',
  'apellido1 / lastName1',
  'apellido2 / lastName2',
  'sexo / sex',
  'pais / country',
  'lugarNacimiento / birthplace',
  'fechaNacimiento / birthday',
  'ultimaInstitucion / lastInstitution',
  'adecuacion / adequacy',
  'canton',
  'distrito / district',
  'direccion / address',
  'requiereTransporte / requireTransport',
  'correoPersonal / personalEmail',
  'correoMEP / mepEmail',
]

const RESPONSIBLE_COLUMNS = [
  'cedulaResponsable / responsibleCedula',
  'nombreResponsable / responsibleName',
  'apellido1Responsable / responsibleLastName1',
  'apellido2Responsable / responsibleLastName2',
  'sexoResponsable / responsibleSex',
  'telefonoCasa / homePhone',
  'telefonoCelular / mobilePhone',
  'correoResponsable / responsibleEmail',
  'ocupacion / occupation',
  'paisResponsable / responsibleCountry',
]

export default FileUploadZone
