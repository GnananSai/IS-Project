import React from 'react';

const AboutUs = () => {
  return (
    <section id="about" className="py-20 px-24 bg-gray-900">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-white">About Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* About Us Text */}
          <div className="text-left">
            <p className="text-gray-300 text-lg leading-relaxed">
              We are a team dedicated to uncovering hidden information within images through advanced steganography detection techniques.
              Our mission is to provide innovative solutions for detecting hidden data in digital content and ensuring information security.
            </p>
          </div>

          {/* Image/Illustration Placeholder */}
          <div className="flex justify-end">
            <div className="w-72 h-72 bg-gray-600 rounded-lg shadow-lg">
              <img className='w-72 h-72 bg-gray-600 rounded-lg shadow-lg' src="manipal.png"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
