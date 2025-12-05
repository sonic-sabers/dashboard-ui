import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Badge } from "../badge";

describe("Badge Component", () => {
  it("renders badge with text", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("applies default variant styles", () => {
    const { container } = render(<Badge>Default</Badge>);
    const badge = container.querySelector("div");
    expect(badge).toHaveClass("bg-primary");
  });

  it("applies secondary variant styles", () => {
    const { container } = render(<Badge variant="secondary">Secondary</Badge>);
    const badge = container.querySelector("div");
    expect(badge).toHaveClass("bg-secondary");
  });

  it("applies destructive variant styles", () => {
    const { container } = render(<Badge variant="destructive">Error</Badge>);
    const badge = container.querySelector("div");
    expect(badge).toHaveClass("bg-destructive");
  });

  it("applies outline variant styles", () => {
    const { container } = render(<Badge variant="outline">Outline</Badge>);
    const badge = container.querySelector("div");
    expect(badge).toHaveClass("text-foreground");
  });

  it("applies custom className", () => {
    const { container } = render(
      <Badge className="custom-badge">Custom</Badge>
    );
    const badge = container.querySelector("div");
    expect(badge).toHaveClass("custom-badge");
  });

  it("renders with status dot when BadgeDot is used", () => {
    const { container } = render(
      <Badge>
        <span className="status-dot" />
        Active
      </Badge>
    );
    expect(container.querySelector(".status-dot")).toBeInTheDocument();
  });
});
