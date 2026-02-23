import type { CreateStudentDto } from '@/types/student/dto/create-student.dto'
import { api } from '../api/api'
import type { Student } from '@/types/student/Student'
import type { UpdateStudentDto } from '@/types/student/dto/update-student.dto'

//This method creates a new student
export const createStudent = async (newStudent: CreateStudentDto) => {
  const data = (await api.post('student', newStudent)).data
  return data
}

export const searchStudents = async (searchCriteria: unknown) => {
  const data = (await api.post('student/search', searchCriteria)).data
  return data
}

export const getStudentByCedula = async (cedula: Student['cedula']) => {
  const data = (await api.get(`student/cedula/${cedula}`)).data
  return data
}

export const getStudentByCedula2 = async (cedula: Student['cedula']) => {
  const data = (await api.get(`student/get-student-by-cedula-typeorm/${cedula}`)).data
  return data
}

export const updateStudent = async (id: Student['id'], updatedStudent: UpdateStudentDto) => {
    const data = (await api.patch(`student/${id}`, updatedStudent)).data
    return data
}
