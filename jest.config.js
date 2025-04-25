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
