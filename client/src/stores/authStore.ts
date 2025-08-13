// stores/authStore.ts
import { create } from "zustand";
import { BaseUser } from "@/types/user";

interface AuthRegisterState {
  // current step of the signup
  step: number;
  // role selected
  role: BaseUser["role"] | null; // 'admin' | 'user' | 'transporter' | 'sender'
  // aggregated form data across steps
  formData: Partial<BaseUser> & {
    vehicle?: BaseUser["vehicle"];
    role?: BaseUser["role"] | null;
  };
  // loading state for final submit
  isSubmitting: boolean;
  // error message
  error: string | null;
  // success flag
  success: boolean;
  // redirect to a specific step
  redirectStep?: number;

  // --- Actions ---
  setStep: (step: number) => void;
  nextStep: (stepData: object) => void;
  prevStep: () => void;
  setRole: (role: BaseUser["role"] | null) => void;
  setFormData: (data: object) => void;
  setError: (error: string | null) => void;
  setSubmitting: (loading: boolean) => void;
  setSuccess: (success: boolean) => void;
  setRedirectStep: (step?: number) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthRegisterState>((set, get) => ({
  step: 1,
  role: null,
  formData: {},
  isSubmitting: false,
  error: null,
  success: false,
  redirectStep: undefined,

  setStep: (step) => set({ step }),
  nextStep: (stepData) => {
    const currentData = get().formData;
    const role = get().role;
    set({
      formData: { ...currentData, role, ...stepData },
      step: get().step + 1,
    });
  },
  prevStep: () => {
    set((state) => ({
      step: state.step > 1 ? state.step - 1 : 1,
    }));
  },
  setRole: (role) => set({ role }),
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  setError: (error) => set({ error }),
  setSubmitting: (isSubmitting) => set({ isSubmitting }),
  setSuccess: (success) => set({ success }),
  setRedirectStep: (step) => set({ redirectStep: step }),
  reset: () =>
    set({
      step: 1,
      role: null,
      formData: {},
      isSubmitting: false,
      error: null,
      success: false,
      redirectStep: undefined,
    }),
}));
