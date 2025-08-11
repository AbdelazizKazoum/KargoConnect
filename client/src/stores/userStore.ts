// stores/userStore.ts
import { PrivateProfile } from "@/types/user";
import { create } from "zustand";

interface UserState {
  user: PrivateProfile | null;
  setUser: (user: PrivateProfile) => void;
  clearUser: () => void;
  updateUser: (partialUser: Partial<PrivateProfile>) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  updateUser: (partialUser) =>
    set((state) => ({
      user: { ...state.user, ...partialUser } as PrivateProfile,
    })),
}));
