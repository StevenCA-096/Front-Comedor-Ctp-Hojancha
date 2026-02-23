import { useState } from "react"
import { Box, Grid2, FormControlLabel, Radio, RadioGroup, FormControl, FormLabel, Button } from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowForward, ArrowBack } from "@mui/icons-material"
import CustomTextField from "@/components/forms/theme-elements/CustomTextField"
import CustomSelect from "@/components/forms/theme-elements/CustomSelect"
import CountrySelect from "@/components/forms/theme-elements/CountrySelect"
import type { Student } from "@/types/student/Student"
import { responsibleInformationSchema } from "@/utils/validation-form-schemas/student/responsibleInformationSchema"

interface ResponsibleInformationFormProps {
  handleSubmitForm: (data: any) => void
  studentData: Student | null
  handlePrev?: () => void
}

const ResponsibleInformationForm = ({ 
  handleSubmitForm, 
  handlePrev = () => {},
  studentData
}: ResponsibleInformationFormProps) => {
  const responsible = studentData?.responsible
  const [isCostarrican, setIsCostarrican] = useState(true)
  const [isCostarricanNationality, setIsCostarricanNationality] = useState(true)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({ 
    resolver: zodResolver(responsibleInformationSchema),
    defaultValues:{
      cedula: responsible?.cedula,
      name: responsible?.name,
      lastName1: responsible?.lastName1,
      lastName2: responsible?.lastName2,
      country: responsible?.country || 'Costa Rica',
      email: responsible?.email || undefined,
      homePhone: responsible?.homePhone,
      mobilePhone: responsible?.mobilePhone,
      occupation: responsible?.occupation,
      sex: responsible?.sex     
    }
  })

  return (
    <Box component="form" onSubmit={handleSubmit(handleSubmitForm)}>
      {/* Formato de cédula y datos básicos */}
      <Grid2 container spacing={3} mb={3}>
        <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Formato de cédula</FormLabel>
            <RadioGroup
              row
              value={isCostarrican ? 'nacional' : 'extranjero'}
              onChange={(e) => setIsCostarrican(e.target.value === 'nacional')}
            >
              <FormControlLabel value="nacional" control={<Radio />} label="Nacional" />
              <FormControlLabel value="extranjero" control={<Radio />} label="Extranjero" />
            </RadioGroup>
          </FormControl>
        </Grid2>

        <Grid2 size={{ xs: 12, lg: 4 }}>
          <CustomTextField
            type="number"
            label="Cédula/Identificación"
            name="cedula"
            register={register}
            error={!!errors?.cedula}
            errorMessage={errors?.cedula?.message as string}
            autoFocus
          />
        </Grid2>

        <Grid2 size={{ xs: 12, lg: 4 }}>
          <CustomTextField
            type="text"
            label="Nombre"
            name="name"
            register={register}
            error={!!errors?.name}
            errorMessage={errors?.name?.message as string}
          />
        </Grid2>
      </Grid2>

      {/* Apellidos y género */}
      <Grid2 container spacing={3} mb={3}>
        <Grid2 size={{ xs: 12, lg: 4 }}>
          <CustomTextField
            type="text"
            label="Primer apellido"
            name="lastName1"
            register={register}
            error={!!errors?.lastName1}
            errorMessage={errors?.lastName1?.message as string}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, lg: 4 }}>
          <CustomTextField
            type="text"
            label="Segundo apellido"
            name="lastName2"
            register={register}
            error={!!errors?.lastName2}
            errorMessage={errors?.lastName2?.message as string}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, lg: 4 }}>
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

      {/* Teléfonos y correo */}
      <Grid2 container spacing={3} mb={3}>
        <Grid2 size={{ xs: 12, lg: 4 }}>
          <CustomTextField
            type="number"
            label="Celular"
            name="mobilePhone"
            register={register}
            error={!!errors?.mobilePhone}
            errorMessage={errors?.mobilePhone?.message as string}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, lg: 4 }}>
          <CustomTextField
            type="number"
            label="Teléfono hogar (opcional)"
            name="homePhone"
            register={register}
            error={!!errors?.homePhone}
            errorMessage={errors?.homePhone?.message as string}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, lg: 4 }}>
          <CustomTextField
            type="email"
            label="Correo"
            name="email"
            register={register}
            error={!!errors?.email}
            errorMessage={errors?.email?.message as string}
          />
        </Grid2>
      </Grid2>

      {/* Nacionalidad */}
      <Grid2 container spacing={3} mb={3}>
        <Grid2 size={{ xs: 12, lg: 4 }}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Nacionalidad</FormLabel>
            <RadioGroup
              row
              value={isCostarricanNationality ? 'costarricense' : 'otro'}
              onChange={(e) => {
                const isCostarrica = e.target.value === 'costarricense'
                setIsCostarricanNationality(isCostarrica)
                if (isCostarrica) {
                  setValue('country', 'Costarricense')
                }
              }}
            >
              <FormControlLabel value="costarricense" control={<Radio />} label="Costarricense" />
              <FormControlLabel value="otro" control={<Radio />} label="Otro" />
            </RadioGroup>
          </FormControl>
        </Grid2>

        {!isCostarricanNationality && (
          <Grid2 size={{ xs: 12, lg: 8 }}>
            <CountrySelect
              onChange={(country) => setValue('country', country?.currentTarget?.textContent?.split(' ')[0] || '')}
              error={!!errors?.country}
              errorMessage={errors?.country?.message as string}
            />
          </Grid2>
        )}
      </Grid2>

      {/* Ocupación */}
      <Grid2 container spacing={3} mb={4}>
        <Grid2 size={12}>
          <CustomTextField
            type="text"
            label="Ocupación"
            name="occupation"
            register={register}
            error={!!errors?.occupation}
            errorMessage={errors?.occupation?.message as string}
          />
        </Grid2>
      </Grid2>

      {/* Botones de navegación */}
      <Box display="flex" justifyContent="space-between" mt={4}>
        <Button
          variant="outlined"
          size="large"
          startIcon={<ArrowBack />}
          onClick={handlePrev}
          sx={{ 
            textTransform: 'none',
            fontWeight: 600,
            px: 4
          }}
        >
          Volver
        </Button>

        <Button
          type="submit"
          variant="contained"
          size="large"
          endIcon={<ArrowForward />}
          sx={{ 
            textTransform: 'none',
            fontWeight: 600,
            px: 4
          }}
        >
          Siguiente
        </Button>
      </Box>
    </Box>
  )
}

export default ResponsibleInformationForm