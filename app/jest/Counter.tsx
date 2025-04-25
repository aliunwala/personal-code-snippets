"use client";
import React, { useState } from "react";

interface CounterProps {
  initialCount?: number; // Optional initial count prop
}

const Counter: React.FC<CounterProps> = ({ initialCount = 0 }) => {
  const [count, setCount] = useState<number>(initialCount);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex flex-col items-center space-y-4">
      <h2 className="text-xl font-medium text-black">Counter</h2>
      {/* Use data-testid for easy selection in tests */}
      <p
        data-testid="count-display"
        className="text-3xl font-bold text-indigo-600"
      >
        {count}
      </p>
      <div className="space-x-3">
        <button
          onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
        >
          Decrement
        </button>
        <button
          onClick={increment}
          className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
        >
          Increment
        </button>
      </div>
    </div>
  );
};

export default Counter;
