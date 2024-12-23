import { AbilityBuilder, PureAbility, AbilityClass } from "@casl/ability";
import { UserPermission } from "@/types";
import { Locations } from "./locationTypes";

export type Actions = "action-view" | "action-edit" | string;

export type AppAbility = PureAbility<[Actions, Locations]>;
export const AppAbility = PureAbility as AbilityClass<AppAbility>;

export function defineAbilitiesFor(dataUser: UserPermission[]) {
  const { can, cannot, build } = new AbilityBuilder(AppAbility);

  if (dataUser) {
    dataUser.forEach((permission) => {
      // Certifique-se de que `role` e `location` sejam arrays para processar múltiplos valores
      const locations = Array.isArray(permission.location_id)
        ? permission.location_id
        : [permission.location_id];
      const actions = Array.isArray(permission.action_id)
        ? permission.action_id
        : [permission.action_id];
      //console.log(actions, locations);
      actions.forEach((action) => {
        locations.forEach((location) => {
          if (permission.is_enabled) {
            //console.log('Tem permissão', action, location);
            can(action, location); // Concede permissão para cada combinação de role e location
          } else {
            //console.log('Não tem permissão', action, location);
            cannot(action, location); // Nega permissão para cada combinação de role e location
          }
        });
      });
    });
  }

  return build();
}
