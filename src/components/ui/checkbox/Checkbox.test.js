import Checkbox from "./Checkbox";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Checkbox Component", () => {
  test("renders checkbox with text", () => {
    render(<Checkbox text="Test"></Checkbox>);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  test("checkbox should be checked when clicked", () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test("applies custom id and name", () => {
    render(<Checkbox id="custom-id" name="custom-name" />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toHaveAttribute("id", "custom-id");
    expect(checkbox).toHaveAttribute("name", "custom-name");
  });
});
