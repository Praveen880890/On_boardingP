import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isGuest: false,

      login: (userData, token) => {
        set({
          user: userData,
          token: token,
          isAuthenticated: true,
          isGuest: false,
        });
      },

      register: (userData, token) => {
        set({
          user: userData,
          token: token,
          isAuthenticated: true,
          isGuest: false,
        });
      },

      loginAsGuest: () => {
        const guestUser = {
          id: `guest_${Date.now()}`,
          name: "Guest User",
          email: "guest@onboarding.local",
          role: "guest",
        };
        // Generate a dummy token for guest users to allow requests
        const guestToken = `guest_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`;
        set({
          user: guestUser,
          token: guestToken,
          isAuthenticated: true,
          isGuest: true,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isGuest: false,
        });
      },

      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },

      getUserId: () => {
        const { user } = get();
        return user?.id || null;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isGuest: state.isGuest,
      }),
    }
  )
);

export default useAuthStore;
