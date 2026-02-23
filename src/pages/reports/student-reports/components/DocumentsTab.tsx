import {
    Box,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from '@mui/material'
import { Download, Delete } from '@mui/icons-material'
import { deleteStudentFile } from '@/services/files-service'
import type { Student } from '@/types/student/Student'
import toast from 'react-hot-toast'
import StudentFilesForm from '@/components/forms/Student/StudentFilesForm'
import { useState } from 'react'
import CustomAccordion from '@/components/accordion/CustomAccordion'
import useModal from '@/hooks/useModal/useModal'
import useStudentFilesUpload from '@/hooks/files/mutations/useStudentFilesUpload'
import useGetStudentFiles from '@/hooks/files/queries/useGetStudentFiles'
import { DeleteModal } from '@/components/Modals/DeleteModal'

interface DocumentsTabProps {
    filePaths: string[],
    cedula: Student['cedula']
}

const DocumentsTab = ({ filePaths, cedula }: DocumentsTabProps) => {
    const [filesState, setFilesState] = useState<string[]>(filePaths)
    const [fileToDelete, setFileToDelete] = useState<string>('')
    const { handleClose, open, openModal } = useModal()
    const { refetch } = useGetStudentFiles(cedula)
    const [filesUploadLoading, setFilesUploadLoading] = useState(false)
    
    // Extrae el filename de la URL completa
    const extractFilename = (filePath: string): string => {
        const parts = filePath.split('/')
        return parts[parts.length - 1] || ''
    }

    const handleDownloadFile = async (filePath: string) => {
        try {
            console.log('Descargando:', filePath)

            // Crear un link temporal y hacer click programáticamente
            const link = document.createElement('a')
            link.href = filePath
            link.download = extractFilename(filePath)
            link.target = '_blank'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

        } catch (error) {
            console.error('Error al descargar:', error)
            toast.error('Error al descargar el archivo')
        }
    }

    const handleDeleteFile = async () => {
        const filename = extractFilename(fileToDelete)
        await deleteStudentFile(cedula, filename)
        setFilesState(filesState.filter((file) => !file.includes(filename)))
    }

    const openDeleteModal = (filePath: string) => {
        setFileToDelete(filePath)
        openModal()
    }
    
    const { handleFileChange, uploadFile } = useStudentFilesUpload(cedula)

    const handleSubmit = async () => {
        setFilesUploadLoading(true)
        // Upload each file one by one with a standardized filename
        await uploadFile('schoolTitle', `Titulo_Escuela`)
        await uploadFile('policy', 'Póliza')
        await uploadFile('responsibleCedulaCopy', 'Copia_Cedula_Responsable')
        await uploadFile('studentCedulaCopy', 'Copia_Cedula_Estudiante')
        await uploadFile('studentPassportPicture', 'Foto_Tamaño_Pasaporte')
        await uploadFile('organDonorProof', 'Prueba_Donante')
        
        refetch().then((newFiles) => newFiles.data && setFilesState(newFiles.data))
        setFilesUploadLoading(false)
    }

    return (
        <Box>
            <Box mb={1}>
                <CustomAccordion title='Clic para subir nuevos archivos'>
                    <StudentFilesForm handleFileChange={handleFileChange} handleSubmit={handleSubmit} isUploading={filesUploadLoading} />
                </CustomAccordion>
            </Box>
            {filesState?.length > 0 ? (
                <TableContainer component={Paper} variant="outlined">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre del Documento</TableCell>
                                <TableCell align="right">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filesState.map((filePath, index) => (
                                <TableRow key={index} hover>
                                    <TableCell>{extractFilename(filePath)}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            startIcon={<Download />}
                                            size="small"
                                            onClick={() => handleDownloadFile(filePath)}
                                            sx={{ mr: 1 }}
                                        >
                                            Descargar
                                        </Button>
                                        <Button
                                            startIcon={<Delete />}
                                            size="small"
                                            color="error"
                                            onClick={() => openDeleteModal(filePath)}
                                        >
                                            Eliminar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Alert severity="info">No hay documentos disponibles</Alert>
            )}
            <DeleteModal 
                open={open}
                onClose={handleClose}
                onConfirm={handleDeleteFile}
                title="¿Eliminar archivo?"
                description={extractFilename(fileToDelete)}
            />
        </Box>
    )
}

export default DocumentsTab