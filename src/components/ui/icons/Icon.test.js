import Icon from "./Icon";
import { render, screen } from "@testing-library/react";

describe("Icon component", () => {
  test("renders icon with correct name", () => {
    render(<Icon name="test-icon" />);
    const imageElement = screen.getByRole("img");
    expect(imageElement).toHaveAttribute("src", "./icons/test-icon.svg");
    expect(imageElement).toHaveAttribute("alt", "test-icon");
  });

  test("applies custom className", () => {
    render(<Icon name="test-icon" className="custom-class" />);
    const imageElement = screen.getByRole("img");

    expect(imageElement.closest("div")).toHaveClass("custom-class");
  });
});
