import { api } from "@/api/api";
import type { Student } from "@/types/student/Student";

export const getStudentFiles = async (dni: Student['cedula']) => {
  const { data } = await api.get(`/files/student-files/${dni}`); // devuelve array de rutas
  return Array.isArray(data) ? data : [];
};

export const deleteStudentFile = async (dni: Student['cedula'], filename: string) => {
  const { data } = await api.delete(`/files/delete-student-file/${dni}/${filename}`); // devuelve array de rutas
  return Array.isArray(data) ? data : [];
};