"use client";
// src/App.tsx
import React from "react";
import InfiniteList from "./InfiniteList"; // Adjust path if needed
// import "./index.css"; // Make sure your Tailwind styles are imported

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <InfiniteList />
    </div>
  );
}

export default App;
