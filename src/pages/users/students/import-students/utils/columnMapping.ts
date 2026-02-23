/**
 * Maps raw column headers (Spanish or English) to internal field names.
 * This allows Excel/CSV files to use either language.
 */

// Student field mappings
const STUDENT_COLUMN_MAP: Record<string, string> = {
  // cedula / dni
  cedula: 'cedula',
  dni: 'cedula',
  cédula: 'cedula',

  // name
  nombre: 'name',
  name: 'name',

  // lastName1
  apellido1: 'lastName1',
  'primer apellido': 'lastName1',
  lastname1: 'lastName1',
  primerApellido: 'lastName1',
  primerapellido: 'lastName1',

  // lastName2
  apellido2: 'lastName2',
  'segundo apellido': 'lastName2',
  lastname2: 'lastName2',
  segundoApellido: 'lastName2',
  segundoapellido: 'lastName2',

  // sex
  sexo: 'sex',
  sex: 'sex',
  genero: 'sex',
  género: 'sex',
  gender: 'sex',

  // country
  pais: 'country',
  país: 'country',
  country: 'country',

  // birthplace
  lugarnacimiento: 'birthplace',
  'lugar de nacimiento': 'birthplace',
  birthplace: 'birthplace',
  lugarNacimiento: 'birthplace',

  // birthday
  fechanacimiento: 'birthday',
  'fecha de nacimiento': 'birthday',
  birthday: 'birthday',
  fechaNacimiento: 'birthday',
  nacimiento: 'birthday',

  // lastInstitution
  ultimainstitucion: 'lastInstitution',
  'ultima institucion': 'lastInstitution',
  'última institución': 'lastInstitution',
  lastinstitution: 'lastInstitution',
  lastInstitution: 'lastInstitution',

  // adequacy
  adecuacion: 'adequacy',
  adecuación: 'adequacy',
  adequacy: 'adequacy',
  adecuacion_educativa: 'adequacy',

  // canton
  canton: 'canton',
  cantón: 'canton',

  // district
  distrito: 'district',
  district: 'district',

  // address
  direccion: 'address',
  dirección: 'address',
  address: 'address',

  // requireTransport
  requieretransporte: 'requireTransport',
  'requiere transporte': 'requireTransport',
  requiretransport: 'requireTransport',
  requireTransport: 'requireTransport',
  transporte: 'requireTransport',

  // personalEmail
  correopersonal: 'personalEmail',
  'correo personal': 'personalEmail',
  personalemail: 'personalEmail',
  personalEmail: 'personalEmail',
  emailPersonal: 'personalEmail',

  // mepEmail
  correomep: 'mepEmail',
  'correo mep': 'mepEmail',
  mepemail: 'mepEmail',
  mepEmail: 'mepEmail',
  emailMep: 'mepEmail',
}

// Responsible field mappings  
const RESPONSIBLE_COLUMN_MAP: Record<string, string> = {
  // cedula
  cedularesponsable: 'cedula',
  'cedula responsable': 'cedula',
  responsiblecedula: 'cedula',
  responsibleDni: 'cedula',
  dniresponsable: 'cedula',

  // name
  nombreresponsable: 'name',
  'nombre responsable': 'name',
  responsiblename: 'name',
  responsibleName: 'name',

  // lastName1
  apellido1responsable: 'lastName1',
  'apellido1 responsable': 'lastName1',
  responsiblelastname1: 'lastName1',
  responsibleLastName1: 'lastName1',

  // lastName2
  apellido2responsable: 'lastName2',
  'apellido2 responsable': 'lastName2',
  responsiblelastname2: 'lastName2',
  responsibleLastName2: 'lastName2',

  // sex
  sexoresponsable: 'sex',
  'sexo responsable': 'sex',
  responsiblesex: 'sex',
  responsibleSex: 'sex',

  // homePhone
  telefonocasa: 'homePhone',
  'telefono casa': 'homePhone',
  'teléfono casa': 'homePhone',
  homephone: 'homePhone',
  homePhone: 'homePhone',

  // mobilePhone
  telefonomovil: 'mobilePhone',
  telefonocelular: 'mobilePhone',
  'telefono celular': 'mobilePhone',
  'teléfono celular': 'mobilePhone',
  mobilephone: 'mobilePhone',
  mobilePhone: 'mobilePhone',
  celular: 'mobilePhone',

  // email
  correoresponsable: 'email',
  'correo responsable': 'email',
  responsibleemail: 'email',
  responsibleEmail: 'email',
  emailresponsable: 'email',

  // occupation
  ocupacion: 'occupation',
  ocupación: 'occupation',
  occupation: 'occupation',
  empleo: 'occupation',

  // country
  paisresponsable: 'country',
  'pais responsable': 'country',
  responsiblecountry: 'country',
  responsibleCountry: 'country',
}

/**
 * Normalizes a column header for lookup (lowercase, no spaces/special chars)
 */
const normalize = (key: string): string =>
  key.toLowerCase().trim().replace(/\s+/g, '').replace(/[áàä]/g, 'a').replace(/[éèë]/g, 'e').replace(/[íìï]/g, 'i').replace(/[óòö]/g, 'o').replace(/[úùü]/g, 'u')

export const mapStudentColumn = (raw: string): string | null => {
  const norm = normalize(raw)
  return STUDENT_COLUMN_MAP[norm] ?? STUDENT_COLUMN_MAP[raw] ?? null
}

export const mapResponsibleColumn = (raw: string): string | null => {
  const norm = normalize(raw)
  return RESPONSIBLE_COLUMN_MAP[norm] ?? RESPONSIBLE_COLUMN_MAP[raw] ?? null
}
