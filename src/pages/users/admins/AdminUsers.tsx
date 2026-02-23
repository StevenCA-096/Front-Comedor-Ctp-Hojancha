import { useMemo, useState } from 'react'
import ViewToggleButton, { type ViewMode } from '@/components/Buttons/ViewToggleButton'
import PageContainer from '@/components/container/page/PageContainer'
import ListFilters from '@/components/filters/ListFilters'
import AdminsTable from './components/AdminsTable'
import AccordionCreateAdmin from './components/AccordionCreateAdmin'
import UpdateAdminModal from './components/UpdateAdminModal'
import type { User } from '@/types/common/user/user'
import useIsMobile from '@/hooks/isMobile/useIsMobile'
import AdminsCards from './components/AdminsCards'
import useSearchAndSort from '@/hooks/filters/useSearchAndSort'
import useGetAdmins from '@/hooks/users/queries/useGetAdmins'

const AdminUsers = () => {
    const isMobile = useIsMobile()
    const { data: admins = [], isLoading, isFetching, isError } = useGetAdmins()

    const [openModal, setOpenModal] = useState(false)
    const [selectedAdmin, setSelectedAdmin] = useState<User | null>(null)
    const [viewMode, setViewMode] = useState<ViewMode>(isMobile ? 'cards' : 'table')
    const sortOptions = useMemo(
        () => [
            { key: 'name', label: 'Nombre', getValue: (item: User) => item.admin?.name ?? '' },
            { key: 'dni', label: 'Cedula', getValue: (item: User) => item.dni },
            { key: 'email', label: 'Email', getValue: (item: User) => item.email },
            { key: 'createdAt', label: 'Fecha creacion', getValue: (item: User) => new Date(item.createdAt) },
        ],
        []
    )

    const { search, setSearch, sortKey, setSortKey, sortDirection, setSortDirection, filteredSortedItems } = useSearchAndSort({
        items: admins,
        searchableText: (item) => JSON.stringify(item),
        sortOptions,
        defaultSortKey: 'name',
    })

    const handleOpenModal = (admin: User) => {
        setSelectedAdmin(admin)
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setSelectedAdmin(null)
        setOpenModal(false)
    }

    return (
        <PageContainer
            title="Administradores/Colaboradores"
            description="Gestión de usuarios con acceso interno"
            action={<ViewToggleButton viewMode={viewMode} onChange={setViewMode} />}
        >
            <AccordionCreateAdmin />
            {viewMode === 'cards' && (
                <ListFilters
                    search={search}
                    onSearchChange={setSearch}
                    sortKey={sortKey}
                    onSortKeyChange={setSortKey}
                    sortDirection={sortDirection}
                    onSortDirectionChange={setSortDirection}
                    sortOptions={sortOptions}
                    defaultExpanded={!isMobile}
                />
            )}

            {viewMode === 'table' ? (
                <AdminsTable
                    admins={admins}
                    isLoading={isLoading}
                    isFetching={isFetching}
                    isError={isError}
                    handleOpenModal={handleOpenModal}
                />
            ) : (
                <AdminsCards
                    admins={filteredSortedItems}
                    isLoading={isLoading}
                    isError={isError}
                    onOpenModal={handleOpenModal}
                    itemsPerPage={isMobile ? 4 : 6}
                />
            )}

            {openModal && selectedAdmin && (
                <UpdateAdminModal
                    open={openModal}
                    user={selectedAdmin}
                    onClose={handleCloseModal}
                />
            )}
        </PageContainer>
    )
}

export default AdminUsers
