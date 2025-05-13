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
    <div className="mt-8 mx-4">
      <h1 className="font-bold text-3xl text-center mb-5">Top Courses</h1>
      <div className="flex flex-col justify-center sm:flex-row flex-wrap gap-10">
        {courses.map((course) => {
          const { _id, title, author, imageLink } = course;
          return (
            <Link key={title + " " + author} to={"/course/" + _id}>
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
  );
};

export default AllCourses;
