import { useState, useCallback } from 'react'
import { parseImportFile } from '../utils/fileParser'
import { validateImportRows, filterValidRows } from '../utils/validation'
import type { ParsedImportRow, RowValidationError, ImportResult } from '../types/import.types'
import { api } from '@/api/api'

// Adjust to your axios instance: import api from '@/services/api'

interface UseImportStudentsOptions {
  onSuccess?: () => void
}

export const useImportStudents = ({ onSuccess }: UseImportStudentsOptions = {}) => {
  const [parsedData, setParsedData] = useState<ParsedImportRow[] | null>(null)
  const [validationErrors, setValidationErrors] = useState<RowValidationError[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [importResult, setImportResult] = useState<ImportResult | null>(null)

  // ── Step 1: Parse file locally ────────────────────────────────────────────
  const handleFileAccepted = useCallback(async (file: File) => {
    setIsProcessing(true)
    try {
      const rows = await parseImportFile(file)
      const errors = validateImportRows(rows)
      setParsedData(rows)
      setValidationErrors(errors)
    } catch (err) {
      console.error('Error parsing file:', err)
    } finally {
      setIsProcessing(false)
    }
  }, [])

  // ── Step 2: Send valid rows to backend ────────────────────────────────────
  const handleConfirmImport = useCallback(async () => {
    if (!parsedData) return
    setIsImporting(true)

    const validRows = filterValidRows(parsedData, validationErrors)

    const payload = {
      students: validRows.map((row) => ({
        cedula: String(row.student.cedula),
        name: row.student.name,
        lastName1: row.student.lastName1,
        lastName2: row.student.lastName2 ?? undefined,
        sex: row.student.sex ?? undefined,
        country: row.student.country ?? undefined,
        birthplace: row.student.birthplace ?? undefined,
        birthday: row.student.birthday ?? undefined,
        lastInstitution: row.student.lastInstitution ?? undefined,
        adequacy: row.student.adequacy ?? undefined,
        canton: row.student.canton ?? undefined,
        district: row.student.district ?? undefined,
        address: row.student.address ?? undefined,
        requireTransport: row.student.requireTransport ?? false,
        personalEmail: row.student.personalEmail ?? undefined,
        mepEmail: row.student.mepEmail ?? undefined,
        ...(row.responsible?.cedula
          ? {
              responsible: {
                cedula: String(row.responsible.cedula),
                name: row.responsible.name,
                lastName1: row.responsible.lastName1,
                lastName2: row.responsible.lastName2 ?? undefined,
                sex: row.responsible.sex ?? undefined,
                homePhone: row.responsible.homePhone ?? undefined,
                mobilePhone: row.responsible.mobilePhone ?? undefined,
                email: row.responsible.email ?? undefined,
                occupation: row.responsible.occupation ?? undefined,
                country: row.responsible.country ?? undefined,
              },
            }
          : {}),
      })),
    }

    try {
      const { data } = await api.post('/students/bulk-import', payload)

      // Backend returns BulkImportResult shape
      const result: ImportResult = {
        success: data.studentsCreated + data.studentsUpdated,
        failed: data.failed,
        responsiblesCreated: data.responsiblesCreated,
        errors: data.errors?.map((e: any) => ({ row: e.row, message: e.message })) ?? [],
      }

      setImportResult(result)
      onSuccess?.()
    } catch (err: any) {
      console.error('Import error:', err)
    } finally {
      setIsImporting(false)
    }
  }, [parsedData, validationErrors, onSuccess])

  const handleReset = useCallback(() => {
    setParsedData(null)
    setValidationErrors([])
    setImportResult(null)
  }, [])

  return {
    parsedData,
    validationErrors,
    isProcessing,
    importResult,
    isImporting,
    handleFileAccepted,
    handleConfirmImport,
    handleReset,
  }
}