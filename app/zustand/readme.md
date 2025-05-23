# Adding Zustand State Management

[Zustand](https://github.com/pmndrs/zustand) is a small, fast, and scalable state management solution for React. It uses simplified flux principles and offers a minimal API with zero boilerplate, making it easy to integrate and use.

This guide outlines the basic steps to add Zustand to your project.

## Steps

### 1. Installation

First, add Zustand to your project dependencies using npm or yarn:

```bash
npm install zustand
# or
yarn add zustand
```

### 2. Define Your Store

Create a file (e.g., src/store.js or src/store.ts) to define your application's state and the actions that modify it.

```typescript
import { create } from "zustand";

// --- Define Types ---
interface User {
  id: number;
  name: string;
}

interface AppState {
  count: number;
  user: User | null;
}

interface AppActions {
  increment: () => void;
  decrement: () => void;
  setUser: (userData: User | null) => void;
  clearUser: () => void;
  incrementByValue: (value: number) => void;
}

// Combine state and actions
type StoreState = AppState & AppActions;

// --- Create Store ---
const useAppStore = create<StoreState>((set) => ({
  // --- Initial State (must match AppState) ---
  count: 0,
  user: null,

  // --- Actions (must match AppActions) ---
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  setUser: (userData) => set({ user: userData }),
  clearUser: () => set({ user: null }),
  incrementByValue: (value) => set((state) => ({ count: state.count + value })),
}));

export default useAppStore;
```

### 3. Use the Store in Components

Import the hook generated by create (useAppStore in this example) into your React components to access state and actions.
Important: Zustand automatically handles component subscriptions. A component will only re-render if the specific piece of state it selects has changed.

```typescript
import React from "react";
import useAppStore from "./store";
import { shallow } from "zustand/shallow"; // Import shallow

function MyComponent(): JSX.Element {
  // --- Select specific state slices (Types inferred) ---
  const count: number = useAppStore((state) => state.count);
  const user = useAppStore((state) => state.user); // Type: User | null

  // --- Select actions (Types inferred) ---
  const increment = useAppStore((state) => state.increment); // Type: () => void
  const setUser = useAppStore((state) => state.setUser); // Type: (userData: User | null) => void
  const clearUser = useAppStore((state) => state.clearUser); // Type: () => void

  // --- Select multiple values with shallow (Types inferred) ---
  const { count: multiCount, user: multiUser } = useAppStore(
    (state) => ({
      count: state.count,
      user: state.user,
    }),
    shallow // <-- Use the shallow comparer
  ); // Type: { count: number; user: User | null }

  return (
    <div>
      <h1>Counter</h1>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>

      <h2>User</h2>
      {/* Type checking ensures user has 'name' if not null */}
      {user ? <p>Welcome, {user.name}!</p> : <p>No user logged in.</p>}
      <button onClick={() => setUser({ id: 1, name: "Bob" })}>
        Set User Bob
      </button>
      <button onClick={clearUser}>Clear User</button>

      <hr />
      <p>Multi-Select Count: {multiCount}</p>
      {multiUser && <p>Multi-Select User: {multiUser.name}</p>}
    </div>
  );
}

export default MyComponent;
```
