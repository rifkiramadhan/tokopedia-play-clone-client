import React, { Fragment, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import FilterVideo from '../FilterVideo/FilterVideo';
import FilterTab from '../FilterTab/FilterTab';

const Navbar = ({ tabs, onTabClick, onSearch }) => {
  const [isSearching, setIsSearching] = useState(false);
  const location = useLocation();

  // Jika di halaman VideoDetail, jangan tampilkan FilterTab atau FilterVideo
  if (location.pathname.includes('/video/')) {
    return (
      <div className='navbar'>
        <h1>
          <Link className='navbar-link' to='/'>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>{' '}
          Play
        </h1>
      </div>
    );
  }

  return (
    <Fragment>
      <div className='navbar'>
        {isSearching ? (
          <FilterVideo onSearch={onSearch} setIsSearching={setIsSearching} />
        ) : (
          <>
            <h1>
              <Link className='navbar-link' to='/'>
                <FontAwesomeIcon icon={faArrowLeft} />
              </Link>{' '}
              Play
            </h1>
            <button className='icon-btn' onClick={() => setIsSearching(true)}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </>
        )}
      </div>
      {!isSearching && (
        <div className='navbar-tab'>
          <FilterTab tabs={tabs} onTabClick={onTabClick} />
        </div>
      )}
    </Fragment>
  );
};

export default Navbar;
