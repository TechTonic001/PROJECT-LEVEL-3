import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx'
import Signup from './Signup.jsx';
import Signin from './Signin.jsx';


const router = createBrowserRouter([
  { path: '/page', element: <App /> },
  { path: '/signup', element: <Signup /> },
  { path: '/login', element: <Signin /> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </StrictMode>
)