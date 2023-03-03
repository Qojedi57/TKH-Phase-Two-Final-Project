import { useState } from 'react';

async function fetchBooks(){
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


  