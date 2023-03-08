import React, {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export const SpecificBooks = () => {
  let params = useParams();
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const allBooks = await axios.get(`http://localhost:8080/books/${params.id}`);
        // console.log(allBooks);
        if (allBooks.status === 200) {
          setBooks(allBooks.data.getBook);
        } else {
          return null;
        }
      } catch (error) {
        console.log("Oh no, something went wrong", error);
        setError(true)
      }
    };

    fetchBooks();

    return () => {
    };
  }, [params]);

  console.log(books)
  return (
    <div>
      <h1>{books.title}</h1>
      <Link to={`editbook/${params.id}`}>Edit Book</Link>
    </div>
  )
}

export default SpecificBooks;