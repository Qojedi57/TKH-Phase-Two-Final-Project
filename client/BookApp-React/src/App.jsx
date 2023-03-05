import { useState } from 'react'
import LoginPage from '../Pages/LoginPage'
import DisplayBooks from "../Pages/DisplayBooks"
import './App.css'

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

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>
    },
    {
      path:"/login",
      element: <LoginPage/>
    },
    {
      path: "viewbooks",
      element: <DisplayBooks/>
    }

  ])

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
