import { useState } from 'react'
import { Box, Button, MenuItem, Select, type SelectChangeEvent } from '@mui/material'
import { IconDownload } from '@tabler/icons-react'
import { Workbook } from 'exceljs'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

type ExportFormat = 'excel' | 'csv' | 'pdf'

interface TableExportToolbarProps<T extends Record<string, any>> {
  data: T[]
  filename?: string
  columns?: Array<{ accessorKey?: string; header?: string; [key: string]: any }>
}

const TableExportToolbar = <T extends Record<string, any>>({
  data,
  filename = 'export',
  columns,
}: TableExportToolbarProps<T>) => {
  const [format, setFormat] = useState<ExportFormat>('excel')

  const handleFormatChange = (event: SelectChangeEvent<ExportFormat>) => {
    setFormat(event.target.value as ExportFormat)
  }

  // Función para limpiar y preparar los datos
  const prepareData = () => {
    if (!columns || columns.length === 0) {
      return data
    }

    return data.map(row => {
      const cleanRow: Record<string, any> = {}
      columns.forEach(col => {
        // Validar que accessorKey y header existan
        if (!col.accessorKey || !col.header) return
        
        const value = row[col.accessorKey]
        // Limpia valores booleanos, objetos complejos, etc.
        cleanRow[col.header] = 
          typeof value === 'boolean' ? (value ? 'Sí' : 'No') :
          typeof value === 'object' && value !== null ? JSON.stringify(value) :
          value ?? ''
      })
      return cleanRow
    })
  }

  const exportToExcel = async () => {
    const exportData = prepareData()
    const workbook = new Workbook()
    const worksheet = workbook.addWorksheet('Datos')

    // Obtener headers
    const headers = columns 
      ? columns.filter(col => col.accessorKey && col.header).map(col => col.header!)
      : Object.keys(exportData[0] || {})

    // Agregar headers con estilo
    worksheet.addRow(headers)
    worksheet.getRow(1).font = { bold: true }
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF424242' }
    }
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } }

    // Agregar datos
    exportData.forEach(row => {
      worksheet.addRow(Object.values(row))
    })

    // Auto-ajustar ancho de columnas
    worksheet.columns.forEach((column, index) => {
      let maxLength = headers[index]?.length || 10
      column.eachCell?.({ includeEmpty: true }, (cell) => {
        const cellValue = cell.value ? cell.value.toString() : ''
        maxLength = Math.max(maxLength, cellValue.length)
      })
      column.width = Math.min(maxLength + 2, 50)
    })

    // Descargar archivo
    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${filename}.xlsx`
    link.click()
  }

  const exportToCSV = () => {
    const exportData = prepareData()
    
    // Obtener headers
    const headers = columns 
      ? columns.filter(col => col.accessorKey && col.header).map(col => col.header!)
      : Object.keys(exportData[0] || {})

    // Crear CSV manualmente
    const csvRows = [headers.join(',')]
    
    exportData.forEach(row => {
      const values = Object.values(row).map(value => {
        // Escapar comillas y agregar comillas si contiene comas
        const stringValue = String(value)
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`
        }
        return stringValue
      })
      csvRows.push(values.join(','))
    })

    const csv = csvRows.join('\n')
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${filename}.csv`
    link.click()
  }

  const exportToPDF = () => {
    const doc = new jsPDF()
    const exportData = prepareData()

    // Preparar headers y rows para autoTable
    const validColumns = columns?.filter(col => col.accessorKey && col.header) || []
    const headers = validColumns.length > 0
      ? validColumns.map(col => col.header!)
      : Object.keys(exportData[0] || {})

    const rows = exportData.map(row => 
      validColumns.length > 0
        ? validColumns.map(col => row[col.header!])
        : Object.values(row)
    )

    autoTable(doc, {
      head: [headers],
      body: rows,
      styles: { 
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [66, 66, 66],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      margin: { top: 10 },
    })

    doc.save(`${filename}.pdf`)
  }

  const handleExport = () => {
    if (data.length === 0) {
      alert('No hay datos para exportar')
      return
    }

    switch (format) {
      case 'excel':
        exportToExcel()
        break
      case 'csv':
        exportToCSV()
        break
      case 'pdf':
        exportToPDF()
        break
    }
  }

  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Select
        value={format}
        onChange={handleFormatChange}
        size="small"
        sx={{ minWidth: 120 }}
      >
        <MenuItem value="excel">Excel (.xlsx)</MenuItem>
        <MenuItem value="csv">CSV (.csv)</MenuItem>
        <MenuItem value="pdf">PDF (.pdf)</MenuItem>
      </Select>

      <Button
        variant="contained"
        startIcon={<IconDownload size={18} />}
        onClick={handleExport}
        disabled={data.length === 0}
      >
        Exportar
      </Button>
    </Box>
  )
}

export default TableExportToolbar