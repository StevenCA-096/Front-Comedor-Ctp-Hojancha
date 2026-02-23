import CustomButton from "@/components/Buttons/CustomButton";
import useUpdateStudent from "@/hooks/api/student/mutations/useUpdateStudent";
import type { Student } from "@/types/student/Student";
import { useTheme } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const SetActiveButton = ({ id, isActive }: { id: Student["id"], isActive: boolean }) => {
    const theme = useTheme();
  const queryClient = useQueryClient();
  const update = useUpdateStudent(id, {
    onSuccess: (data) => {
      toast.success(!data.isActive ? "Estudiante dado de baja con éxito." : "Estudiante activado con éxito.");
      queryClient.invalidateQueries({
        queryKey: ["student-cedula", parseInt(data.cedula.toString())],
      });
    },
  });

  const handleSend = async () => {
    const message = isActive 
      ? "¿Estás seguro de dar de baja a este estudiante?" 
      : "¿Estás seguro de activar a este estudiante?";

    toast((t) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <span style={{ fontWeight: 600, fontSize: '14px' }}>
          {message}
        </span>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <button
            onClick={() => toast.dismiss(t.id)}
            style={{
              padding: '6px 16px',
              borderRadius: '6px',
              border: '1px solid #ddd',
              background: 'white',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              update.mutateAsync({ isActive: !isActive });
            }}
            style={{
              padding: '6px 16px',
              borderRadius: '6px',
              border: 'none',
              background: isActive ? theme.palette.error.main : theme.palette.success.main,
              color: 'white',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Confirmar
          </button>
        </div>
      </div>
    ), {
      duration: 8000,
      position: 'top-center',
    });
  };

  return (
    <CustomButton
      label={isActive ? "Dar de baja" : "Activar estudiante"}
      sx={{ color: "white", fontWeight: "bold" }}
      color={isActive ? "error" : "success"}
      onClickFn={handleSend}
      loading={update.isPending}
    />
  );
};

export default SetActiveButton;