import type { ParsedImportRow, RowValidationError } from '../types/import.types'

export const validateImportRows = (rows: ParsedImportRow[]): RowValidationError[] => {
  const errors: RowValidationError[] = []

  rows.forEach((row, index) => {
    const messages: string[] = []
    const { student, responsible } = row

    // --- Student validations ---
    if (!student.cedula) {
      messages.push('Cédula del estudiante es requerida')
    } else if (!/^\d{9}$|^\d{13}$/.test(String(student.cedula).trim())) {
      messages.push('Cédula del estudiante debe tener exactamente 9 o 13 dígitos numéricos')
    }

    if (!student.name) {
      messages.push('Nombre del estudiante es requerido')
    }

    if (!student.lastName1) {
      messages.push('Primer apellido del estudiante es requerido')
    }

    if (student.sex && !['M', 'F', 'Masculino', 'Femenino', 'masculino', 'femenino', 'm', 'f'].includes(String(student.sex))) {
      messages.push('Sexo debe ser M/F o Masculino/Femenino')
    }

    if (student.birthday && isNaN(Date.parse(String(student.birthday)))) {
      messages.push('Fecha de nacimiento no tiene formato válido (YYYY-MM-DD)')
    }

    if (student.personalEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(student.personalEmail))) {
      messages.push('Correo personal no es válido')
    }

    if (student.mepEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(student.mepEmail))) {
      messages.push('Correo MEP no es válido')
    }

    // --- Responsible validations (only if provided) ---
    if (responsible) {
      if (!responsible.cedula) {
        messages.push('Cédula del responsable es requerida si se incluyen datos del responsable')
      } else if (!/^\d{5,15}$/.test(String(responsible.cedula))) {
        messages.push('Cédula del responsable debe ser numérica (5-15 dígitos)')
      }

      if (!responsible.name) {
        messages.push('Nombre del responsable es requerido si se incluyen datos del responsable')
      }

      if (responsible.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(responsible.email))) {
        messages.push('Correo del responsable no es válido')
      }
    }

    if (messages.length > 0) {
      errors.push({ rowIndex: index, messages })
    }
  })

  return errors
}

/**
 * Filter only valid rows (those without errors)
 */
export const filterValidRows = (
  rows: ParsedImportRow[],
  errors: RowValidationError[]
): ParsedImportRow[] => {
  const errorIndexes = new Set(errors.map((e) => e.rowIndex))
  return rows.filter((_, i) => !errorIndexes.has(i))
}