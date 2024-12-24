"use client";

import React, { useState, useEffect, memo } from "react";
import { TextField, MenuItem, InputAdornment } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { countries, Country } from "@/utils/maskaras-input/countries";
import { useTheme } from "@mui/material/styles";
import { FormattedMessage } from "react-intl";
import { IMaskInput } from "react-imask";

interface PhoneInputComponentProps {
  name: string; // Nome do campo no formulário
  label?: string; // Rótulo do campo
  register: any; // Função de registro do react-hook-form
  errors?: { message?: string }; // Erros específicos do campo
}

const PhoneInputComponentSemControl: React.FC<PhoneInputComponentProps> = memo(
  ({ name, label, register, errors }) => {
    const theme = useTheme();

    // Estado para o país selecionado e máscara dinâmica
    const [selectedCountry, setSelectedCountry] = useState<Country>(
      countries[0] as Country
    );
    const [mask, setMask] = useState<string>(selectedCountry.mask); // Máscara inicial com base no país

    // Atualiza a máscara dinamicamente quando o país muda
    useEffect(() => {
      setMask(selectedCountry.mask);
    }, [selectedCountry]);

    // Componente de máscara personalizado
    const MaskedInput = React.forwardRef<HTMLInputElement, any>(
      function MaskedInput(props, ref) {
        const { onChange, value, ...other } = props;

        return (
          <IMaskInput
            {...other}
            mask={mask}
            definitions={{
              "#": /[0-9]/, // Apenas números permitidos
            }}
            inputRef={ref}
            value={value} // Passa o valor corretamente
            onAccept={(value: string) => {
              onChange({ target: { name: props.name, value } }); // Atualiza o formulário com o valor
            }}
            overwrite
          />
        );
      }
    );

    return (
      <Grid2 container spacing={2}>
        {/* Campo para selecionar o país */}
        <Grid2 size={5}>
          <TextField
            select
            label={<FormattedMessage id="select_country" />}
            value={selectedCountry.code}
            onChange={(e) => {
              const country = countries.find((c) => c.code === e.target.value);
              if (country) {
                setSelectedCountry(country);
              }
            }}
            fullWidth
            variant="standard"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderBottom: `1px solid ${
                errors?.message
                  ? theme.palette.error.main
                  : theme.palette.divider
              }`,
            }}
          >
            {countries.map((country) => (
              <MenuItem key={country.code} value={country.code}>
                {country.name} ({country.dialCode})
              </MenuItem>
            ))}
          </TextField>
        </Grid2>

        {/* Campo para o número de telefone com máscara dinâmica */}
        <Grid2 size={6}>
          <TextField
            {...register(name)} // Registra o campo no formulário
            label={<FormattedMessage id={label || ""} />}
            variant="standard"
            fullWidth
            size="small"
            error={!!errors}
            helperText={
              errors?.message ? <FormattedMessage id={errors.message} /> : null
            }
            InputProps={{
              inputComponent: MaskedInput as any, // Usa o componente de máscara personalizado
              startAdornment: (
                <InputAdornment position="start">
                  {selectedCountry.dialCode}
                </InputAdornment>
              ),
              style: {
                backgroundColor: theme.palette.background.paper,
                border: "none",
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid2>
      </Grid2>
    );
  }
);

export default PhoneInputComponentSemControl;
