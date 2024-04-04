import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostForm from './newform';
import PostStream from './poststream';
//import useSWR from 'swr';

// eslint-disable-next-line react/prop-types
const HomePage = ({ navigateToLogin }) => {
  const [posts, setPosts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // get posts when user is logged in
    if (loggedIn) {
      const intervalId = setInterval(() => {
        axios
          .get('/questions')
          .then((response) => setPosts(response.data))
          // eslint-disable-next-line no-console
          .catch((error) => console.error('Error fetching posts:', error));
      }, 2000);

      // clear interval
      return () => clearInterval(intervalId);
    }
  }, [loggedIn]);

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

  /*const { data, error } = useSWR('/api/questions', fetch, {
    refreshInterval: 2000, // Fetch data every 2 seconds
  });

  setPosts(data); // how do i fix this stuff

  if (error) return <div>Error fetching data</div>;
  if (!posts) return <div>Loading...</div>;*/

  return (
    <main className="container max-w-2xl mx-auto mt-6 px-3 mb-4">
      <div className="mb-4">
        {loggedIn ? (
          <>
            <PostForm
              onSubmit={(text) => {
                axios
                  .post('/api/questions/add', text)
                  .then(() => setPosts((prevPosts) => [...prevPosts, text]))
                  // eslint-disable-next-line no-console
                  .catch((error) => console.error('Error posting:', error));
              }}
              clear
            />
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button onClick={navigateToLogin}>Login</button>
        )}
      </div>
      <ul className="flex flex-col gap-4">
          {posts.map((text, index) => (
            <PostStream {...text} key={index} depth={0} />
          ))}
        </ul>
    </main>
  );
};

export default HomePage;
