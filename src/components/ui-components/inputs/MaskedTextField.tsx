// MaskedTextField.tsx

import React from "react";
import TextField, { StandardTextFieldProps } from "@mui/material/TextField";
import InputMask from "react-input-mask";

interface MaskedTextFieldProps
  extends Omit<StandardTextFieldProps, "value" | "onChange" | "onBlur"> {
  mask: string;
  maskChar?: string | null;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const MaskedTextField: React.FC<MaskedTextFieldProps> = ({
  mask,
  maskChar = null,
  value,
  onChange,
  onBlur,
  ...rest
}) => {
  return (
    <InputMask
      mask={mask}
      maskChar={maskChar}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    >
      {(inputProps) => {
        const { ref, ...otherInputProps } = inputProps as any;
        return (
          <TextField
            {...otherInputProps}
            inputRef={ref}
            {...rest} // Não inclui value, onChange ou onBlur
          />
        );
      }}
    </InputMask>
  );
};

export default MaskedTextField;
