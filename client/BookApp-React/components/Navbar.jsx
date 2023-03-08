import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"

export default function Navbar() {
  return (
    <div>
      <header>
        <nav>
          <Link to="viewbooks">Books</Link>
          <Link to="login">Login</Link>
          <Link to="viewauthors">Authors</Link>
          <Link to="createauthor">Create Author</Link>
        </nav>
      </header>
    </div>
  )
}
