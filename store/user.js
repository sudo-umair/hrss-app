import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  email: null,
  password: null,
  phone: null,
  cnic: null,
  isLoggedIn: false,
  isLoading: true,
  isConnected: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.phone = action.payload.phone;
      state.cnic = action.payload.cnic;
    },

    removeUser: (state) => {
      state.name = null;
      state.email = null;
      state.password = null;
      state.phone = null;
      state.isLoggedIn = false;
    },

    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },

    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setIsConnected: (state, action) => {
      state.isConnected = action.payload;
    },
  },
});

export const {
  setUser,
  removeUser,
  setIsLoggedIn,
  setIsConnected,
  setIsLoading,
} = userSlice.actions;

export default userSlice.reducer;
