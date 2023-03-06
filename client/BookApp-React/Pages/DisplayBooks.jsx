import React, { useEffect, useState } from 'react'
// import fetchBooks from './GetAllBooks'
import axios from "axios";

export default function DisplayBooks() {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(false);
    useEffect(() => {
        const fetchBooks = async () => {
            try{
                const allBooks = await axios.get("http://localhost:8080/books");
                console.log(allBooks);
                if(allBooks.status === 200){
                    setBooks(allBooks.data)
                } else {
                  return null;
                }
              } catch(error){
              console.log("Oh no, something went wrong", error);
            }
        }

        fetchBooks();
    },[]) 

    //Eduardo map throught the books state. And display the data. Could do it here or make a new component that takes in props
  return (
    <div>

    </div>
  )
}
