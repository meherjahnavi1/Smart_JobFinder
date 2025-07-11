import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 bg-white/70 backdrop-blur-md z-50 shadow-sm px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-primary">JobFinder</div>

      {/* Desktop Nav */}
      <div className="space-x-6 hidden md:flex items-center">
        <a href="#about" className="text-gray-700 hover:text-primary">ABOUT US</a>
        <a href="#how" className="text-gray-700 hover:text-primary">HOW IT WORKS</a>
        <a href="#faq" className="text-gray-700 hover:text-primary">FAQ</a>
        <Link to="/auth/login">
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition">
            TRY IT NOW
          </button>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-2xl text-gray-700" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white/95 backdrop-blur-md shadow-md px-6 py-4 flex flex-col space-y-4 md:hidden">
          <a href="#about" className="text-gray-700 hover:text-primary">ABOUT US</a>
          <a href="#how" className="text-gray-700 hover:text-primary">HOW IT WORKS</a>
          <a href="#faq" className="text-gray-700 hover:text-primary">FAQ</a>
          <Link to="/auth/login">
            <button className="bg-primary text-white w-full py-2 rounded-md mt-2">
              TRY IT NOW
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
