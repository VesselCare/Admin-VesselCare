// app/api/auth/refresh/route.ts

import { NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";
import { cookies } from "next/headers";

// Configurações de Ambiente
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL!; // URL do seu backend
const REFRESH_ENDPOINT = process.env.REFRESH_TOKEN_ENDPOINT!; // Endpoint de renovação no backend

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { message: "Refresh token não fornecido." },
      { status: 401 }
    );
  }

  try {
    // Fazer uma requisição para o backend para renovar os tokens
    const response: AxiosResponse = await axios.post(
      `${API_BASE_URL}${REFRESH_ENDPOINT}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Envia cookies automaticamente
      }
    );

    if (response.status === 200) {
      const { accessToken, refreshToken: newRefreshToken } = response.data;

      // Atualizar os cookies com os novos tokens
      cookieStore.set("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "strict",
        maxAge: 60 * 60, // 1 hora
      });

      cookieStore.set("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 dias
      });

      return NextResponse.json(
        { message: "Tokens renovados com sucesso." },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Falha ao renovar tokens." },
        { status: response.status }
      );
    }
  } catch (error: any) {
    console.error("Erro ao renovar tokens:", error);
    return NextResponse.json(
      { message: "Erro ao renovar tokens." },
      { status: 500 }
    );
  }
}
