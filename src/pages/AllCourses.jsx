import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import CourseHomeCard from "../components/CourseHomeCard";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const fetchCourses = async () => {
    const res = await axios.get(BASE_URL + "/courses");
    setCourses(res?.data.courses);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-4xl text-[var(--primary-blue)] text-center mb-12">
          Explore Our Courses
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => {
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
      </div>
    </div>
  );
};

export default AllCourses;
