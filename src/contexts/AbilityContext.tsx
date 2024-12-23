"use client";

// AbilityContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react"; // Importa sua função para definir habilidades
import { PureAbility } from "@casl/ability";
import { defineAbilitiesFor } from "@/permissions/defineAbilities";
import { RootState, useSelector } from "@/store";

// Or define the AbilityTuple if it's a custom type
type AbilityTuple = [string, string]; // Example definition, adjust as needed\
type MongoQuery = any;

// Define the correct type for AppAbility
type AppAbility = PureAbility<AbilityTuple, MongoQuery>;

// Cria o contexto de habilidades
const AbilityContext = createContext<AppAbility | undefined>(undefined);

// Componente de provedor que define o AbilityContext
export function AbilityProvider({ children }: { children: React.ReactNode }) {
  // Estado global do usuário
  const { dataUser } = useSelector((state: RootState) => state.user);

  // Define o ability com base nas permissões do usuário
  const [ability, setAbility] = useState(() => defineAbilitiesFor(dataUser));

  //console.log(dataUser)

  // Atualiza o ability quando as permissões do usuário mudam
  useEffect(() => {
    setAbility(defineAbilitiesFor(dataUser));
  }, [dataUser]);

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
}

// Hook para acessar o contexto de habilidade
export function useAbility() {
  const ability = useContext(AbilityContext);
  if (!ability)
    throw new Error("useAbility must be used within an AbilityProvider");
  return ability;
}
