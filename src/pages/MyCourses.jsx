import { useState, useEffect } from "react";
import MyCourseCard from "../components/MyCourseCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa"; // Add this import
import { addCourses } from "../utils/myCourseSlice";

const MyCourses = () => {
  const user = useSelector((store) => store.user);
  const [myCourses, setMyCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const getMyCourses = async () => {
    try {
      setIsLoading(true);
      let res;
      if (user.role === "user") {
        res = await axios.get(`${BASE_URL}/user/my-courses`, {
          withCredentials: true,
        });
        setMyCourses(res.data.courses);
        dispatch(addCourses(myCourses));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyCourses();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[var(--primary-blue)]"></div>
      </div>
    );
  }

  return myCourses.length <= 0 ? (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center p-8 rounded-lg">
        <FaBookOpen className="mx-auto text-6xl text-[var(--primary-blue)] mb-6" />
        <h1 className="font-bold text-4xl text-[var(--primary-blue)] mb-4">
          My Courses
        </h1>
        <p className="text-xl text-gray-600 max-w-md mx-auto">
          Start your learning journey with Skillzy! Explore our courses and
          enroll to begin.
        </p>
        <Link to="/">
          <button className="mt-8 px-6 py-3 bg-[var(--primary-blue)] text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            Browse Courses
          </button>
        </Link>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-4xl text-[var(--primary-blue)] text-center mb-8">
          My Learning Journey
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myCourses.map((course) => {
            const { _id, title, author, imageLink, description } = course;
            return (
              <MyCourseCard
                key={title + " " + author}
                title={title}
                author={author}
                imageLink={imageLink}
                description={description}
                _id={_id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
