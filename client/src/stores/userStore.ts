// stores/userStore.ts
import { UserService } from "@/services/user/user.service";
import { PrivateProfile } from "@/types/user";
import { create } from "zustand";

interface UserState {
  user: PrivateProfile | null;
  setUser: (user: PrivateProfile) => void;
  clearUser: () => void;
  updateUser: (partialUser: Partial<PrivateProfile>) => void;
  setCover: (id: number, formData: FormData) => Promise<PrivateProfile | null>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null }),

  updateUser: (partialUser) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...partialUser } : null,
    })),

  setCover: async (id, formData) => {
    try {
      const updatedUser = await UserService.setProfileCover(id, formData);
      console.log("🚀 ~ updatedUser:", updatedUser);
      // set({ user: { user, ...updatedUser } });

      return updatedUser;
    } catch (error) {
      console.error("Failed to update cover:", error);
      return null;
    }
  },
}));
