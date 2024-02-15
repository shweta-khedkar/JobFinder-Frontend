import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import UserAuthorize from './Components/UserAuthorize.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import AddJob from './Pages/AddJob.jsx';
import ViewJob from './Pages/ViewJob.jsx';
import UpdateJob from './Pages/UpdateJob.jsx';
import NotFound from './Pages/NotFound.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "signin",
        element: (
          <UserAuthorize authentication={false}>
            <Login />
          </UserAuthorize>
        ),
      },
      {
        path: "signup",
        element: (
          <UserAuthorize authentication={false}>
            <Register />
          </UserAuthorize>
        ),
      },
      {
        path:"*",
        element:<NotFound/>
           },
      {
        path: "job",
        children: [
          {
            path: "add",
            element: (
              <UserAuthorize>
                <AddJob />
              </UserAuthorize>
            ),
          },
          {
            path: "view/:jobId",
            element: <ViewJob />,
          },
          {
            path: "edit/:jobId",
            element: (
              <UserAuthorize>
                <UpdateJob />
              </UserAuthorize>
            ),
          },
        ],
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router}/>
  </React.StrictMode>,
)
