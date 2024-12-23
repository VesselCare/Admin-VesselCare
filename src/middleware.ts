// app/middleware.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Defina as rotas protegidas e públicas
const protectedRoutes = ["/dashboard", "/client/list", "/admin/", "/settings"]; // Adicione outras rotas protegidas conforme necessário
const publicRoutes = ["/login", "/signup", "/"]; // Adicione outras rotas públicas conforme necessário

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  //console.log('request', request);

  //console.log('pathname', pathname);
  //console.log('protectedRoutes', protectedRoutes);

  // Ignorar rotas da API e assets
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Obter os cookies
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");
  //console.log('accessToken', accessToken );

  // Verificar se o usuário está autenticado
  const isAuthenticated = !!accessToken;

  // Lógica para rotas protegidas
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      // Usuário não autenticado, redirecionar para login
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    // Usuário autenticado, permitir acesso
    return NextResponse.next();
  }

  // Lógica para rotas públicas (como login)
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    if (isAuthenticated) {
      // Usuário já autenticado, redirecionar para uma página protegida
      url.pathname = "/dashboard"; // Altere para a rota protegida que desejar
      return NextResponse.redirect(url);
    }
    // Usuário não autenticado, permitir acesso
    return NextResponse.next();
  }

  // Para outras rotas, permitir acesso
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Rotas que o middleware vai executar
    "/dashboard/:path*",
    "/client/:path*",
    "/admin/:path*",
    "/settings/:path*",
    "/login",
    "/signup",
    "/",
  ],
};
