import { createSlice } from "@reduxjs/toolkit";

initialState = {
  volunteers: [],
  isLoading: false,
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

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setVolunteers, removeVolunteers, setIsLoading } =
  volunteersSlice.actions;

export default volunteersSlice.reducer;
