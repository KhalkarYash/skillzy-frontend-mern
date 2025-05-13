import { createSlice } from "@reduxjs/toolkit";

const myCourseSlice = createSlice({
  name: "mycourses",
  initialState: [],
  reducers: {
    addCourses: (state, action) => action.payload,
    removeCourses: () => [],
  },
});

export const { addCourses, removeCourses } = myCourseSlice.actions;

export default myCourseSlice.reducer;
