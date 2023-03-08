import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
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
import { useNavigate, useParams } from 'react-router-dom'

export default function EditAuthor() {
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState(false)
    let params = useParams();

    const editAuthor = async (data) => {
        // console.log(data);
        try {
            const token = localStorage.getItem("token")
            console.log(token)
          const res = await axios.put(`http://localhost:8080/author/${params.id}`, 
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
        <h1 className='heading'>Edit Author</h1>
        <form onSubmit={handleSubmit(editAuthor)}>
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
          <FormLabel>Author Name</FormLabel>
          <Input type='text' placeholder='Enter new author name' {...register("author")}/>

          <Button type="submit" width='full' mt={4} color="teal">Edit Author</Button>
        </FormControl>
        </Flex>

        
      </form>
    </div>
  )
}