// components/CustomCheckboxGroup.tsx
import React, { useState, useEffect } from "react";
import {
  Grid,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import { Control, Controller } from "react-hook-form";

type RouteGroup = {
  role: string;
  module: string;
  subject: string;
  permission: string[];
};

type CustomCheckboxGroupProps = {
  control: Control<any>;
  errors: any;
  label: string;
  name: string;
  groups: RouteGroup[];
  friendlyNames: { [key: string]: string };
  columns?: number;
};

const CustomCheckboxGroupNew: React.FC<CustomCheckboxGroupProps> = ({
  control,
  errors,
  label,
  name,
  groups,
  friendlyNames,
  columns = 3,
}) => {
  const [selectAll, setSelectAll] = useState(false);

  // Função para selecionar ou desmarcar todos os checkboxes
  const handleSelectAll = (field: any) => {
    const newValue = selectAll ? [] : groups.flatMap((group) => group.subject);
    field.onChange(newValue);
    setSelectAll(!selectAll);
  };

  // Função para verificar se todos os checkboxes estão selecionados
  const isAllSelected = (selected: string[]) => {
    const allOptions = groups.flatMap((group) => group.subject);
    return allOptions.every((subject) => selected.includes(subject));
  };

  useEffect(() => {
    // Atualiza o estado "Selecionar Tudo" quando as seleções mudam
    if (control?._defaultValues?.[name]) {
      setSelectAll(isAllSelected(control._defaultValues[name]));
    }
  }, [control._defaultValues, name, groups]);

  return (
    <FormControl component="fieldset" error={!!errors[name]}>
      <FormLabel
        component="legend"
        sx={{ mb: 2, fontSize: 16, fontWeight: "bold" }}
      >
        {label}
      </FormLabel>
      <FormGroup>
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            const selected = field.value || [];

            return (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isAllSelected(selected)}
                      onChange={() => handleSelectAll(field)}
                    />
                  }
                  label="Selecionar Tudo"
                />
                {groups.map((group) => (
                  <div key={group.module}>
                    <Typography variant="subtitle1" sx={{ mt: 2 }}>
                      {group.module}
                    </Typography>
                    <Grid container spacing={1}>
                      {group.permission.map((permission: string) => (
                        <Grid item xs={12 / columns} key={permission}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selected.includes(permission)}
                                onChange={(e) => {
                                  const newValue = e.target.checked
                                    ? [...selected, permission]
                                    : selected.filter(
                                        (value: string) => value !== permission
                                      );
                                  field.onChange(newValue);
                                }}
                              />
                            }
                            label={friendlyNames[permission]}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                ))}
              </>
            );
          }}
        />
      </FormGroup>
    </FormControl>
  );
};

export default CustomCheckboxGroupNew;
