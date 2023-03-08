import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import {
    FormControl,
    FormLabel,
    Input,
    Button,
  } from '@chakra-ui/react'


export default function EditBook() {
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();
    let params = useParams();
    const [error, setError] = useState(false)

    const editBook = async (data) => {
        // console.log(data);
        try {
            const token = localStorage.getItem("token")
            console.log(token)
            console.log(params.id)
            const res = await axios.put(`http://localhost:8080/books/${params.id}`, 
            data, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
           
            );
 
          console.log(res);
          navigate(`/viewbooks/${params.id}`)
      } catch(error) {
        setError(true);
      }
    }
  return (
    <div>
      <h1 className='heading'>Edit Book</h1>
      <form onSubmit={handleSubmit(editBook)}>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input type='text' placeholder='Enter new book title' {...register("title")}/>
        <FormLabel>Description</FormLabel>
        <Input type='text' placeholder='Enter new book description' {...register("desc")}/>
        <FormLabel>Genre</FormLabel>
        <Input type='text' placeholder='Enter new book genre' {...register("genre")}/>
      </FormControl>

      <Button type="submit" width='full' mt={4}>Edit Book</Button>
    </form>
  </div>
  )
}

