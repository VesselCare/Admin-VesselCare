// data/mockPermissions.ts

//import { PermissionsData } from '../type';

export const mockPermissions = {
  roles: [
    { id: "role1", name: "Admin-Super-internamente-logado" },
    // Outros roles...
  ],

  modules: [
    {
      id: "module1",
      name: "Gestão de Usuários",
      actions: [
        { id: "action1", name: "Criar" },
        { id: "action2", name: "Editar" },
        { id: "action3", name: "Excluir" },
      ],
    },
    {
      id: "module2",
      name: "Relatórios",
      actions: [
        { id: "action4", name: "Visualizar" },
        { id: "action5", name: "Gerar" },
      ],
    },
    // Outros módulos...
  ],

  permissions: [
    // Permissões por role, module e action
    {
      roleId: "role1",
      moduleId: "module1",
      actionId: "action1",
      isEnabled: true,
    },
    {
      roleId: "role1",
      moduleId: "module1",
      actionId: "action2",
      isEnabled: true,
    },
    {
      roleId: "role1",
      moduleId: "module1",
      actionId: "action3",
      isEnabled: true,
    },
    // Outras permissões...
  ],
};
