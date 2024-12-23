// SlidingPanel.tsx
import React, { useEffect, useRef } from "react";
import { Box, IconButton, Stack, useTheme } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";

interface SlidingPanelProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
}

const SlidingPanel: React.FC<SlidingPanelProps> = ({
  open,
  onClose,
  title,
  children,
}) => {
  const theme = useTheme();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      // Definir foco no botão de fechar quando o painel abrir
      closeButtonRef.current?.focus();
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    // Limpeza do listener quando o componente desmontar
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <Drawer
      sx={{
        ml: open ? 3 : 0,
        flexShrink: 0,
        zIndex: 1200,
        overflowX: "hidden",
        width: { xs: "80%", md: "80%" },
        "& .MuiDrawer-paper": {
          height: "100vh",
          width: { xs: "80%", md: "80%" },
          position: "fixed",
          border: "none",
          borderRadius: "0px",
        },
      }}
      variant="temporary"
      anchor="right"
      open={open}
      ModalProps={{ keepMounted: true }}
      onClose={onClose}
      transitionDuration={500}
    >
      {open && (
        <Box sx={{ p: 3 }}>
          {/* Cabeçalho com título e botão de fechar */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }} // Usando a cor do divider do tema
          >
            <Box
              sx={{
                color: theme.palette.primary.main,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {title}
            </Box>
            <IconButton
              onClick={onClose}
              ref={closeButtonRef}
              aria-label="Fechar painel"
            >
              <CloseIcon />
            </IconButton>
          </Stack>

          {/* Conteúdo do painel */}
          <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>{children}</Box>
        </Box>
      )}
    </Drawer>
  );
};

export default SlidingPanel;
