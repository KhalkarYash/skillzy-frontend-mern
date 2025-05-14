import { FaUser } from "react-icons/fa";

const CourseHomeCard = ({ author, imageLink, title }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative h-48">
        <img
          className="h-full w-full object-cover"
          src={imageLink}
          alt={title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-[var(--primary-blue)] mb-3 line-clamp-2">
          {title}
        </h3>
        <div className="flex items-center text-gray-600">
          <FaUser className="mr-2" />
          <span className="text-sm">{author}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseHomeCard;
