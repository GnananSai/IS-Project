import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Social Media Icons

const Footer = () => {
  return (
    <footer className="bg-gray-950 py-12 px-24 border-t-gray-400 border-t-2 ">
      <div className="flex justify-between ">
        
        {/* About Section */}
        <div className='w-1/3'>
          <h3 className="text-2xl font-bold text-white mb-4">Obscura</h3>
          <p className="text-gray-400 leading-relaxed">
            We specialize in detecting hidden data in images through advanced steganography detection tools. 
            Our mission is to make digital content more secure and transparent.
          </p>
        </div>
        
        {/* Navigation Links */}
        <div className="flex flex-col space-y-4 w-fit">
          <h3 className="text-xl font-semibold text-white mb-4 ">Quick Links</h3>
          <a href="#about" className="text-gray-400 hover:text-white transition">About Us</a>
          <a href="#project" className="text-gray-400 hover:text-white transition">Project Details</a>
          <a href="#team" className="text-gray-400 hover:text-white transition">Our Team</a>
          <a href="#upload" className="text-gray-400 hover:text-white transition">Get Started</a>
        </div>

        {/* Social Media Icons */}
        <div className="flex flex-col items-start w-fit">
          <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
              <FaFacebookF size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
              <FaInstagram size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

      </div>
      <div className="text-center text-gray-500 mt-10">
        <p>&copy; {new Date().getFullYear()} Obscura. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
