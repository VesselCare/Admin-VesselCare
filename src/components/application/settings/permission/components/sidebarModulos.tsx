// SidebarModulos.tsx
import React from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { ModuleInterface } from "../../type";
import { FormattedMessage } from "react-intl";

interface SidebarModulosProps {
  modules: ModuleInterface[];
  selectedModule: ModuleInterface | null;
  handleModuleSelect: (module: ModuleInterface) => void;
  isSmallScreen: boolean;
  roles: string[];
}

const SidebarModulos: React.FC<SidebarModulosProps> = ({
  modules,
  selectedModule,
  handleModuleSelect,
  isSmallScreen,
}) => {
  return (
    <List
      component="nav"
      sx={{ width: isSmallScreen ? "100%" : 220, bgcolor: "background.paper" }}
    >
      {modules.map((module) => (
        <ListItem key={module.id} disablePadding>
          <ListItemButton
            selected={selectedModule?.id === module.id}
            onClick={() => handleModuleSelect(module)}
          >
            <ListItemText primary={<FormattedMessage id={module.module} />} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default SidebarModulos;
