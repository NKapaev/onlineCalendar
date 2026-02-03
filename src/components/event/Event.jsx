import "./event.css";
import { convertTo24HourFormat, hexToRgba } from "../../utils/helpers";

export default function Event({ title, start, end, color, allDay, onClick }) {
  const startTime = convertTo24HourFormat(start).padStart(5, "0");
  const endTime = convertTo24HourFormat(end).padStart(5, "0");

  const startTimeHours = Number(startTime.slice(0, 2));
  const startTimeMinutes = Number(startTime.slice(3, 5));
  const endTimeHours = Number(endTime.slice(0, 2));
  const endTimeMinutes = Number(endTime.slice(3, 5));

  function calcEventHeight(startHour, startMinute, endHour, endMinute) {
    const totalBlocks =
      (endHour - startHour) * 4 + (endMinute - startMinute) / 15;

    if (totalBlocks === 0) {
      return 1;
    } else {
      return totalBlocks * 20;
    }
  }

  function calcEventTop(startHour, startMinute) {
    return startHour * 81 + (startMinute / 15) * 20.25 + 81;
  }

  const eventHeight = allDay
    ? 20
    : calcEventHeight(
        startTimeHours,
        startTimeMinutes,
        endTimeHours,
        endTimeMinutes
      );

  return (
    <div
      className={`event ${eventHeight < 40 ? "lowHeightEvent" : ""} ${
        eventHeight === 40 ? "halfHeightEvent" : ""
      } ${allDay ? "allDayEvent" : ""}`}
      style={{
        top: `${calcEventTop(startTimeHours, startTimeMinutes)}px`,
        height: `${eventHeight}px`,
        backgroundColor: hexToRgba(color, 0.3),
        borderLeft: `4px solid ${color}`,
      }}
      onClick={onClick}
    >
      {allDay && <p className="event-title">{title}</p>}

      {eventHeight <= 20 && !allDay && (
        <p className="event-title">
          {title}, <span className="event-time">{start}</span>
        </p>
      )}

      {eventHeight > 20 && eventHeight > 40}
      {}

      {eventHeight > 20 && (
        <>
          <p className="event-title">{title}</p>
          <p>
            <span className="event-time">{start}</span> -{" "}
            <span className="event-time">{end}</span>
          </p>
        </>
      )}
    </div>
  );
}
