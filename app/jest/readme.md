# React + Jest/RTL Demo

This is a small sample project demonstrating basic testing of a React component using Jest and React Testing Library (RTL). The project is built with TypeScript and styled using Tailwind CSS.

## Installation/Config

Run install commands:

```bash
pnpm install --save-dev @testing-library/react @testing-library/dom @types/react @types/react-dom
npm install --save-dev @babel/preset-env
npm install --save-dev @babel/preset-react
npm install --save-dev @babel/preset-typescript
```

Create `jest.config.js` in repository root with:

```js
const customJestConfig = {
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      {
        presets: [
          ["@babel/preset-env", { targets: { node: "current" } }],
          ["@babel/preset-react", { runtime: "automatic" }],
          "@babel/preset-typescript",
        ],
        // Add any specific Babel plugins needed ONLY for testing here, if applicable
        // plugins: [],
      },
    ],
  },
  testEnvironment: "jsdom",

  // You might need to prevent Jest from applying other transforms
  // if next/jest doesn't handle it perfectly with the inline config.
  // Usually, the above is sufficient, but keep this in mind if issues arise.
  // transformIgnorePatterns: [
  //   '/node_modules/',
  //   '^.+\\.module\\.(css|sass|scss)$',
  // ],
};

module.exports = customJestConfig;
```

Note do not create `.babelrc` or `babel.config.js` in repository root with nextjs turbopack. You have to have the transform above to add presets.

Add scripts to package.json :

```json
"scripts": {
"test": "jest",
"test:watch": "jest --watch"
}
```

## Features

- React functional component (`Counter.tsx`) with basic state management (`useState`).
- TypeScript for static typing.
- Jest as the test runner.
- React Testing Library for querying and interacting with the component in tests.
- Basic tests covering:
  - Initial rendering and default state.
  - Rendering with props (`initialCount`).
  - User interaction (`click` events) and state updates.

## Available Scripts

- **Run the tests:**

  ```bash
  npm run test
  ```

## Project Structure

- `Counter.tsx`: The React component being demonstrated and tested.
- `Counter.test.tsx`: Contains the tests for the `Counter` component using Jest and React Testing Library.
- `page.tsx`: The main application component that renders the `Counter`.
- `index.css`: Tailwind CSS directives and base styles.
- `tailwind.config.js`: Configuration file for Tailwind CSS.

## Testing Philosophy

This project uses React Testing Library, which encourages writing tests that resemble how users interact with your application. Key principles include:

- Querying elements based on accessibility attributes (`getByRole`, `getByLabelText`, etc.) or text content (`getByText`). `getByTestId` is used here for simplicity on the count display, but prefer accessible queries when possible.
- Simulating user events (`fireEvent` or `@testing-library/user-event`).
- Asserting the state of the DOM (`expect(...).toBeInTheDocument()`, `expect(...).toHaveTextContent()`, etc.).
