import React from 'react';
import { FaBrain, FaLock } from 'react-icons/fa'; // Importing icons

const ProjectDetails = () => {
  return (
    <section id="project" className="py-20 px-24 bg-gray-950">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-white">Project Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center ">
          {/* Project Text */}
          <div className="text-left">
            <p className="text-gray-300 text-lg leading-relaxed">
              This project utilizes deep learning techniques to detect visual steganography in images. 
              We aim to provide users with tools to analyze images for hidden data securely, ensuring
              that sensitive information is not being transferred covertly.
            </p>
          </div>

          {/* Icons/Graphics */}
          <div className="flex justify-end space-x-8">
            <div className="flex flex-col items-center">
              <FaBrain className="text-blue-400 text-6xl mb-4" />
              <p className="text-gray-400">Deep Learning</p>
            </div>
            <div className="flex flex-col items-center">
              <FaLock className="text-blue-400 text-6xl mb-4" />
              <p className="text-gray-400">Data Security</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
