import React, { Fragment } from 'react';
import { Loading, VideoList } from '../../components';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = ({
  videos,
  fetchProductsByVideoId,
  incrementViewCount,
  loading,
}) => {
  const navigate = useNavigate();

  const handleVideoSelect = (video) => {
    navigate(`/video/${video._id}`);
    fetchProductsByVideoId(video._id);
    incrementViewCount(video._id);
  };

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : videos.length ? (
        <VideoList videos={videos} onVideoSelect={handleVideoSelect} />
      ) : (
        <p className='no-data-available'>Data video masih kosong.</p>
      )}
    </Fragment>
  );
};

export default HomePage;
