import React from "react";
import useAppStore, { AppStore } from "./store";
import { shallow } from "zustand/shallow"; // shallow import remains the same

export default function UserInfo() {
  // Type Inference: `isLoggedIn` is boolean, `username` is string | null
  // The selector's `state` parameter is typed as AppStore
  // The returned object's types are checked against the selected properties
  const {
    isLoggedIn,
    username,
  }: { isLoggedIn: boolean; username: string | null } = useAppStore(
    (state) => ({
      isLoggedIn: state.isLoggedIn,
      username: state.username,
    }),
    shallow // shallow comparison function
  );

  console.log("UserInfo component rendered. LoggedIn:", isLoggedIn);

  return (
    <div>
      <h2>User Status</h2>
      {isLoggedIn ? (
        // Use nullish coalescing or check for null explicitly for username
        <p>Welcome, {username ?? "User"}!</p>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
}

//  UserInfo;
