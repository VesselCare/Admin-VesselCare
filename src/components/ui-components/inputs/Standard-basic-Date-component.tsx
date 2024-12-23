"use client";
import React, { memo } from "react";
import { Controller } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useTheme } from "@mui/material/styles";

interface StandardBasicDateComponentProps {
  name: string;
  label?: string;
  control: any;
  InputLabelProps?: any;
  errors?: any;
}

const StandardBasicDateComponent: React.FC<StandardBasicDateComponentProps> =
  memo(({ name, label, control, InputLabelProps }) => {
    const theme = useTheme();
    const { locale } = useIntl();

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => {
            const handleChange = (value: any) => {
              // Passa o valor formatado para o react-hook-form
              field.onChange(value ? value.toISOString() : null);
            };

            const selectedDate = field.value ? dayjs(field.value) : null; // Garante que o valor seja uma instância do dayjs

            return (
              <DatePicker
                value={selectedDate}
                onChange={handleChange}
                format={locale === "en" ? "MM/DD/YYYY" : "DD/MM/YYYY"} // Define o formato de exibição
                disableFuture={false} // Permite escolher datas futuras
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: "standard",
                    label: label ? <FormattedMessage id={label} /> : "",
                    error: !!fieldState.error,
                    helperText: fieldState.error ? (
                      <FormattedMessage
                        id={fieldState.error?.message as string}
                      />
                    ) : null,
                    InputProps: {
                      ...InputLabelProps,
                      style: {
                        fontSize: theme.typography.body1.fontSize,
                      },
                    },
                  },
                }}
              />
            );
          }}
        />
      </LocalizationProvider>
    );
  });

export default StandardBasicDateComponent;
