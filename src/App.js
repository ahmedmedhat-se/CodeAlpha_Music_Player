import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Homepage from './Homepage';
import MusicPlayer from './MusicPlayer';
import Community from './Community';
import Footer from './Footer';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path='/CodeAlpha_Music_Player' element={<Homepage />} />
            <Route path='/' element={<Homepage />} />
            <Route path='/music-player' element={<MusicPlayer />} />
            <Route path='/Community' element={<Community />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
