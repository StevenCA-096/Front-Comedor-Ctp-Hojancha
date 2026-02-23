import CustomModal from "@/components/Modals/CustomModal"
import useUpdateAdmin from "@/hooks/api/admins/mutations/useUpdateAdmin"
import type { User } from "@/types/common/user/user"
import AdminUserForm, { type AdminUpdateData, type AdminFormData } from "./AdminUserForm"
import { Box } from "@mui/material"
import useUpdateUser from "@/hooks/users/mutations/useUpdateUser"
import useGetAdmins from "@/hooks/users/queries/useGetAdmins"

interface UpdateAdminModalProps {
    open: boolean
    onClose: () => void
    user: User
}

const UpdateAdminModal = ({ open, onClose, user }: UpdateAdminModalProps) => {
    const { refetch } = useGetAdmins()
    const updateAdminMutation = useUpdateAdmin(user?.admin?.id || 0)
    const updateUserMutation = useUpdateUser(user.id)

    const handleSubmit = async (data: AdminUpdateData) => {
        try {
            const { roles, dni, email, ...adminData } = data
            const userData = { roles, status: user?.status, email: data.email }

            await updateAdminMutation.mutateAsync({ ...adminData, phoneNumber: parseInt(data.phoneNumber) })
            await updateUserMutation.mutateAsync(userData)

            refetch()
            onClose()
        } catch (error) {
            console.error(error)
        }
    }

    const initialData: Partial<AdminFormData> = {
        dni: user?.dni?.toString() || '',
        email: user?.email || '',
        name: user?.admin?.name || '',
        firstLastName: user?.admin?.firstLastName || '',
        secondLastName: user?.admin?.secondLastName || '',
        phoneNumber: user?.admin?.phoneNumber?.toString() || '',
        jobPosition: user?.admin?.jobPosition || '',
        roles: (user?.roles ?? []) as AdminFormData['roles'],
    }

    return (
        <CustomModal open={open} onClose={onClose} title="Actualizar Usuario">
            <Box>
                <AdminUserForm
                    onSubmit={handleSubmit}
                    isLoading={updateAdminMutation.isPending || updateUserMutation.isPending}
                    initialData={initialData}
                    isEditMode={true}
                />
            </Box>
        </CustomModal>
    )
}

export default UpdateAdminModal