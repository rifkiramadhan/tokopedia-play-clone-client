import React, { Fragment } from 'react';
import { VideoList } from '../../components';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ videos, fetchProductsByVideoId, incrementViewCount }) => {
  const navigate = useNavigate();

  const handleVideoSelect = (video) => {
    navigate(`/video/${video._id}`);
    fetchProductsByVideoId(video._id);
    incrementViewCount(video._id);
  };

  return (
    <Fragment>
      {videos.length ? (
        <VideoList videos={videos} onVideoSelect={handleVideoSelect} />
      ) : (
        <p style={{ height: '100vh' }}>Data tidak tersedia</p>
      )}
    </Fragment>
  );
};

export default HomePage;
