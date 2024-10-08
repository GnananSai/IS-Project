import React from 'react';
import { Link } from 'react-scroll';

const Navbar = () => {
  return (
    <nav className="bg-black shadow-lg px-16 fixed top-0 z-10 w-full">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className='flex gap-4'>
          <img className="w-8" src="/image.png" alt=""/>
          <h1 className="text-white text-2xl font-bold">Obscura</h1>
        </div>
        <div className="hidden md:flex space-x-6 items-center font-bold">
          <Link to="about" smooth={true} className="text-white hover:text-blue-200 cursor-pointer">
            About Us
          </Link>
          <Link to="team" smooth={true} className="text-white hover:text-blue-200 cursor-pointer">
            Our Team
          </Link>
          <Link to="project" smooth={true} className="text-white hover:text-blue-200 cursor-pointer">
            Project Details
          </Link>
          <Link to="hero" smooth={true} className="text-black bg-[#FFE642] py-2 px-3 rounded-md hover:text-blue-200 cursor-pointer">
            Upload Image
          </Link>
        </div>
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
