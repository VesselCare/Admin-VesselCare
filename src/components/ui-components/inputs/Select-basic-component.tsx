import { Grid2 } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Controller } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { memo } from "react";
import { useTheme } from "@mui/material/styles";
import Loader from "../Loader";

interface SelectBasicComponentProps {
  name: string;
  label: string;
  data: { label: string; value: string }[];
  errors: any;
  isLoading?: boolean;
  error?: string;
  InputLabelProps?: any;
  control?: any;
}

const SelectBasicComponent = memo(
  ({
    name,
    label,
    data,
    errors,
    isLoading,
    error,
    InputLabelProps,
    control,
  }: SelectBasicComponentProps) => {
    const theme = useTheme();

    return (
      <Grid2>
        <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <TextField
                select
                label={<FormattedMessage id={label} />}
                value={field.value || ""}
                onChange={(e) => {
                  field.onChange(e);
                }}
                fullWidth
                variant="standard"
                size="small"
                error={!!errors[name]}
                helperText={
                  errors[name]?.message ? (
                    <FormattedMessage id={errors[name]?.message as string} />
                  ) : null
                }
                slotProps={{
                  inputLabel: {
                    ...InputLabelProps,
                  },
                  input: {
                    style: {
                      fontSize: theme.typography.body1.fontSize,
                    },
                  },
                }}
              >
                <MenuItem value="" disabled>
                  <FormattedMessage id="select_a_value" />
                </MenuItem>
                {data &&
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
                {error && (
                  <MenuItem value="error">
                    <FormattedMessage id="error-loading" />
                  </MenuItem>
                )}
              </TextField>
            )}
          />
        </Grid2>
      </Grid2>
    );
  }
);

export default SelectBasicComponent;
