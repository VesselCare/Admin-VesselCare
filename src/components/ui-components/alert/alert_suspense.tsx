"use client";

import { Alert, AlertTitle, Slide, Box } from "@mui/material";
import { useState, createContext, useContext } from "react";
import { FormattedMessage } from "react-intl";

type Position = "top-right" | "top-left" | "bottom-right" | "bottom-left";

interface AlertMessage {
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
}

interface AlertManagerProps {
  children: React.ReactNode;
}

interface AlertContextType {
  showAlert: (
    message: AlertMessage,
    position?: Position,
    duration?: number
  ) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export const AlertProvider = ({ children }: AlertManagerProps) => {
  const [alert, setAlert] = useState<AlertMessage | null>(null);
  const [position, setPosition] = useState<Position>("top-right");
  const [open, setOpen] = useState(false);
  const [duration, setDuration] = useState(3000);

  const showAlert = (
    message: AlertMessage,
    pos: Position = "top-right",
    dur: number = 3000
  ) => {
    setAlert(message);
    setPosition(pos);
    setDuration(dur);
    setOpen(true);

    // Oculta o alerta após a duração
    setTimeout(() => {
      setOpen(false);
    }, dur);
  };

  const getPositionStyles = (): React.CSSProperties => {
    const positions: Record<Position, React.CSSProperties> = {
      "top-right": { position: "fixed", top: "80px", right: "20px" },
      "top-left": { position: "fixed", top: "80px", left: "20px" },
      "bottom-right": { position: "fixed", bottom: "80px", right: "20px" },
      "bottom-left": { position: "fixed", bottom: "80px", left: "20px" },
    };
    return positions[position];
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <Slide direction="left" in={open} mountOnEnter unmountOnExit>
          <Box sx={getPositionStyles()}>
            <Alert severity={alert.type} onClose={() => setOpen(false)}>
              <AlertTitle>
                {<FormattedMessage id={alert.title || ""} />}
              </AlertTitle>
              {<FormattedMessage id={alert.message || ""} />}
            </Alert>
          </Box>
        </Slide>
      )}
    </AlertContext.Provider>
  );
};
