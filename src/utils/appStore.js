import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./courseSlice";

const appStore = configureStore({
  reducer: {
    courses: coursesReducer,
  },
});

export default appStore;
