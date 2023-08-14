import React, { useEffect } from 'react';
import { VideoDetail } from '../../components';
import { useParams } from 'react-router-dom';

const VideoDetailPage = ({
  videos,
  allProducts,
  allComments,
  postComment,
  fetchComments,
  fetchProductsByVideoId,
}) => {
  const { videoId } = useParams();

  useEffect(() => {
    fetchComments(videoId);
    fetchProductsByVideoId(videoId);
  }, [videoId, fetchComments, fetchProductsByVideoId]);

  const video = videos.find((vid) => vid._id === videoId);
  const videoSrc = `https://www.youtube.com/embed/${video.thumbnail}`;
  const productsForThisVideo = allProducts[videoId] || [];
  const commentsForThisVideo = allComments[videoId] || [];

  return (
    <VideoDetail
      video={video}
      videoSrc={videoSrc}
      products={productsForThisVideo}
      comments={commentsForThisVideo}
      postComment={postComment}
    />
  );
};

export default VideoDetailPage;
