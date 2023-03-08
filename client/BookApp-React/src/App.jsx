import { Children, useState } from 'react'
import LoginPage from '../Pages/LoginPage'
import DisplayBooks from "../Pages/Books/DisplayBooks"
import SpecificBooks from "../Pages/Books/SpecificBooks"
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
import CreateAuthor from '../Pages/Author/CreateAuthor';
import ViewAuthors from '../Pages/Author/ViewAuthors';
import SpecificAuthor from '../Pages/Author/SpecificAuthor';
import CreateBook from '../Pages/Books/CreateBook';
import EditAuthor from '../Pages/Author/EditAuthor';

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
        },
        {
          path: "viewauthors/:id/createbook/:id",
          element: <CreateBook/>
        },
        {
          path: "viewauthors/:id/editauthor/:id",
          element: <EditAuthor/>
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
