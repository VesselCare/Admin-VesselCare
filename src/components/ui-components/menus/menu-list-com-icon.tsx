"use client";

import { SyntheticEvent } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";

interface MenuListComIconProps {
  listMenu: {
    id: number;
    label: string;
    icon: React.ReactElement;
    content: React.ReactNode; // Conteúdo associado ao menu
  }[];
  currentTab: number;
  handleTabChange: (newTab: number) => void;
}

// Tabs panel
function TabPanel({
  children,
  value,
  index,
}: {
  children: React.ReactNode;
  value: number;
  index: number;
}) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

const MenuListComIcon = ({
  listMenu,
  currentTab,
  handleTabChange,
}: MenuListComIconProps) => {
  const theme = useTheme();

  // A mudança de aba agora é completamente controlada pelo pai
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    handleTabChange(newValue); // Notifica o pai para decidir se a aba pode mudar
  };

  return (
    <>
      <Grid container spacing={2}>
        {/* Menu com ícones e texto */}
        <Grid size={{ xs: 12 }}>
          <Tabs
            value={currentTab} // Controlado pelo pai
            onChange={handleChange}
            variant="scrollable"
            indicatorColor="primary"
            textColor="primary"
            sx={{
              mb: 3,
              "& .MuiTabs-flexContainer": {
                gap: 2, // Espaçamento entre os itens
              },
              "& .MuiTab-root": {
                flexDirection: "row", // Ícone e texto lado a lado
                alignItems: "center",
                textTransform: "none", // Mantém o texto como está
                gap: 1, // Espaço entre ícone e texto
                minHeight: theme.spacing(5), // Utilizando espaçamento do tema
              },
              "& .MuiTabs-indicator": {
                height: "3px", // Espessura da linha indicadora
                bottom: 2,
                backgroundColor: theme.palette.primary.main, // Cor conforme tema
              },
              "& a > svg": {
                mb: "0px !important",
                mr: 1.25,
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.grey[300]
                    : theme.palette.grey[700], // Ajusta cor do ícone conforme tema
              },
              "& .MuiTab-wrapper": {
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.grey[300]
                    : theme.palette.grey[800], // Ajusta cor do texto conforme tema
              },
            }}
          >
            {listMenu.map((tab) => (
              <Tab
                key={tab.id}
                icon={tab.icon}
                label={<Typography variant="body2">{tab.label}</Typography>} // Ícone e texto
              />
            ))}
          </Tabs>
        </Grid>

        {/* Conteúdo associado ao menu */}
        <Grid size={{ xs: 12 }}>
          {listMenu.map((item, index) => (
            <TabPanel key={item.id} value={currentTab} index={index}>
              {item.content}
            </TabPanel>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default MenuListComIcon;
