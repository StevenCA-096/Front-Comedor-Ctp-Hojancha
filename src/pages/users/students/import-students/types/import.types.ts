export interface ParsedStudentData {
  cedula?: string | null
  name?: string | null
  lastName1?: string | null
  lastName2?: string | null
  sex?: string | null
  country?: string | null
  birthplace?: string | null
  birthday?: string | null
  lastInstitution?: string | null
  adequacy?: string | null
  canton?: string | null
  district?: string | null
  address?: string | null
  requireTransport?: boolean | null
  personalEmail?: string | null
  mepEmail?: string | null
}

export interface ParsedResponsibleData {
  cedula?: string | null
  name?: string | null
  lastName1?: string | null
  lastName2?: string | null
  sex?: string | null
  homePhone?: number | null
  mobilePhone?: number | null
  email?: string | null
  occupation?: string | null
  country?: string | null
}

export interface ParsedImportRow {
  student: ParsedStudentData
  responsible?: ParsedResponsibleData
}

export interface RowValidationError {
  rowIndex: number
  messages: string[]
}

export interface ImportResult {
  success: number
  failed: number
  responsiblesCreated: number
  errors?: Array<{ row: number; message: string }>
}
