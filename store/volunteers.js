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

    setMyRequests: (state, action) => {
      state.myRequests = action.payload;
    },

    removeMyRequests: (state) => {
      state.myRequests = [];
    },

    setVolunteersLoading: (state, action) => {
      state.volunteersLoading = action.payload;
    },

    setMyRequestsLoading: (state, action) => {
      state.myRequestsLoading = action.payload;
    },
  },
});

export const {
  setVolunteers,
  removeVolunteers,
  setMyRequests,
  removeMyRequests,
  setVolunteersLoading,
  setMyRequestsLoading,
} = volunteersSlice.actions;

export default volunteersSlice.reducer;
