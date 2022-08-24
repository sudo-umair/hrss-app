import { createSlice } from "@reduxjs/toolkit";

initialState = {
  resources: [],
  isLoading: true,
};

export const resourcesSlice = createSlice({
  name: "resources",
  initialState: initialState,
  reducers: {
    setResources: (state, action) => {
      state.resources = action.payload;
    },

    removeResources: (state) => {
      state.resources = [];
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setResources, removeResources, setIsLoading } =
  resourcesSlice.actions;

export default resourcesSlice.reducer;
