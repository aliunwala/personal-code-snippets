import React from "react";
import useAppStore from "./store";

export default function ThemeSwitcher() {
  // Type Inference: `theme` is 'light' | 'dark'
  // `toggleTheme` is () => void
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);

  console.log("ThemeSwitcher component rendered. Theme:", theme);

  return (
    <div>
      <h2>Theme</h2>
      <p>Current theme: {theme}</p>
      {/* Type checking ensures `toggleTheme` is called correctly */}
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
