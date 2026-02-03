import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eventModal: { isOpen: false },
  confirmModal: { isOpen: false, id: null, entityType: null },
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { modalName, id, entityType } = action.payload;
      state[modalName].isOpen = true;
      if (id) state[modalName].id = id;
      if (entityType) state[modalName].entityType = entityType;
    },

    closeModal: (state, action) => {
      const { modalName } = action.payload;
      state[modalName].isOpen = false;
      delete state[modalName].id;
      delete state[modalName].entityType;
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;

export default modalsSlice.reducer;
