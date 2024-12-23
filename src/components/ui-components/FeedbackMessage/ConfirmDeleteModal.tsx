import React from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ConfirmDeleteModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  open,
  onConfirm,
  onCancel,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent
        sx={{ position: "relative", textAlign: "center", padding: 4 }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" color="textPrimary" sx={{ mb: 2 }}>
          Confirma exclusão?
        </Typography>
        <Box display="flex" justifyContent="space-around" mt={3}>
          <Button variant="contained" color="primary" onClick={onConfirm}>
            Sim
          </Button>
          <Button variant="outlined" color="primary" onClick={onCancel}>
            Não
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
