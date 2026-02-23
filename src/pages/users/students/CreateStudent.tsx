import { useRef, useState } from "react";
import { Check, CloudUpload, Home, Person } from "@mui/icons-material";
import { Alert } from "@mui/material";
import toast from "react-hot-toast";
import PageContainer from "@/components/container/page/PageContainer";
import CustomStepper, {
  type StepsProp,
} from "@/components/Stepper/CustomStepper";
import StudentInformationForm from "@/components/forms/Student/StudentInformationForm";
import HomeAndTransportForm from "@/components/forms/Student/HomeAndTransportForm";
import StudentFilesForm from "@/components/forms/Student/StudentFilesForm";
import ResponsibleInformationForm from "@/components/forms/Student/ResponsibleInformationForm";
import type { CreateUserDto } from "@/services/user/dto/create-user.dto";
import type { Student } from "@/types/student/Student";
import type { StudentInfoSchemaType } from "@/utils/validation-form-schemas/student/studentInformationSchema";
import type { HomeAndTransportSchemaType } from "@/utils/validation-form-schemas/student/HomeAndTransportSchema";
import type { ResponsibleInformationSchemaType } from "@/utils/validation-form-schemas/student/responsibleInformationSchema";
import useStudentFilesUpload from "@/hooks/files/mutations/useStudentFilesUpload";
import useCreateUser from "@/hooks/users/mutations/useCreateUser";
import useCreateResponsibleMutation from "@/hooks/api/mutations/useCreateResponsibleMutation";
import type { CreateResponsibleDto } from "@/types/responsible/dto/create-responsible.dto";
import type { Responsible } from "@/types/responsible/Responsible";
import { checkEmailAndDniAvailability } from "@/services/userService";
import { isAxiosError } from "axios";
import useGetStudentFiles from "@/hooks/files/queries/useGetStudentFiles";
import useStudentByCedula from "@/hooks/api/student/queries/useStudentByCedula";
import useCreateStudentMutation from "@/hooks/api/student/mutations/useCreateStudentMutation";
import StudentReportTabs from "@/pages/reports/student-reports/StudentReportTabs";

interface CreateStudentFlowRef {
  user: { id: number } | null;
  responsible: Responsible | null;
  student: Student | null;
  studentInfo: StudentInfoSchemaType | null;
  responsibleInfo: ResponsibleInformationSchemaType | null;
  homeAndTransport: HomeAndTransportSchemaType | null;
}

const initialFlowRef: CreateStudentFlowRef = {
  user: null,
  responsible: null,
  student: null,
  studentInfo: null,
  responsibleInfo: null,
  homeAndTransport: null,
};

