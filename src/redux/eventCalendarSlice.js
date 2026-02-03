import { createSlice } from "@reduxjs/toolkit";
import { formattingDate } from "../utils/helpers";

const initialState = {
  currentDate: formattingDate(new Date()),
};

export const eventCalendarSlice = createSlice({
  name: "eventCalendar",
  initialState,
  reducers: {
    setEventCalendarCurrentDate: (state, action) => {
      state.currentDate = action.payload.currentDate;
    },
  },
});


export const { setEventCalendarCurrentDate } = eventCalendarSlice.actions;

export default eventCalendarSlice.reducer;
