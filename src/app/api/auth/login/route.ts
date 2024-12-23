// app/api/login/route.ts

import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Função para autenticar usuários
export async function POST(req: NextRequest) {
  //console.log('Método da requisição:', req.method);

  const cookieStore = await cookies();

  try {
    const { email, password } = await req.json();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/login`,
      { email, password }
    );

    console.log("response", response);

    if (!response.data) {
      return NextResponse.json(
        { message: "Email ou senha inválidos" },
        { status: 401 }
      );
    }

    const { token, refreshToken, roleUser } = response.data;

    // Definir os cookies de autenticação
    cookieStore.set("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict", // para evitar ataques de Cross-Site Scripting (XSS)
      maxAge: 60 * 60, // 1 hora
    });

    // set refreshToken
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict", // para evitar ataques de Cross-Site Scripting (XSS)
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });

    // retornar os dados do usuário
    return NextResponse.json(
      { message: "Login bem-sucedido", roleUser: roleUser },
      { status: 200 }
    );
  } catch (error: any) {
    // Diferenciar erros de backend e erros inesperados
    // Verifica se o erro contém um status e mensagem em texto simples
    const statusCode = error.response?.status || 500;
    const message =
      typeof error.response?.data === "string"
        ? error.response.data // Retorna texto simples se disponível
        : error.response?.data?.message || "Erro interno do servidor";

    return NextResponse.json({ message }, { status: statusCode });
  }
}
