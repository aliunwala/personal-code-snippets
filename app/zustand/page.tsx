"use client";
import React from "react"; // Import React for JSX
import useAppStore from "./store"; // Import the typed store hook
import UserInfo from "./UserInfo";
import AuthControls from "./AuthControls";
import ThemeSwitcher from "./ThemeSwitcher";
// import "./App.css"; // CSS import remains the same
import { JSX } from "react";

// Define the component's return type (JSX.Element or React.ReactElement)
export default function App() {
  // Type Inference: `theme` will be correctly inferred as 'light' | 'dark'
  // The selector's `state` parameter is also typed as AppStore
  const theme = useAppStore((state) => state.theme);

  console.log("App component rendered. Theme:", theme);

  return (
    // Apply theme class to the main container
    <div className={`app-container theme-${theme}`}>
      <style jsx>{`
        body {
          font-family: sans-serif;
          transition: background-color 0.3s, color 0.3s;
        }

        .app-container {
          padding: 20px;
          border-radius: 8px;
          transition: background-color 0.3s, color 0.3s;
        }

        .theme-light {
          background-color: #f8f9fa;
          color: #212529;
        }

        .theme-dark {
          background-color: #212529;
          color: #f8f9fa;
        }

        button {
          margin: 5px;
          padding: 8px 15px;
          cursor: pointer;
        }

        hr {
          margin: 20px 0;
          border: 0;
          border-top: 1px solid #ccc;
        }

        /* Adjust button colors for dark theme */
        .theme-dark button {
          background-color: #6c757d;
          color: white;
          border: 1px solid #6c757d;
        }

        .theme-dark button:hover {
          background-color: #5a6268;
        }

        .theme-dark hr {
          border-top: 1px solid #555;
        }
      `}</style>
      <h1>Zustand Demo App</h1>
      <UserInfo />
      <hr />
      <AuthControls />
      <hr />
      <ThemeSwitcher />
    </div>
  );
  // }
}
