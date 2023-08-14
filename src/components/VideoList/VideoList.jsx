import React from 'react';
import VideoItem from '../VideoItem/VideoItem';
import './VideoList.css';

const VideoList = ({ videos, onVideoSelect, selectedVideo }) => {
  return (
    <div className='video-list-container'>
      <div className='video-list'>
        {videos.map((video) => (
          <VideoItem
            key={video._id}
            video={video}
            onVideoSelect={onVideoSelect}
            isSelected={video === selectedVideo}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoList;
