"use client";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { FormattedMessage } from "react-intl";
import { memo } from "react";
import { useTheme } from "@mui/material/styles";
import { FieldErrors, Path, FieldValues } from "react-hook-form";
import Loader from "../Loader";

interface SelectBasicComponentProps<T extends FieldValues> {
  name: Path<T>; // Suporta caminhos aninhados
  label: string;
  data: { label: string; value: string }[];
  isLoading?: boolean; // Indica carregamento de opções
  errors?: { message?: string };
  InputLabelProps?: any; // Props do label
  register: any; // Register do react-hook-form
}

const SelectBasicComponentSemControl = memo(
  <T extends FieldValues>({
    name,
    label,
    data = [],
    errors,
    isLoading,
    InputLabelProps,
    register,
  }: SelectBasicComponentProps<T>) => {
    const theme = useTheme();

    return (
      <Grid>
        <TextField
          {...register(name)} // Vincula o campo ao formulário
          select
          label={<FormattedMessage id={label} />}
          fullWidth
          variant="standard"
          size="small"
          error={!!errors?.message} // Indica erro
          helperText={
            errors ? <FormattedMessage id={errors.message as string} /> : null
          }
          InputLabelProps={{
            ...InputLabelProps,
          }}
          InputProps={{
            style: {
              fontSize: theme.typography.body1.fontSize,
            },
          }}
        >
          <MenuItem value="" disabled>
            <FormattedMessage id="select_a_value" />
          </MenuItem>
          {Array.isArray(data) &&
            data.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                <FormattedMessage id={item.label} />
              </MenuItem>
            ))}
          {isLoading && (
            <MenuItem value="loading">
              <Loader size={12} />
            </MenuItem>
          )}
          {errors && (
            <MenuItem value="error">
              <FormattedMessage id="error-loading" />
            </MenuItem>
          )}
        </TextField>
      </Grid>
    );
  }
);

export default SelectBasicComponentSemControl;
