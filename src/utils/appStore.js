import { combineReducers, configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./courseSlice";
import userReducer from "./userSlice";
import myCourseReducer from "./myCourseSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  courses: coursesReducer,
  user: userReducer,
  myCourses: myCourseReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const appStore = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(appStore);

export { appStore, persistor };