const CreateStudent = () => {
  const { mutateAsync: createStudent, isPending: isCreatingStudent } =
    useCreateStudentMutation();
  const { mutateAsync: createUser, isPending: isCreatingUserByHook } =
    useCreateUser();
  const {
    mutateAsync: createResponsible,
    isPending: isCreatingResponsibleByHook,
  } = useCreateResponsibleMutation();

  const flowRef = useRef<CreateStudentFlowRef>(initialFlowRef);
  const [activeStep, setActiveStep] = useState(0);
  const [studentCedulaForFiles, setStudentCedulaForFiles] =
    useState<Student["cedula"]>(0);
  const [studentCredentials, setStudentCredentials] = useState<{
    email: string;
    password: string;
  } | null>(null);

  const { data: studentFiles } = useGetStudentFiles(studentCedulaForFiles);
  const { data: studentData } = useStudentByCedula(studentCedulaForFiles);
  const { refetch: refetchStudentFiles } = useGetStudentFiles(
    studentCedulaForFiles,
  );

  const { handleFileChange, uploadFile, isUploading } = useStudentFilesUpload(
    studentCedulaForFiles,
  );

  const handleStudentInfoSubmit = async (data: StudentInfoSchemaType) => {
    flowRef.current.studentInfo = data;

    try {
      await checkEmailAndDniAvailability(data.cedula, data.personalEmail);
      setActiveStep(1);
    } catch (error) {
      if (isAxiosError(error)) {
        return toast.error(
          error.response?.data?.message || "Cédula o correo en uso",
        );
      }
    }
  };

  const handleResponsibleInfoSubmit = (
    data: ResponsibleInformationSchemaType,
  ) => {
    flowRef.current.responsibleInfo = data;
    setActiveStep(2);
  };

  const buildResponsiblePayload = (
    responsibleInfo: ResponsibleInformationSchemaType,
  ): CreateResponsibleDto => {
    return {
      cedula: responsibleInfo.cedula,
      name: responsibleInfo.name,
      lastName1: responsibleInfo.lastName1,
      lastName2: responsibleInfo.lastName2,
      sex: responsibleInfo.sex,
      homePhone: responsibleInfo.homePhone ?? null,
      mobilePhone: Number(responsibleInfo.mobilePhone),
      email: responsibleInfo.email,
      occupation: responsibleInfo.occupation,
      country: responsibleInfo.country,
    };
  };

  const handleHomeAndTransportSubmit = async (
    data: HomeAndTransportSchemaType,
  ) => {
    const studentInfo = flowRef.current.studentInfo;
    const responsibleInfo = flowRef.current.responsibleInfo;
    if (!studentInfo) {
      toast.error(
        "Debe completar la informacion personal del estudiante antes de continuar.",
      );

      setActiveStep(0);
      return;
    }
    if (!responsibleInfo) {
      toast.error(
        "Debe completar la informacion del responsable antes de continuar.",
      );
      setActiveStep(1);
      return;
    }

    flowRef.current.homeAndTransport = data;

    try {
      let userId = flowRef.current.user?.id;

      if (!userId) {
        const createUserPayload: CreateUserDto = {
          dni: studentInfo.cedula,
          email: studentInfo.personalEmail,
          password: String(studentInfo.cedula),
          roles: ["student"],
          status: true,
        };

        const newUser = await createUser(createUserPayload);
        if (!newUser?.id) {
          throw new Error("No fue posible obtener el id del usuario creado.");
        }

        userId = newUser.id;
        flowRef.current.user = { id: newUser.id };
        setStudentCredentials({
          email: createUserPayload.email,
          password: createUserPayload.password,
        });
      }

      if (!flowRef.current.responsible?.id) {
        const responsiblePayload = buildResponsiblePayload(responsibleInfo);
        const responsible = await createResponsible(responsiblePayload);
        if (!responsible?.id) {
          throw new Error(
            "No fue posible obtener el id del responsable creado.",
          );
        }
        flowRef.current.responsible = responsible;
      }

      const birthplace =
        studentInfo.country === "Costa Rica"
          ? `${studentInfo.province}, ${studentInfo.canton}, ${studentInfo.district}`
          : studentInfo.country;

      const student = await createStudent({
        cedula: studentInfo.cedula,
        name: studentInfo.name,
        lastName1: studentInfo.lastName1,
        lastName2: studentInfo.lastName2,
        sex: studentInfo.sex,
        country: studentInfo.country,
        birthplace,
        birthday: new Date(studentInfo.birthday),
        lastInstitution: studentInfo.lastInstitution,
        adequacy: studentInfo.adequacy,
        canton: data.canton,
        district: data.district,
        address: data.address,
        requireTransport: data.requireTransport,
        transportRouteId: data.transportRouteId ?? 0,
        personalEmail: studentInfo.personalEmail,
        mepEmail: studentInfo.mepEmail || "",
        userId: userId ?? 0,
        responsibleId: flowRef.current.responsible?.id ?? 0,
      });

      flowRef.current.student = student;
      setStudentCedulaForFiles(student.cedula);
      setActiveStep(3);
    } catch {
      toast.error(
        "No fue posible completar el proceso de creacion del estudiante.",
      );
    }
  };

  const handleUploadFiles = async () => {
    if (!flowRef.current.student) {
      toast.error("Debe crear el estudiante antes de subir archivos.");
      return;
    }

    try {
      await uploadFile("schoolTitle", `Titulo_Escuela`);
      await uploadFile("policy", "Póliza");
      await uploadFile("responsibleCedulaCopy", "Copia_Cedula_Responsable");
      await uploadFile("studentCedulaCopy", "Copia_Cedula_Estudiante");
      await uploadFile("studentPassportPicture", "Foto_Tamaño_Pasaporte");
      await uploadFile("organDonorProof", "Prueba_Donante"); // Optional file

      await refetchStudentFiles();
      toast.success("Proceso completado. Estudiante creado correctamente.");
      setActiveStep((active) => active + 1);
    } catch {
      toast.error(
        "El estudiante se creo, pero ocurrio un error al subir archivos.",
      );
    }
  };

  const isProcessing =
    isCreatingUserByHook || isCreatingResponsibleByHook || isCreatingStudent;

  const steps: StepsProp[] = [
    {
      title: "Estudiante",
      icon: Person,
      content: (
        <StudentInformationForm
          studentData={null}
          handleSubmitForm={handleStudentInfoSubmit}
        />
      ),
    },
    {
      title: "Responsable",
      icon: Person,
      content: (
        <ResponsibleInformationForm
          studentData={null}
          handleSubmitForm={handleResponsibleInfoSubmit}
          handlePrev={() => setActiveStep(0)}
        />
      ),
    },
    {
      title: "Hogar y transporte",
      icon: Home,
      content: (
        <HomeAndTransportForm
          studentData={null}
          handleFormSubmit={handleHomeAndTransportSubmit}
          handlePrev={() => setActiveStep(1)}
          submitLabel="Enviar y continuar"
        />
      ),
    },
    {
      title: "Archivos",
      icon: CloudUpload,
      content: (
        <StudentFilesForm
          handleFileChange={handleFileChange}
          handleSubmit={handleUploadFiles}
          isUploading={isUploading || isProcessing}
          handlePrev={() => setActiveStep(2)}
          showUploadAlert
        />
      ),
    },
    {
      title: "Estudiante creado",
      icon: Check,
      content:
        studentFiles && studentData ? (
          <StudentReportTabs  
            filePaths={studentFiles}
            studentData={studentData}
          />
        ) : (
          ""
        ),
    },
  ];

  return (
    <PageContainer showBackButton title="Nuevo estudiante">
      {studentCredentials && (
        <>
          <Alert severity="success" sx={{ mb: 2 }}>
            Credenciales del estudiante: correo {studentCredentials.email} y
            contraseña {studentCredentials.password}.
          </Alert>
        </>
      )}
      <CustomStepper
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        steps={steps}
      />
    </PageContainer>
  );
};

export default CreateStudent;
