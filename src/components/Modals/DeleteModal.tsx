import { Button, DialogActions, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import CustomModal from './CustomModal';

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

/**
 * Delete confirmation modal component
 * @param open - Controls modal visibility
 * @param onClose - Function to close the modal
 * @param onConfirm - Async function that will be executed on confirm
 * @param title - Modal title (default: "¿Estás seguro?")
 * @param description - Modal description (default: "Esta acción no es reversible")
 * @param confirmText - Confirm button text (default: "Eliminar")
 * @param cancelText - Cancel button text (default: "Cancelar")
 */
export const DeleteModal = ({
  open,
  onClose,
  onConfirm,
  title = '¿Estás seguro?',
  description = 'Esta acción no es reversible',
  confirmText = 'Eliminar',
  cancelText = 'Cancelar',
}: DeleteModalProps) => {

  const handleConfirm = async () => {
    onClose();
    toast.loading('Procesando...');

    try {
      await onConfirm();
      toast.dismiss();
      toast.success('Operación completada exitosamente');
    } catch (error) {
      toast.dismiss();
      toast.error('Error al realizar la operación');
      console.error('Error in DeleteModal:', error);
    }
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title={title}
    >
        <Typography mt={2}>
          {description}
        </Typography>
      <DialogActions >
        <Button onClick={onClose} variant="outlined">
          {cancelText}
        </Button>
        <Button onClick={handleConfirm} variant="contained" color="error" autoFocus>
          {confirmText}
        </Button>
      </DialogActions>
    </CustomModal>
  );
};