import { create } from "zustand";
import { createWithEqualityFn } from "zustand/traditional";

// Define the shape of the state
interface AppState {
  isLoggedIn: boolean;
  username: string | null; // Allow null when logged out
  theme: "light" | "dark"; // Use literal types for specific values
}

// Define the shape of the actions
interface AppActions {
  login: (name: string) => void;
  logout: () => void;
  toggleTheme: () => void;
  // Example Async Action Type (if you were using it)
  // fetchUserData: (userId: string) => Promise<void>;
}

// Combine state and actions into a single store type
export type AppStore = AppState & AppActions;

// Create the store hook with TypeScript types
// Use the combined AppStore type as the generic argument for create
const useAppStore = createWithEqualityFn<AppStore>((set) => ({
  // --- Initial State (must match AppState) ---
  isLoggedIn: false,
  username: null,
  theme: "light",

  // --- Actions (must match AppActions) ---
  // The `set` function is typed based on AppStore
  login: (name) =>
    set((state) => {
      // `state` is implicitly typed AppStore here
      console.log("Updating state for login:", name);
      // Return type must be a partial of AppState
      return { isLoggedIn: true, username: name };
    }),

  logout: () =>
    set({
      // Provide an object that's a partial of AppState
      isLoggedIn: false,
      username: null,
    }),

  toggleTheme: () =>
    set((state) => ({
      // `state` is AppStore
      // Return type must be a partial of AppState
      theme: state.theme === "light" ? "dark" : "light",
    })),

  // Example of an async action implementation
  // fetchUserData: async (userId) => {
  //   // set({ loading: true }); // If you had loading state
  //   try {
  //     const response = await fetch(`/api/users/${userId}`);
  //     if (!response.ok) throw new Error('Network response was not ok');
  //     const userData = await response.json(); // Assume userData has a 'name' property
  //     // Make sure the set call matches AppState partials
  //     set({ username: userData.name, isLoggedIn: true /*, loading: false */ });
  //   } catch (error) {
  //     console.error("Failed to fetch user data", error);
  //     // set({ error: 'Failed fetch', loading: false }); // If you had error state
  //   }
  // }
}));

export default useAppStore;
