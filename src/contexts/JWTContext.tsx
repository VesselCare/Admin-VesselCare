// context/JWTContext.tsx
"use client";

import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  logout as logoutAction,
  setDataUser,
  setIsLoggedIn,
  setUser,
} from "@/store/slices/userSlice";
import { User, UserPermission } from "@/types";
import { fetchWithAuth } from "@/services/api";
export interface JWTContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  dataUser: UserPermission[];
}

const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  //Estado global do usuário
  const { user, dataUser, isLoggedIn } = useSelector(
    (state: RootState) => state.user
  );

  console.log("user", user);

  //Verifica se o usuário está logado ao montar o componente
  useEffect(() => {
    if (!user?.id) {
      logout();
      return;
    }

    // Função para buscar os dados do usuário e roles atualizados sempre que a página é carregada
    const fetchUserData = async () => {
      try {
        // Faz uma requisição para buscar os dados do usuário e roles
        const response = await fetchWithAuth(`/v1/users/context/${user?.id}`, {
          method: "GET",
        });

        dispatch(setUser(response.data.user)); // Define o estado do usuário com os dados retornados
        dispatch(setDataUser(response.data.role || [])); // Define o estado das permissões (roles)
        dispatch(setIsLoggedIn(true)); // Define o estado de logi
      } catch (error) {
        console.log("error", error);
        console.error("Erro ao buscar dados do usuário:", error);
        dispatch(logoutAction());
        router.push("/login");
      }
    };
    fetchUserData();
  }, []);

  // Função para fazer login
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Incluir cookies na requisição
      });

      if (response.ok) {
        const data = await response.json();

        console.log("data", data);

        dispatch(setDataUser(data.roleUser.role || [])); // Define o estado das permissões
        dispatch(setUser(data.roleUser.user)); // Define o estado do usuário
        dispatch(setIsLoggedIn(true)); // Define o estado de login

        // Redireciona após login
        setTimeout(() => {
          router.push("/dashboard");
        }, 5000);
      } else {
        // Lida com respostas que não sejam JSON
        let errorMessage = "Falha no login";
        try {
          const errorData = await response.json(); // Tenta interpretar como JSON
          errorMessage = errorData.message || errorMessage;
        } catch {
          // Se não for JSON, assume que é texto simples
          errorMessage = await response.text();
        }

        throw new Error(errorMessage);
      }
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      throw new Error(error.message || "Erro ao fazer login.");
    }
  };

  // Função para fazer logout
  const logout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        dispatch(logoutAction());
        router.push("/login"); // Redireciona após logout
      } else {
        console.error("Falha ao fazer logout");
      }
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <JWTContext.Provider value={{ isLoggedIn, user, dataUser, login, logout }}>
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;
