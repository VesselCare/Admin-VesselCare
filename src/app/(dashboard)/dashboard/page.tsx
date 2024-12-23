"use client";

import { FormattedMessage } from "react-intl";
import { RootState, useSelector } from "@/store";
import { useAbility } from "@/contexts/AbilityContext";

export default function DashboardPage() {
  const { isLoggedIn, user, dataUser } = useSelector(
    (state: RootState) => state.user
  );

  const ability = useAbility();
  const hasPermission = ability.can("admin-master", "location-settings");

  //console.log(hasPermission)

  return (
    <div className="p-4">
      <h1>
        <FormattedMessage id="dashboard" />
      </h1>
      <div className="mt-4">
        <div>{isLoggedIn ? "Logado" : "Não logado"}</div>
        <div>
          Nome: {user?.first_name} {user?.last_name}
        </div>
        <div>Usuário: {user?.username}</div>
        <div>Email: {user?.email}</div>
        <div>ID: {user?.id}</div>
        <div>Data: {JSON.stringify(dataUser)}</div>
      </div>
      <div>{hasPermission ? "Permissão concedida" : "Permissão negada"}</div>
    </div>
  );
}
