import {
    Box,
    Typography,
    Stack,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import CustomTextField from '@components/forms/theme-elements/CustomTextField';
import { IconUser } from '@tabler/icons-react';
import { Lock, Login } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userLoginSchema } from '@utils/validation-form-schemas/userLoginSchema';
import CustomButton from '@components/Buttons/CustomButton';
import { login } from '@/services/auth/authService';
import { useState } from 'react';
import { useAuthStore } from '@stores/auth/authStore';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import type { LoginDto } from '@/types/common/auth/loginDto';

const LoginForm = () => {
    const [loading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const loginToState = useAuthStore(state => state.loginToState)

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm({ 
        resolver: zodResolver(userLoginSchema),
        defaultValues:{
            password:"",
        },
    })
    
    const handleLoginSubmit = async (data: LoginDto) => {
        try {
            setIsLoading(true)
            const result = await login(data).finally(() => setIsLoading(false))
            if (!isAxiosError(result)) {
                loginToState(result.user)
                toast.success('Bienvenido')
                return navigate('/')
            }
        } catch (error) {
            toast.error('Credenciales invalidas')
            console.log(error)
        } 
    }

    return (
        <form noValidate onSubmit={handleSubmit(handleLoginSubmit)}>
            <Stack>
                <Box>
                    <CustomTextField
                        label={'Cédula/Identificación'}
                        externalLabel
                        Icon={<IconUser />}
                        register={register}
                        name={'username'}
                        type='number'
                        error={!!errors.username}
                        errorMessage={errors.username?.message}
                        autoFocus
                    />
                </Box>
                <Box >
                    <CustomTextField
                        label={'Contraseña'}
                        register={register}
                        externalLabel
                        Icon={<Lock />}
                        name={'password'}
                        type='password'
                        error={!!errors.password}
                        errorMessage={errors.password?.message}
                        onChangeFn={(e) => setValue('password', e.target.value)}
                    />
                </Box>
                <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                    <Typography
                        component={Link}
                        to="/auth/forgot-password"
                        fontWeight="500"
                        sx={{
                            textDecoration: 'none',
                            color: 'primary.main',
                        }}
                    >
                        Olvidó su Contraseña ?
                    </Typography>
                </Stack>
            </Stack>
            <Box>
                <CustomButton
                    color="primary"
                    size="large"
                    fullWidth
                    type="submit"
                    label={'Ingresar'}
                    icon={<Login />}
                    loading={loading}
                />
            </Box>
        </form>
    )

};

export default LoginForm;
