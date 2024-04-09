/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostForm from './newform';
import PostStream from './poststream';

const HomePage = ({ navigateToLogin, navigateToSignup }) => {
  const [posts, setPosts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const fetchPosts = () => {
    const intervalId = setInterval(() => {
      axios.get('/api/questions/questions')
        .then(response => setPosts(response.data))
        .catch(error => console.error('Error fetching posts:', error));
    }, 2000);
    return () => clearInterval(intervalId);
  };

  useEffect(() => {
    axios.get('/api/account/loggedin')
      .then(response => {
        if (response.data.loggedIn) {
          setLoggedIn(true);
          fetchPosts();
        }
      })
      .catch(error => {
        console.error('Error checking login status:', error);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('api/account/logout');
      setLoggedIn(false);
      navigateToLogin();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handlePostSubmit = async (newPost) => {
    try {
      await axios.post('/api/questions/add', { 
        questionText: newPost, 
        answer: null,
        author: null
      }); 
      setPosts((prevPosts) => [...prevPosts, newPost]);
    } catch (err) {
      console.error('Error posting:', err.response);
    }
  };

  return (
    <main className="container max-w-2xl mx-auto mt-6 px-3 mb-4">
      {loggedIn && (
        <div className="mb-4">
          <button className="button is-info" onClick={handleLogout}>Logout</button>
        </div>
      )}
      <div className="mb-4">
        {loggedIn ? (
          <div>
            <h2 className="title is-2 has-text-white has-text-weight-bold mb-2">Post Form</h2>
            <PostForm
              onSubmit={handlePostSubmit}
              clear
            />
          </div>
        ) : (
          <div className="mb-4">
            <button className="button is-info mr-2" onClick={navigateToLogin}>Login</button>
            <button className="button is-info" onClick={navigateToSignup}>Signup</button>
          </div>
        )}
        <h2 className="title is-2 has-text-white has-text-weight-bold mb-2">Post Stream</h2>
          <ul className="posts-list">
            {posts.map((post, index) => (
              <PostStream post={post} key={index} /> 
            ))}
          </ul>
      </div>
    </main>
  );
};

export default HomePage;
