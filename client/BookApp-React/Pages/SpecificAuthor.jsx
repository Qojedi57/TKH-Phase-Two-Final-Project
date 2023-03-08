import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function SpecificAuthor() {
    let params = useParams();
    const [author, setAuthor] = useState([]);
    const [error, setError] = useState(false);

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
  
      fetchAuthor();
  
      return () => {
      };
    }, [params]);
  
    return (
      <div>
        <p>{author.name}</p>
      </div>
    )
}
