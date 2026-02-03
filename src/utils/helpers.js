export const convertTo24HourFormat = (time12h) => {
  const [time, modifier] = time12h.split(" ");
  let [hours, minutes] = time.split(":");

  if (modifier === "pm" && hours !== "12") {
    hours = String(parseInt(hours, 10) + 12);
  } else if (modifier === "am" && hours === "12") {
    hours = "00";
  }

  return `${hours}:${minutes}`;
};

export const formattingDate = (date) => {
  const formatedDate = new Date(date);
  return formatedDate.toISOString();
};

export const formatDateToYMD = (date) =>
  `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

export const hexToRgba = (hex, alpha = 1) => {
  hex = hex.replace(/^#/, "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((h) => h + h)
      .join("");
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  if (hex.length === 8) {
    alpha = +(parseInt(hex.slice(6, 8), 16) / 255).toFixed(2);
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const getEvent = (eventId, calendars) => {
  for (const calendar of calendars) {
    for (const event of calendar.events) {
      if (event.eventId === eventId) {
        return event;
      }
    }
  }
  return null;
};

export const getCalendarById = (calendars, calendarId) =>
  calendars.find((calendar) => calendar.id === calendarId);

export const eventTimeValidation = (start, end) => {
  const start24 = convertTo24HourFormat(start);
  const end24 = convertTo24HourFormat(end);

  let startTime = parseInt(start24.replace(":", ""), 10);
  let endTime = parseInt(end24.replace(":", ""), 10);

  if (startTime > endTime) {
    return false;
  } else {
    return true;
  }
};

export const generateTimeOptions = () => {
  const times = [];
  const periods = ["am", "pm"];

  for (let period of periods) {
    for (let hour = 0; hour < 12; hour++) {
      for (let minutes of [0, 15, 30, 45]) {
        const displayHour = hour === 0 ? 12 : hour;
        const displayMinutes = minutes.toString().padStart(2, "0");
        times.push(`${displayHour}:${displayMinutes} ${period}`);
      }
    }
  }

  return times;
};

export const generateTimesForEventCalendar = () => {
  const times = [];
  const options = { hour: "numeric", hour12: true };
  for (let h = 0; h < 24; h += 1) {
    const time = new Date(2025, 0, 1, h).toLocaleTimeString("en-US", options);
    times.push(time);
  }

  return times;
};
