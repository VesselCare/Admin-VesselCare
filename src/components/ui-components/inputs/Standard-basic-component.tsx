"use client";
import React, { memo } from "react";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { useTheme } from "@mui/material/styles";

interface StandardBasicComponentProps {
  name: string;
  label?: string;
  type?: string;
  InputLabelProps?: any;
  control?: any;
  errors?: any;
}

const StandardBasicComponent: React.FC<StandardBasicComponentProps> = memo(
  ({ name, label, type = "text", InputLabelProps, control }) => {
    const theme = useTheme();

    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          return (
            <TextField
              {...field}
              fullWidth
              id={name}
              type={type}
              label={label ? <FormattedMessage id={label} /> : ""}
              slotProps={{
                inputLabel: {
                  ...InputLabelProps,
                  style: {
                    fontSize: theme.typography.body1.fontSize,
                  },
                },
              }}
              variant="standard"
              error={!!fieldState.error}
              value={field.value || ""}
              helperText={
                fieldState.error ? (
                  <FormattedMessage id={fieldState.error?.message as string} />
                ) : null
              }
            />
          );
        }}
      />
    );
  }
);

export default StandardBasicComponent;
