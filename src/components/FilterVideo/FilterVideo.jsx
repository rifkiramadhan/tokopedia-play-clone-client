import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './FilterVideo.css';

const FilterVideo = ({ onSearch, setIsSearching }) => {
  return (
    <div className='filter-container'>
      <button className='icon-btn' onClick={() => setIsSearching(false)}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <input
        type='text'
        placeholder='Cari video yang mau ditonton'
        onChange={(e) => onSearch(e.target.value)}
        className='search-input expanded'
        autoFocus
      />
    </div>
  );
};

export default FilterVideo;
