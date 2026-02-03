import Toast from "./Toast";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Toast component", () => {
  test("renders toast with message", () => {
    render(<Toast message="Hello, world!" />);
    expect(screen.getByText("Hello, world!")).toBeInTheDocument();
  });

  test("close button click", () => {
    const onClickHandler = jest.fn();
    render(<Toast message="Hello, world!" onClose={onClickHandler} />);
    const closeButton = screen.getByRole("button", { name: "close" });
    fireEvent.click(closeButton);
    expect(onClickHandler).toHaveBeenCalled();
  });
});
