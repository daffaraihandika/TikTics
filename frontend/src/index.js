import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import axios from 'axios'
import Tes from './tes';
import Login from './Components/Account/login';

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: "/",
    element: <Tes />,
  },
  {
    path: "/login",
    element: <Login />,
  },
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
