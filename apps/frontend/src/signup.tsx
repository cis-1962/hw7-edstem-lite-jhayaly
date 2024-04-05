import React, { useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const SignUp = ({ navigateToHomePage, navigateToLogin }) => {
  const [user, setUsername] = useState('');
  const [pass, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await axios.post('api/signup', {
        username: user,
        password: pass,
      });
      navigateToHomePage();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Sign up failed:', error.response.data);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={user}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={pass}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSignUp}>
        Sign Up
      </button>
      <button onClick={navigateToLogin}>Already have an account? Log in! </button>
    </div>
  );
};

export default SignUp;
