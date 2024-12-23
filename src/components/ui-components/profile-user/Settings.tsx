"use client";
import { useState } from "react";

import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid2";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import SubCard from "../cards/SubCard";

// project imports

// ==============================|| PROFILE 1 - SETTINGS ||============================== //

// Dados de exemplo recebidos como propriedade
const sampleData = [
  {
    id: "ead0f6ea-2896-492c-b116-5d4707026f4b",
    module: "Menus",
    sub_module: "Dashboard",
    entity: "to_delete",
    acao: "deletar",
    name: "to_delete",
    description: "Acess id menu company",
  },
  {
    id: "ead0f6ea-2896-492c-b116-5d4707026f4b",
    module: "Menus",
    sub_module: "Defaulter",
    entity: "to_delete",
    acao: "deletar",
    name: "to_delete",
    description: "Acess id menu company",
  },
];

// Função para agrupar os dados por módulo
const groupDataByModule = (data: any) => {
  return data.reduce((result: any, item: any) => {
    (result[item.module] = result[item.module] || []).push(item);
    return result;
  }, {});
};

const Settings = () => {
  const groupedData = groupDataByModule(sampleData);

  // Estado para controlar o estado de cada Switch, organizando por ID
  const [switchState, setSwitchState] = useState<{ [key: string]: boolean }>(
    {}
  );

  // Função para lidar com mudanças de estado no Switch
  const handleSwitchChange = (id: any) => (event: any) => {
    setSwitchState((prevState: any) => ({
      ...prevState,
      [id]: event.target.checked,
    }));
  };

  return (
    <SubCard title="Configurações por Módulo">
      {Object.entries(groupedData).map(([module, items]) => (
        <Paper key={module} elevation={2} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            {module}
          </Typography>
          {Array.isArray(items) &&
            items.map((item: any) => (
              <Grid key={item.id} container alignItems="center">
                <Grid size={2}>
                  <Typography variant="body2">{item.sub_module}</Typography>
                </Grid>
                <Grid size={4}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={!!switchState?.[item.id]}
                        onChange={handleSwitchChange(item.id) as any}
                        color="primary"
                      />
                    }
                    label=""
                  />
                </Grid>
              </Grid>
            ))}
        </Paper>
      ))}
    </SubCard>
  );
};

export default Settings;
