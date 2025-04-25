import React, { useContext } from "react";
import { AppContext } from "./AppContext";
import styles from "./ComponentOutsideProvider.module.css"; // Import CSS Module

const ComponentOutsideProvider: React.FC = () => {
  // This component uses useContext but is rendered *outside* the AppContext.Provider
  const contextValue = useContext(AppContext);

  console.log("ComponentOutsideProvider rendering (using default context)");

  return (
    <div className={styles.outsideBox}>
      <h4>Component Outside Provider (Corner Case 1 Demo)</h4>
      <p>
        This component receives the <strong>default value</strong> from
        `createContext`:
      </p>
      <pre className={styles.codeBlock}>
        {JSON.stringify(
          contextValue,
          (key, value) =>
            // Avoid serializing functions for display
            typeof value === "function" ? `[Function ${key}]` : value,
          2
        )}
      </pre>
      <button
        onClick={contextValue.toggleTheme}
        className={styles.defaultButton}
      >
        Try Default toggleTheme (Check Console Warning)
      </button>
    </div>
  );
};

export default ComponentOutsideProvider;
