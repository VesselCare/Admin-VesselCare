import { useState } from "react";
import AlertComponent from "@/components/ui-components/alert/alert_component"; // Componente de alerta reutilizável

type AlertType = "success" | "error" | "warning" | "info";

interface UseAlertReturn {
  showAlert: (
    type: "success" | "error" | "warning" | "info",
    title: string,
    message: string,
    buttonText?: string,
    onButtonClick?: () => void,
    secondaryButtonText?: string,
    onSecondaryButtonClick?: () => void
  ) => void;
  Alert: React.ReactNode | null;
}

export const useAlert = (): UseAlertReturn => {
  const [alert, setAlert] = useState<{
    open: boolean;
    type: AlertType;
    title: string;
    message: string;
    buttonText: string;
    onButtonClick: (() => void) | null;
    secondaryButtonText: string | null;
    onSecondaryButtonClick: (() => void) | null;
  }>({
    open: false,
    type: "success",
    title: "",
    message: "",
    buttonText: "Continue",
    onButtonClick: null,
    secondaryButtonText: null,
    onSecondaryButtonClick: null,
  });

  const showAlert = (
    type: AlertType,
    title: string,
    message: string,
    buttonText = "Continue",
    onButtonClick?: () => void,
    secondaryButtonText?: string,
    onSecondaryButtonClick?: () => void
  ) => {
    setAlert({
      open: true,
      type,
      title,
      message,
      buttonText,
      onButtonClick: onButtonClick || null,
      secondaryButtonText: secondaryButtonText || null,
      onSecondaryButtonClick: onSecondaryButtonClick || null,
    });
  };

  const closeAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  const Alert = alert.open ? (
    <AlertComponent
      type={alert.type}
      title={alert.title}
      message={alert.message}
      buttonText={alert.buttonText}
      onButtonClick={() => {
        if (alert.onButtonClick) {
          alert.onButtonClick();
        }
        closeAlert();
      }}
      secondaryButtonText={alert.secondaryButtonText || undefined}
      onSecondaryButtonClick={() => {
        if (alert.onSecondaryButtonClick) {
          alert.onSecondaryButtonClick();
        }
        closeAlert();
      }}
    />
  ) : null;

  return { showAlert, Alert };
};
