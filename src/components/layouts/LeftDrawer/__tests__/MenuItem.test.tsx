import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MenuItem } from "../MenuItem";
import { PieChart } from "lucide-react";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "/",
}));

describe("MenuItem Component", () => {
  it("renders the label correctly", () => {
    render(<MenuItem icon={<PieChart />} label="Test Label" />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("applies active styles when active prop is true", () => {
    const { container } = render(
      <MenuItem icon={<PieChart />} label="Active Item" active={true} />
    );
    // Check for a class that is unique to the active state
    expect(container.firstChild).toHaveClass("bg-gray-100");
  });

  it("does not apply active styles when active prop is false", () => {
    const { container } = render(
      <MenuItem icon={<PieChart />} label="Inactive Item" active={false} />
    );
    expect(container.firstChild).not.toHaveClass("bg-gray-100");
    expect(container.firstChild).toHaveClass("hover:bg-gray-50");
  });

  it("calls the onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(
      <MenuItem
        icon={<PieChart />}
        label="Clickable Item"
        onClick={handleClick}
      />
    );

    fireEvent.click(screen.getByText("Clickable Item"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
