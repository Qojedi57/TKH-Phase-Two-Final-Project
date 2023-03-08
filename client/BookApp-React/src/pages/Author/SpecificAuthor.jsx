import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container} from "@chakra-ui/react";

export default function SpecificAuthor() {
    let params = useParams();
    const [author, setAuthor] = useState([]);
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchAuthor = async () => {
        try {
          const allAuthors = await axios.get(`http://localhost:8080/author/${params.id}`);
          if (allAuthors.status === 200) {
            console.log(allAuthors.data)
            setAuthor(allAuthors.data.allAuthors);
          } else {
            return null;
          }
        } catch (error) {
          console.log("Oh no, something went wrong", error);
          setError(true)
        }
      };

      const fetchBooks = async () => {
        try {
          const allBooks = await axios.get(`http://localhost:8080/books/author/${params.id}`);
          console.log(allBooks);
          if (allBooks.status === 200) {
            setBooks(allBooks.data.getBookByAuthor);
          } else {
            return null;
          }
        } catch (error) {
          console.log("Oh no, something went wrong", error);
          setError(true)
        }
      };
  
      fetchAuthor();
      fetchBooks();
  
      return () => {
      };
    }, [params]);


    const deleteAuthor = async (data) => {
      // console.log(data);
      try {
          const token = localStorage.getItem("token")
          console.log(token)
          const res = await axios.delete(`http://localhost:8080/books/author/${params.id}`, 
          {
              headers: {
                  Authorization: `Bearer ${token}`,
                 },
          }
         
          );


        navigate("/viewauthors")
    } catch(error) {
      setError(true);
    }
  }
  
    return (
      <div>
        <h1 className='heading'>{author.name}</h1>
        <div className='links'>
          <Link to ={`createbook/${params.id}`}>Create Books</Link>
          <Link to={`editauthor/${params.id}`}>Edit Author</Link>
          <button onClick={deleteAuthor}>Delete Author/Books</button>
        </div>
        {books.map((item) => (
         <Link to={`/viewbooks/${item.id}`}>
            <Container border="1px" bg="Gray" p={4} color="white">
              <h1>{item.title}</h1>
              <h2>{item.genre}</h2>
              <p>{item.desc}</p>
            </Container>
          </Link>
        ))}
      </div>
    )
}
