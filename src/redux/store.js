import { configureStore } from "@reduxjs/toolkit";
import calendarsReducer from "./calendarsSlice";
import modalsReducer from "./modalsSlice";
import eventCalendarReducer from "./eventCalendarSlice";
import toastReducer from "./toastSlice";

export const store = configureStore({
  reducer: {
    calendars: calendarsReducer,
    modals: modalsReducer,
    eventCalendar: eventCalendarReducer,
    toast: toastReducer,
  },
});
