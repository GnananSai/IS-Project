import React from 'react';
import ImageUpload from './ImageUpload';

const HeroSection = () => {
  return (
    <div id="hero" className="flex flex-col md:flex-row items-center justify-between bg-gray-950 py-44 px-24 mt-18">
      <div className="md:w-1/2">
        <h2 className="text-4xl font-bold text-white mb-6">Welcome to Obscura</h2>
        <p className="text-gray-200 mb-10">
          Discover hidden messages in images and explore the fascinating world of steganography.
        </p>
        <a
          href="#upload"
          className="text-black bg-[#FFE642] py-3 px-5 rounded-lg hover:bg-[#FFD700] transition duration-300"
        >
          Get Started
        </a>
      </div>
      <div className="md:w-1/2 flex justify-end">
        <ImageUpload/> {/* Your image upload component */}
      </div>
    </div>
  );
};

export default HeroSection;
