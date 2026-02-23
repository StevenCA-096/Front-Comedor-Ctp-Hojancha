import CustomButton from "@/components/Buttons/CustomButton"
import CustomTextField from "@/components/forms/theme-elements/CustomTextField"
import useSendPasswordRecoverEmail from "@/hooks/auth/mutations/useSendPasswordRecoverEmail"
import {
  sendPasswordRecoverEmailSchema,
  type SendPasswordRecoverEmailFormData,
} from "@/utils/validation-form-schemas/auth/sendPasswordRecoverEmailSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Email, Login, Send } from "@mui/icons-material"
import { Box, Stack, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

const ForgotPasswordForm = () => {
  const navigate = useNavigate()
  const sendRecoverEmailMutation = useSendPasswordRecoverEmail()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendPasswordRecoverEmailFormData>({
    resolver: zodResolver(sendPasswordRecoverEmailSchema),
    defaultValues: {
      email: "",
    },
  })

  const handleSendRecoverEmail = async (data: SendPasswordRecoverEmailFormData) => {
    const frontendUrl = `${window.location.origin}/recover-password`

    try {
      await sendRecoverEmailMutation.mutateAsync({
        email: data.email,
        frontendUrl,
      })
    } catch {
      // Error toast is handled in the mutation hook.
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(handleSendRecoverEmail)}>
      <Stack>
        <Box>
          <CustomTextField
            label="Correo electrónico"
            externalLabel
            Icon={<Email />}
            register={register}
            name="email"
            type="email"
            autoComplete="email"
            error={!!errors.email}
            errorMessage={errors.email?.message}
            autoFocus
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

      <Stack spacing={1.5}>
        <CustomButton
          color="primary"
          size="large"
          fullWidth
          type="submit"
          label="Enviar enlace"
          icon={<Send />}
          loading={sendRecoverEmailMutation.isPending}
        />
        <CustomButton
          color="inherit"
          size="large"
          fullWidth
          type="button"
          label="Ir a iniciar sesión"
          icon={<Login />}
          onClickFn={() => navigate("/auth/login")}
        />
      </Stack>
    </form>
  )
}

export default ForgotPasswordForm
