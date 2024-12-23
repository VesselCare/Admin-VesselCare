import React, { memo } from "react";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FormattedMessage } from "react-intl";
import Loading from "@/loading";

interface AnimationButtonProps {
  title: string | React.ReactNode;
  onClick?: () => void;
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary" | "success" | "error" | "warning" | "info";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  position?: "left" | "right";
  type?: "button" | "submit" | "reset";
  buttonColor?:
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "warning"
    | "info";
  loading?: boolean;
}

const ButtonBasicComponent: React.FC<AnimationButtonProps> = memo(
  ({
    title,
    onClick,
    variant,
    color,
    size,
    disabled,
    position,
    type,
    loading,
  }) => {
    const theme = useTheme();
    return (
      <Button
        variant={variant || "contained"}
        color={color || "primary"}
        size={size || "medium"}
        disabled={disabled || false}
        type={type || "button"}
        sx={{
          boxShadow: theme.customShadows.primary,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          ":hover": {
            boxShadow: "none",
          },
          width: "180px",
          height: "40px",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
          marginTop: "10px",
          ...(position === "left" && {
            marginLeft: "0",
          }),
          ...(position === "right" && {
            marginRight: "0",
          }),
        }}
        onClick={onClick}
      >
        {typeof title === "string" ? <FormattedMessage id={title} /> : title}
        {loading && <Loading />}
      </Button>
    );
  }
);

export default ButtonBasicComponent;
