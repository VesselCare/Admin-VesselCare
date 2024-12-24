"use client";
import React, { memo, useState } from "react";
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
  ({ name, label = "text", InputLabelProps, control }) => {
    const theme = useTheme();
    const [localValue, setLocalValue] = useState<string>("");

    // Função para formatar o valor como moeda (dólar)
    const formatCurrency = (value: string | number) => {
      if (!value) return "";
      const numberValue = parseFloat(value.toString().replace(/,/g, "")); // Remove separadores de milhares antes de converter
      if (isNaN(numberValue)) return "";
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(numberValue); // Formata o valor como moeda
    };

    // Função para remover a formatação e manter apenas números
    const parseCurrency = (value: string) => {
      return value.replace(/[^0-9.]/g, ""); // Remove caracteres não numéricos e separadores de milhares
    };

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
              type="text" // Usar "text" para permitir formatação personalizada
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
              value={localValue} // Exibe o valor digitado ou formatado
              onChange={(e) => {
                const rawValue = parseCurrency(e.target.value); // Remove a formatação ao digitar
                setLocalValue(rawValue); // Atualiza o estado local com o valor bruto
                field.onChange(rawValue); // Atualiza o valor no formulário
              }}
              onBlur={() => {
                // Formata o valor como moeda ao sair do campo
                if (localValue) {
                  const formattedValue = formatCurrency(localValue);
                  setLocalValue(formattedValue); // Atualiza o estado local com o valor formatado
                }
              }}
              onFocus={() => {
                // Remove a formatação ao focar no campo
                const rawValue = parseCurrency(localValue); // Remove formatação de moeda
                setLocalValue(rawValue); // Atualiza o estado local com o valor bruto
              }}
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
