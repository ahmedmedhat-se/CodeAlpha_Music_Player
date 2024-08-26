import React, { useState } from 'react';
import MusicPlayer from './MusicPlayer';
import Community from './Community';

const Homepage = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);

  const handleAddFile = (fileURL, fileName, fileType) => {
    const dateAdded = new Date().toLocaleDateString();
    setUploadedFiles([
      ...uploadedFiles,
      { url: fileURL, name: fileName, type: fileType, dateAdded }
    ]);
  };

  const handleRemoveFile = (fileURL) => {
    setUploadedFiles(uploadedFiles.filter(file => file.url !== fileURL));
    if (fileURL === currentTrack) {
      setCurrentTrack(null);
    }
  };

  const handlePlayTrack = (fileURL) => {
    setCurrentTrack(fileURL);
  };

  return (
    <div className='homepage-container'>
      <h1 className='home-header'>Homepage</h1>
      <div>
        <MusicPlayer onAddFile={handleAddFile} onRemoveFile={handleRemoveFile} />
        <Community />
      </div>
    </div>
  );
};

export default Homepage;
