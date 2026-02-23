import { useState } from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  alpha,
  useTheme,
} from '@mui/material'
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import toast from 'react-hot-toast'
import { isAxiosError } from 'axios'
import { checkEmailAndDniAvailability } from '@/services/userService'
import type { AdminFormData } from './AdminUserForm'
import AdminUserForm from './AdminUserForm'
import useCreateUser from '@/hooks/users/mutations/useCreateUser'
import useGetAdmins from '@/hooks/users/queries/useGetAdmins'
import useCreateAdmin from '@/hooks/api/admins/mutations/useCreateAdmin'

const AccordionCreateAdmin = () => {
  const { refetch } = useGetAdmins()
  const theme = useTheme()
  const [isLoading, setIsLoading] = useState(false)

  const createUserMutation = useCreateUser()
  const createAdminMutation = useCreateAdmin()

  const onSubmit = async (data: AdminFormData) => {

    if (!data.password || typeof data.password != 'string') {
      toast.error("")
      return
    }
    console.log('Form data:', data)
    setIsLoading(true)

    try {
      // Preparar datos del usuario
      const userData = {
        dni: parseInt(data.dni, 10),
        email: data.email,
        password: data.password,
        roles: data.roles,
        status: true,
      }

      // Verificar disponibilidad de credenciales
      const credentialAvailability = await checkEmailAndDniAvailability(userData.dni, userData.email)

      if (isAxiosError(credentialAvailability)) {
        toast.error(credentialAvailability?.response?.data?.message || 'Error al verificar credenciales')
        return
      }

      // Crear usuario
      const userResponse = await createUserMutation.mutateAsync(userData)

      if (!userResponse || !userResponse.id) {
        toast.error('Ocurrió un error al crear el usuario')
        return
      }

      // Crear admin
      const newAdmin = {
        name: data.name,
        firstLastName: data.firstLastName,
        secondLastName: data.secondLastName,
        phoneNumber: parseInt(data.phoneNumber),
        jobPosition: data.jobPosition,
        status: true,
        userId: userResponse.id,
      }

      await createAdminMutation.mutateAsync(newAdmin)

      refetch()
    } catch (error) {
      console.error('Error creating admin:', error)
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message || 'Error al crear el administrador')
      } else {
        toast.error('Error inesperado al crear el administrador')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Accordion sx={{ mb: 3 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          '&:hover': {
            bgcolor: alpha(theme.palette.primary.main, 0.08),
          },
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Crear nuevo usuario administrador
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <AdminUserForm onSubmit={onSubmit} isLoading={isLoading} />
      </AccordionDetails>
    </Accordion>
  )
}

export default AccordionCreateAdmin