import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "./InputField";
import { capitalize } from "../../../utils/helpers";

jest.mock("../../../utils/helpers", () => ({
  capitalize: jest.fn(
    (text) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  ),
}));

describe("InputField Component", () => {
  test("renders input with label", () => {
    render(<InputField label="Username" />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
  });

  test("applies required attribute", () => {
    render(<InputField label="Email" required />);
    expect(screen.getByLabelText("Email*")).toBeRequired();
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  test("display placeholder text", () => {
    render(<InputField placeholder="Enter your email" />);
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
  });

  test("shows error message when error is passed", () => {
    render(<InputField errorMessage="Invalid email" />);
    const errorMessage = screen.getByText("Invalid email");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass("error-message");
  });

  test("calls onChange when typing", () => {
    const onChangeHandler = jest.fn();
    render(<InputField onChange={onChangeHandler} />);
    const inputElement = screen.getByRole("textbox");

    fireEvent.change(inputElement, { target: { value: "test@example.com" } });

    expect(onChangeHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "test@example.com" }),
      })
    );
  });

  test("disables input when disabled prop is true", () => {
    render(<InputField label="Disabled input" placeholder="test" disabled />);
    const inputElement = screen.getByPlaceholderText("test");
    expect(inputElement).toHaveAttribute("disabled");
  });

  test("toggles password visibility", () => {
    render(<InputField label="Password" type="password" />);
    const inputElement = screen.getByLabelText("Password");
    const toggleButton = screen.getByRole("button", {
      name: /toggle password/i,
    });
    expect(inputElement).toHaveAttribute("type", "password");
    fireEvent.click(toggleButton);
    expect(inputElement).toHaveAttribute("type", "text");
    fireEvent.click(toggleButton);
    expect(inputElement).toHaveAttribute("type", "password");
  });

  test("applies custom class to container", () => {
    render(<InputField className="custom-class" />);
    const container = screen.getByRole("textbox").closest(".field-container");

    expect(container).toHaveClass("custom-class");
  });

  test("capitalizes label text", () => {
    render(<InputField label="username" />);
    expect(capitalize).toHaveBeenCalledWith("username");
    expect(screen.getByText("Username")).toBeInTheDocument();
  });
});
