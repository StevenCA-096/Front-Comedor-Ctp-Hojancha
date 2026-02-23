import * as XLSX from 'xlsx'
import Papa from 'papaparse'
import { mapStudentColumn, mapResponsibleColumn } from './columnMapping'
import type { ParsedImportRow } from '../types/import.types'
import type { AxiosError } from 'axios'

type RawRow = Record<string, string | number | null | undefined>

/**
 * Parses a CSV or Excel file and returns structured rows.
 */
export const parseImportFile = async (file: File): Promise<ParsedImportRow[]> => {
  const extension = file.name.split('.').pop()?.toLowerCase()

  let rows: RawRow[] = []

  if (extension === 'csv') {
    rows = await parseCSV(file)
  } else if (extension === 'xlsx' || extension === 'xls') {
    rows = await parseExcel(file)
  } else {
    throw new Error('Formato no soportado')
  }

  return rows.map(mapRowToImportRow)
}

const parseCSV = (file: File): Promise<RawRow[]> =>
  new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => resolve(result?.data as RawRow[]),
      error: (err: AxiosError) => reject(err),
    })
  })

const parseExcel = (file: File): Promise<RawRow[]> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target!.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array', cellDates: true })
        const sheet = workbook.Sheets[workbook.SheetNames[0]]
        const json = XLSX.utils.sheet_to_json<RawRow>(sheet, { defval: '' })
        resolve(json)
      } catch (err) {
        reject(err)
      }
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })

const mapRowToImportRow = (raw: RawRow): ParsedImportRow => {
  const student: Record<string, unknown> = {}
  const responsible: Record<string, unknown> = {}

  for (const [rawKey, value] of Object.entries(raw)) {
    const studentField = mapStudentColumn(rawKey)
    if (studentField) {
      student[studentField] = coerce(studentField, value)
      continue
    }

    const responsibleField = mapResponsibleColumn(rawKey)
    if (responsibleField) {
      responsible[responsibleField] = coerce(responsibleField, value)
    }
  }

  return {
    student: student as ParsedImportRow['student'],
    responsible: Object.keys(responsible).length > 0
      ? (responsible as ParsedImportRow['responsible'])
      : undefined,
  }
}

/**
 * Coerce values based on field type expectations
 */
const coerce = (field: string, value: unknown): unknown => {
  const raw = String(value ?? '').trim()

  if (['requireTransport'].includes(field)) {
    return ['1', 'true', 'si', 'sí', 'yes'].includes(raw.toLowerCase())
  }

  if (['homePhone', 'mobilePhone'].includes(field)) {
    const n = parseInt(raw, 10)
    return isNaN(n) ? null : n
  }

  if (field === 'birthday') {
    // Handle Excel date serial or string
    if (value instanceof Date) return value.toISOString().split('T')[0]
    if (typeof value === 'number') {
      const date = XLSX.SSF.parse_date_code(value)
      if (date) return `${date.y}-${String(date.m).padStart(2, '0')}-${String(date.d).padStart(2, '0')}`
    }
    return raw || null
  }

  return raw || null
}
