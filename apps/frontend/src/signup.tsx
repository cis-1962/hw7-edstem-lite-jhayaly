/* eslint-disable react/prop-types */
/* eslint-disable no-console */

import React, { useState } from 'react';
import axios from 'axios';

const SignUp = ({ navigateToHomePage, navigateToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await axios.post('/api/account/signup', {
        username: username,
        password: password,
      });
      navigateToHomePage();
    } catch (error) {
      console.error('Sign up failed:', error.response.data);
    }
  };

  return (
    <div className="container max-w-md mx-auto mt-6 px-3">
      <h2 className="title is-2 has-text-white has-text-centered mb-4">Sign Up</h2>
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
          <button className="button is-info is-fullwidth" onClick={handleSignUp}>Sign Up</button>
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button className="button is-text is-fullwidth" onClick={navigateToLogin}>Already have an account? Log in!</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

