import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State to hold image data
  const [imageData, setImageData] = useState(null);

  // Function to retrieve image data from localStorage
  const getImageDataFromLocalStorage = () => {
    const savedData = JSON.parse(localStorage.getItem('imageData'));
    if (savedData) {
      setImageData(savedData);
    }
  };

  // Check if data is in localStorage on component mount
  useEffect(() => {
    getImageDataFromLocalStorage();
  }, []);

  // If no data is available, fallback to location state
  useEffect(() => {
    if (location.state) {
      const { imageUrl, probabilities, steganographyProbability } = location.state;
      const data = { imageUrl, probabilities, steganographyProbability };
      setImageData(data);
      // Save data to localStorage for future reloads
      localStorage.setItem('imageData', JSON.stringify(data));
    }
  }, [location.state]);

  const handleReupload = () => {
    navigate('/');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  // Function to get the highest algorithm, excluding 'cover'
  const getHighestAlgorithm = (probs) => {
    if (!probs) return 'None';

    // Sort probabilities and filter out 'cover'
    const sortedProbs = Object.entries(probs)
      .sort((a, b) => b[1] - a[1]);

    // Check if 'cover' has the highest probability
    if (sortedProbs[0][0].toLowerCase() === 'cover') {
      return ['None', 0];
    }

    return sortedProbs.length > 0 && sortedProbs[0][1] > 0 ? sortedProbs[0] : ['None', 0];
  };

  const [highestAlgorithm, highestProb] = getHighestAlgorithm(imageData?.probabilities);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      {/* Back Button */}
      <button
        onClick={handleGoHome}
        className="fixed top-8 left-8 text-white text-2xl hover:text-yellow-400 transition-colors duration-200"
      >
        &#8592; Home
      </button>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mt-12 mb-10">
        Analysis Results
      </h1>

      {/* Main Container */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Display Card */}
        {imageData?.imageUrl && (
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-xl font-semibold text-yellow-400 mb-4">Uploaded Image</h2>
            <img
              src={imageData.imageUrl}
              alt="Uploaded"
              className="w-auto h-auto max-h-44 rounded-lg object-cover shadow-lg"
            />
          </div>
        )}

        {/* Steganography Likelihood Card */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-yellow-400 mb-4">
            Likelihood of Steganography
          </h2>
          <div className="flex justify-center items-center">
            <div className="w-40 h-40">
              <CircularProgressbar
                value={parseFloat(imageData?.steganographyProbability) * 100}
                text={`${(imageData?.steganographyProbability * 100).toFixed(1)}%`}
                styles={buildStyles({
                  textColor: '#FFE642',
                  pathColor: '#FFD700',
                  trailColor: '#333',
                })}
              />
            </div>
          </div>
          <p className="mt-6 text-center text-lg font-medium text-white">
            {`${(imageData?.steganographyProbability * 100).toFixed(1)}% likelihood of steganography detected.`}
          </p>
        </div>

        {/* Analysis Summary Card */}
        <div className="col-span-1 md:col-span-2 bg-gray-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-yellow-400 mb-4">Analysis Summary</h2>
          <p className="text-sm text-gray-300">
            {highestAlgorithm !== 'None'
              ? (
                <>
                  Based on the analysis, the most likely steganography algorithm being used is 
                  <span className="font-bold"> "{highestAlgorithm}" </span>
                  with a confidence of 
                  <span className="font-bold"> {(highestProb * 100).toFixed(1)}% </span>.
                </>
              )
              : <span className="font-bold">There is most likely no steganography involved with this image.</span>}
          </p>
        </div>

        {/* Class Probabilities Card */}
        <div className="col-span-1 md:col-span-2 bg-gray-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-yellow-400 mb-4">Class Probabilities</h2>
          <div className="grid grid-cols-2 gap-4">
            {imageData?.probabilities &&
              Object.entries(imageData.probabilities)
                .sort(([classA, probA], [classB, probB]) => probB - probA) // Sort class probabilities
                .map(([className, prob]) => (
                  <div key={className} className="text-white flex justify-between">
                    <span className="font-bold text-yellow-300">{className}</span>
                    <span>{(prob * 100).toFixed(1)}%</span>
                  </div>
                ))}
          </div>

          {/* Detected Algorithm */}
          {highestAlgorithm !== 'None' && (
            <div className="mt-6 flex justify-end">
              <p className="text-lg font-bold text-yellow-400">
                Detected Algorithm: 
                <span className="text-yellow-300 font-bold"> {highestAlgorithm} </span>
                ({(highestProb * 100).toFixed(1)}%)
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Reupload Button */}
      <div className="mt-12">
        <button
          onClick={handleReupload}
          className="bg-yellow-500 text-black py-3 px-8 rounded-lg hover:bg-yellow-600 transition duration-300 font-bold shadow-lg"
        >
          Reupload Image
        </button>
      </div>
    </div>
  );
};

export default Results;
