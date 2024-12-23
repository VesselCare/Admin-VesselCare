"use client";
import React, { memo } from "react";
import TextField from "@mui/material/TextField";
import { useFormContext, Controller } from "react-hook-form";
import { FormattedMessage } from "react-intl";

interface StandardBasicComponentProps {
  name: string;
  label?: string;
  type?: string;
  InputLabelProps?: any;
}

const DataInputComponent: React.FC<StandardBasicComponentProps> = memo(
  ({ name, label, type = "text", InputLabelProps }) => {
    const { control } = useFormContext();

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
                },
                input: {
                  lang: "en-US",
                },
              }}
              inputProps={{
                "data-language": "en-US",
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

export default DataInputComponent;
