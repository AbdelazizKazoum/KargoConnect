import axiosClient from "@/lib/axiosClient";
import { BaseUser } from "@/types/user";

export const login = (data: { email: string; password: string }) => {
  return axiosClient.post("/auth/login", data);
};

export const register = (data: BaseUser) => {
  return axiosClient.post("/auth/register", data);
};
