// utils/auth-cookies.ts
import { IncomingMessage, ServerResponse } from "http";
import { NextPageContext } from "next";

// Função para parsear cookies do cabeçalho
export const parseCookies = (req?: IncomingMessage): Record<string, string> => {
  if (!req || !req.headers.cookie) {
    return {};
  }
  return req.headers.cookie
    .split(";")
    .reduce((acc: Record<string, string>, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key || ""] = decodeURIComponent(value || "");
      return acc;
    }, {});
};

// Obter Access Token
export const parseClientCookies = (): Record<string, string> => {
  return document.cookie
    .split(";")
    .reduce((acc: Record<string, string>, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key || ""] = decodeURIComponent(value || "");
      return acc;
    }, {});
};

// Definir Access Token
export const setAccessToken = (accessToken: string, res?: ServerResponse) => {
  if (res) {
    res.setHeader(
      "Set-Cookie",
      `accessToken=${encodeURIComponent(
        accessToken
      )}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${3600 * 24 * 30}`
    );
  }
};

// Obter Refresh Token
export const getRefreshToken = (ctx?: NextPageContext): string | null => {
  if (ctx && ctx.req) {
    const cookies = parseCookies(ctx.req);
    return cookies["refreshToken"] || null;
  } else if (typeof window !== "undefined") {
    const match = document.cookie.match(
      new RegExp(`(^| )refreshToken=([^;]+)`)
    );
    return match ? decodeURIComponent(match[2] || "") : null;
  }
  return null;
};

// Definir Refresh Token
export const setRefreshToken = (refreshToken: string, res?: ServerResponse) => {
  if (res) {
    res.setHeader(
      "Set-Cookie",
      `refreshToken=${encodeURIComponent(
        refreshToken
      )}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${3600 * 24 * 30}`
    );
  }
};

// Limpar Access Token e Refresh Token
export const clearAccessToken = (res?: any) => {
  if (res) {
    res.setHeader("Set-Cookie", [
      `accessToken=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`,
      `refreshToken=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`,
    ]);
  }
};

//  chamar o endpoint de refresh quando o access token estiver expirado
export const refreshAccessToken = async () => {
  try {
    const response = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      // Opcional: Atualize o estado do usuário se necessário
      return true;
    } else {
      // Refresh token inválido ou expirado
      return false;
    }
  } catch (error) {
    console.error("Erro ao renovar access token:", error);
    return false;
  }
};
