import { useState } from 'react'
import { isAxiosError } from 'axios'
import toast from 'react-hot-toast'
import { api } from '@/api/api'
import type { Student } from '@/types/student/Student'
import { useQueryClient } from '@tanstack/react-query'

interface FileWithFormat {
  file: File
  format: string
}

interface FilesState {
  [key: string]: FileWithFormat
}

interface UseStudentFilesUploadReturn {
  files: FilesState
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  uploadFile: (fileKey: string, filename: string) => Promise<unknown>
  isUploading: boolean
}

const useStudentFilesUpload = (
  cedula: Student['cedula'],
  initialFiles: FilesState = {}
): UseStudentFilesUploadReturn => {
  const queryClient =  useQueryClient()
  const [files, setFiles] = useState<FilesState>(initialFiles)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const maxFileSize = 25 * 1024 * 1024; // 25MB

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target?.files?.[0]
    
    if (!selectedFile) return

    if (selectedFile.size > maxFileSize) {
      toast.error(`El archivo seleccionado, pesa mas de lo admitido: ${maxFileSize}`)
      return
    }

    // Extract the file name and file extension
    const fileName = selectedFile.name;
    const fileType = fileName.substring(fileName.lastIndexOf('.')).toLowerCase(); // Extract the extension (e.g., ".pdf", ".jpg")

    const { id } = e.target
    console.log(id)
    
    setFiles((prevState) => ({
      ...prevState,
      [id]: { file: selectedFile, format: fileType }, // Store the selected file under its field name
    }))
  }

  const uploadFile = async (fileKey: string, filename: string): Promise<unknown> => {
    const formData = new FormData()
    const file = files[fileKey]?.file
    const fileFormat = files[fileKey]?.format
    const fileNameToServer = filename + fileFormat

    if (file) {
      formData.append('file', file, filename + fileNameToServer) // Append the file with the standardized filename

      try {
        setIsUploading(true)

        const response = await api.post(
          `files/upload-student-file/${cedula}/${cedula}-${fileNameToServer}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        if (!isAxiosError(response)) {
          queryClient.invalidateQueries({ queryKey: ['student-files', cedula] })
          toast.success('Archivo: ' + filename + ' , subido de forma exitosa.')
          return response.data // Return the response data
        } else {
          console.log(response)
        }
      } catch (error) {
        toast.error('No fue posible subir el archivo: ' + filename + '.')
        throw error
      } finally {
        setIsUploading(false)
      }
    }
  }

  return {
    files,
    handleFileChange,
    uploadFile,
    isUploading,
  }
}

export default useStudentFilesUpload