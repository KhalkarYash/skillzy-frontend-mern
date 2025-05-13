import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./courseSlice";
import userReducer from "./userSlice";

const appStore = configureStore({
  reducer: {
    courses: coursesReducer,
    user: userReducer,
  },
});

export default appStore;
