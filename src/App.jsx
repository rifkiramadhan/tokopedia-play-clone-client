import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Footer, Loading, Error } from './components';
import { HomePage, VideoDetailPage } from './pages';
import useDataFetch from './hooks/useDataFetch';
import BASE_URL from './config/Config';

function App() {
  const [activeTabId, setActiveTabId] = useState(null);
  const [viewedVideos, setViewedVideos] = useState(new Set());
  const [comments, setComments] = useState({});
  const [products, setProducts] = useState({});
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [categoryResults, setCategoryResults] = useState(null);

  const { data: videos, loading: videosLoading } = useDataFetch(
    `${BASE_URL}/videos`
  );
  const { data: categories, loading: categoriesLoading } = useDataFetch(
    `${BASE_URL}/categories`
  );

  const displayedVideos = searchResults || categoryResults || videos;

  const handleSearch = async (query) => {
    if (query) {
      try {
        const response = await axios.get(
          `${BASE_URL}/videos/search?search=${query}`
        );
        setSearchResults(response.data);
        setCategoryResults(null);
      } catch (error) {
        setError(error);
      }
    } else {
      setSearchResults(null);
    }
  };

  const incrementViewCount = async (videoId) => {
    try {
      if (!viewedVideos.has(videoId)) {
        await axios.get(`${BASE_URL}/videos/${videoId}/views`);

        // Update state setelah video dilihat
        setViewedVideos((prev) => new Set([...prev, videoId]));

        // Update jumlah view pada video di state
        const updatedVideos = displayedVideos.map((video) => {
          if (video._id === videoId) {
            return {
              ...video,
              views: video.views + 1,
            };
          }
          return video;
        });

        // Update hasil pencarian atau kategori sesuai konteks saat ini
        if (searchResults) {
          setSearchResults(updatedVideos);
        } else if (categoryResults) {
          setCategoryResults(updatedVideos);
        }
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
      setCategoryResults(response.data);
      setSearchResults(null);
    } catch (error) {
      setError(error);
    }
  };

  const handleCategorySelect = (categoryId) => {
    fetchVideosByCategory(categoryId);
    setActiveTabId(categoryId);
  };

  if (videosLoading || categoriesLoading) return <Loading />;
  if (error) return <Error>Error: {error.message}</Error>;

  return (
    <Router>
      <div className='App'>
        <Navbar
          tabs={categories}
          onTabClick={handleCategorySelect}
          onSearch={handleSearch}
          activeTabId={activeTabId}
        />{' '}
        <Routes>
          <Route
            path='/'
            element={
              <HomePage
                videos={displayedVideos}
                fetchProductsByVideoId={fetchProductsByVideoId}
                incrementViewCount={incrementViewCount}
                loading={categoriesLoading}
              />
            }
          />
          <Route
            path='/video/:videoId'
            element={
              <VideoDetailPage
                videos={displayedVideos}
                allProducts={products}
                allComments={comments}
                postComment={postComment}
                fetchComments={fetchCommentsByVideoId}
                fetchProductsByVideoId={fetchProductsByVideoId}
                loading={videosLoading}
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
