export type StudentReportDto = {
  id: number
  cedula: string
  name: string
  lastName1: string
  lastName2: string
  sex: string
  country: string
  birthplace: string
  birthday: string
  lastInstitution: string
  adequacy: string
  canton: string
  district: string
  address: string
  requireTransport: number
  transportRoute: string
  personalEmail: string
  mepEmail: string
  responsibleId: number
  responsibleCedula: string
  responsibleName: string
  responsibleLastName1: string
  responsibleLastName2: string
  responsibleSex: string
  responsibleHomePhone: number
  responsibleMobilePhone: number
  responsibleOccupation: string
  responsibleEmail: string
  responsibleCountry: string
  sectionName: string
  grade: string
  estado: number
  anio_ingreso: number
  anio_salida: number | null
  areaName: string
}