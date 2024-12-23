// pages/api/auth/logout.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  try {
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    return NextResponse.json(
      { message: "Logout bem-sucedido" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
