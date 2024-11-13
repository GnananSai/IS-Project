import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  // Remove the selected image
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreviewUrl('');
  };

  // Handle image upload
  const handleUpload = async () => {
    if (!selectedImage) {
      alert('Please select an image first.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      const response = await axios.post('http://localhost:5000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { probabilities, steganography_probability } = response.data;

      // Navigate to the results page with the received data
      navigate('/results', {
        state: {
          imageUrl: imagePreviewUrl,
          probabilities,
          steganographyProbability: steganography_probability,
        },
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('An error occurred while processing the image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 py-12 rounded-lg shadow-lg w-full max-w-md text-center mt-12 ml-16">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <img src="/spinner.png" alt="Loading" className="w-24 h-24 animate-spin" />
        </div>
      )}
      {!loading && (
        <>
          <h1 className="text-3xl font-bold mb-6 text-white">Upload Your Image</h1>

          {/* Image preview section with remove button */}
          {imagePreviewUrl && (
            <div className="relative mb-4">
              <img
                src={imagePreviewUrl}
                alt="Selected Preview"
                className="w-full h-64 object-contain mx-auto rounded-lg shadow-lg"
              />
              {/* Remove button (X) */}
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center focus:outline-none hover:bg-red-600 transition duration-300"
              >
                &times;
              </button>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-yellow-400 file:text-gray-900 hover:file:bg-yellow-500 transition duration-300 mb-4"
          />

          {selectedImage && (
            <p className="text-gray-400 mb-4">{selectedImage.name}</p>
          )}

          <button
            onClick={handleUpload}
            className="mt-4 bg-yellow-400 text-black py-3 px-6 rounded-lg hover:bg-yellow-500 transition duration-300 w-full font-bold"
          >
            Upload and Analyze
          </button>
        </>
      )}
    </div>
  );
};

export default ImageUpload;
