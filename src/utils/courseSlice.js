import { createSlice } from "@reduxjs/toolkit";

const coursesSlice = createSlice({
  name: "courses",
  initialState: [],
  reducers: {
    addCourses: (state, action) => action.payload,
  },
});

export const { addCourses } = coursesSlice.actions;

export default coursesSlice.reducer;
