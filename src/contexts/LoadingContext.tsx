// context/LoadingContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Definindo a interface para o contexto
interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

// Criando o contexto com valores padrão
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Props para o provider
interface LoadingProviderProps {
  children: ReactNode;
}

// Provider do contexto
export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading deve ser usado dentro de um LoadingProvider");
  }
  return context;
};
