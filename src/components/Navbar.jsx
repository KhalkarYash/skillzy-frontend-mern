import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Navbar = ({ setIsOpen }) => {
  return (
    <nav className="py-2 px-4 bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          <FaBars className="h-6 w-6 text-gray-700" />
        </button>
        <div className="text-2xl font-[CrotahFreeVersionItalic] text-[var(--primary-blue)]">
          <Link to="/">Skillzy</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
