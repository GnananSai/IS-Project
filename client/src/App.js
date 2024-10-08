import React from 'react';
import Navbar from './components/Navbar';
import AboutUs from './components/AboutUs';
import Team from './components/Team';
import ProjectDetails from './components/ProjectDetails';
import HeroSection from './components/Hero';
import Footer from './components/Footer';

function App() {
  return (
    <div className=''>
      <Navbar />
      <HeroSection/>
      <AboutUs />
      <Team />
      <ProjectDetails /> 
      <Footer/>
    </div>
  );
}

export default App;
