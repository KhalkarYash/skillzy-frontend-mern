import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./courseSlice";
import userReducer from "./userSlice";
import myCourseReducer from "./myCourseSlice";

const appStore = configureStore({
  reducer: {
    courses: coursesReducer,
    user: userReducer,
    myCourses: myCourseReducer,
  },
});

export default appStore;
