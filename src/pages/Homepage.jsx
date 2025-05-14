// import { useState } from "react";
import CourseHome from "../components/CourseHome";
import { useSelector } from "react-redux";

const Homepage = () => {
  const courses = useSelector((store) => store.courses);

  return courses ? (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden bg-[#0066cc]">
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(circle at 20% 35%, rgba(76, 169, 255, 0.13) 0%, rgba(76, 169, 255, 0) 25%),
            radial-gradient(circle at 75% 65%, rgba(21, 128, 255, 0.13) 0%, rgba(21, 128, 255, 0) 25%),
            linear-gradient(135deg, #0066cc 0%, #1a75ff 100%)
          `
        }}></div>
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent 0, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)
            `
          }}
        ></div>
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
