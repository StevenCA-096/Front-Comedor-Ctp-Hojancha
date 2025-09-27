import { Check, Close } from '@mui/icons-material'
import { Chip, Divider, Grid, List, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import { IconIdBadge, IconPremiumRights, IconUser } from '@tabler/icons-react'
import BlankCard from '@components/shared/BlankCard'
import type { ReactNode } from 'react'
import type StudentPaymentInfo from '@/types/dining/dining-student/dtos/studentPaymentInfo'

interface StudentFoundDataProps {
    data: StudentPaymentInfo | null
}

const StudentFoundData = ({ data }: StudentFoundDataProps) => {
    
    return (
        <BlankCard>
            <Grid container p={4}>
                <Grid item xs={12} mb={2}>
                    <Typography color={'GrayText'} variant='h5'>
                        Detalles del estudiante
                    </Typography>
                </Grid>
                <Grid lg={8} item>
                    <List>
                        <Detail
                            title={'Cédula:'}
                            icon={<IconIdBadge />}
                            value={data?.student?.cedula}
                        />
                        <Detail
                            title={'Nombre:'}
                            icon={<IconUser />}
                            value={`${data?.student?.name} ${data?.student?.lastName1} ${data?.student?.lastName2}`}
                        />
                        <Detail
                            title={'Posee beca:'}
                            icon={<IconPremiumRights />}
                            value={
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}
                                >
                                    {
                                        data?.scholarshipActive ?
                                            <Check color={'success'} />
                                            :
                                            <Close color={'error'}  />
                                    }

                                    <Chip
                                        label={
                                            <Typography m={1} fontWeight={'bold'}>
                                                {`%${data?.coverage}`}
                                            </Typography>

                                        }
                                        color={data?.scholarshipActive ? 'success' : 'error'}
                                    />
                                </Box>
                            }
                        />
                    </List>
                </Grid>
            </Grid>
        </BlankCard>

    )
}


interface DetailProps {
    title: string;
    value: string | ReactNode;
    icon: ReactNode
}

const Detail = ({ title, value, icon }: DetailProps) => {
    return (
        <>
            <Stack direction={'column'}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <ListItemIcon sx={{ mr: -2 }}>
                        {icon}
                    </ListItemIcon>
                    <Typography sx={{ fontSize: 16, opacity: 0.8 }}>
                        {title}
                    </Typography>
                </Box>
                <ListItemText>
                    <Typography fontSize={22}>
                        {value}
                    </Typography>
                </ListItemText>
            </Stack>
            <Divider sx={{ my: 1 }} />
        </>
    )
}

export default StudentFoundData