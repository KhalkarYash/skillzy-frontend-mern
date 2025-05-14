import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addCourses } from "../utils/courseSlice";
import CourseHomeCard from "./CourseHomeCard";
import { Link } from "react-router-dom";

const CourseHome = () => {
  const [coursesList, setCoursesList] = useState([]);
  const dispatch = useDispatch();

  const fetchCourses = async () => {
    try {
      const res = await axios.get(BASE_URL + "/courses");
      setCoursesList(res?.data.courses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    console.log(coursesList);
    dispatch(addCourses(coursesList));
  }, [coursesList]);

  const topThree = coursesList.slice(0, 3);

  return (
    <div className="mt-16 mx-auto max-w-7xl px-4">
      <div className="text-center mb-12">
        <h1 className="font-bold text-4xl text-[var(--primary-blue)] mb-4">Featured Courses</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Start your learning journey with our top-rated courses
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {topThree.map((course) => {
          const { _id, title, author, imageLink } = course;
          return (
            <Link 
              key={title + " " + author} 
              to={"/course/" + _id}
              className="transform hover:scale-105 transition-transform duration-300"
            >
              <CourseHomeCard
                title={title}
                author={author}
                imageLink={imageLink}
              />
            </Link>
          );
        })}
      </div>
      <div className="text-center mt-12">
        <Link to="/courses">
          <button className="px-8 py-3 bg-[var(--primary-blue)] text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg">
            View All Courses
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CourseHome;
