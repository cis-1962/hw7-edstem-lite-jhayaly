/* eslint-disable no-console */
/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ navigateToHomePage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await axios.post('/api/account/login', { 
        username: username,
        password: password
      });
      navigateToHomePage();
    } catch (error) {
      console.error('Login failed:', error.response.data);
    }
  };

  return (
    <div className="container max-w-md mx-auto mt-6 px-3">
      <h2 className="title is-2 has-text-white has-text-centered mb-4">Login</h2>
      <div className="field">
        <div className="control">
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button className="button is-info is-fullwidth" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
