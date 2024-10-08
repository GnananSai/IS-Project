import React from 'react';

const Team = () => {
  return (
    <section id="team" className="py-20 px-24 bg-gray-950">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-white">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="mb-4">
              {/* Placeholder for team member image */}
              <div className="w-24 h-24 mx-auto bg-gray-600 rounded-full"></div>
            </div>
            <h3 className="text-xl font-semibold text-white">Gnana Sai Pendyala</h3>
            <p className="text-gray-400">Role: Developer</p>
          </div>

          {/* Team Member 2 */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="mb-4">
              {/* Placeholder for team member image */}
              <div className="w-24 h-24 mx-auto bg-gray-600 rounded-full"></div>
            </div>
            <h3 className="text-xl font-semibold text-white">Rohit Sangubotla</h3>
            <p className="text-gray-400">Role: Machine Training</p>
          </div>

          {/* Team Member 3 */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="mb-4">
              {/* Placeholder for team member image */}
              <div className="w-24 h-24 mx-auto bg-gray-600 rounded-full"></div>
            </div>
            <h3 className="text-xl font-semibold text-white">Vidhu Sri Varenya</h3>
            <p className="text-gray-400">Role: Machine Training</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Team;
