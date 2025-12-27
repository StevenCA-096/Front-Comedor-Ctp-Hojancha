import { Box, Button, Divider, FormControl, Grid2, InputLabel, MenuItem, Select, Skeleton, Typography } from "@mui/material"
import { IconBook, IconCheck, IconX } from "@tabler/icons-react"
import useScholarshipsList from "@/hooks/api/scholarship/queries/useScholarshipsList"
import useUpdateScholarshipRequestMutation from "@/hooks/api/scholarship-request/mutations/useUpdateScholarshipRequestMutation"
import { useRef, useState } from "react"
import type { ScholarshipRequest, ScholarshipRequestStatus } from "@/types/scholarship/scholarship_request/entities/ScholarshipRequest"
import CustomChip from "@/components/Chip/CustomChip"
import toast from "react-hot-toast"
import { formatDateWithDaysAndHour } from "@/utils/date/format-date"
import { useQueryClient, type QueryObserverResult, type RefetchOptions } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import CustomButton from "@/components/Buttons/CustomButton"
import GradientCard from "@/components/shared/GradientCard"
import InfoItem from "@/components/shared/InfoItem"

interface AssignScholarshipProps {
    scholarshipRequest: ScholarshipRequest | undefined,
    refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<ScholarshipRequest, AxiosError<unknown, any>>>
}

const AssignScholarship = ({ scholarshipRequest, refetch }: AssignScholarshipProps) => {
    const queryClient = useQueryClient()
    const scholarshipIdRef = useRef<number | undefined>(scholarshipRequest?.scholarship?.id)
    const { data, isLoading } = useScholarshipsList()

    const updateMutation = useUpdateScholarshipRequestMutation()
    const [submitLoading, setSubmitLoading] = useState<boolean>()

    const handleSend = async (status: ScholarshipRequestStatus) => {
        if (!status) {
            toast.error('Indique el tipo de beca a asignar')
        }
        if (!scholarshipRequest) {
            return
        }

        updateMutation.mutateAsync(
            {
                id: scholarshipRequest.id,
                data: {
                    status: status,
                    scholarshipId: scholarshipIdRef.current
                }
            },
            {
                onSuccess: async () => {
                    const updated = await refetch(); 

                    if (!updated.data) return;

                    queryClient.setQueryData<ScholarshipRequest[]>(['scholarship-requests'], (prevData) => {
                        if (!prevData) return [];

                        return prevData.map((prev) =>
                            prev.id === scholarshipRequest.id ? updated.data : prev
                        );
                    });

                    toast.success('Beca actualizada exitosamente');
                },

                onError: () => toast.error('Error al intentar actualizar el registro')
            }
        ).finally(() => setSubmitLoading(false))
    }

    return (
        <GradientCard icon={<IconBook />} title="Asignación de Beca" color="error">
            <Grid2 spacing={2} container>
                {scholarshipRequest?.resolutionDate && (
                    <>
                        <Grid2 size={{xs:12, md:6}}>
                            <InfoItem
                                color="error"
                                label="Última revisión"
                                value={
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Typography>
                                            {formatDateWithDaysAndHour(new Date(scholarshipRequest.resolutionDate))}
                                        </Typography>
                                        <CustomChip
                                            label={scholarshipRequest.status}
                                            color={scholarshipRequest.status === 'Aprobado' ? 'success' : 'error'}
                                            size="small"
                                        />
                                    </Box>
                                }
                            />
                        </Grid2>
                    </>
                )}

                <Grid2 size={{xs:12, md: scholarshipRequest?.resolutionDate ? 6 : 12}}>
                    <InfoItem
                        color="error"
                        label="Beca de preferencia del solicitante"
                        value={
                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography>
                                    {scholarshipRequest?.scholarship?.name}
                                </Typography>
                                <CustomChip
                                    label={`${scholarshipRequest?.scholarship?.coverage}% de cobertura`}
                                    color="success"
                                    size="small"
                                />
                            </Box>
                        }
                    />
                </Grid2>

                <Grid2 size={12}>
                    <Divider sx={{ my: 2 }} />
                </Grid2>

                <Grid2 size={12}>
                    <FormControl fullWidth>
                        <InputLabel id="assign-scholarship-label">Seleccionar beca a asignar</InputLabel>
                        {isLoading ? (
                            <Skeleton height={56} />
                        ) : (
                            <Select
                                labelId="assign-scholarship-label"
                                label="Seleccionar beca a asignar"
                                defaultValue={scholarshipRequest?.scholarship?.id}
                                onChange={(e) => scholarshipIdRef.current = e.target.value as number}
                            >
                                {data?.map((scholarship) => (
                                    <MenuItem key={scholarship.id} value={scholarship.id}>
                                        {scholarship.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    </FormControl>
                </Grid2>

                <Grid2 size={{ xs: 12, md: 6 }}>
                    <CustomButton 
                        fullWidth
                        label="Asignar"
                        icon={<IconCheck size={20} />}
                        onClickFn={() => handleSend('Aprobado')}
                        loading={submitLoading}
                        sx={{ color: "white" }}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        color="error"
                        startIcon={<IconX size={20} />}
                        onClick={() => handleSend('Rechazado')}
                    >
                        Rechazar
                    </Button>
                </Grid2>
            </Grid2>
        </GradientCard>
    )
}

export default AssignScholarship