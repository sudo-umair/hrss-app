import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  email: null,
  password: null,
  phone: null,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.phone = action.payload.phone;
    },

    removeUser: (state) => {
      state.name = null;
      state.email = null;
      state.password = null;
      state.phone = null;
    },

    updateUser: (state, action) => {
      state = { ...state, ...action.payload };
    },

    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { addUser, removeUser, setIsLoggedIn } = userSlice.actions;

export default userSlice.reducer;
