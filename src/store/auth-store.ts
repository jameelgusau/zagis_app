import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/lib/types";

interface AuthState {
  accessToken: string | null;
  user: User | null;
  hydrated: boolean;

  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  setHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      hydrated: false,

      setAuth: (user, token) =>
        set({ user, accessToken: token }),

      clearAuth: () =>
        set({ user: null, accessToken: null }),

      setHydrated: (value) =>
        set({ hydrated: value }),
    }),
    {
      name: "auth-storage",

      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),

      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);