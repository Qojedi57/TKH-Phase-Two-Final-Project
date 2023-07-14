import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Flex
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
            const res = await axios.put(`https://finalprojectphase2.onrender.com/books/${params.id}`, 
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
      <Flex  width='full' align='center' justifyContent='center'>
      <FormControl       
        padding="15px"
        borderWidth={1}
        px={4}
        width='full'
        maxWidth='500px'
        borderRadius={4}
        textAlign='center'
        boxShadow='lg'>
        <FormLabel>Title</FormLabel>
        <Input type='text' placeholder='Enter new book title' {...register("title")}/>
        <FormLabel>Description</FormLabel>
        <Input type='text' placeholder='Enter new book description' {...register("desc")}/>
        <FormLabel>Genre</FormLabel>
        <Input type='text' placeholder='Enter new book genre' {...register("genre")}/>

        <Button type="submit" width='full' mt={4} color="teal">Edit Book</Button>
      </FormControl>
      </Flex>

      
    </form>
  </div>
  )
}

