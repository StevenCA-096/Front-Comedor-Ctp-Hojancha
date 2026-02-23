import { useState } from 'react'
import { CloudUpload, TableChart, CheckCircle } from '@mui/icons-material'
import FileUploadZone from './components/FileUploadZone'
import ImportPreviewTable from './components/ImportPreviewTable'
import ImportSummary from './components/ImportSummary'
import { useImportStudents } from './hooks/useImportStudents'
import CustomStepper, { type StepsProp } from '@/components/Stepper/CustomStepper'
import PageContainer from '@/components/container/page/PageContainer'

const ImportStudents = () => {
  const [activeStep, setActiveStep] = useState(0)

  const {
    parsedData,
    validationErrors,
    isProcessing,
    importResult,
    isImporting,
    handleFileAccepted,
    handleConfirmImport,
    handleReset,
  } = useImportStudents({
    onSuccess: () => setActiveStep(2),
  })

  const handleFileReady = (file: File) => {
    handleFileAccepted(file)
    setActiveStep(1)
  }

  const steps: StepsProp[] = [
    {
      title: 'Cargar archivo',
      icon: CloudUpload,
      content: (
        <FileUploadZone
          onFileAccepted={handleFileReady}
          isProcessing={isProcessing}
        />
      ),
    },
    {
      title: 'Revisar datos',
      icon: TableChart,
      content: parsedData ? (
        <ImportPreviewTable
          data={parsedData}
          validationErrors={validationErrors}
          isImporting={isImporting}
          onConfirm={handleConfirmImport}
          onBack={() => {
            handleReset()
            setActiveStep(0)
          }}
        />
      ) : null,
    },
    {
      title: 'Confirmar importación',
      icon: CheckCircle,
      content: importResult ? (
        <ImportSummary
          result={importResult}
          onReset={() => {
            handleReset()
            setActiveStep(0)
          }}
        />
      ) : null,
    },
  ]

  return (
    <PageContainer
      title="Importar Estudiantes"
      description="Carga un archivo CSV o Excel para importar estudiantes y sus responsables de forma masiva."
    >
      <CustomStepper
        steps={steps}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
    </PageContainer>
  )
}

export default ImportStudents