// FullScreenModal.tsx
import React from "react";
import { Dialog, DialogProps, Slide, SlideProps } from "@mui/material";
import MainCard from "@/components/ui-components/cards/MainCard";
import { Stack, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Definição da transição Slide
const Transition = React.forwardRef(function Transition(
  props: SlideProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

interface FullScreenModalProps extends Omit<DialogProps, "title"> {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  container: HTMLElement | null; // Adiciona a propriedade container
}

const FullScreenModal: React.FC<FullScreenModalProps> = ({
  open,
  onClose,
  children,
  title,
  container,
  ...otherProps
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      disablePortal // Renderiza a modal dentro do DOM pai
      container={container} // Define o container para a área de conteúdo
      keepMounted
      PaperProps={{
        sx: {
          width: { xs: "90%", sm: "80%", md: "600px" }, // Responsivo
          maxWidth: "90%",
          margin: "auto",
          mt: "5%", // Margem superior para centralização vertical
          display: "flex",
          flexDirection: "column",
          maxHeight: "80%",
          borderRadius: 2,
          boxShadow: 24,
        },
      }}
      {...otherProps}
    >
      <MainCard
        content={false}
        title={title}
        secondary={
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
        }
      >
        <Box sx={{ flexGrow: 1, overflowY: "auto", padding: 2 }}>
          {children}
        </Box>
      </MainCard>
    </Dialog>
  );
};

export default FullScreenModal;
