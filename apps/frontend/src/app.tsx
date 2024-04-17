import React from 'react';
import HomePage from './homepage';
import Login from './login';
import SignUp from './signup';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  const navigateToHomePage = () => {
    navigate('/');
  };

  const navigateToSignup = () => {
    navigate('/signup');
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
      <Routes>
        <Route
          path="/"
          element={<HomePage navigateToLogin={navigateToLogin} navigateToSignup={navigateToSignup} />}
        />
        <Route
          path="/login"
          element={
            <Login
              navigateToHomePage={navigateToHomePage}
            />
          }
        />
        <Route
          path="/signup"
          element={<SignUp navigateToHomePage={navigateToHomePage} navigateToLogin={navigateToLogin} />}
        />
      </Routes>
  );
};

//using nested routing? createRouter function- 
export default App;
