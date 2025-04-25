import React, { useContext } from "react";
import { AppContext } from "./AppContext";
import styles from "./ThemeToggleButton.module.css"; // Import CSS Module

const ThemeToggleButton: React.FC = () => {
  // Access both the state (theme) and the function (toggleTheme)
  const { theme, toggleTheme } = useContext(AppContext);

  console.log("ThemeToggleButton rendering");

  let toggleButtonText = theme == "dark" ? styles.toggleButtonlight : "";

  return (
    <button
      onClick={toggleTheme}
      className={[styles.toggleButton, toggleButtonText].join(" ")}
    >
      Switch to {theme === "light" ? "Dark" : "Light"} Theme
    </button>
  );
};

export default ThemeToggleButton;
