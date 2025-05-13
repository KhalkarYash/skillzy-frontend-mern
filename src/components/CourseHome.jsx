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
    <div className="mt-8 mx-4">
      <h1 className="font-bold text-3xl text-center mb-5">Top Courses</h1>
      <div className="flex flex-col justify-center sm:flex-row flex-wrap gap-10">
        {topThree.map((course) => {
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

export default CourseHome;
