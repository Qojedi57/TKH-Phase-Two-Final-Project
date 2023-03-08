import React, { useEffect, useState } from "react";
// import fetchBooks from './GetAllBooks'
import axios from "axios";
import { Link, useParams } from "react-router-dom";
// import { SpecificBooks } from "./SpecificBooks";
import { Container} from "@chakra-ui/react";

export default function DisplayBooks() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const allBooks = await axios.get("http://localhost:8080/books");
        console.log(allBooks);
        if (allBooks.status === 200) {
          setBooks(allBooks.data.books);
          setFilteredData(allBooks.data.books)
        } else {
          return null;
        }
      } catch (error) {
        console.log("Oh no, something went wrong", error);
      }
    };

    fetchBooks();
  }, []);

  const keys = ["title", "desc", "genre"];
  const handleSearch = (event) => {
    const query = event.target.value;
    // const filteredData = books.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
    const filteredData = books.filter((item) => keys.some((key) => item[key].toLowerCase().includes(query)));
    setFilteredData(filteredData);
    
  }

  console.log(filteredData)

  //Eduardo map throught the books state. And display the data. Could do it here or make a new component that takes in props
  return (
    <div className="Novels">
      <h1 className='heading'>Books</h1>
      <div className="inputContainer">
        {/* <p>Search:  </p> */}
        <input type="search" className="inputBar" onChange={handleSearch} />
      </div>
      {/* {books.map((item) => (
         <Link to={`/viewbooks/${item.id}`}>
       <Container border="1px" bg="Gray" p={4} color="white">
            <h1>{item.title}</h1>
            <h2>{item.genre}</h2>
            <p>{item.desc}</p>
            </Container>
       </Link>
       
      ))} */}

      {filteredData.length >= 1 ? filteredData.map((item) => (
         <Link className="viewBookLink" to={`/viewbooks/${item.id}`}>
       <Container border="1px" p={4} color="white">
            <h1 className="teal">Title: {item.title}</h1>
            <h2 className="teal">Genre: {item.genre}</h2>
            <p className="teal">Desc: {item.desc}</p>
            </Container>
       </Link>
       
      ))  : (<p>Failed</p>)}



    </div>
  );
}
