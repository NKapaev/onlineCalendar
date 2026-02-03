import { render, screen, fireEvent } from "@testing-library/react";
import Select from "./Select";

describe("Select component", () => {
  test("renders select with options", () => {
    render(<Select options={["Option 1", "Option 2", "Option 3"]} />);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  test("opens dropdown when clicked", () => {
    render(<Select options={["Option 1", "Option 2"]} />);
    const selectBox = screen.getByText("Option 1");
    expect(screen.queryByText("Option 2")).not.toBeInTheDocument();
    fireEvent.click(selectBox);
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  test("selects an option and closes dropdown", () => {
    render(<Select options={["Option 1", "Option 2"]} />);
    fireEvent.click(screen.getByText("Option 1"));
    const option2 = screen.getByText("Option 2");
    fireEvent.click(option2);
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
  });
});
