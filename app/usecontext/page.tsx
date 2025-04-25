"use client";
import React, { useState, useMemo } from "react";
import { AppContext, AppContextType, Theme, User } from "./AppContext";
import Header from "./Header";
import Content from "./Content";
import ComponentOutsideProvider from "./ComponentOutsideProvider";
import styles from "./page.module.css"; // Import CSS Module

function App() {
  // State to be shared via context
  const [theme, setTheme] = useState<Theme>("light");
  const [user, setUser] = useState<User | null>({ name: "Alice" }); // Example user state

  // Function to update the shared state
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    console.log("Theme toggled");
  };

  // **Corner Case 3 (Optimization): Provider Value Object Identity**
  // Create the context value object using useMemo to ensure its identity
  // remains stable unless theme or user actually changes.
  const contextValue = useMemo<AppContextType>(
    () => ({
      theme,
      user,
      toggleTheme,
      // If we needed to pass setUser: setUser, (use with caution)
    }),
    [theme, user]
  ); // Dependencies for useMemo

  /*
   // ---- Problematic Inline Value (Avoid this!) ----
   // If you did this instead of useMemo:
   // <AppContext.Provider value={{ theme, user, toggleTheme }}>
   // The `value` object would be a NEW object on every render of App,
   // causing ALL consumers to re-render unnecessarily.
  */

  console.log("App rendering (Provider)");

  // Dynamically apply theme class using CSS Modules syntax
  const appContainerClasses = `${styles.appContainer} ${
    styles[`theme-${theme}`]
  }`;

  return (
    <div className={styles.appRoot}>
      <style jsx>{`
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
            "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
            "Helvetica Neue", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          line-height: 1.6;
          background-color: #f4f4f4; /* Light background for the whole page */
          color: black;
        }

        code {
          font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
            monospace;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin-top: 0;
          margin-bottom: 0.5em;
        }

        p {
          margin-top: 0;
          margin-bottom: 1em;
        }

        hr {
          margin: 20px 0;
          border: 0;
          border-top: 1px solid #eee;
        }

        button {
          /* Basic reset or defaults if needed */
          font-family: inherit;
          font-size: 1rem;
        }
      `}</style>
      <h1>useContext Demo App (TypeScript + CSS Modules)</h1>
      <p>This app demonstrates sharing `theme` and `user` state.</p>

      {/* Component rendered OUTSIDE the provider */}
      <ComponentOutsideProvider />
      <hr />

      {/* The Provider component wraps the part of the tree that needs access */}
      <AppContext.Provider value={contextValue}>
        <div className={appContainerClasses}>
          <p>Components below are INSIDE the Provider:</p>
          <Header />
          <Content />
        </div>
      </AppContext.Provider>

      {/* Explanations Section */}
      <div className={styles.explanationBox}>
        <h3>Corner Case Explanations:</h3>
        <ol>
          <li>
            <b>Default Value:</b> The component above the horizontal rule
            (`ComponentOutsideProvider`) tries to use the context but isn't
            wrapped by a `AppContext.Provider`. It receives the
            `defaultContextValue` defined in `AppContext.tsx`.
          </li>
          <li>
            <b>Re-renders:</b> Open your browser's console. When you toggle the
            theme, notice that `Header`, `Content`, `UserProfile`, and
            `ThemeToggleButton` all log a "rendering" message. *Any* change to
            the context `value` causes *all* components consuming that specific
            context via `useContext` to re-render. This is inherent to
            `useContext`. Solutions for optimization include splitting contexts,
            `React.memo`, or libraries like Zustand/Jotai/Redux for more
            granular updates.
          </li>
          <li>
            <b>Provider Value Identity:</b> As mentioned in the code comments,
            using `useMemo` (or defining the value object outside the component
            if static) for the `value` prop prevents unnecessary re-renders of
            consumers when the *parent* component (`App`) re-renders for
            unrelated reasons, but the context data (`theme`, `user`) itself
            hasn't changed.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default App;
