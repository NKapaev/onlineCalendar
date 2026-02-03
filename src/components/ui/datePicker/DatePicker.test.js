import { render, screen, fireEvent } from "@testing-library/react";
import DatePicker from "./DatePicker";

jest.mock("../../../utils/helpers", () => ({
  capitalize: jest.fn((text) => text.charAt(0).toUpperCase() + text.slice(1)),
}));

describe("DatePicker Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2024, 2, 15));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("renders calendar with correct month and year", () => {
    render(<DatePicker />);
    expect(screen.getByText("March 2024")).toBeInTheDocument();
  });

  test("renders weekday headers", () => {
    render(<DatePicker />);
    const { container } = render(<DatePicker />);
    const dayNames = container.querySelectorAll(".datepicker-dayname");
    expect(dayNames).toHaveLength(7);

    const daysText = Array.from(dayNames).map((day) => day.textContent);
    expect(daysText).toEqual(["S", "M", "T", "W", "T", "F", "S"]);
  });

  test("changes month when clicking navigation buttons", () => {
    render(<DatePicker />);

    const prevButton = screen.getByAltText("chevron-left");
    const nextButton = screen.getByAltText("chevron-right");

    fireEvent.click(nextButton);
    expect(screen.getByText("April 2024")).toBeInTheDocument();

    fireEvent.click(prevButton);
    expect(screen.getByText("March 2024")).toBeInTheDocument();
  });

  test("calls onChange when selecting a date", () => {
    const onChangeMock = jest.fn();
    render(<DatePicker onChange={onChangeMock} />);

    const currentMonthDay = screen.getByText("15", {
      selector: ".datepicker-day.current",
    });

    fireEvent.click(currentMonthDay);

    expect(onChangeMock).toHaveBeenCalled();
    const calledDate = onChangeMock.mock.calls[0][0];
    expect(calledDate.getDate()).toBe(15);
    expect(calledDate.getMonth()).toBe(2);
    expect(calledDate.getFullYear()).toBe(2024);
  });

  test("displays days from previous and next months", () => {
    const { container } = render(<DatePicker />);

    const otherMonthDays = container.querySelectorAll(".other-month");
    expect(otherMonthDays.length).toBeGreaterThan(0);
  });
});
