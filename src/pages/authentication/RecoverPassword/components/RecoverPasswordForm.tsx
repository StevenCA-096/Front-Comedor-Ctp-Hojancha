import CustomButton from "@/components/Buttons/CustomButton"
import CustomTextField from "@/components/forms/theme-elements/CustomTextField"
import useUpdateUserPassword from "@/hooks/auth/mutations/useUpdateUserPassword"
import {
  updateUserPasswordSchema,
  type UpdateUserPasswordFormData,
} from "@/utils/validation-form-schemas/auth/updateUserPasswordSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Login, Lock, Password } from "@mui/icons-material"
import { Box, Stack, Typography } from "@mui/material"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router-dom"

const RecoverPasswordForm = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const updatePasswordMutation = useUpdateUserPassword()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserPasswordFormData>({
    resolver: zodResolver(updateUserPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const handleUpdatePassword = async (data: UpdateUserPasswordFormData) => {
    if (!token) {
      toast.error("Token de recuperación inválido")
      return
    }

    try {
      await updatePasswordMutation.mutateAsync({
        password: data.password,
        token,
      })
      navigate("/auth/login")
    } catch {
      // Error toast is handled in the mutation hook.
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(handleUpdatePassword)}>
      <Stack>
        <Box>
          <CustomTextField
            label="Nueva contraseña"
            register={register}
            externalLabel
            Icon={<Lock />}
            name="password"
            type="password"
            autoComplete="new-password"
            error={!!errors.password}
            errorMessage={errors.password?.message}
            autoFocus
          />
        </Box>
        <Box>
          <CustomTextField
            label="Confirmar contraseña"
            register={register}
            externalLabel
            Icon={<Password />}
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            error={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message}
          />
        </Box>

        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <Typography
            component={Link}
            to="/auth/login"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Volver al inicio de sesión
          </Typography>
        </Stack>
      </Stack>

      <CustomButton
        color="primary"
        size="large"
        fullWidth
        type="submit"
        label="Actualizar contraseña"
        icon={<Login />}
        loading={updatePasswordMutation.isPending}
      />
    </form>
  )
}

export default RecoverPasswordForm
