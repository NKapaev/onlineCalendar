import Modal from "./Modal";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Modal component", () => {
  test("renders modal with title and text", () => {
    render(<Modal modalTitle="Test title" modalText="Test text" />);
    expect(screen.getByText("Test title")).toBeInTheDocument();
    expect(screen.getByText("Test text")).toBeInTheDocument();
  });

  test("renders children inside modal", () => {
    render(
      <Modal>
        <div data-testid="custom-content">Custom Content</div>
      </Modal>
    );

    expect(screen.getByTestId("custom-content")).toBeInTheDocument();
  });

  test("Close button click", () => {
    const onCloseClick = jest.fn();
    render(<Modal onCloseClick={onCloseClick} />);
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);
    expect(onCloseClick).toHaveBeenCalled();
  });
});
