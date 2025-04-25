import React, { useContext } from "react";
import { AppContext } from "./AppContext";
import UserProfile from "./UserProfile"; // Import nested component
import styles from "./Content.module.css"; // Import CSS Module

const Content: React.FC = () => {
  // Access the theme part of the context
  const { theme } = useContext(AppContext);

  console.log("Content rendering");

  return (
    <main className={styles.contentArea}>
      <h3>Main Content Area</h3>
      <p>
        The current theme is: <strong>{theme}</strong>
      </p>
      <p>This component uses the theme from context.</p>
      {/* Render a nested component that ALSO needs context */}
      {/* Notice we don't need to pass user/theme down as props! */}
      <UserProfile />
    </main>
  );
};

export default Content;
