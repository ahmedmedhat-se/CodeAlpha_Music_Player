import React, { useState, useRef, useEffect } from 'react';

const MusicPlayer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [pinnedTracks, setPinnedTracks] = useState([]);

  const audioRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current) {
        const percent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(percent);
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', updateProgress);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateProgress);
      }
    };
  }, [currentTrack]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const fileURL = URL.createObjectURL(selectedFile);
      const fileName = selectedFile.name;
      const fileType = selectedFile.type;
      const dateAdded = new Date().toLocaleDateString();

      setUploadedFiles([
        ...uploadedFiles,
        { url: fileURL, name: fileName, type: fileType, dateAdded }
      ]);
      setSelectedFile(null);
      setCurrentTrack(fileURL);
      setIsPlaying(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setProgress(0);
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleRemoveTrack = (url) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.url !== url));
    if (url === currentTrack) {
      stopAudio();
      setCurrentTrack(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
    setPinnedTracks(pinnedTracks.filter((pin) => pin !== url));
  };

  const handlePinTrack = (url) => {
    setPinnedTracks([...pinnedTracks, url]);
  };

  const handleUnpinTrack = (url) => {
    setPinnedTracks(pinnedTracks.filter((pin) => pin !== url));
  };

  return (
    <div className="music-player-container">
      <h1>Music Player</h1>
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="form-control"
        ref={fileInputRef}
      />
      <button onClick={handleUpload} className="btn btn-primary mt-2">
        Upload
      </button>

      <div className="mt-4">
        <h2>Uploaded Music</h2>
        <ul>
          {uploadedFiles.map((file, index) => (
            <li key={index} className="mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <audio ref={audioRef} src={currentTrack}>
                  <source src={file.url} type={file.type} />
                  Your browser does not support the audio element.
                </audio>
                <div className="mt-2 audio-controls">
                  <button
                    onClick={playAudio}
                    className="btn btn-success me-2"
                    disabled={isPlaying || !currentTrack}
                  >
                    Play
                  </button>
                  <button
                    onClick={pauseAudio}
                    className="btn btn-warning me-2"
                    disabled={!isPlaying}
                  >
                    Pause
                  </button>
                  <button
                    onClick={stopAudio}
                    className="btn btn-danger me-2"
                  >
                    Stop
                  </button>
                  <label htmlFor="volume" className="me-2">Volume:</label>
                  <input
                    id="volume"
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="me-2"
                  />
                  <button
                    onClick={() => handlePinTrack(file.url)}
                    className="btn btn-secondary ms-2"
                  >
                    Pin
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <strong>Details :</strong>
                <p>Name : {file.name}</p>
                <p>Type : {file.type}</p>
                <p>Date Added : {file.dateAdded}</p>
              </div>
              <div className="progress mt-2">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <button
                onClick={() => handleRemoveTrack(file.url)}
                className="btn btn-danger mt-2"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h2>Pinned Tracks</h2>
        <ul>
          {pinnedTracks.map((url, index) => (
            <li key={index} className="mb-3">
              <audio controls>
                <source src={url} />
                Your browser does not support the audio element.
              </audio>
              <button
                onClick={() => handleUnpinTrack(url)}
                className="btn btn-secondary mt-2"
              >
                Unpin
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MusicPlayer;
