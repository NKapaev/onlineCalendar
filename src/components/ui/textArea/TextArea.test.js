import TextArea from "./TextArea";
import { render, screen } from "@testing-library/react";

describe("TextArea component", () => {
  test("renders text area with title and placeholder", () => {
    render(<TextArea title="Text Area" placeholder="Enter text" />);
    expect(screen.getByText("Text Area")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  test("renders text area with custom width and height", () => {
    render(<TextArea width="500px" height="200px" />);
    const textArea = screen.getByRole("textbox");
    expect(textArea.closest("div")).toHaveStyle("width: 500px");
    expect(textArea.closest("div")).toHaveStyle("height: 200px");
    expect(textArea).toHaveStyle("height: 200px");
  });
});
