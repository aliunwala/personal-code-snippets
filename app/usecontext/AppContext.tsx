"use client";
import { createContext } from "react";

// Define the shape of the user data
export interface User {
  name: string;
}

// Define the possible theme values
export type Theme = "light" | "dark";

// Define the shape of the context value
export interface AppContextType {
  theme: Theme;
  user: User | null; // User can potentially be null if not logged in
  toggleTheme: () => void;
  // We could add setUser here too if needed, e.g., setUser: (user: User | null) => void;
}

// Define the default value for the context.
// This value is used ONLY when a component tries to consume the context
// but cannot find a matching Provider higher up in the tree.
// It's crucial for the default value to match the AppContextType shape.
export const defaultContextValue: AppContextType = {
  theme: "light",
  user: { name: "Guest (Default)" }, // Default user
  toggleTheme: () => {
    console.warn(
      "Attempted to toggle theme outside of a valid AppContext Provider!"
    );
  },
  // setUser: (user) => { console.warn('Attempted to set user outside of a valid Provider'); },
};

// Create the context object with the defined type and default value
export const AppContext = createContext<AppContextType>(defaultContextValue);

// Optional: Custom Provider Component (Good practice for larger apps, not strictly needed here)
// interface AppProviderProps {
//   children: React.ReactNode;
// }
// export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
//   const [theme, setTheme] = useState<Theme>('light');
//   const [user, setUser] = useState<User | null>({ name: 'Alice' });
//   const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));
//   const contextValue = useMemo(() => ({ theme, user, toggleTheme, setUser }), [theme, user]);
//   return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
// };
