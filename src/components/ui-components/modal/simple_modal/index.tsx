import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import * as React from 'react';

interface SimpleModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  handleOpen: () => void;
  width?: number;
  height?: number;
}

export default function SimpleModal({ 
  open, onClose, children, width, height }: SimpleModalProps) {

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500, // 500ms para fechar o modal
          },
        }}
      >
        <Fade in={open}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: width || 400,
            height: height || 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 4,
          
          }}>
            {children}
          </Box>
        </Fade>
    </Modal>
  );
}