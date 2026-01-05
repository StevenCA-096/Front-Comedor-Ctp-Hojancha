// UpdateProfileModal.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Grid2, Box, Alert } from '@mui/material'
import { Person, Badge, Phone } from '@mui/icons-material'
import CustomTextField from '@/components/forms/theme-elements/CustomTextField'
import CustomModal, { type GenericModalProps } from '@/components/Modals/CustomModal'
import CustomButton from '@/components/Buttons/CustomButton'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useAuthStore } from '@/stores/auth/authStore'
import type { UpdateAdminProfileDto } from '@/types/common/admin/dto/update-admin-profile.dto'
import type { AxiosError } from 'axios'
import { updateAdminProfile } from '@/services/admin/adminService'

// Schema de validación
const updateProfileSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  firstLastName: z.string().min(1, 'El primer apellido es requerido'),
  secondLastName: z.string().min(1, 'El segundo apellido es requerido'),
  phoneNumber: z
    .string()
    .min(1, 'El número de teléfono es requerido')
    .regex(/^\d+$/, 'Solo se permiten números'),
})

type UpdateProfileFormData = z.infer<typeof updateProfileSchema>

const UpdateProfileModal = ({ onClose, open }: GenericModalProps) => {
  const queryClient = useQueryClient()
  const { updateUserState, user } = useAuthStore()

  if (!user || !user.admin) {
    return <Alert severity='info'>No autenticado</Alert>
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.admin.name || '',
      firstLastName: user.admin.firstLastName || '',
      secondLastName: user.admin.secondLastName || '',
      phoneNumber: user.admin.phoneNumber.toString() || '',
    },
  })
  
  const mutation = useMutation<UpdateAdminProfileDto, AxiosError, UpdateProfileFormData>({
    mutationFn: async (data: UpdateProfileFormData) => {
      const payload = {
        ...data,
        phoneNumber: Number(data.phoneNumber),
      }
      return await updateAdminProfile(payload)
    },
    onSuccess: (data) => {
      toast.success('Perfil actualizado exitosamente')
      queryClient.invalidateQueries({ queryKey: ['admin-profile'] })
      console.log(data)
      updateUserState({...user, admin:{
        name: data.name,
        firstLastName: data.firstLastName,
        secondLastName: data.secondLastName,
        phoneNumber: data.phoneNumber,
        jobPosition: user?.admin.jobPosition,
        id: user?.admin.id,
        status: user.admin.status
      }})
      onClose()
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Error al actualizar el perfil')
    },
  })

  const onSubmit = (data: UpdateProfileFormData) => {
    mutation.mutate(data)
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <CustomModal
      open={open}
      onClose={handleClose}
      title="Actualizar Perfil"
      maxWidth="sm"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={3} mt={2}>
          {/* Nombre */}
          <Grid2 size={12}>
            <CustomTextField
              label="Nombre"
              name="name"
              register={register}
              error={!!errors.name}
              errorMessage={errors.name?.message}
              Icon={<Person />}
              autoFocus
            />
          </Grid2>

          {/* Primer Apellido */}
          <Grid2 size={12}>
            <CustomTextField
              label="Primer Apellido"
              name="firstLastName"
              register={register}
              error={!!errors.firstLastName}
              errorMessage={errors.firstLastName?.message}
              Icon={<Badge />}
            />
          </Grid2>

          {/* Segundo Apellido */}
          <Grid2 size={12}>
            <CustomTextField
              label="Segundo Apellido"
              name="secondLastName"
              register={register}
              error={!!errors.secondLastName}
              errorMessage={errors.secondLastName?.message}
              Icon={<Badge />}
            />
          </Grid2>

          {/* Número de Teléfono */}
          <Grid2 size={12}>
            <CustomTextField
              label="Número de Teléfono"
              name="phoneNumber"
              register={register}
              error={!!errors.phoneNumber}
              errorMessage={errors.phoneNumber?.message}
              Icon={<Phone />}
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
              }}
            />
          </Grid2>

          {/* Botones */}
          <Grid2 size={12}>
            <Box display="flex" gap={2} justifyContent="flex-end">
              <CustomButton
                label="Cancelar"
                onClickFn={handleClose}
                disabled={mutation.isPending}
              />
              <CustomButton
                label={mutation.isPending ? 'Actualizando...' : 'Actualizar'}
                type="submit"
                disabled={mutation.isPending}
              />
            </Box>
          </Grid2>
        </Grid2>
      </form>
    </CustomModal>
  )
}

export default UpdateProfileModal