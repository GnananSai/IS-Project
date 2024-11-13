import React from 'react';
import Navbar from './Navbar';
import AboutUs from './AboutUs';
import Team from './Team';
import ProjectDetails from './ProjectDetails';
import HeroSection from './Hero';
import Footer from './Footer';

function Home() {
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

export default Home;
