import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostForm from './newform';
import PostStream from './poststream';

// eslint-disable-next-line react/prop-types
const HomePage = ({ navigateToLogin, navigateToSignup }) => {
  const [posts, setPosts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);

  const fetchPosts = () => {
    const intervalId = setInterval(() => {
      axios.get('/api/questions')
        .then(response => setPosts(response.data))
        // eslint-disable-next-line no-console
        .catch(error => console.error('Error fetching posts:', error));
    }, 2000);

    return () => clearInterval(intervalId);
  };

  useEffect(() => {
    // Check if user is logged in
    axios.get('/loggedin')
      .then(response => {
        if (response.data.loggedIn) {
          setLoggedIn(true);
          fetchPosts();
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Error checking login status:', error);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/logout');
      setLoggedIn(false);
      navigateToLogin();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Logout failed:', error);
    }
  };

  return (
    <main className="container max-w-2xl mx-auto mt-6 px-3 mb-4">
      <div className="mb-4">
        {loggedIn ? (
          <>
          <h2 className="text-xl font-semibold mb-2">Post Form</h2>
            <PostForm
              onSubmit={(text) => {
                axios
                  .post('/question/add', text)
                  .then(() => setPosts((prevPosts) => [...prevPosts, text]))
                  // eslint-disable-next-line no-console
                  .catch((error) => console.error('Error posting:', error.response.data));
              }}
              clear
            />
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button onClick={navigateToLogin}>Login</button>
        )}
        <button onClick={navigateToSignup}>Signup</button>
      </div>
      <h2 className="text-xl font-semibold mb-2">Post Stream</h2>
      <ul className="flex flex-col gap-4">
        {posts.map((text, index) => (
          <PostStream {...text} key={index} depth={0} />
        ))}
      </ul>
    </main>
  );
};

export default HomePage;