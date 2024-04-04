import React, { useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const SignUp = ({ navigateToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const fieldsInvalid = !(username.trim().length && password.trim().length);

  const handleSignUp = async () => {
    try {
      await axios.post('/signup', {
        // Changed from '/account/signup'
        username: username,
        password: password,
      });
      // Redirect to login page after successful sign up
      navigateToLogin();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Sign up failed:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSignUp} disabled={fieldsInvalid}>
        Sign Up
      </button>
      <button onClick={navigateToLogin}>Login</button>
    </div>
  );
};

export default SignUp;
