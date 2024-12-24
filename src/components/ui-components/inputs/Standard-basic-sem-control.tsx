import React, { memo } from "react";
import TextField from "@mui/material/TextField";
import { FormattedMessage } from "react-intl";
import { useTheme } from "@mui/material/styles";
import { FieldErrors, Path, FieldValues } from "react-hook-form";

interface StandardBasicSemControlComponentProps<T extends FieldValues> {
  name: Path<T>; // Usa Path<T> para suportar caminhos aninhados
  label?: string;
  type?: string;
  InputLabelProps?: any;
  register: any; // UseFormRegister para tipagem correta
  errors?: { message?: string };
}

const StandardBasicSemControlComponent = <T extends FieldValues>({
  name,
  label,
  type = "text",
  register,
  errors,
}: StandardBasicSemControlComponentProps<T>) => {
  const theme = useTheme();

  return (
    <TextField
      {...register(name)} // Passa o nome registrado corretamente
      fullWidth
      focused
      id={name}
      type={type}
      label={<FormattedMessage id={label || ""} />}
      variant="standard"
      error={!!errors} // Exibe erro se houver
      helperText={
        errors?.message ? (
          <FormattedMessage id={errors.message as string} />
        ) : null
      }
      slotProps={{
        input: {
          style: {
            fontSize: theme.typography.body1.fontSize,
          },
        },
      }}
    />
  );
};

export default memo(StandardBasicSemControlComponent);
