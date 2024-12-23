import React, { memo } from "react";
import { Button } from "@mui/material";
import { FormattedMessage } from "react-intl";

interface AnimationButtonProps {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  position?: "left" | "right";
}

const ButtonOutlineComponent: React.FC<AnimationButtonProps> = memo(
  ({ title, onClick, disabled, position }) => {
    return (
      <Button
        variant="outlined"
        color="primary"
        size="medium"
        disabled={disabled || false}
        sx={{
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
        {<FormattedMessage id={title} />}
      </Button>
    );
  }
);

export default ButtonOutlineComponent;
