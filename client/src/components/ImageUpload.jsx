import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      alert('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await axios.post('http://localhost:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data.message);
    } catch (error) {
      setResult('Error: Could not analyze the image.');
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreviewUrl('');
    setResult('');
  };

  return (
    <div className="bg-gray-800 p-6  py-12 rounded-lg shadow-lg w-full max-w-md text-center">
      <h1 className="text-3xl font-bold mb-4 text-white">Upload Your Image</h1>
      <p className="text-gray-300 mb-6">Check for hidden messages in your images.</p>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#FFE642] file:text-gray-900 hover:file:bg-[#FFD700] transition duration-300"
      />

      {selectedImage && (
        <div className="mt-4 flex justify-between items-center">
          <span className="text-gray-200">{selectedImage.name}</span>
          <button
            onClick={handleRemoveImage}
            className="text-red-500 text-lg font-semibold hover:text-red-700"
          >
            ✕
          </button>
        </div>
      )}

      <button
        onClick={handleUpload}
        className="mt-6 bg-[#FFE642] text-black py-3 px-6 rounded-lg hover:bg-[#FFD700] transition duration-300 w-full font-bold"
      >
        Upload and Check
      </button>

      {imagePreviewUrl && (
        <div className="mt-6">
          <img
            src={imagePreviewUrl}
            alt="Selected"
            className="w-full h-auto rounded-lg shadow-lg border border-gray-300"
          />
        </div>
      )}

      {result && (
        <div className="mt-6 p-4 bg-green-100 text-green-700 border border-green-400 rounded-lg">
          {result}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
