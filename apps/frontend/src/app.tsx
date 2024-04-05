import React from 'react';
import HomePage from './homepage';
//import { useState } from 'react';
import Login from './login';
import SignUp from './signup';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
//import * as express from 'express';
//import * as cors from 'cors';

//const express = require('express')
//var cors = require('cors')
/*const app = express()
 
app.use(cors())
 
app.get('/products/:id', (req, res) => {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})
 
app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('CORS-enabled web server listening on port 80')
})*/

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
              //navigateToSignup={navigateToSignup}
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

export default App;
