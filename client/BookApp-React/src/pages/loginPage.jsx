import React from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'
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
  Stack,
  Checkbox,
  Button,
  Alert,
  AlertIcon
} from '@chakra-ui/react'

import { SunIcon, MoonIcon} from '@chakra-ui/icons'

const VARIANT_COLOR = 'teal'

const LoginPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <LoginArea />
      </ColorModeProvider>
    </ThemeProvider>
  )
}

const LoginArea = () => {
  return (
    <Flex minHeight='100vh' width='full' align='center' justifyContent='center'>
      <Box 
        borderWidth={1}
        px={4}
        width='full'
        maxWidth='500px'
        borderRadius={4}
        textAlign='center'
        boxShadow='lg'
      >
        <ThemeSelector />
        <Box p={4}>
          <LoginHeader />
          <LoginForm />
        </Box>
      </Box>
    </Flex>
  )
}

const ThemeSelector = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box textAlign='right' py={4}>
      <IconButton
        icon={colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
        onClick={toggleColorMode}
        variant='ghost'
      />
    </Box>
  )
}

const LoginHeader = () => {
  return (
    <Box textAlign='center'>
      <Heading>Sign In to Your Account</Heading>
      <Text>
        Or <Link color={`${VARIANT_COLOR}.500`}>Signup If You Don't Have An Account</Link>
      </Text>
    </Box>
  )
}


const LoginForm = () => {
    const {register, handleSubmit} = useForm()
    const [authSuccess, setAuthSuccess] = useState(false)
    const [authUnsuccess, setAuthUnsuccess] = useState(false)

    const userLogin = async (data) => {
        console.log(data);
        try {
          const resp = await axios.post("https://finalprojectphase2.onrender.com/auth/login", data);

          console.log(resp);

          if(resp.data.success === true){
            setAuthSuccess(true);
            localStorage.setItem("token", resp.data.token)
          } 
      } catch(error) {
        setAuthUnsuccess(true);
      }
    }

  return (
    <Box my={8} textAlign='left'>
      {
        authSuccess && (
          <Alert status='success'>
            <AlertIcon />
            You successfully logged in. Enjoy!
          </Alert>
        )
      }

        {
        authUnsuccess && (
          <Alert status='error'>
            <AlertIcon />
           Wrong username or password.
          </Alert>
        )
      }
      <form onSubmit={handleSubmit(userLogin)}>
        
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input type='text' placeholder='Enter your username' {...register("username")}/>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input type='password' placeholder='Enter your password' {...register("password")} />
        </FormControl>

        <Stack isInline justifyContent='space-between' mt={4}>
            <Box>
              <Checkbox>Remember Me</Checkbox>
            </Box>
            <Box>
              <Link color={`${VARIANT_COLOR}.500`}>Forgot your password?</Link>
            </Box>
        </Stack>

        <Button variantColor={VARIANT_COLOR}  type="submit" width='full' mt={4}>Sign In</Button>
      </form>
    </Box>
  )
}

export default LoginPage;