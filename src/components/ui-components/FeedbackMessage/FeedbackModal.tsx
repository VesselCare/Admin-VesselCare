import React from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  useTheme,
  IconButton,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CloseIcon from "@mui/icons-material/Close";
import ButtonBasicComponent from "../button/animation-button";

interface FeedbackModalProps {
  open: boolean;
  type: "success" | "error";
  title: string;
  message: string;
  buttonText: string;
  onClose?: () => void;
  onButtonClick: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  open,
  type,
  title,
  message,
  buttonText,
  onClose,
  onButtonClick,
}) => {
  const theme = useTheme();

  const isSuccess = type === "success";
  const icon = isSuccess ? (
    <CheckCircleOutlineIcon fontSize="large" />
  ) : (
    <ErrorOutlineIcon fontSize="large" />
  );
  const color = isSuccess
    ? theme.palette.success.main
    : theme.palette.error.main;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent
        sx={{ position: "relative", textAlign: "center", padding: 1 }}
      >
        {onClose && (
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", top: 4, right: 4 }}
          >
            <CloseIcon />
          </IconButton>
        )}
        <Box
          color={color}
          mb={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {icon}
        </Box>
        <Typography variant="h4" fontWeight="bold" color={color}>
          {title}
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ my: 2 }}>
          {message}
        </Typography>
        <ButtonBasicComponent
          type="button"
          title={buttonText}
          onClick={onButtonClick}
        />
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
