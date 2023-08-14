import React, { useState, useRef } from 'react';
import './VideoDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import ProductList from '../ProductList/ProductList';
import CommentForm from '../CommentForm/CommentForm';
import CommentList from '../CommentList/CommentList';

const VideoDetail = ({ video, videoSrc, products, comments, postComment }) => {
  const [isClicked, setIsClicked] = useState(false);
  const videoRef = useRef(null);

  if (!video)
    return <div>Pilih video dari daftar untuk melihat detailnya.</div>;

  const handleOverlayClick = () => {
    setIsClicked(true);

    // Memulai pemutaran video dengan YouTube Player API
    if (videoRef.current) {
      const videoIframe = videoRef.current;
      videoIframe.contentWindow.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        '*'
      );
    }
  };

  const handleCommentSubmit = (username, commentText) => {
    postComment(username, video._id, commentText);
  };

  return (
    <div className='video-detail'>
      <div className='iframe-container'>
        <iframe
          ref={videoRef}
          title='video player'
          className='video-player'
          src={videoSrc + '?autoplay=1&enablejsapi=1'}
          allowFullScreen
        />
        <h2 className='video-title'>{video.title}</h2>
        {!isClicked && (
          <div className='iframe-overlay' onClick={handleOverlayClick}></div>
        )}
      </div>
      <p className='video-description'>
        <FontAwesomeIcon className='icon-desc' icon={faUserCheck} />{' '}
        <span>{video.description}</span>
      </p>
      <h2 className='product-title'>Product List</h2>
      {products && products.length > 0 ? (
        <ProductList products={products} />
      ) : (
        <p className='product-paragraph'>Data produk masih kosong.</p>
      )}
      <h2 className='comment-title'>Comment List</h2>
      {comments && comments.length > 0 ? (
        <CommentList comments={comments} />
      ) : (
        <p className='comment-paragraph'>Data komentar masih kosong.</p>
      )}
      <CommentForm onCommentSubmit={handleCommentSubmit} />
    </div>
  );
};

export default VideoDetail;
