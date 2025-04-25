import React from "react";
import Counter from "./Counter";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-700">
        React Testing Library Demo with Tailwind
      </h1>
      {/* Render the Counter component */}
      <Counter initialCount={0} />

      <div className="mt-10 p-4 border border-blue-300 bg-blue-50 rounded-md text-sm text-blue-700">
        <p>
          Run{" "}
          <code className="font-mono bg-blue-100 px-1 rounded">npm test</code>{" "}
          or{" "}
          <code className="font-mono bg-blue-100 px-1 rounded">yarn test</code>{" "}
          in your terminal to see the Jest/RTL tests pass.
        </p>
        <p className="mt-2">
          Check{" "}
          <code className="font-mono bg-blue-100 px-1 rounded">
            src/components/Counter.test.tsx
          </code>{" "}
          to see the tests.
        </p>
      </div>
    </div>
  );
}

export default App;
