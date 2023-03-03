import React, { useEffect } from 'react'
// import fetchBooks from './GetAllBooks'
import axios from "axios";

export default function DisplayBooks() {
    useEffect(() => {
        const fetchBooks = async () => {
            try{
                const allBooks = await axios.get("http://localhost:8080/books");
                console.log(allBooks);
                if(allBooks.status === 200){
                  return allBooks.data;
                } else {
                  return null;
                }
                return allBooks;
              } catch(error){
               
              console.log("Oh no, something went wrong", error);
            }
        }

        fetchBooks();
    },[]) 


  return (
    <div>DisplayBooks</div>
  )
}
