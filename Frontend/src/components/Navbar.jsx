import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import logo from './logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); 
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("authToken");  
    navigate("/"); 
  };

  const getLinkClassName = (path) => {
    return location.pathname === path ? "text-blue-400" : "text-white hover:text-blue-400";
  };

  return (
    <nav className="fixed top-0 w-full text-white bg-black p-4 shadow-md z-50">
      <div className="flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-8" />
          <Link to="/home"><h1 className="text-lg font-bold">RECOGMOTION</h1></Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          <Link to="/home" className={`${getLinkClassName("/home")} text-sm transition duration-200`}>Home</Link>
          <Link to="/pricing" className={`${getLinkClassName("/pricing")} text-sm transition duration-200`}>Premium</Link> 
          <Link to="/services" className={`${getLinkClassName("/services")} text-sm transition duration-200`}>Service</Link> 
          <Link to="/about" className={`${getLinkClassName("/about")} text-sm transition duration-200`}>About</Link> 
          <Link to="/contact" className={`${getLinkClassName("/contact")} text-sm transition duration-200`}>Contact</Link> 
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm transition duration-200 cursor-pointer" aria-label="Logout">
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden mt-4`}>
        <Link to="/home" className={`${getLinkClassName("/home")} block px-4 py-2 text-sm transition duration-200`}>Home</Link>
        <Link to="/pricing" className={`${getLinkClassName("/pricing")} block px-4 py-2 text-sm transition duration-200`}>Premium</Link>
        <Link to="/services" className={`${getLinkClassName("/services")} block px-4 py-2 text-sm transition duration-200`}>Service</Link>
        <Link to="/about" className={`${getLinkClassName("/about")} block px-4 py-2 text-sm transition duration-200`}>About</Link>
        <Link to="/contact" className={`${getLinkClassName("/contact")} block px-4 py-2 text-sm transition duration-200`}>Contact</Link>
        <button onClick={handleLogout} className="block w-full px-4 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition duration-200 cursor-pointer" aria-label="Logout">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
