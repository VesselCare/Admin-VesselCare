// components/PhoneInputComponent.tsx
import React, { useState, useEffect, memo } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField, MenuItem, InputAdornment } from "@mui/material";
import { Grid2 } from "@mui/material";
import InputMask from "react-input-mask";
import { countries, Country } from "@/utils/maskaras-input/countries";
import { useTheme } from "@mui/material/styles";
import { FormattedMessage } from "react-intl";

interface PhoneInputComponentProps {
  name: string | undefined;
  label: string;
}

const PhoneInputComponent: React.FC<PhoneInputComponentProps> = memo(
  ({ name, label }) => {
    const {
      control,
      formState: { errors },
    } = useFormContext();
    const theme = useTheme();
    const [selectedCountry, setSelectedCountry] = useState<Country>(
      countries[0] as Country
    );

    // Atualiza a máscara quando o país selecionado muda
    const [mask, setMask] = useState<string>(selectedCountry.mask);

    useEffect(() => {
      setMask(selectedCountry.mask);
    }, [selectedCountry]);

    return (
      <Controller
        name={name as string}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Grid2 container spacing={2}>
            <Grid2 size={3}>
              <TextField
                select
                label="País"
                value={selectedCountry.code}
                onChange={(e) => {
                  const country = countries.find(
                    (c) => c.code === e.target.value
                  );
                  if (country) {
                    setSelectedCountry(country);
                    // Atualiza o valor do campo com o código do país
                    field.onChange(country.dialCode + " ");
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
                    errors[name as string]
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
            <Grid2 size={9}>
              <InputMask
                mask={mask}
                value={field.value.replace(selectedCountry.dialCode, "").trim()}
                onChange={(e: any) =>
                  field.onChange(
                    selectedCountry.dialCode + " " + e.target.value
                  )
                }
              >
                {(inputProps: any) => (
                  <TextField
                    {...inputProps}
                    label={<FormattedMessage id={label} />}
                    variant="standard"
                    fullWidth
                    size="small"
                    error={!!errors[name as string]}
                    helperText={
                      errors[name as string]?.message ? (
                        <FormattedMessage
                          id={errors[name as string]?.message as string}
                        />
                      ) : null
                    }
                    InputProps={{
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
                )}
              </InputMask>
            </Grid2>
          </Grid2>
        )}
      />
    );
  }
);

export default PhoneInputComponent;
