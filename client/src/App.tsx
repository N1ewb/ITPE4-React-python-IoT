import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./layouts/layout";
import VideoStream from "./pages/VideoStream";
import Authlayout from "./layouts/Authlayout";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import LandingPage from "./pages/LandingPage";

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <LandingPage />
        },
        {
          path: '/Video-stream',
          element: <VideoStream />
        },
        {
          path: '/auth',
          element: <Authlayout />,
          children: [
            {
              path: '/auth/Login',
              element: <Login />
            },
            {
              path: '/auth/Signup',
              element: <Signup />
            }
          ]
        }
      ]
    },

  ])
  
  return (
    <RouterProvider router={router} />
  );
}

export default App;
