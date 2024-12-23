import React from "react";
import { Button, ButtonProps as MUIButtonProps, Box } from "@mui/material";

interface MyButtonProps extends MUIButtonProps {
  text?: string;
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  disabledTooltip?: string;
  disabled?: boolean;
}

const CustomButton: React.FC<MyButtonProps> = ({
  text,
  onClick,
  justify = "flex-end",
  disabledTooltip,
  disabled,
  ...props
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: justify,
      }}
    >
      <Button
        {...props} // Espalha as demais propriedades para o Button
        onClick={onClick} // Usa a propriedade onClick passada para CustomButton
        disabled={disabled}
        title={disabledTooltip}
      >
        {text}
      </Button>
    </Box>
  );
};

export default CustomButton;
