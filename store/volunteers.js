import { createSlice } from "@reduxjs/toolkit";

initialState = {
  volunteers: [],
  myRequests: [],
  volunteersLoading: false,
  myRequestsLoading: false,
};

export const volunteersSlice = createSlice({
  name: "volunteers",
  initialState: initialState,
  reducers: {
    setVolunteers: (state, action) => {
      state.volunteers = action.payload;
    },

    removeVolunteers: (state) => {
      state.volunteers = [];
    },

    setVolunteersLoading: (state, action) => {
      state.volunteersLoading = action.payload;
    },
  },
});

export const {
  setVolunteers,
  removeVolunteers,

  setVolunteersLoading,
} = volunteersSlice.actions;

export default volunteersSlice.reducer;
