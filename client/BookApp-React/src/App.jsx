import { Children, useState } from 'react'
import LoginPage from '../Pages/LoginPage'
import DisplayBooks from "../Pages/DisplayBooks"
import SpecificBooks from "../Pages/SpecificBooks"
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  createRoutesFromElements,
} from "react-router-dom";
import './App.css'
import Layout from '../components/Layout.jsx';
import CreateAuthor from '../Pages/CreateAuthor/CreateAuthor';
import ViewAuthors from '../Pages/ViewAuthors';
import SpecificAuthor from '../Pages/SpecificAuthor';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/viewbooks",
          element: <DisplayBooks/>
        },
        {
          path: "/viewbooks/:id",
          element:<SpecificBooks/>
        },
        {
          path: "/createauthor",
          element: <CreateAuthor/>
        },
        {
          path: "/viewauthors",
          element: <ViewAuthors/>
        },
        {
          path: "/viewauthors/:id",
          element: <SpecificAuthor/>
        }
      ]   
    },
    {
      path:"/login",
      element: <LoginPage/>
    },

  ])

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
