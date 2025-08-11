// services/userService.ts
import { PrivateProfile } from "@/types/user";
import axios from "axios";

const API_BASE_URL = "https://your-api-url.com/api"; // replace with your real backend API

export const UserService = {
  async fetchUserProfile(): Promise<PrivateProfile> {
    const response = await axios.get<PrivateProfile>(
      `${API_BASE_URL}/user/profile`
    );
    return response.data;
  },

  async updateUserProfile(
    data: Partial<PrivateProfile>
  ): Promise<PrivateProfile> {
    const response = await axios.put<PrivateProfile>(
      `${API_BASE_URL}/user/profile`,
      data
    );
    return response.data;
  },

  // You can add more user-related API calls here, e.g. login, logout, etc.
};
