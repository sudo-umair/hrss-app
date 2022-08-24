import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import resourcesReducer from "./resources";

export const store = configureStore({
  reducer: {
    user: userReducer,
    resources: resourcesReducer,
  },
});
