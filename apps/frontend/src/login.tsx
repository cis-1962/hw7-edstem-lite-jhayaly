import React, { useState } from 'react';
import axios from 'axios';
//import * as React from "react";
/*import * as ReactDOM from "react-dom";
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import Root, { rootLoader } from "./routes/root";
import Team, { teamLoader } from "./routes/team";*/

// eslint-disable-next-line react/prop-types
const Login = ({ navigateToHomePage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
        await axios.post('/account/login', {  // Changed from '/account/login'
        username: username,
        password: password
    });
      // Redirect to home page after successful login
      navigateToHomePage();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Login failed:', error.response.data);
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
      <button onClick={handleLogin} >Login</button>
      
    </div>
  );
};

export default Login;

/*const router = createHashRouter([
    {
      path: "/login",
      element: <Login navigateToHomePage={undefined} />,
      loader: rootLoader,
      children: [
      ],
    },
  ]);
  
  ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
  );

//<button onClick={navigateToSignup}>Sign Up</button>*/