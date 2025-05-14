import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Navbar = ({ setIsOpen }) => {
  return (
    <nav className="py-3 px-6 bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsOpen(prev => !prev)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <FaBars className="h-6 w-6 text-[var(--primary-blue)]" />
          </button>
          <div className="text-2xl font-[CrotahFreeVersionItalic] text-[var(--primary-blue)] hover:text-blue-700 transition-colors duration-200">
            <Link to="/">Skillzy</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
