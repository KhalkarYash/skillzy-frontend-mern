// import { useState } from "react";
import CourseHome from "../components/CourseHome";
import { useSelector } from "react-redux";

const Homepage = () => {
  // const [coursesList, setCoursesList] = useState([]);

  const courses = useSelector((store) => store.courses);

  return courses ? (
    <div className="flex flex-col justify-center items-center pb-20 mt-20">
      <div className="w-[90%] rounded-lg h-[30vh] bg-gradient-to-b from-[var(--secondary-coral)] to-white"></div>
      <div>
        <div className="italic text-8xl sm:text-8xl font-[AnkhSanctuary] text-[var(--primary-blue)]">
          Skillzy
        </div>
        <div className="text-center font-[PlaywriteDKLoopet] text-[var(--secondary-coral)]">
          {"<!-- Learn, Grow, Thrive. -->"}
        </div>
      </div>
      <CourseHome />
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default Homepage;
