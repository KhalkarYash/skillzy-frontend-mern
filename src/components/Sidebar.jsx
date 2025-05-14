import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaBook, FaGlobe, FaSignInAlt, FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeCourses } from "../utils/myCourseSlice";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/${user.role}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      dispatch(removeCourses());
      setIsOpen(false);
      navigate("/auth");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <aside
        className={`
          fixed left-0 top-[56px] h-[calc(100vh-56px)]
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          transition-all duration-300 ease-in-out
          w-64 bg-white shadow-lg
          z-40
        `}
      >
        <nav className="h-full flex flex-col p-4">
          <ul className="space-y-2 flex-1">
            <li>
              <Link
                to="/"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 transition-all duration-200 group"
                onClick={() => setIsOpen(false)}
              >
                <FaHome className="text-xl text-[var(--primary-blue)] group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-[var(--primary-blue)]">
                  Home
                </span>
              </Link>
            </li>
            {user?.role === "user" && (
              <li>
                <Link
                  to="/my-courses"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 transition-all duration-200 group"
                  onClick={() => setIsOpen(false)}
                >
                  <FaBook className="text-xl text-[var(--primary-blue)] group-hover:scale-110 transition-transform" />
                  <span className="group-hover:text-[var(--primary-blue)]">
                    My Courses
                  </span>
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/courses"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 transition-all duration-200 group"
                onClick={() => setIsOpen(false)}
              >
                <FaGlobe className="text-xl text-[var(--primary-blue)] group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-[var(--primary-blue)]">
                  All Courses
                </span>
              </Link>
            </li>
            {user?.role === "admin" && (
              <li>
                <Link
                  to="/add-course"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 transition-all duration-200 group"
                  onClick={() => setIsOpen(false)}
                >
                  <FaPlus className="text-xl text-[var(--primary-blue)] group-hover:scale-110 transition-transform" />
                  <span className="group-hover:text-[var(--primary-blue)]">
                    Add Course
                  </span>
                </Link>
              </li>
            )}
          </ul>

          {!user ? (
            <div className="border-t pt-4">
              <Link
                to="/auth"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 transition-all duration-200 group"
                onClick={() => setIsOpen(false)}
              >
                <FaSignInAlt className="text-xl text-[var(--primary-blue)] group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-[var(--primary-blue)]">
                  Sign In / Sign Up
                </span>
              </Link>
            </div>
          ) : (
            <div className="border-t pt-4">
              <button
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-gray-700 transition-all duration-200 group"
                onClick={handleLogout}
              >
                <FaSignInAlt className="text-xl text-red-500 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-red-500">Sign Out</span>
              </button>
            </div>
          )}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
