"use client";

import React, { memo, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useTheme } from "@mui/material/styles";

interface DataInputSemControllerProps {
  name: string;
  label?: string;
  register: any; // Função de registro do react-hook-form
  errors?: { message?: string };
  defaultValue?: string;
}

const DataInputSemController: React.FC<DataInputSemControllerProps> = memo(
  ({ name, label, register, errors, defaultValue }) => {
    const theme = useTheme();
    const { locale } = useIntl();
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    useEffect(() => {
      if (selectedDate) {
        register(name).onChange(selectedDate);
      }
    }, [selectedDate]);

    // Inicializa o valor do campo com o valor padrão (defaultValue)
    useEffect(() => {
      if (defaultValue) {
        setSelectedDate(defaultValue);
      }
    }, [defaultValue]);

    const handleChange = (newValue: any) => {
      const formattedValue = newValue ? newValue.toISOString() : null;
      setSelectedDate(formattedValue); // Atualiza o estado local
      register(name).onChange({ target: { name, value: formattedValue } }); // Sincroniza com o react-hook-form
    };

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
        <DatePicker
          value={selectedDate ? dayjs(selectedDate) : null}
          onChange={handleChange}
          format={locale === "en" ? "MM/DD/YYYY" : "DD/MM/YYYY"} // Define o formato de exibição
          disableFuture={false} // Permite escolher datas futuras
          slotProps={{
            textField: {
              ...register(name), // Registra o campo no formulário
              fullWidth: true,
              variant: "standard",
              label: label ? <FormattedMessage id={label} /> : "",
              error: !!errors?.message,
              helperText: errors?.message ? (
                <FormattedMessage id={errors.message} />
              ) : null,
              InputProps: {
                style: {
                  fontSize: theme.typography.body1.fontSize,
                },
              },
            },
          }}
        />
      </LocalizationProvider>
    );
  }
);

export default DataInputSemController;
