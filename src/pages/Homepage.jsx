// import { useState } from "react";
import CourseHome from "../components/CourseHome";
import { useSelector } from "react-redux";

const Homepage = () => {
  const courses = useSelector((store) => store.courses);

  return courses ? (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gradient-to-r from-[var(--primary-blue)] to-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
          <h1 className="italic text-6xl sm:text-8xl font-[AnkhSanctuary] mb-4 text-center">
            Skillzy
          </h1>
          <p className="text-xl sm:text-2xl font-[PlaywriteDKLoopet] text-white/90 text-center">
            {"<!-- Learn, Grow, Thrive -->"}
          </p>
        </div>
        <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Courses Section */}
      <CourseHome />
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[var(--primary-blue)]"></div>
    </div>
  );
};

export default Homepage;
