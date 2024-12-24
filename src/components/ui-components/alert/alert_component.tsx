import React from "react";
import { Box, Button, Typography, Modal, useTheme } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";

interface AlertProps {
  type: "success" | "error" | "warning" | "info"; // Tipos de alerta
  title: string; // Título do alerta
  message: string; // Mensagem do alerta
  buttonText?: string; // Texto do botão principal (opcional)
  onButtonClick?: () => void; // Callback para o clique do botão principal
  secondaryButtonText?: string; // Texto do botão secundário (opcional)
  onSecondaryButtonClick?: () => void; // Callback para o clique do botão secundário
}

const AlertComponent: React.FC<AlertProps> = ({
  type,
  title,
  message,
  buttonText = "Continue",
  onButtonClick,
  secondaryButtonText,
  onSecondaryButtonClick,
}) => {
  const theme = useTheme();

  // Define cores e ícones com base no tipo
  const alertStyles = {
    success: {
      color: theme.palette.success.main,
      icon: (
        <CheckCircleIcon
          sx={{ fontSize: 50, color: theme.palette.success.main }}
        />
      ),
    },
    error: {
      color: theme.palette.error.main,
      icon: (
        <ErrorIcon sx={{ fontSize: 50, color: theme.palette.error.main }} />
      ),
    },
    warning: {
      color: theme.palette.warning.main,
      icon: (
        <WarningIcon sx={{ fontSize: 50, color: theme.palette.warning.main }} />
      ),
    },
    info: {
      color: theme.palette.info.main,
      icon: <InfoIcon sx={{ fontSize: 50, color: theme.palette.info.main }} />,
    },
  };

  const currentStyle = alertStyles[type];

  return (
    <Modal
      open={true}
      onClose={() => {}} // Impede o fechamento ao clicar fora
      aria-labelledby="alert-title"
      aria-describedby="alert-message"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: theme.palette.background.paper,
          borderRadius: theme.spacing(2),
          boxShadow: 24,
          p: theme.spacing(4),
          textAlign: "center",
        }}
      >
        {currentStyle.icon}
        <Typography
          id="alert-title"
          variant="h4"
          sx={{ color: currentStyle.color, fontWeight: "bold", mt: 2 }}
        >
          {title}
        </Typography>
        <Typography
          id="alert-message"
          variant="body1"
          sx={{ color: theme.palette.text.primary, mt: 1 }}
        >
          {message}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: theme.spacing(2),
            mt: 3,
          }}
        >
          {secondaryButtonText && onSecondaryButtonClick && (
            <Button
              variant="outlined"
              onClick={onSecondaryButtonClick}
              sx={{
                color: currentStyle.color,
                borderColor: currentStyle.color,
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              {secondaryButtonText}
            </Button>
          )}
          <Button
            variant="contained"
            onClick={onButtonClick}
            sx={{
              backgroundColor: currentStyle.color,
              color: theme.palette.getContrastText(currentStyle.color),
              "&:hover": {
                backgroundColor: currentStyle.color,
              },
            }}
          >
            {buttonText}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AlertComponent;
