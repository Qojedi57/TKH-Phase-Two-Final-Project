import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import {
    ThemeProvider,
    theme,
    ColorModeProvider,
    CSSReset,
    Box,
    Flex,
    IconButton,
    useColorMode,
    Heading,
    Text,
    Link,
    FormControl,
    FormLabel,
    Input,
    Button,
  } from '@chakra-ui/react'

export default function CreateBook() {
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();
    let params = useParams();
    const [error, setError] = useState(false)

    const createBook = async (data) => {
        // console.log(data);
        try {
            const token = localStorage.getItem("token")
            console.log(token)
            console.log(params.id)
            const res = await axios.post(`http://localhost:8080/books/${params.id}`, 
            data, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
           
            );
 
          console.log(res);
          navigate(`/viewauthors/${params.id}`)
      } catch(error) {
        setError(true);
      }
    }
  return (
    <div>
    <form onSubmit={handleSubmit(createBook)}>
    <FormControl>
      <FormLabel>Title</FormLabel>
      <Input type='text' placeholder='Enter book title' {...register("title")}/>
      <FormLabel>Description</FormLabel>
      <Input type='text' placeholder='Enter book description' {...register("desc")}/>
      <FormLabel>Genre</FormLabel>
      <Input type='text' placeholder='Enter book genre' {...register("genre")}/>
    </FormControl>

    <Button type="submit" width='full' mt={4}>Create Book</Button>
  </form>
</div>
  )
}
