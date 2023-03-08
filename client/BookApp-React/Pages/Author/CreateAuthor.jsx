import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {
    FormControl,
    FormLabel,
    Input,
    Button,
  } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
  

export default function () {
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState(false)

    const createAuthor = async (data) => {
        // console.log(data);
        try {
            const token = localStorage.getItem("token")
            console.log(token)
          const res = await axios.post("http://localhost:8080/author", 
            data, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                   },
            }
           
            );
 
          console.log(res);
          navigate("/viewauthors")
      } catch(error) {
        setError(true);
      }
    }

  return (
    <div>
        <form onSubmit={handleSubmit(createAuthor)}>
        <FormControl>
          <FormLabel>Author Name</FormLabel>
          <Input type='text' placeholder='Enter author name' {...register("author")}/>
        </FormControl>

        <Button type="submit" width='full' mt={4}>Create Author</Button>
      </form>
    </div>
  )
}
