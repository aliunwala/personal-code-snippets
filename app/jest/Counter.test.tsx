import React from "react";
// Import necessary functions from React Testing Library
import { render, screen, fireEvent } from "@testing-library/react";
// Import the jest-dom matchers
import "@testing-library/jest-dom";

// Import the component to test
import Counter from "./Counter";

describe("Counter Component", () => {
  // Test 1: Check if the component renders correctly with initial count 0
  test("renders with initial count of 0", () => {
    render(<Counter />);

    // Check if the heading is present
    const headingElement = screen.getByRole("heading", { name: /counter/i });
    expect(headingElement).toBeInTheDocument();

    // Check if the initial count is displayed (using data-testid)
    const countDisplay = screen.getByTestId("count-display");
    expect(countDisplay).toHaveTextContent("0");

    // Check if buttons are present
    expect(
      screen.getByRole("button", { name: /increment/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /decrement/i })
    ).toBeInTheDocument();
  });

  // Test 2: Check if the component renders correctly with a specific initial count prop
  test("renders with a given initial count", () => {
    render(<Counter initialCount={5} />);

    const countDisplay = screen.getByTestId("count-display");
    expect(countDisplay).toHaveTextContent("5");
  });

  // Test 3: Check if clicking the increment button increases the count
  test("increments count when increment button is clicked", () => {
    render(<Counter />);

    const incrementButton = screen.getByRole("button", { name: /increment/i });
    const countDisplay = screen.getByTestId("count-display");

    // Initial count should be 0
    expect(countDisplay).toHaveTextContent("0");

    // Simulate a click event on the increment button
    fireEvent.click(incrementButton);

    // Count should now be 1
    expect(countDisplay).toHaveTextContent("1");

    // Click again
    fireEvent.click(incrementButton);
    expect(countDisplay).toHaveTextContent("2");
  });

  // Test 4: Check if clicking the decrement button decreases the count
  test("decrements count when decrement button is clicked", () => {
    render(<Counter initialCount={3} />); // Start with a non-zero count

    const decrementButton = screen.getByRole("button", { name: /decrement/i });
    const countDisplay = screen.getByTestId("count-display");

    // Initial count should be 3
    expect(countDisplay).toHaveTextContent("3");

    // Simulate a click event on the decrement button
    fireEvent.click(decrementButton);

    // Count should now be 2
    expect(countDisplay).toHaveTextContent("2");

    // Click again
    fireEvent.click(decrementButton);
    expect(countDisplay).toHaveTextContent("1");
  });
});
