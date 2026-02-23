import { useEffect, useState } from 'react'
import { Box, Grid2, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Divider } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { locations } from '@/utils/locations/locations'
import { ArrowForward, ArrowBack, Home, DirectionsBus } from '@mui/icons-material'
import CustomSelect from '@/components/forms/theme-elements/CustomSelect'
import CustomTextField from '@/components/forms/theme-elements/CustomTextField'
import { homeAndTransportSchema } from '@/utils/validation-form-schemas/student/HomeAndTransportSchema'
import useGetTransportRoutes from '@/hooks/api/transport-routes/queries/useGetTransportRoutes'
import type { Student } from '@/types/student/Student'
import type { HomeAndTransportSchemaType } from '@/utils/validation-form-schemas/student/HomeAndTransportSchema'

interface HomeAndTransportFormProps {
  handleFormSubmit: (data: HomeAndTransportSchemaType) => void
  handlePrev?: () => void
  studentData: Student | null
  submitLabel?: string
}

const HomeAndTransportForm = ({
  handleFormSubmit,
  handlePrev,
  studentData,
  submitLabel = "Siguiente"
}: HomeAndTransportFormProps) => {
  const [needTransport, setNeedTransport] = useState(true)
  const [cantonesOptions, setCantonesOptions] = useState<Array<{ value: string; label: string; index: string }>>([])
  const [distritosOptions, setDistritosOptions] = useState<Array<{ value: string; label: string }>>([])
  const { data: transportRoutes } = useGetTransportRoutes()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control
  } = useForm({
    resolver: zodResolver(homeAndTransportSchema(needTransport)),
    defaultValues: {
      address: studentData?.address,
      canton: studentData?.canton,
      district: studentData?.district,
      requireTransport: studentData?.requireTransport,
      transportRouteId: studentData?.transportRoute?.id,
    }
  })

  const onSubmit = (data: unknown) => {
    handleFormSubmit(data as HomeAndTransportSchemaType)
  }

  useEffect(() => {
    const cantones = locations.provincias[5].cantones

    const opciones = Object.entries(cantones).map(([index, data]) => {
      return {
        value: data.nombre,
        label: data.nombre,
        index: index
      }
    })

    setCantonesOptions(opciones)

  }, [])

  const handleCantonesSelectChange = (selectedNombre: string) => {
    const selected = cantonesOptions.find(c => c.value === selectedNombre)
    if (!selected) return

    setValue("canton", selectedNombre)

    const cantonIndex = selected.index

    const selectedProvince = (locations.provincias as Record<
      string,
      { cantones: Record<string, { nombre: string; distritos: Record<string, string> }> }
    >)[5]

    const distritosRaw = selectedProvince?.cantones[cantonIndex]?.distritos ?? {}

    const distritosOpt = Object.values(distritosRaw).map((distrito) => {
      return {
        value: distrito,
        label: distrito,
      }
    })

    setDistritosOptions(distritosOpt)
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {/* Ubicación */}
      <Box mb={4}>
        <Box display="flex" alignItems="center" gap={1} mb={3}>
          <Home color="primary" />
          <Typography variant="h6" fontWeight={700}>
            Ubicación del hogar
          </Typography>
        </Box>

        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Controller
              name="canton"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  label="Cantón"
                  options={cantonesOptions}
                  onChange={(e) => {
                    field.onChange(e)
                    handleCantonesSelectChange(e.target.value)
                  }}
                  error={!!errors?.canton}
                  errorMessage={errors?.canton?.message as string}
                />
              )}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, md: 6 }}>
            <Controller
              name="district"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  label="Distrito"
                  options={distritosOptions}
                  error={!!errors?.district}
                  errorMessage={errors?.district?.message as string}
                  disabled={!distritosOptions || distritosOptions.length === 0}
                />
              )}
            />
          </Grid2>

          <Grid2 size={12}>
            <CustomTextField
              type="text"
              label="Dirección exacta"
              name="address"
              register={register}
              error={!!errors?.address}
              errorMessage={errors?.address?.message as string}
            />
          </Grid2>
        </Grid2>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Información de transporte */}
      <Box mb={4}>
        <Box display="flex" alignItems="center" gap={1} mb={3}>
          <DirectionsBus color="primary" />
          <Typography variant="h6" fontWeight={700}>
            Información de transporte
          </Typography>
        </Box>

        <Grid2 container spacing={3}>
          <Grid2 size={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">¿Utiliza transporte?</FormLabel>
              <RadioGroup
                row
                value={needTransport ? 'si' : 'no'}
                onChange={(e) => {
                  const needsIt = e.target.value === 'si'
                  setNeedTransport(needsIt)
                  setValue('requireTransport', needsIt)
                  if (!needsIt) {
                    setValue('transportRouteId', undefined)
                  }
                }}
              >
                <FormControlLabel value="si" control={<Radio />} label="Sí" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid2>

          {needTransport && (
            <Grid2 size={12}>
              <Controller
                name="transportRouteId"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    value={field.value ? String(field.value) : undefined}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                    label="Ruta de transporte"
                    options={transportRoutes?.map((route) => {
                      return {
                        label: route.name,
                        value: route.id
                      }
                    })}
                    error={!!errors?.transportRouteId}
                    errorMessage={errors?.transportRouteId?.message as string}
                  />
                )}
              />
            </Grid2>
          )}
        </Grid2>
      </Box>

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
          {submitLabel}
        </Button>
      </Box>
    </Box>
  )
}

export default HomeAndTransportForm
