import { useState } from 'react'
import { Box, Grid2, Typography, FormControlLabel, Radio, RadioGroup, FormControl, FormLabel, Checkbox, Paper } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { locations } from "@/utils/locations/locations"
import CustomTextField from "../theme-elements/CustomTextField"
import CustomSelect from "../theme-elements/CustomSelect"
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import CustomButton from '@/components/Buttons/CustomButton'
import { studentInformationSchema } from '@/utils/validation-form-schemas/student/studentInformationSchema'
import type { Student } from '@/types/student/Student'
import type { StudentInfoSchemaType } from '@/utils/validation-form-schemas/student/studentInformationSchema'
import CountrySelect from '../theme-elements/CountrySelect'

interface StudentInformationFormProps {
    handleSubmitForm: (data: StudentInfoSchemaType) => void
    studentData: Student | null
    isEditing?: boolean
    handlePrev?: () => void
}

const StudentInformationForm = ({
    handleSubmitForm,
    studentData,
    isEditing = false,
    handlePrev
}: StudentInformationFormProps) => {
    const [isCostarricanNationality, setIsCostarricanNationality] = useState(true)
    const [selectedProvincia, setSelectedProvincia] = useState<string>()
    const [otherPreviousSchool, setOtherPreviousSchool] = useState(false)
    const [cantonesOptions, setCantonesOptions] = useState<Array<{ value: string; label: string }> | null>(null)
    const [distritosOptions, setDistritosOptions] = useState<Array<{ value: string; label: string }> | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        control
    } = useForm({
        mode: "onBlur",
        resolver: zodResolver(studentInformationSchema),
        defaultValues: {
            cedula: studentData?.cedula,
            name: studentData?.name,
            lastName1: studentData?.lastName1,
            lastName2: studentData?.lastName2,
            sex: studentData?.sex,
            province: studentData?.birthplace?.split(',')[0]?.trim(), // Extrae provincia de "Guanacaste, Liberia, Cañas Dulces"
            canton: studentData?.canton,
            district: studentData?.district,
            birthday: typeof studentData?.birthday == 'string' && studentData?.birthday ? studentData?.birthday?.split('T')[0] : '',
            lastInstitution: studentData?.lastInstitution,
            adequacy: studentData?.adequacy,
            personalEmail: studentData?.personalEmail,
            isRecursing: false, // o lo que corresponda
            mepEmail: studentData?.mepEmail as string | undefined,
            country: studentData?.country || 'Costa Rica'
        }
    })
    const provinciasArray = Object.values(locations.provincias).map((provincia) => {
        return {
            value: provincia.nombre,
            label: provincia.nombre
        }
    })

    const handleProvinciasSelectChange = (nombreProvincia: string) => {
        const provinciaEntry = Object.entries(locations.provincias).find(
            ([, prov]) => prov.nombre === nombreProvincia
        )

        if (!provinciaEntry) return

        const [, provinciaData] = provinciaEntry
        const cantones = provinciaData.cantones

        // ✅ Cast a Record<string, any> para acceder con string keys
        const cantonesRecord = cantones as Record<string, { nombre: string }>

        const cantonesOptions = Object.keys(cantones).map((index) => {
            return {
                value: cantonesRecord[index].nombre,
                label: cantonesRecord[index].nombre
            }
        })

        setSelectedProvincia(nombreProvincia)
        setCantonesOptions(cantonesOptions)
        setDistritosOptions(null)
    }

    const handleCantonesSelectChange = (nombreCanton: string) => {
        const provinciaEntry = Object.entries(locations.provincias).find(
            ([, prov]) => prov.nombre === selectedProvincia
        )

        if (!provinciaEntry) return

        const [, provinciaData] = provinciaEntry
        const cantonEntry = Object.entries(provinciaData.cantones).find(
            ([, canton]) => canton.nombre === nombreCanton
        )

        if (!cantonEntry) return

        const [, cantonData] = cantonEntry

        // ✅ Usa Object.values en lugar de Object.keys + indexación
        const distritosOpt = Object.values(cantonData.distritos).map((distrito) => {
            return {
                value: distrito,
                label: distrito
            }
        })

        setDistritosOptions(distritosOpt)
    }

    return (
        <Box component="form" px={1} onSubmit={handleSubmit(handleSubmitForm)}>
            {/* Formato de cédula y datos básicos */}
            <Typography variant="h6" fontWeight={700} mb={3}>
                Datos personales
            </Typography>
            <Grid2 container spacing={3} mb={3}>

                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <CustomTextField
                        type="number"
                        label="Cédula"
                        name="cedula"
                        register={register}
                        error={!!errors?.cedula}
                        errorMessage={errors?.cedula?.message as string}
                        disabled={isEditing || !!studentData}
                    />
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <CustomTextField
                        type="text"
                        label="Nombre"
                        name="name"
                        register={register}
                        error={!!errors?.name}
                        errorMessage={errors?.name?.message as string}
                        autoComplete="given-name"
                    />
                </Grid2>
            </Grid2>

            {/* Apellidos y género */}
            <Grid2 container spacing={3} mb={3}>
                <Grid2 size={{ xs: 12, sm: 4 }}>
                    <CustomTextField
                        type="text"
                        label="Primer apellido"
                        name="lastName1"
                        register={register}
                        error={!!errors?.lastName1}
                        errorMessage={errors?.lastName1?.message as string}
                        autoComplete="family-name"
                    />
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 4 }}>
                    <CustomTextField
                        type="text"
                        label="Segundo apellido"
                        name="lastName2"
                        register={register}
                        error={!!errors?.lastName2}
                        errorMessage={errors?.lastName2?.message as string}
                    />
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 4 }}>
                    <Controller
                        name="sex"
                        control={control}
                        render={({ field }) => (
                            <CustomSelect
                                {...field}
                                label="Género"
                                options={[
                                    { value: "Masculino", label: "Masculino" },
                                    { value: "Femenino", label: "Femenino" },
                                    { value: "Prefiero no decirlo", label: "Prefiero no decirlo" },
                                    { value: "Otro", label: "Otro" },
                                ]}
                                error={!!errors?.sex}
                                errorMessage={errors?.sex?.message as string}
                            />
                        )}
                    />
                </Grid2>
            </Grid2>

            {/* Correos */}
            <Grid2 container spacing={3} mb={3}>
                <Grid2 size={{ xs: 12, lg: 6 }}>
                    <CustomTextField
                        type="email"
                        label="Correo personal"
                        name="personalEmail"
                        register={register}
                        error={!!errors?.personalEmail}
                        errorMessage={errors?.personalEmail?.message as string}
                    />
                </Grid2>

                <Grid2 size={{ xs: 12, lg: 6 }}>
                    <CustomTextField
                        type="email"
                        label="Correo MEP (OPCIONAL)"
                        name="mepEmail"
                        register={register}
                    />
                </Grid2>
            </Grid2>

            {/* Lugar y fecha de nacimiento */}
            {(!studentData || studentData.birthplace === "") && (
                <>
                    <Paper elevation={0} sx={{ mb: 3, bgcolor: 'background.default' }}>
                        <Typography variant="h6" fontWeight={700} mb={3}>
                            Lugar y fecha de nacimiento
                        </Typography>

                        <Grid2 container spacing={3}>
                            <Grid2 size={{ xs: 12, sm: 4 }}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Nacionalidad</FormLabel>
                                    <RadioGroup
                                        row
                                        value={isCostarricanNationality ? 'costarricense' : 'otro'}
                                        onChange={(e) => {
                                            const isCostaRican = e.target.value === 'costarricense'
                                            setIsCostarricanNationality(isCostaRican)
                                            if (isCostaRican) {
                                                setValue('country', 'Costa Rica')
                                            } else {
                                                setValue('country', '') // Limpia para que el usuario seleccione
                                                setValue('province', 'N/A')
                                                setValue('canton', 'N/A')
                                                setValue('district', 'N/A')
                                            }
                                        }}
                                    >
                                        <FormControlLabel value="costarricense" control={<Radio />} label="Costarricense" />
                                        <FormControlLabel value="otro" control={<Radio />} label="Otro" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid2>

                            {!isCostarricanNationality && (
                                <Grid2 size={{ xs: 12, sm: 4 }}>
                                    <CountrySelect
                                        onChange={(e) => setValue('country', e?.currentTarget?.textContent?.split(' ')[0] || "")}
                                        error={!!errors?.country}
                                        errorMessage={errors?.country?.message as string}
                                    />
                                </Grid2>
                            )}

                            <Grid2 size={{ xs: 12, sm: 4 }}>
                                <CustomTextField
                                    type="date"
                                    label="Fecha de nacimiento"
                                    name="birthday"
                                    register={register}
                                    error={!!errors?.birthday}
                                    errorMessage={errors?.birthday?.message as string}
                                />
                            </Grid2>
                        </Grid2>

                        {/* Ubicación costarricense */}
                        {isCostarricanNationality && (
                            <Grid2 container spacing={3} mt={2}>
                                <Grid2 size={{ xs: 12, sm: 4 }}>
                                    <Controller
                                        name="province"
                                        control={control}
                                        render={({ field }) => (
                                            <CustomSelect
                                                {...field}
                                                label="Provincia"
                                                options={provinciasArray}
                                                onChange={(e) => {
                                                    field.onChange(e)
                                                    handleProvinciasSelectChange(e.target.value)
                                                }}
                                                error={!!errors?.province}
                                                errorMessage={errors?.province?.message as string}
                                            />
                                        )}
                                    />
                                </Grid2>

                                <Grid2 size={{ xs: 12, sm: 4 }}>
                                    <Controller
                                        name="canton"
                                        control={control}
                                        render={({ field }) => (
                                            <CustomSelect
                                                {...field}
                                                label="Cantón"
                                                options={cantonesOptions || []}
                                                onChange={(e) => {
                                                    field.onChange(e)
                                                    handleCantonesSelectChange(e.target.value)
                                                }}
                                                error={!!errors?.canton}
                                                errorMessage={errors?.canton?.message as string}
                                                disabled={!cantonesOptions}
                                            />
                                        )}
                                    />
                                </Grid2>

                                <Grid2 size={{ xs: 12, sm: 4 }}>
                                    <Controller
                                        name="district"
                                        control={control}
                                        render={({ field }) => (
                                            <CustomSelect
                                                {...field}
                                                label="Distrito"
                                                options={distritosOptions || []}
                                                error={!!errors?.district}
                                                errorMessage={errors?.district?.message as string}
                                                disabled={!distritosOptions}
                                            />
                                        )}
                                    />
                                </Grid2>
                            </Grid2>
                        )}
                    </Paper>
                </>
            )}
            <Typography variant="h6" fontWeight={700} mb={3}>
                Información academica
            </Typography>
            {/* Institución de procedencia */}
            <Grid2 container spacing={3} mb={3}>
                <Grid2 size={{ xs: 12, sm: otherPreviousSchool ? 6 : 12 }}>
                    <Controller
                        name="lastInstitution"
                        control={control}
                        render={({ field }) => (
                            <CustomSelect
                                {...field}
                                label="Institución de procedencia"
                                options={[
                                    { value: "Escuela Victoriano Mena Mena", label: "Escuela Victoriano Mena Mena" },
                                    { value: "Centro Educativo Monte Romo", label: "Centro Educativo Monte Romo" },
                                    { value: "Otro", label: "Otro" }
                                ]}
                                onChange={(e) => {
                                    field.onChange(e)
                                    setOtherPreviousSchool(e.target.value === "Otro")
                                }}
                                error={!!errors?.lastInstitution}
                                errorMessage={errors?.lastInstitution?.message as string}
                            />
                        )}
                    />
                </Grid2>

                {otherPreviousSchool && (
                    <Grid2 size={{ xs: 12, sm: 6 }}>
                        <CustomTextField
                            type="text"
                            label="Otra institución"
                            name="lastInstitution"
                            register={register}
                            error={!!errors?.lastInstitution}
                            errorMessage={errors?.lastInstitution?.message as string}
                            autoFocus
                        />
                    </Grid2>
                )}
            </Grid2>

            {/* Repitencia y adecuación */}
            <Grid2 container spacing={3} mb={3}>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <FormControlLabel
                        control={
                            <Checkbox {...register('isRecursing')} />
                        }
                        label="Repitencia"
                    />
                    {errors?.isRecursing && (
                        <Typography variant="caption" color="error" display="block">
                            {errors.isRecursing.message as string}
                        </Typography>
                    )}
                </Grid2>

                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <Controller
                        name="adequacy"
                        control={control}
                        render={({ field }) => (
                            <CustomSelect
                                {...field}
                                label="Adecuación curricular"
                                options={[
                                    { value: "Sin adecuacion", label: "Sin adecuacion" },
                                    { value: "De acceso", label: "De acceso" },
                                    { value: "No significativa", label: "No significativa" },
                                    { value: "Significativa", label: "Significativa" },
                                ]}
                                error={!!errors?.adequacy}
                                errorMessage={errors?.adequacy?.message as string}
                            />
                        )}
                    />
                </Grid2>
            </Grid2>

            {/* Botón de envío */}
            <Box display="flex" justifyContent="space-between" mt={4}>
                <Box>
                    {handlePrev && (
                        <CustomButton
                            icon={<ArrowBackIos />}
                            label='Volver'
                            onClickFn={handlePrev}
                        />
                    )}
                </Box>
                <CustomButton
                    type="submit"
                    size="large"
                    endIcon={<ArrowForwardIos />}
                    label='Siguiente'
                />
            </Box>
        </Box>
    )
}

export default StudentInformationForm



