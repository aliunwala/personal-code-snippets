import React from "react";
import useAppStore from "./store";
import { shallow } from "zustand/shallow";

export default function AuthControls() {
  // Type Inference: `login` is (name: string) => void, `logout` is () => void
  // The selector's `state` parameter is typed as AppStore
  const {
    login,
    logout,
  }: { login: (name: string) => void; logout: () => void } = useAppStore(
    (state) => ({
      login: state.login,
      logout: state.logout,
    }),
    // Using shallow here is fine but less critical for actions
    // as they are usually stable references unless the store definition changes
    shallow
  );

  console.log("AuthControls component rendered.");

  const handleLogin = (): void => {
    // prompt returns string | null
    const name: string | null = prompt("Enter username:", "Alice");
    // Ensure name is a non-empty string before calling login
    if (name) {
      login(name); // `login` expects a string, TS confirms `name` is suitable here
    }
  };

  return (
    <div>
      <h2>Controls</h2>
      {/* Type checking ensures `login` and `logout` are called correctly */}
      <button onClick={handleLogin}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
