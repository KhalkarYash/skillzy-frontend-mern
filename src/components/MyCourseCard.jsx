import { FaUser, FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyCourseCard = ({ _id, title, author, imageLink, description }) => {
  return (
    <div className="transform hover:-translate-y-1 transition bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl duration-300">
      <div className="relative h-48">
        <img
          src={imageLink}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-[var(--primary-blue)] mb-2 line-clamp-2">
          {title}
        </h3>

        <div className="flex items-center text-gray-600 mb-3">
          <FaUser className="mr-2" />
          <span className="text-sm">{author}</span>
        </div>

        <div className="flex items-start mb-4">
          <FaBook className="text-[var(--secondary-coral)] mt-1 mr-2 flex-shrink-0" />
          <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <Link to={"/course/" + _id} className="">
          <button className="cursor-pointer w-full py-2 px-4 bg-[var(--primary-blue)] text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
            Continue Learning
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MyCourseCard;
