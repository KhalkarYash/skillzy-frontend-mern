import { Provider } from "react-redux";
import { appStore, persistor } from "./utils/appStore";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body";
import Homepage from "./pages/Homepage";
import AllCourses from "./pages/AllCourses";
import Authpage from "./pages/Authpage";
import Coursepage from "./pages/Coursepage";
import MyCourses from "./pages/MyCourses";
import AddCourse from "./pages/AddCourse";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter basename="/">
            <Routes>
              <Route path="/" element={<Body />}>
                <Route path="/" element={<Homepage />}></Route>
                <Route path="/courses" element={<AllCourses />}></Route>
                <Route path="/auth" element={<Authpage />}></Route>
                <Route
                  path="/course/:courseId"
                  element={<Coursepage />}
                ></Route>
                <Route path="/my-courses" element={<MyCourses />}></Route>
                <Route path="/add-course" element={<AddCourse />}></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
