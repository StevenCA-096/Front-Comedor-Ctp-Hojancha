import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, Skeleton, Typography } from "@mui/material"
import { SectionTitle } from "./SectionParts"
import { IconBook, IconCheck, IconX } from "@tabler/icons-react"
import useScholarshipsList from "@/hooks/api/scholarship/queries/useScholarshipsList"
import useUpdateScholarshipRequestMutation from "@/hooks/api/scholarship-request/mutations/useUpdateScholarshipRequestMutation"
import { useRef } from "react"
import type { ScholarshipRequest, ScholarshipRequestStatus } from "@/types/scholarship/scholarship_request/entities/ScholarshipRequest"
import CustomChip from "@/components/Chip/CustomChip"
import toast from "react-hot-toast"
import { formatDateWithDaysAndHour } from "@/utils/date/format-date"
import { useQueryClient, type QueryObserverResult, type RefetchOptions } from "@tanstack/react-query"
import type { AxiosError } from "axios"

interface AssignScholarshipProps {
    scholarshipRequest: ScholarshipRequest | undefined,
    refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<ScholarshipRequest, AxiosError<unknown, any>>>
}

//This components is in charge of updating the request
const AssignScholarship = ({ scholarshipRequest, refetch }: AssignScholarshipProps) => {
    const queryClient = useQueryClient()
    //Stores the scholarship that is going to be assigned
    const scholarshipIdRef = useRef<number | undefined>(scholarshipRequest?.scholarship?.id)
    const { data, isLoading } = useScholarshipsList()

    const updateMutation = useUpdateScholarshipRequestMutation()

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
                //Updates the current query and the list query for the table
                onSuccess: async () => {
                    const updated = await refetch(); 

                    if (!updated.data) return; // just in case of errors

                    queryClient.setQueryData<ScholarshipRequest[]>(['scholarship-requests'], (prevData) => {
                        if (!prevData) return []; // in case there is no cached data

                        // Returns the new updated data
                        return prevData.map((prev) =>
                            prev.id === scholarshipRequest.id ? updated.data : prev
                        );
                    });

                    toast.success('Beca actualizada exitosamente');
                },

                onError: () => toast.error('Error al intentar actualizar el registro')
            }
        )
    }

    return (
        <Box p={3}>
            <SectionTitle icon={<IconBook size={22} />} title="Asignación de Beca" />

            <Box
                p={2.5}
                sx={{
                    borderRadius: 2,
                }}
            >
                {
                    scholarshipRequest?.resolutionDate &&
                    <>
                        <Typography variant="body1" color="text.secondary" gutterBottom>
                            Ultima revisión:
                            <CustomChip
                                sx={{ml:1}}
                                label={scholarshipRequest?.status}
                                color={scholarshipRequest.status == 'Aprobado' ? 'success' : 'error'}
                            />
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1.5} mt={1}>
                            <Typography variant="h6" fontWeight={600}>
                                {formatDateWithDaysAndHour(new Date(scholarshipRequest?.resolutionDate))}
                            </Typography>
                            
                        </Box>
                    </>
                }

                <br />
                <Typography variant="body1" color="text.secondary" gutterBottom>
                    Beca de preferencia del solicitante:
                </Typography>
                <Box display="flex" alignItems="center" gap={1.5} mt={1}>
                    <Typography variant="h6" fontWeight={600}>
                        {scholarshipRequest?.scholarship?.name}
                    </Typography>
                    <CustomChip
                        label={`${scholarshipRequest?.scholarship?.coverage}% de cobertura`}
                        color="success"
                        size="small"
                    />
                </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <FormControl fullWidth>
                <InputLabel id="assign-scholarship-label">Seleccionar beca a asignar</InputLabel>
                {
                    isLoading ? <Skeleton height={40} /> : (
                        <Select
                            labelId="assign-scholarship-label"
                            label="Seleccionar beca a asignar"
                            defaultValue={scholarshipRequest?.scholarship?.id}
                            onChange={(e) => scholarshipIdRef.current = e.target.value as number}
                        >
                            {
                                data?.map((scholarship) =>
                                    <MenuItem value={scholarship.id}>
                                        {scholarship.name}
                                    </MenuItem>
                                )
                            }
                        </Select>
                    )
                }

            </FormControl>

            <Box mt={3} display="flex" gap={2}>
                <Button
                    variant="contained"
                    fullWidth
                    startIcon={<IconCheck size={20} />}
                    onClick={() => handleSend('Aprobado')}
                >
                    Asignar
                </Button>
                <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    startIcon={<IconX size={20} />}
                    onClick={() => handleSend('Rechazado')}
                >
                    Rechazar
                </Button>
            </Box>
        </Box>
    )
}

export default AssignScholarship