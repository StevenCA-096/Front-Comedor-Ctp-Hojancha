import PageContainer from "@/components/container/page/PageContainer"
import GradientCard from "@/components/shared/GradientCard"
import InfoItem from "@/components/shared/InfoItem"
import CustomModal from "@/components/Modals/CustomModal"
import useModal from "@/hooks/useModal/useModal"
import {
  Box,
  Button,
  Grid2,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material"
import { IconSchool, IconCheck, IconX } from "@tabler/icons-react"
import { formatDateWithDaysAndHour } from "@/utils/date/format-date"
import TableButton from "@/components/Buttons/TableButton"
import { Report } from "@mui/icons-material"

const ScholarshipStudentDetails = () => {
  const { handleClose, open, openModal } = useModal()

  // Datos quemados de ausencias
  const absences = [
    {
      fecha: "2025-01-15T08:00:00.000Z",
      justificacion: "Cita médica"
    },
    {
      fecha: "2025-01-20T08:00:00.000Z",
      justificacion: "Enfermedad"
    },
    {
      fecha: "2025-02-10T08:00:00.000Z",
      justificacion: "Trámite personal"
    },
  ]

  const handleActivateScholarship = () => {
    openModal()
    // Lógica para activar
  }

  const handleDeactivateScholarship = () => {
    openModal()
    // Lógica para desactivar
  }

  return (
    <PageContainer showBackButton title="Detalles del becado">
      <Grid2 container spacing={3}>
        {/* Información del estudiante */}
        <Grid2 size={12}>
          <GradientCard icon={<IconSchool />} title="Estudiante" color="primary">
            <Grid2 spacing={2} container>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <InfoItem
                  color="primary"
                  label="Cédula"
                  value="987654321"
                />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <InfoItem
                  color="primary"
                  label="Nombre completo"
                  value="Sofía Rodríguez Vargas"
                />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <InfoItem
                  color="primary"
                  label="Correo personal"
                  value="sofia.rodriguez@gmail.com"
                />
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <InfoItem
                  color="primary"
                  label="Sexo"
                  value="Femenino"
                />
              </Grid2>
            </Grid2>
          </GradientCard>
        </Grid2>

        {/* Tabla de ausencias */}
        <Grid2 size={12}>
          <GradientCard icon={<IconSchool />} title="Historial de Ausencias" color="warning">
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Fecha</strong></TableCell>
                    <TableCell><strong>Justificación</strong></TableCell>
                    <TableCell><strong>Acciones</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {absences.map((absence, index) => (
                    <TableRow key={index} hover>
                      <TableCell>
                        {formatDateWithDaysAndHour(new Date(absence.fecha))}
                      </TableCell>
                      <TableCell>{absence.justificacion}</TableCell>
                      <TableCell>
                        <TableButton onClick={() => {}} label="Justificar" Icon={<Report />} />
                      </TableCell> 
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </GradientCard>
        </Grid2>

        {/* Botones de acción */}
        <Grid2 size={12}>
          <Box display="flex" gap={2} justifyContent="flex-end">
            <Button
              variant="contained"
              color="success"
              startIcon={<IconCheck />}
              onClick={handleActivateScholarship}
            >
              Activar Beca
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<IconX />}
              onClick={handleDeactivateScholarship}
            >
              Desactivar Beca
            </Button>
          </Box>
        </Grid2>
      </Grid2>

      {/* Modal de confirmación */}
      <CustomModal
        open={open}
        onClose={handleClose}
        title="Confirmar acción"
      >
        <Typography mb={2}>
          ¿Está seguro que desea realizar esta acción?
        </Typography>
        <Box display="flex" gap={2} justifyContent="flex-end">
          <Button variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Confirmar
          </Button>
        </Box>
      </CustomModal>
    </PageContainer>
  )
}

export default ScholarshipStudentDetails