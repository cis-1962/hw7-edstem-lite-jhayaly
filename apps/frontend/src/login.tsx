import React, { useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const Login = ({ navigateToSignup, navigateToHomePage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const fieldsInvalid = !(username.trim().length && password.trim().length);

  const handleLogin = async () => {
    try {
      await axios.post('/login', {
        // Changed from '/account/login'
        username: username,
        password: password,
      });
      // Redirect to home page after successful login
      navigateToHomePage();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Login failed:', error);
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
      <button onClick={handleLogin} disabled={fieldsInvalid}>
        Login
      </button>
      <button onClick={navigateToSignup}>Sign Up</button>
    </div>
  );
};

export default Login;
