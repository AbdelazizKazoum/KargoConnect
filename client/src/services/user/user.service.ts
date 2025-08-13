// services/userService.ts
import axiosClient from "@/lib/axiosClient";
import { PrivateProfile } from "@/types/user";

export const UserService = {
  async fetchUserProfile(): Promise<PrivateProfile> {
    const response = await axiosClient.get<PrivateProfile>(`/auth/profile`);
    return response.data;
  },

  async updateUserProfile(
    data: Partial<PrivateProfile>
  ): Promise<PrivateProfile> {
    const response = await axiosClient.put<PrivateProfile>(
      `/user/profile`,
      data
    );
    return response.data;
  },

  async setProfileCover(
    id: number,
    formData: FormData
  ): Promise<PrivateProfile> {
    const response = await axiosClient.put<PrivateProfile>(
      `/users/${id}/cover-picture`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  // You can add more user-related API calls here, e.g. login, logout, etc.
};
