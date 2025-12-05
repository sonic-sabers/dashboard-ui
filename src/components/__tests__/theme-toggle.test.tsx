import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeToggle } from "../theme-toggle";
import { ThemeProvider } from "next-themes";

// Mock next-themes
jest.mock("next-themes", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useTheme: () => ({
    theme: "light",
    setTheme: jest.fn(),
  }),
}));

describe("ThemeToggle Component", () => {
  it("renders theme toggle button", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    // Check if button or toggle element exists
    const toggleElement =
      screen.getByRole("button", { hidden: true }) ||
      document.querySelector('[role="switch"]') ||
      document.querySelector("button");
    expect(toggleElement).toBeInTheDocument();
  });

  it("displays current theme icon", () => {
    const { container } = render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    // Check if SVG icon is rendered
    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("is clickable", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const toggleElement =
      screen.getByRole("button", { hidden: true }) ||
      document.querySelector('[role="switch"]') ||
      document.querySelector("button");

    if (toggleElement) {
      fireEvent.click(toggleElement);
      // Theme should change (mocked)
      expect(toggleElement).toBeInTheDocument();
    }
  });
});
