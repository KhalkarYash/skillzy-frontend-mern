import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body";
import Homepage from "./pages/Homepage";
import AllCourses from "./pages/AllCourses";
import Authpage from "./pages/Authpage";
import Coursepage from "./pages/Coursepage";
import MyCourses from "./pages/MyCourses";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Homepage />}></Route>
              <Route path="/courses" element={<AllCourses />}></Route>
              <Route path="/auth" element={<Authpage />}></Route>
              <Route path="/course/:courseId" element={<Coursepage />}></Route>
              <Route path="/my-courses" element={<MyCourses />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
