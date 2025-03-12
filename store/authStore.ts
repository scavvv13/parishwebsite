import { create } from "zustand";
import { getCurrentUser, signOut } from "aws-amplify/auth";

// Define the state type
interface AuthState {
  user: any | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
}

// Create the Zustand store with the defined state type
const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  fetchUser: async () => {
    try {
      const currentUser = await getCurrentUser();
      set({ user: currentUser, loading: false });
    } catch (error) {
      set({ user: null, loading: false });
    }
  },

  logout: async () => {
    await signOut();
    set({ user: null });
  },
}));

export default useAuthStore;
