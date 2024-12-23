import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface MaisOpcoesButtonProps {
  options: Array<{
    label: string;
    onClick: () => void;
  }>;
  title: string;
}

const MaisOpcoesButton: React.FC<MaisOpcoesButtonProps> = ({
  options,
  title,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="text"
        color="primary"
        endIcon={<ArrowDropDownIcon />}
        onClick={handleClick}
      >
        {title}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {options.map((option, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              handleClose();
              option.onClick();
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MaisOpcoesButton;
