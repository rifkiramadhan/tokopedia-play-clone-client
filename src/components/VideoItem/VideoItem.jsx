import React from 'react';
import './VideoItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faTag } from '@fortawesome/free-solid-svg-icons';

const VideoItem = ({ video, onVideoSelect, isSelected }) => {
  return (
    <div
      className={`video-item ${isSelected ? 'selected' : ''}`}
      onClick={() => onVideoSelect(video)}
    >
      <div className='video-thumbnail'>
        <img src={video.urlImage} alt={video.title} />
        <div className='text-live'>
          <p className='live'>LIVE</p>
          <p className='views'>
            <FontAwesomeIcon icon={faEye} /> {video.views}
          </p>
        </div>
        <div className='video-text'>
          <div className='text-promo'>
            <p className='promo'>Hanya saat LIVE</p>
            <p className='kupon'>
              <FontAwesomeIcon icon={faTag} /> Kupon Spesial
            </p>
            <h4>{video.title}</h4>
            <p>{video.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
