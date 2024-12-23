import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Função para autenticar e atualizar dados de usuários
export async function GET(req: NextRequest) {
  try {
    const { id } = await req.json();
    //console.log('id', id);
    // Recupera o token enviado pelo cliente ou cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Token não encontrado" },
        { status: 401 }
      );
    }

    // Faz a requisição para o backend com o token no cabeçalho
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/update/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.data) {
      return NextResponse.json(
        { message: "Erro ao atualizar os dados" },
        { status: 401 }
      );
    }

    const { user, role } = response.data;

    // Retorna os dados do usuário atualizados
    return NextResponse.json(
      { message: "Dados atualizados com sucesso", user, role },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao processar a requisição:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
