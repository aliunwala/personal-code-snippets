import React, { useContext } from "react";
import { AppContext } from "./AppContext";
import styles from "./UserProfile.module.css"; // Import CSS Module

// This component is nested within Content, but it can still access the context
// directly without prop drilling.
const UserProfile: React.FC = () => {
  const { user } = useContext(AppContext);

  console.log("UserProfile rendering");

  return (
    <div className={styles.profileBox}>
      <h4>User Profile (Nested Component)</h4>
      <p>
        User Name (from context): <strong>{user?.name ?? "Guest"}</strong>
      </p>
      <p>This component gets user info directly via `useContext`.</p>
    </div>
  );
};

export default UserProfile;
