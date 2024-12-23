import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  FormControlLabel,
  Switch,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import usePermissions from "../../hooks/usePermissions";
import {
  ModuleInterface,
  PermissionsInterface,
  UpdatedPermission,
} from "../../type";
import SidebarModulos from "./sidebarModulos";
import ButtonBasicComponent from "@/components/ui-components/button/animation-button";
import { FormattedMessage } from "react-intl";
import { useAbility } from "@/contexts/AbilityContext";
import LoaderCircular from "@/components/ui-components/LoaderCircular";
const PermissionsTable: React.FC = () => {
  const { data, isLoading, savePermissions } = usePermissions();
  const [permissionsData, setPermissionsData] =
    useState<PermissionsInterface | null>(null);
  const [selectedModule, setSelectedModule] = useState<ModuleInterface | null>(
    null
  );
  const [updatedPermissions, setUpdatedPermissions] = useState<
    UpdatedPermission[]
  >([]);
  const [uniqueModules, setUniqueModules] = useState<ModuleInterface[]>([]);
  const ability = useAbility();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (data && !isLoading) {
      setPermissionsData(data);

      // Extrair módulos únicos de todas as roles
      const allModules = Object.values(data).flat();
      const uniqueModulesMap = new Map<string, ModuleInterface>();
      allModules.forEach((module) => {
        if (!uniqueModulesMap.has(module.id)) {
          uniqueModulesMap.set(module.id, module);
        }
      });
      const uniqueModules = Array.from(uniqueModulesMap.values());
      setUniqueModules(uniqueModules);
      // Selecionar o primeiro módulo como padrão, se disponível
      setSelectedModule(uniqueModules.length > 0 ? uniqueModules[0]! : null);
    }
  }, [data, isLoading]);

  // Extrair roles a partir das chaves de permissionsData
  const roles = permissionsData ? Object.keys(permissionsData) : [];

  const handleModuleSelect = (module: ModuleInterface) => {
    setSelectedModule(module);
  };

  const getPermissionStatus = (
    roleId: string,
    moduleId: string,
    locationId: string,
    actionId: string
  ): boolean => {
    const updatedPermission = updatedPermissions.find(
      (p) =>
        p.role_id === roleId &&
        p.module_id === moduleId &&
        p.location_id === locationId &&
        p.action_id === actionId
    );

    if (updatedPermission !== undefined) {
      return updatedPermission.is_enabled;
    }

    // Busca a permissão inicial a partir de permissionsData
    const roleModules = permissionsData?.[roleId] || [];
    const module = roleModules.find((m) => m.id === moduleId);
    if (!module) return false;

    const location = module.locations.find((l) => l.id === locationId);
    if (!location) return false;

    const action = location.actions.find((a) => a.id === actionId);
    return action ? action.is_enabled : false;
  };

  // Função para obter o status da permissão
  const handleTogglePermission = (
    roleId: string,
    moduleId: string,
    locationId: string,
    actionId: string
  ) => {
    if (!roleId || !moduleId || !locationId || !actionId) return;

    setUpdatedPermissions((prevPermissions) => {
      const permissionIndex = prevPermissions.findIndex(
        (perm) =>
          perm.role_id === roleId &&
          perm.module_id === moduleId &&
          perm.location_id === locationId &&
          perm.action_id === actionId
      );

      if (permissionIndex !== -1) {
        // Atualiza a permissão existente
        const updatedPermissions = [...prevPermissions];
        updatedPermissions[permissionIndex] = {
          ...updatedPermissions[permissionIndex]!,
          is_enabled: !updatedPermissions[permissionIndex]!.is_enabled,
        };
        return updatedPermissions;
      } else {
        // Adiciona uma nova permissão
        const newPermission: UpdatedPermission = {
          role_id: roleId,
          module_id: moduleId,
          location_id: locationId,
          action_id: actionId,
          is_enabled: true,
        };
        return [...prevPermissions, newPermission];
      }
    });
  };

  // Função para salvar as permissões atualizadas
  const handleSavePermissions = () => {
    try {
      savePermissions(updatedPermissions);
    } catch (error) {
      console.error("Erro ao salvar permissões:", error);
    }
  };

  return isLoading || !selectedModule ? (
    <LoaderCircular />
  ) : (
    <Box display="flex" flexDirection={isSmallScreen ? "column" : "row"}>
      <SidebarModulos
        modules={uniqueModules}
        selectedModule={selectedModule}
        handleModuleSelect={handleModuleSelect}
        isSmallScreen={isSmallScreen}
        roles={roles}
      />

      {/* Adiciona um Divider vertical */}
      {!isSmallScreen && (
        <Divider orientation="vertical" flexItem sx={{ marginLeft: 1 }} />
      )}

      <Paper
        sx={{
          flex: 1,
          p: 3,
          mt: 1,
          overflowX: "auto",
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
        }}
      >
        <>
          <Typography variant="h6" mb={2} color="primary">
            <FormattedMessage id="permissions-general" /> -{" "}
            <FormattedMessage id={selectedModule.module} />
          </Typography>
          <Divider />
          <Box mb={3}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "8px 12px",
                      borderBottom: "2px solid #e0e0e0",
                    }}
                  >
                    <FormattedMessage id="actions" />
                  </th>
                  {roles.map((role) => (
                    <th
                      key={role}
                      style={{
                        textAlign: "center",
                        padding: "8px",
                        color: theme.palette.text.secondary,
                        fontSize: "0.875rem",
                      }}
                    >
                      <FormattedMessage id={role} />
                      {!isSmallScreen && (
                        <Divider
                          orientation="vertical"
                          flexItem
                          sx={{ marginLeft: 1 }}
                        />
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              {selectedModule.locations.map((location) => (
                <>
                  <tbody>
                    {location.actions.map((action) => (
                      <tr key={action.id}>
                        <td
                          style={{
                            padding: "12px 12px",
                            textAlign: "left",
                            width: "30%",
                            fontWeight: "500",
                            color: theme.palette.text.primary,
                          }}
                        >
                          {<FormattedMessage id={action.name} />}
                        </td>
                        {roles.map((role) => (
                          <>
                            <td
                              key={role}
                              style={{
                                textAlign: "center",
                                padding: "4px",
                                verticalAlign: "middle",
                              }}
                            >
                              <FormControlLabel
                                disabled={
                                  !ability.can(
                                    "action-edit",
                                    "item-permissions"
                                  )
                                }
                                control={
                                  <Switch
                                    color="success"
                                    checked={getPermissionStatus(
                                      role,
                                      selectedModule.id,
                                      location.id,
                                      action.id
                                    )}
                                    onChange={() =>
                                      handleTogglePermission(
                                        role,
                                        selectedModule.id,
                                        location.id,
                                        action.id
                                      )
                                    }
                                    sx={{
                                      "& .MuiSwitch-switchBase": {
                                        color: theme.palette.grey[500],
                                      },
                                      "& .Mui-checked": {
                                        color: theme.palette.success.main,
                                      },
                                      "& .Mui-checked + .MuiSwitch-track": {
                                        backgroundColor:
                                          theme.palette.success.light,
                                      },
                                      "& .Mui-disabled + .MuiSwitch-track": {
                                        backgroundColor:
                                          theme.palette.grey[300],
                                      },
                                    }}
                                  />
                                }
                                label=""
                              />
                            </td>
                          </>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </>
              ))}
            </table>
          </Box>

          <Divider />
          <Box mt={3} display="flex" justifyContent="flex-end">
            <ButtonBasicComponent
              title="Salvar"
              onClick={handleSavePermissions}
              position="right"
            />
          </Box>
        </>
      </Paper>
    </Box>
  );
};

export default PermissionsTable;
