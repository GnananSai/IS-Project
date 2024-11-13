import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure data received from the ImageUpload component
  const { imageUrl, probabilities, steganographyProbability } = location.state || {};

  const handleReupload = () => {
    navigate('/');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black p-6 relative">
      {/* Back Button */}
      <button
        onClick={handleGoHome}
        className="fixed top-16 left-16 bg-transparent text-white text-5xl hover:text-yellow-500 transition duration-300 font-bold z-20"
      >
        &#8592;
      </button>

      <div className="flex flex-col items-center justify-center pt-16">
        <h1 className="text-4xl font-bold mb-16 text-white">Analysis Results</h1>

        <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
          {/* Image Section */}
          {imageUrl && (
            <div className="w-1/2 pr-8">
              <img
                src={imageUrl}
                alt="Uploaded"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Results Section */}
          <div className="w-1/2 text-white">
            <div className="bg-gray-800 p-6 rounded-lg mb-8 shadow-lg">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">Likelihood of Steganography</h2>
              <div className="w-48 h-48 mx-auto mb-6">
                <CircularProgressbar
                  value={parseFloat(steganographyProbability) * 100}
                  text={`${(steganographyProbability * 100).toFixed(2)}%`}
                  styles={buildStyles({
                    textColor: '#FFE642',
                    pathColor: '#FFD700',
                    trailColor: '#333',
                  })}
                />
              </div>
              <p className="text-xl text-green-400">
                {(steganographyProbability * 100).toFixed(2)}% Likelihood of Steganography detected.
              </p>
            </div>

            {/* Probabilities Section */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">Class Probabilities</h2>
              {probabilities && Object.entries(probabilities).map(([className, prob]) => (
                <p key={className} className="text-lg text-white">
                  {className}: {(prob * 100).toFixed(2)}%
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Reupload Button */}
        <div className="w-full max-w-4xl mx-auto mt-8 flex justify-center">
          <button
            onClick={handleReupload}
            className="bg-yellow-400 text-black py-3 px-6 rounded-lg hover:bg-yellow-500 transition duration-300 font-bold"
          >
            Reupload Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
