import "./DatePicker.css";
import { capitalize } from "../helpers";
import { useState, useMemo, useCallback, useEffect } from "react";
import InputField from "../inputField/InputField";

const getCalendarDays = (year, month) => {
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const days = [];

  for (let i = firstDayOfMonth - 1; i >= 0; i -= 1) {
    days.push({
      day: daysInPrevMonth - i,
      month: month - 1,
      year,
      isCurrentMonth: false,
    });
  }

  for (let i = 1; i <= daysInCurrentMonth; i += 1) {
    days.push({ day: i, month, year, isCurrentMonth: true });
  }

  while (days.length < 42) {
    days.push({
      day: days.length - daysInCurrentMonth - firstDayOfMonth + 1,
      month: month + 1,
      year,
      isCurrentMonth: false,
    });
  }

  return days;
};

function getTodayDate() {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

export default function DatePicker({
  className = "",
  onChange = () => { },
  withInput = false,
  value = getTodayDate(),
}) {
  const initialDate =
    value instanceof Date
      ? new Date(value.getFullYear(), value.getMonth(), value.getDate())
      : getTodayDate();

  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [currentDate, setCurrentDate] = useState(
    new Date(initialDate.getFullYear(), initialDate.getMonth(), 1)
  );
  const [isOpen, setIsOpen] = useState(!withInput);

  useEffect(() => {
    if (value instanceof Date && selectedDate.getTime() !== value.getTime()) {
      const normalized = new Date(
        value.getFullYear(),
        value.getMonth(),
        value.getDate()
      );
      setSelectedDate(normalized);
      setCurrentDate(
        new Date(normalized.getFullYear(), normalized.getMonth(), 1)
      );
    }
  }, [value]);

  const calendarDays = useMemo(
    () => getCalendarDays(currentDate.getFullYear(), currentDate.getMonth()),
    [currentDate]
  );

  const handleSelectDate = (dateObj) => {
    const newDate = new Date(dateObj.year, dateObj.month, dateObj.day);
    setSelectedDate(newDate);
    setCurrentDate(new Date(dateObj.year, dateObj.month, 1));
    onChange?.(newDate);
  };

  const changeMonth = useCallback((offset) => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1)
    );
  }, []);

  return (
    <div className={`datepicker ${className}`}>
      {withInput && (
        <InputField
          className="datepicker-input"
          onClick={() => setIsOpen(!isOpen)}
          label="Date"
          readOnly
          value={selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "2-digit",
          })}
        />
      )}

      {isOpen && (
        <div
          className="datepicker-dropdown"
          style={
            withInput
              ? { position: "absolute", zIndex: "5", top: "110%" }
              : null
          }
        >
          <div className="datepicker-header">
            <p className="datepicker-header-title">
              {capitalize(
                currentDate.toLocaleString("en-US", { month: "long" })
              )}{" "}
              {currentDate.getFullYear()}
            </p>
            <div className="month-controllers-container">
              <button type="button" onClick={() => changeMonth(-1)}>
                <img
                  src="./icons/chevron-left.svg#chevron-left"
                  alt="chevron-left"
                />
              </button>
              <button type="button" onClick={() => changeMonth(1)}>
                <img
                  src="./icons/chevron-right.svg#chevron-right"
                  alt="chevron-right"
                />
              </button>
            </div>
          </div>

          <div className="datepicker-grid">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="datepicker-dayname">
                {day[0]}
              </div>
            ))}

            {calendarDays.map((dateObj, index) => {
              const currentDate = new Date(
                dateObj.year,
                dateObj.month,
                dateObj.day
              );
              const isSelected =
                selectedDate.getTime() === currentDate.getTime();

              return (
                <div
                  key={index}
                  className={`datepicker-day ${dateObj.isCurrentMonth ? "current" : "other-month"
                    } ${isSelected ? "selected" : ""}`}
                  onClick={() => handleSelectDate(dateObj)}
                >
                  {dateObj.day}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
