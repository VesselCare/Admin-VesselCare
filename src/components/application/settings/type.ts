export interface Action {
  id: string;
  name: string;
  is_enabled: boolean;
}

export interface Location {
  id: string;
  name: string;
  actions: Action[];
}

export interface ModuleInterface {
  id: string;
  module: string;
  locations: Location[];
}

export interface PermissionsInterface {
  [role: string]: ModuleInterface[];
}

export interface UpdatedPermission {
  role_id: string;
  module_id: string;
  location_id: string;
  action_id: string;
  is_enabled: boolean;
}
