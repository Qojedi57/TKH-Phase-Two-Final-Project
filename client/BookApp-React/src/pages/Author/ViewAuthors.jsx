import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ViewAuthors() {
      const [authors, setAuthor] = useState([]);
      const [error, setError] = useState(false);
      useEffect(() => {
        const fetchAuthors = async () => {
          try {
            const allAuthors = await axios.get("http://localhost:8080/author");
            console.log(allAuthors.data.allAuthors);
            if (allAuthors.status === 200) {
              setAuthor(allAuthors.data.allAuthors);
            } else {
              return null;
            }
          } catch (error) {
            console.log("Oh no, something went wrong", error);
          }
        };
    
        fetchAuthors();
      }, []);
    
      //Eduardo map throught the books state. And display the data. Could do it here or make a new component that takes in props
      return (
        <div className="authorcontainer">
          <h1 className='heading'>Author's</h1>
          {authors.map((item) => (
           
            <div className="authorsmain">
              <Link className="authors" to= {`/viewauthors/${item.id}`}>
                <h1>{item.name}</h1>
              </Link>
            </div>
          ))}
        </div>
      );
    
};
