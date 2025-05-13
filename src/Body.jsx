import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";

const Body = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  // const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  const fetchUser = async () => {
    dispatch(addUser(user));
  };

  useEffect(() => {
    fetchUser();

    if (location.pathname !== "/" && location.pathname !== "/auth" && !user) {
      navigate("/auth");
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <Navbar setIsOpen={setIsOpen} />
      <div className="flex">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <main
          className={`flex-1 transition-all duration-300 ${
            isOpen ? "ml-64" : "ml-0"
          }`}
        >
          <div className="p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Body;
