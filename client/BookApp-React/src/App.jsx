import { Children, useState } from 'react'
import LoginPage from './pages/loginPage'
import DisplayBooks from "./pages/Books/DisplayBooks"
import SpecificBooks from "./pages/Books/SpecificBooks"
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
import Layout from './components/Layout.jsx';
import CreateAuthor from './pages/Author/CreateAuthor';
import ViewAuthors from './pages/Author/ViewAuthors';
import SpecificAuthor from './pages/Author/SpecificAuthor';
import CreateBook from './pages/Books/CreateBook';
import EditAuthor from './pages/Author/EditAuthor';
import EditBook from './pages/Books/EditBook';


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
          path: "/viewbooks/:id/editbook/:id",
          element: <EditBook/>
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
          path: "/viewauthors/:id/createbook/:id",
          element: <CreateBook/>
        },
        {
          path: "/viewauthors/:id/editauthor/:id",
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
