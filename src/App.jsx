import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Footer, Loading, Error } from './components';
import { HomePage, VideoDetailPage } from './pages';
import BASE_URL from './config/Config';

function App() {
  const [viewedVideos, setViewedVideos] = useState(new Set());
  const [comments, setComments] = useState({});
  const [products, setProducts] = useState({});
  const [categories, setCategories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(BASE_URL);
    const fetchData = async () => {
      try {
        const videosResponse = await axios.get(`${BASE_URL}/videos`);
        const categoriesResponse = await axios.get(`${BASE_URL}/categories`);

        setVideos(videosResponse.data);
        setCategories(categoriesResponse.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async (query) => {
    if (query) {
      try {
        const response = await axios.get(
          `${BASE_URL}/videos/search?search=${query}`
        );
        setVideos(response.data);
      } catch (error) {
        setError(error);
      }
    } else {
      const videosResponse = await axios.get(`${BASE_URL}/videos`);
      setVideos(videosResponse.data);
    }
  };

  const incrementViewCount = async (videoId) => {
    try {
      if (!viewedVideos.has(videoId)) {
        await axios.get(`${BASE_URL}/videos/${videoId}/views`);

        // Update state setelah video dilihat
        setViewedVideos((prev) => new Set([...prev, videoId]));

        // Update jumlah view pada video di state
        setVideos((prevVideos) => {
          return prevVideos.map((video) => {
            if (video._id === videoId) {
              return {
                ...video,
                views: video.views + 1,
              };
            }
            return video;
          });
        });
      }
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  };

  const postComment = async (username, videoId, commentText) => {
    try {
      const response = await axios.post(`${BASE_URL}/comments`, {
        username,
        comment: commentText,
        videoID: videoId,
      });
      if (response.data && response.data.success) {
        setComments((prevComments) => ({
          ...prevComments,
          [videoId]: [...(prevComments[videoId] || []), response.data.comment],
        }));
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const fetchCommentsByVideoId = async (videoId) => {
    try {
      const response = await axios.get(`${BASE_URL}/comments/${videoId}`);
      setComments((prevComments) => ({
        ...prevComments,
        [videoId]: response.data,
      }));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const fetchProductsByVideoId = async (videoId) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/${videoId}`);
      setProducts((prevProducts) => ({
        ...prevProducts,
        [videoId]: response.data,
      }));
    } catch (error) {
      setError(error);
    }
  };

  const fetchVideosByCategory = async (categoryId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/videos/category/${categoryId}`
      );
      setVideos(response.data);
    } catch (error) {
      setError(error);
    }
  };

  const handleCategorySelect = (categoryId) => {
    fetchVideosByCategory(categoryId);
  };

  if (loading) return <Loading />;
  if (error) return <Error>Error: {error.message}</Error>;

  return (
    <Router>
      <div className='App'>
        <Navbar
          tabs={categories}
          onTabClick={handleCategorySelect}
          onSearch={handleSearch}
        />{' '}
        <Routes>
          <Route
            path='/'
            element={
              <HomePage
                videos={videos}
                fetchProductsByVideoId={fetchProductsByVideoId}
                incrementViewCount={incrementViewCount}
              />
            }
          />
          <Route
            path='/video/:videoId'
            element={
              <VideoDetailPage
                videos={videos}
                allProducts={products}
                allComments={comments}
                postComment={postComment}
                fetchComments={fetchCommentsByVideoId}
                fetchProductsByVideoId={fetchProductsByVideoId}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
