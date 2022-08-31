import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import resourcesReducer from "./resources";
import volunteersReducer from "./volunteers";

export const store = configureStore({
  reducer: {
    user: userReducer,
    resources: resourcesReducer,
    volunteers: volunteersReducer,
  },
});
