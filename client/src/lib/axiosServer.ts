import axios from "axios";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";

const axiosServer = axios.create({
  baseURL: process.env.API_URL,
});

axiosServer.interceptors.request.use(async (config) => {
  const token = await getToken({
    req: { cookies: cookies() },
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (token?.accessToken) {
    config.headers.Authorization = `Bearer ${token.accessToken}`;
  }
  return config;
});

export default axiosServer;
