import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './App';
import ImageUpload from './components/ImageUpload';
import Results from './components/Results';
import Home from './components/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>, // This is your main layout
    children: [
      {
        index: true, // This will render for the root path "/"
        element: <Home/>,
      },
      {
        path: 'results', // Route for "/results"
        element: <Results />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
