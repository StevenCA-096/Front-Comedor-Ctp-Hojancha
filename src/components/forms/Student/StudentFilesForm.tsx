import { Box, Grid2, Typography, Button, FormControl, FormLabel, TextField, Paper, Stack, Alert } from '@mui/material'
import { ArrowBack, CheckCircle, Description, CreditCard, AccountBox, Image, Favorite } from '@mui/icons-material'
import { alpha, useTheme } from '@mui/system'
import CustomButton from '@/components/Buttons/CustomButton'

interface StudentFilesFormProps {
  handleSubmit: () => void
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isUploading: boolean
  handlePrev?: () => void
  showUploadAlert?: boolean
}

const StudentFilesForm = ({
  handleSubmit,
  handleFileChange,
  isUploading,
  handlePrev,
  showUploadAlert
}: StudentFilesFormProps) => {

  return (
    <Box component="form">
      {/* Header */}
      {
        showUploadAlert && (
          <Box mb={4}>

            <Alert severity="info" sx={{ mb: 2 }}>
              Por favor, suba los documentos solicitados. Asegúrate de que sean legibles y estén en los formatos permitidos.
              <br />
              <strong>
                Recuerde que es opcional subir estos documentos, pero en caso de no subirlos debe presentarlos el dia de su cita
              </strong>
            </Alert>
          </Box>
        )
      }

      {/* File Inputs Grid */}
      <Grid2 container spacing={3} mb={4}>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <FileInputCard
            id="schoolTitle"
            label="Título de escuela"
            icon={<Description sx={{ color: 'primary.main', fontSize: 24 }} />}
            accept=".jpg,.png,.pdf"
            onChange={handleFileChange}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, lg: 6 }}>
          <FileInputCard
            id="policy"
            label="Póliza"
            icon={<Description sx={{ color: 'primary.main', fontSize: 24 }} />}
            accept=".jpg,.png,.pdf"
            onChange={handleFileChange}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, lg: 6 }}>
          <FileInputCard
            id="responsibleCedulaCopy"
            label="Copia de la cédula del responsable"
            icon={<CreditCard sx={{ color: 'primary.main', fontSize: 24 }} />}
            accept=".jpg,.png,.pdf,.jpeg"
            onChange={handleFileChange}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, lg: 6 }}>
          <FileInputCard
            id="studentCedulaCopy"
            label="Copia de la cédula del estudiante"
            icon={<AccountBox sx={{ color: 'primary.main', fontSize: 24 }} />}
            accept=".jpg,.png,.pdf,.jpeg"
            onChange={handleFileChange}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, lg: 6 }}>
          <FileInputCard
            id="studentPassportPicture"
            label="Foto tamaño pasaporte del estudiante"
            icon={<Image sx={{ color: 'primary.main', fontSize: 24 }} />}
            accept=".jpg,.png,.jpeg"
            onChange={handleFileChange}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, lg: 6 }}>
          <FileInputCard
            id="organDonorProof"
            label="Comprobante de donación"
            icon={<Favorite sx={{ color: 'primary.main', fontSize: 24 }} />}
            accept=".jpg,.png,.pdf,.jpeg"
            onChange={handleFileChange}
            required={false}
          />
        </Grid2>
      </Grid2>

      {/* Botones de navegación */}
      <Box display="flex" justifyContent="space-between" mt={4}>
        {handlePrev && (
          <Button
            variant="outlined"
            size="large"
            startIcon={<ArrowBack />}
            onClick={handlePrev}
            disabled={isUploading}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              px: 4
            }}
          >
            Volver
          </Button>
        )}


        <CustomButton 
          color='primary'
          loading={isUploading}
          endIcon={<CheckCircle />}
          label='Enviar'
          fullWidth={handlePrev ? false : true}
          onClickFn={handleSubmit}
        />
     
      </Box>
    </Box>
  )
}


interface FileInputCardProps {
  id: string
  label: string
  icon: React.ReactNode
  accept: string
  required?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FileInputCard = ({ id, label, icon, accept, required = true, onChange }: FileInputCardProps) => {
  const theme = useTheme()

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        border: `2px dashed ${alpha(theme.palette.divider, 0.3)}`,
        borderRadius: 2,
        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          borderColor: theme.palette.primary.main,
          bgcolor: alpha(theme.palette.primary.main, 0.02),
        },
      }}
    >
      <FormControl fullWidth>
        <Stack spacing={2}>
          <Box display="flex" alignItems="center" gap={1.5}>
            <Box
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                borderRadius: 1.5,
                p: 1,
                display: 'flex',
              }}
            >
              {icon}
            </Box>
            <Box flex={1}>
              <FormLabel htmlFor={id}>
                <Typography variant="body1" fontWeight={600}>
                  {label} {!required && <Typography component="span" color="text.secondary" fontSize="0.875rem">(OPCIONAL)</Typography>}
                </Typography>
              </FormLabel>
            </Box>
          </Box>

          <TextField
            type="file"
            id={id}
            inputProps={{ accept }}
            onChange={onChange}
            fullWidth
            variant="outlined"
          />

          <Typography variant="caption" color="text.secondary">
            Formatos: {accept.replace(/\./g, '').toUpperCase()}
          </Typography>
        </Stack>
      </FormControl>
    </Paper>
  )
}

export default StudentFilesForm