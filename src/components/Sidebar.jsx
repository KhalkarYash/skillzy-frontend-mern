import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaBook, FaGlobe, FaSignInAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

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
          transition-transform duration-300 ease-in-out
          w-64 bg-white shadow-sm
          z-40
        `}
      >
        <nav className="h-full flex flex-col p-4">
          <ul className="space-y-2 flex-1">
            <li>
              <Link
                to="/"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <FaHome className="text-xl text-[var(--primary-blue)]" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/my-courses"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <FaBook className="text-xl text-[var(--primary-blue)]" />
                <span>My Courses</span>
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <FaGlobe className="text-xl text-[var(--primary-blue)]" />
                <span>All Courses</span>
              </Link>
            </li>
          </ul>

          {!user && (
            <div className="border-t pt-4">
              <Link
                to="/auth"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <FaSignInAlt className="text-xl text-[var(--primary-blue)]" />
                <span>Sign In / Sign Up</span>
              </Link>
            </div>
          )}
          {user && (
            <div className="border-t pt-4">
              <button
                to="/auth"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700"
                onClick={() => {
                  handleLogout();
                }}
              >
                <FaSignInAlt className="text-xl text-[var(--primary-blue)]" />
                <span>Signout</span>
              </button>
            </div>
          )}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
