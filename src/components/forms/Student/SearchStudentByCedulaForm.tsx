import CustomTextField from "../theme-elements/CustomTextField"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { studentSearchByCedulaSchema } from "@utils/validation-form-schemas/StudentSearchByCedulaSchema"
import { IconUser } from "@tabler/icons-react"
import CustomButton from "../../Buttons/CustomButton"
import { Search } from "@mui/icons-material"
import { Grid2 } from "@mui/material"

interface SearchStudentByCedulaFormProps {
    loading: boolean,
    handleOnSubmit: (data: { cedula: number; }) => Promise<void>
}

const SearchStudentByCedulaForm = ({ loading, handleOnSubmit }: SearchStudentByCedulaFormProps) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(studentSearchByCedulaSchema()) })

    return (
        <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Grid2 container spacing={2}>
                <Grid2 size={{xs:12, md:3}} >
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
                </Grid2>
                <Grid2 size={{xs:12, md:4}} mt={{xs:0, md:1}}>
                    <CustomButton
                        icon={<Search />}
                        label={'Buscar'}
                        loading={loading}
                        type="submit"
                        size={'large'}
                    />
                </Grid2>
            </Grid2>
        </form>
    )
}

export default SearchStudentByCedulaForm