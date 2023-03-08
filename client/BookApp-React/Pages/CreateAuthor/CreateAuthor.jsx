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
  

export default function () {
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
      } catch(error) {
        setError(true);
      }
    }

  return (
    <div>
        <form onSubmit={handleSubmit(createAuthor)}>
        
        <FormControl>
          <FormLabel>Author Name</FormLabel>
          <Input type='text' placeholder='Enter your username' {...register("author")}/>
        </FormControl>

        <Button type="submit" width='full' mt={4}>Create Author</Button>
      </form>
    </div>
  )
}
