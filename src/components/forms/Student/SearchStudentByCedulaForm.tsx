import { Box } from "@mui/system"
import CustomTextField from "../theme-elements/CustomTextField"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { studentSearchByCedulaSchema } from "@utils/validation-form-schemas/StudentSearchByCedulaSchema"
import { IconUser } from "@tabler/icons-react"
import CustomButton from "../../Buttons/CustomButton"
import { Search } from "@mui/icons-material"
import { Stack } from "@mui/material"
import useIsMobile from '@hooks/isMobile/useIsMobile'

interface SearchStudentByCedulaFormProps {
    loading: boolean,
    handleOnSubmit: (data: { cedula: number; }) => Promise<void>
}

const SearchStudentByCedulaForm = ({ loading, handleOnSubmit }: SearchStudentByCedulaFormProps) => {
    const isMobile = useIsMobile()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(studentSearchByCedulaSchema()) })

    return (
        <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Stack
                direction={isMobile ? 'column' : 'row'}
                alignItems={'end'}
            >
                <Box mr={2}>
                    <CustomTextField
                        id={'cedula-scan'}
                        register={register}
                        name={'cedula'}
                        error={!!errors?.cedula}
                        errorMessage={errors?.cedula?.message}
                        label='Cédula'
                        type="number"
                        Icon={<IconUser />}
                        autoFocus
                    />
                </Box>
                <Box mb={3}>
                    <CustomButton
                        icon={<Search />}
                        label={'Buscar'}
                        loading={loading}
                        type="submit"
                        size={'large'}
                    />
                </Box>
            </Stack>
        </form>
    )
}

export default SearchStudentByCedulaForm