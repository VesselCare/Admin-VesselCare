// services/authApi.ts
import axios, { AxiosInstance } from "axios";

const authApi: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Mesma baseURL ou específica para autenticação
  withCredentials: true,
});

export default authApi;
