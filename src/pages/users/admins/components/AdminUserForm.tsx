import CustomButton from "@/components/Buttons/CustomButton"
import type { SelectOption } from "@/components/forms/theme-elements/CustomSelect"
import CustomSelect from "@/components/forms/theme-elements/CustomSelect"
import CustomTextField from "@/components/forms/theme-elements/CustomTextField"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "@mui/icons-material"
import { Box, Grid2, Typography } from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import { useEffect } from "react"
import z from "zod"

export const adminCreationSchema = z.object({
    dni: z
        .string()
        .min(9, { message: 'El DNI debe tener al menos 9 caracteres' })
        .regex(/^\d+$/, { message: 'El DNI debe contener solo números' }),
    email: z.string().email({ message: 'Debe ingresar un correo válido' }),
    password: z.string().min(4, { message: 'La contraseña debe tener al menos 4 caracteres' }).optional(),
    name: z.string().nonempty('Indique el nombre'),
    firstLastName: z.string().nonempty('Indique el primer apellido'),
    secondLastName: z.string().nonempty('Indique el segundo apellido'),
    phoneNumber: z.string().nonempty('Indique el teléfono'),
    jobPosition: z.string().nonempty('Indique el puesto'),
    roles: z.array(z.enum([
        'super_admin',
        'admin',
        'student',
        'collaborator',
        'dining_manager',
        'dining_staff',
        'teacher',
        'academic_coordinator',
        'registrar',
        'cashier',
    ] as const)).nonempty({ message: 'Indique al menos un rol' }),
})

export const adminUpdateSchema = adminCreationSchema.omit({ password: true })

export type AdminFormData = z.infer<typeof adminCreationSchema>
export type AdminUpdateData = z.infer<typeof adminUpdateSchema>

const UserRoleOptions: SelectOption[] = [
    { label: 'Super Administrador', value: 'super_admin' },
    { label: 'Administrador', value: 'admin' },
    { label: 'Coordinador Académico', value: 'academic_coordinator' },
    { label: 'Docente', value: 'teacher' },
    { label: 'Secretaría', value: 'registrar' },
    { label: 'Cajero', value: 'cashier' },
    { label: 'Gestor de Comedor', value: 'dining_manager' },
    { label: 'Personal de Comedor', value: 'dining_staff' },
    { label: 'Colaborador', value: 'collaborator' },
]

interface AdminUserFormProps {
    onSubmit: (data: AdminFormData | AdminUpdateData) => Promise<void>
    isLoading: boolean
    initialData?: Partial<AdminFormData>
    isEditMode?: boolean
}

const AdminUserForm = ({ onSubmit, isLoading, initialData, isEditMode = false }: AdminUserFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm<AdminFormData>({
        resolver: zodResolver(isEditMode ? adminUpdateSchema : adminCreationSchema),
        defaultValues: {
            dni: '',
            email: '',
            password: '',
            name: '',
            firstLastName: '',
            secondLastName: '',
            phoneNumber: '',
            jobPosition: '',
            roles: [],
            ...initialData
        },
    })

    useEffect(() => {
        if (initialData) {
            reset(initialData)
        }
    }, [initialData, reset])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container spacing={2} sx={{ mt: 1 }}>
                {/* Sección: Información del usuario */}
                <Grid2 size={12}>
                    <Typography variant="h6" fontWeight={600} mb={1}>
                        Información del usuario
                    </Typography>
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <CustomTextField
                        label="Cédula"
                        type="number"
                        placeholder="Digite la cédula"
                        error={!!errors.dni}
                        errorMessage={errors?.dni?.message}
                        name="dni"
                        register={register}
                        disabled={isEditMode}
                    />
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <CustomTextField
                        label="Email"
                        type="email"
                        placeholder="Digite el email"
                        error={!!errors.email}
                        errorMessage={errors?.email?.message}
                        name="email"
                        register={register}
                    />
                </Grid2>

                {!isEditMode && (
                    <Grid2 size={12}>
                        <CustomTextField
                            label="Contraseña"
                            type="password"
                            placeholder="Digite la contraseña"
                            error={!!errors.password}
                            errorMessage={errors?.password?.message}
                            name="password"
                            register={register}
                        />
                    </Grid2>
                )}

                {/* Sección: Información personal */}
                <Grid2 size={12}>
                    <Typography variant="h6" fontWeight={600} mb={1} mt={2}>
                        Información personal del administrador
                    </Typography>
                </Grid2>

                <Grid2 size={12}>
                    <CustomTextField
                        label="Nombre"
                        type="text"
                        placeholder="Digite el nombre"
                        error={!!errors.name}
                        errorMessage={errors?.name?.message}
                        name="name"
                        register={register}
                    />
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <CustomTextField
                        label="Primer apellido"
                        type="text"
                        placeholder="Digite el primer apellido"
                        error={!!errors.firstLastName}
                        errorMessage={errors?.firstLastName?.message}
                        name="firstLastName"
                        register={register}
                    />
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <CustomTextField
                        label="Segundo apellido"
                        type="text"
                        placeholder="Digite el segundo apellido"
                        error={!!errors.secondLastName}
                        errorMessage={errors?.secondLastName?.message}
                        name="secondLastName"
                        register={register}
                    />
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <CustomTextField
                        label="Celular"
                        type="number"
                        placeholder="Digite el celular"
                        error={!!errors.phoneNumber}
                        errorMessage={errors?.phoneNumber?.message}
                        name="phoneNumber"
                        register={register}
                    />
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <CustomTextField
                        label="Puesto o posición de trabajo"
                        type="text"
                        placeholder="Digite la posición de trabajo o puesto"
                        error={!!errors.jobPosition}
                        errorMessage={errors?.jobPosition?.message}
                        name="jobPosition"
                        register={register}
                    />
                </Grid2>

                <Grid2 size={12}>
                    <Controller
                        name="roles"
                        control={control}
                        render={({ field }) => (
                            <>
                                <CustomSelect
                                    label="Roles"
                                    placeholder="Seleccione uno o más roles"
                                    value={field.value[0] || ''}
                                    onChange={(e) => {
                                        const value = e.target.value
                                        if (value) {
                                            field.onChange([...field.value, value])
                                        }
                                    }}
                                    options={UserRoleOptions}
                                    error={!!errors.roles}
                                    errorMessage={errors?.roles?.message}
                                    name="roles"
                                />
                                {/* Mostrar roles seleccionados */}
                                <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                                    {field.value.map((role, index) => {
                                        const roleLabel = UserRoleOptions.find((opt) => opt.value === role)?.label
                                        return (
                                            <Box
                                                key={index}
                                                sx={{
                                                    px: 1.5,
                                                    py: 0.5,
                                                    bgcolor: 'primary.main',
                                                    color: 'white',
                                                    borderRadius: 1,
                                                    fontSize: '0.875rem',
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        bgcolor: 'error.main',
                                                    },
                                                }}
                                                onClick={() => {
                                                    field.onChange(field.value.filter((_, i) => i !== index))
                                                }}
                                            >
                                                {roleLabel} ×
                                            </Box>
                                        )
                                    })}
                                </Box>
                            </>
                        )}
                    />
                </Grid2>

                {/* Botón Submit */}
                <Grid2 size={12}>
                    <Box display="flex" justifyContent="flex-start" mt={2}>
                        <CustomButton type="submit" label="Guardar" loading={isLoading} icon={<Save />} />
                    </Box>
                </Grid2>
            </Grid2>
        </form>
    )
}

export default AdminUserForm