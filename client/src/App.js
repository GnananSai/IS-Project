import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* You can add a Navbar here if needed */}
      <Outlet /> {/* This renders the matched child route */}
    </div>
  );
};

export default App;
