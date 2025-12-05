import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Input } from "../input";

describe("Input Component", () => {
  it("renders input field", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("accepts and displays user input", () => {
    render(<Input />);
    const input = screen.getByRole("textbox") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Hello World" } });
    expect(input.value).toBe("Hello World");
  });

  it("applies custom className", () => {
    const { container } = render(<Input className="custom-input" />);
    const input = container.querySelector("input");
    expect(input).toHaveClass("custom-input");
  });

  it("is disabled when disabled prop is true", () => {
    render(<Input disabled />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  it("accepts different input types", () => {
    const { container, rerender } = render(<Input type="email" />);
    let input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "email");

    rerender(<Input type="password" />);
    input = container.querySelector("input") as HTMLInputElement;
    expect(input).toHaveAttribute("type", "password");
  });

  it("handles onChange events", () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "test" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("handles onFocus and onBlur events", () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    render(<Input onFocus={handleFocus} onBlur={handleBlur} />);
    const input = screen.getByRole("textbox");

    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);

    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it("renders with default value", () => {
    render(<Input defaultValue="Default text" />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("Default text");
  });

  it("renders with controlled value", () => {
    const { rerender } = render(<Input value="Initial" onChange={() => {}} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("Initial");

    rerender(<Input value="Updated" onChange={() => {}} />);
    expect(input.value).toBe("Updated");
  });
});
