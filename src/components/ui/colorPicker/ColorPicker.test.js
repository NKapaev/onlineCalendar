import ColorPicker from "./ColorPicker";
import { render, screen, fireEvent } from "@testing-library/react";

describe("ColorPicker component", () => {
  test("renders color picker with colors", () => {
    const colors = ["#FF0000", "#00FF00", "#0000FF"];
    const { container } = render(<ColorPicker colors={colors} />);

    const colorElements = container.querySelectorAll(".color");
    expect(colorElements).toHaveLength(colors.length);

    colorElements.forEach((element, index) => {
      expect(element).toHaveStyle(`background-color: ${colors[index]}`);
    });
  });

  test("selects color on click", () => {
    const colors = ["#FF0000", "#00FF00", "#0000FF"];
    const { container } = render(<ColorPicker colors={colors} />);

    const colorContainers = container.querySelectorAll(".color-container");
    fireEvent.click(colorContainers[1]);

    expect(colorContainers[1]).toHaveClass("selected");
  });
});
