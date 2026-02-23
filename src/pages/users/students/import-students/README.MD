# ImportStudents Feature

Herramienta para importación masiva de estudiantes desde archivos CSV o Excel.

## Estructura

```
ImportStudents/
├── ImportStudents.tsx           # Página principal (stepper de 3 pasos)
├── components/
│   ├── FileUploadZone.tsx       # Drag & drop de archivos + guía de columnas
│   ├── ImportPreviewTable.tsx   # Tabla de previsualización con MaterialReactTable
│   └── ImportSummary.tsx        # Resumen tras la importación
├── hooks/
│   └── useImportStudents.ts     # Lógica del flujo (parsing, validación, import)
├── utils/
│   ├── columnMapping.ts         # Normalización de nombres de columnas (ES/EN)
│   ├── fileParser.ts            # Parser para CSV (PapaParse) y Excel (SheetJS)
│   └── validation.ts            # Reglas de validación por fila
└── types/
    └── import.types.ts          # Tipos TypeScript del feature
```

## Flujo

1. **Cargar archivo** → El usuario sube un `.csv`, `.xlsx` o `.xls`
2. **Revisar datos** → Se muestra tabla de previsualización con estado OK/Error por fila
3. **Confirmar importación** → Se importan solo las filas válidas, se muestra resumen

## Columnas del archivo

Las columnas pueden estar en **español o inglés** — el sistema las normaliza automáticamente.

### Estudiante (requeridas: `cedula`, `nombre`, `apellido1`)
| Español | Inglés |
|---------|--------|
| cedula | dni |
| nombre | name |
| apellido1 | lastName1 |
| apellido2 | lastName2 |
| sexo | sex |
| pais | country |
| lugarNacimiento | birthplace |
| fechaNacimiento | birthday |
| ultimaInstitucion | lastInstitution |
| adecuacion | adequacy |
| canton | canton |
| distrito | district |
| direccion | address |
| requiereTransporte | requireTransport |
| correoPersonal | personalEmail |
| correoMEP | mepEmail |

### Responsable (opcional — si se incluye, requiere `cedulaResponsable` y `nombreResponsable`)
| Español | Inglés |
|---------|--------|
| cedulaResponsable | responsibleCedula |
| nombreResponsable | responsibleName |
| apellido1Responsable | responsibleLastName1 |
| apellido2Responsable | responsibleLastName2 |
| telefonoCasa | homePhone |
| telefonoCelular | mobilePhone |
| correoResponsable | responsibleEmail |
| ocupacion | occupation |
| paisResponsable | responsibleCountry |

## Reglas de negocio

- El **usuario** se crea automáticamente con `dni = cedula` y `password = cedula` (hash)
- Si el excel incluye columnas del responsable se crea el `responsible` y se vincula al estudiante
- Filas con errores de validación son resaltadas en rojo y **no se importan**
- El sistema las omite silenciosamente y muestra cuántas fallaron en el resumen

## Dependencias requeridas

```bash
npm install papaparse xlsx react-dropzone
npm install -D @types/papaparse
```

## Integración con API

En `hooks/useImportStudents.ts` busca el bloque comentado con `// Replace this block` y reemplázalo con tus llamadas reales a la API. El orden recomendado es:

1. `createUser({ dni, password, email, roles: ['student'] })`
2. Si hay responsable: `createResponsible(responsibleData)` → guarda el `id`
3. `createStudent({ ...studentData, userId, responsibleId })`