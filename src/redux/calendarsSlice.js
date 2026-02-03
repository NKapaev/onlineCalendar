import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  calendars: [
    {
      id: "defaultCalendar",
      title: "Default calendar",
      color: "#397E49",
      isActive: true,
      events: [

      ],
    },
  ],
};

export const calendarsSlice = createSlice({
  name: "calendars",
  initialState,
  reducers: {
    addCalendar: (state, action) => {
      const { id, title, color } = action.payload;
      state.calendars.push({ id, title, color, isActive: true, events: [] });
    },

    updateCalendar: (state, action) => {
      state.calendars.find((calendar) => {
        if (calendar.id === action.payload.id) {
          if (typeof action.payload.title !== "undefined")
            calendar.title = action.payload.title;
          if (typeof action.payload.color !== "undefined")
            calendar.color = action.payload.color;
          calendar.events = calendar.events.map((event) => ({
            ...event,
            color: action.payload.color,
          }));
          if (typeof action.payload.isActive !== "undefined")
            calendar.isActive = action.payload.isActive;
        }
      });
    },

    deleteCalendar: (state, action) => {
      state.calendars.find((calendar, index) => {
        if (calendar.id === action.payload.id) {
          state.calendars.splice(index, 1);
        }
      });
    },

    changeCalendarIsActive: (state, action) => {
      state.calendars.find((calendar, index) => {
        if (calendar.id === action.payload.id) {
          calendar.isActive = !calendar.isActive;
        }
      });
    },

    addEvent: (state, action) => {
      const {
        title,
        date,
        start,
        end,
        allDay,
        repeat,
        calendar: { id },
        description,
      } = action.payload;

      state.calendars = state.calendars.map((calendar) => {
        if (calendar.id === id) {
          return {
            ...calendar,
            events: [
              ...calendar.events,
              {
                eventId: crypto.randomUUID(),
                title,
                date,
                start,
                end,
                allDay,
                repeat,
                description,
                color: calendar.color,
                calendarId: calendar.id,
              },
            ],
          };
        }
        return calendar;
      });
    },

    deleteEvent: (state, action) => {
      const { findedEvent } = action.payload;
      const calendar = state.calendars.find((calendar) => {
        return calendar.id === findedEvent.calendarId;
      });

      if (calendar) {
        const eventIndex = calendar.events.findIndex(
          (event) => event.eventId === findedEvent.eventId
        );

        if (eventIndex !== -1) {
          calendar.events.splice(eventIndex, 1);
        }
      }
    },
  },
});

export const {
  addCalendar,
  updateCalendar,
  deleteCalendar,
  changeCalendarIsActive,
  addEvent,
  deleteEvent,
} = calendarsSlice.actions;

export default calendarsSlice.reducer;
