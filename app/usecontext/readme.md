# Integrating `useContext` in React Projects

The `useContext` Hook provides a type-safe way to pass data through the component tree in React without manually passing props down at every level (prop drilling). It's ideal for sharing "global" data like the current authenticated user, theme settings, or locale preferences within a specific part of your React application.

Here's a step-by-step guide to integrating `useContext` into your React TypeScript project:

## Steps

### 1. Define Types and Create the Context:

First, define the shape of your context data using a TypeScript `interface` or `type`. Then, create the Context object using `React.createContext`, providing a default value that matches your defined type. This default is crucial for type safety and used when a component consumes the context without a Provider ancestor.

```typescript
// src/context/MyAppContext.ts
import { createContext } from "react";

// 1. Define the shape of your context data
export interface MyAppContextType {
  userId: string | null;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

// 2. Define a type-safe default value
export const defaultContextValue: MyAppContextType = {
  userId: null,
  theme: "light",
  setTheme: (theme) => {
    console.warn(
      "setTheme function called outside of a MyAppContext.Provider!"
    );
  },
};

// 3. Create the context with the type and default value
export const MyAppContext =
  createContext<MyAppContextType>(defaultContextValue);
```

### 2. Create a Provider Component:

This component will manage the actual state and logic you want to share. It uses the MyAppContext.Provider component to wrap its children and passes the shared state and functions via the value prop, ensuring the passed value matches MyAppContextType.

```typescript
// src/providers/MyAppContextProvider.tsx
import React, { useState, useMemo, ReactNode } from "react";
import {
  MyAppContext,
  MyAppContextType,
  defaultContextValue,
} from "../context/MyAppContext";

interface MyAppContextProviderProps {
  children: ReactNode; // Type for children prop
}

export const MyAppContextProvider: React.FC<MyAppContextProviderProps> = ({
  children,
}) => {
  // State matching the context type
  const [theme, setTheme] = useState<MyAppContextType["theme"]>(
    defaultContextValue.theme
  );
  const [userId, setUserId] = useState<MyAppContextType["userId"]>(
    defaultContextValue.userId
  ); // Example state

  // Memoize the context value to optimize performance
  // Ensures the object reference only changes when `theme` or `userId` changes
  const contextValue = useMemo<MyAppContextType>(
    () => ({
      userId, // Add userId if managed here
      theme,
      setTheme,
    }),
    [theme, userId]
  );

  return (
    <MyAppContext.Provider value={contextValue}>
      {children}
    </MyAppContext.Provider>
  );
};
```

### 3. Wrap Your Application (or Relevant Part):

Wrap the part of your component tree that needs access to the context data with your Provider component. This is often done near the root of your application (e.g., in App.tsx or index.tsx).

```typescript
// src/App.tsx
import React from "react";
import { MyAppContextProvider } from "./providers/MyAppContextProvider";
import ThemedComponent from "./components/ThemedComponent";
// ... other imports

function App() {
  return (
    <MyAppContextProvider>
      {/* All components nested inside can now access MyAppContext */}
      <div className="App">
        <h1>My App</h1>
        <ThemedComponent />
        {/* ... other components */}
      </div>
    </MyAppContextProvider>
  );
}

export default App;
```

### 4. Consume the Context in Components:

In any functional component nested within the MyAppContextProvider, use the useContext hook, passing it the MyAppContext object you created. TypeScript will automatically infer the correct type for the returned value.

```typescript
// src/components/ThemedComponent.tsx
import React, { useContext } from "react";
import { MyAppContext } from "../context/MyAppContext";

const ThemedComponent: React.FC = () => {
  // Access the context value - `theme` and `setTheme` are automatically typed!
  const { theme, setTheme } = useContext(MyAppContext);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      style={{
        background: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#333" : "#fff",
        padding: "20px",
      }}
    >
      <h2>Component Using Context</h2>
      <p>Current Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default ThemedComponent;
```

### Key Considerations & Corner Cases (TypeScript)

- Type Safety: Define clear types/interfaces for your context value. This is the primary benefit of using TypeScript with Context.
- Default Value: Ensure the defaultValue passed to createContext fully matches your context type. It prevents runtime errors and provides correct types if a consumer is rendered outside a provider.
- Performance (useMemo): Always memoize the value object passed to the Provider using useMemo. If you pass an inline object {...} directly, it creates a new object on every render, causing all consumers to re-render unnecessarily, even if the underlying data hasn't changed.
- Context Splitting: For complex applications, consider splitting large contexts into smaller, more focused ones (e.g., AuthContext, ThemeContext). This reduces unnecessary re-renders in components that only need a subset of the data.
- Use Cases: Context is best for data that changes infrequently but is needed by many components at different nesting levels (theme, authentication status, locale). Avoid it for high-frequency state updates where performance is critical.

By following these steps and considerations, you can effectively and safely integrate useContext into your React TypeScript projects for clean state management.
