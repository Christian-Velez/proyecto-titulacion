import React, { useState } from 'react';
import {
   Button,
   FormControl,
   FormLabel,
   IconButton,
   Input,
   InputGroup,
   InputRightElement,
   VStack,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useForm } from 'hooks/useForm';
import { startLogging } from 'actions/auth';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const LoginForm = () => {
   const dispatch = useDispatch();
   const [show, setShow] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const [formValues, handleInputChange] =
      useForm({
         username: '',
         password: '',
      });
   const { username, password } = formValues;

   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(startLogging(username, password, setIsLoading));
   };

   return (
      <form
         style={{ width: '100%' }}
         method='POST'
         onSubmit={handleSubmit}
      >
         <VStack
            spacing={10}
            alignItems='flex-start'
         >
            <FormControl isRequired>
               <FormLabel fontSize='lg'>
                  Nombre de usuario
               </FormLabel>
               <Input
                  type='text'
                  size='lg'
                  value={username}
                  name='username'
                  onChange={handleInputChange}
               />
            </FormControl>

            <FormControl isRequired>
               <FormLabel fontSize='lg'>
                  Contraseña
               </FormLabel>

               <InputGroup>
                  <Input
                     type={ show ? 'text' : 'password'}
                     size='lg'
                     value={password}
                     name='password'
                     onChange={handleInputChange}
                  />

                  <InputRightElement 
                     width='4.5rem' 
                     marginTop='.25rem'
                  >
                     <IconButton
                        aria-label='Show/Hide'
                        h='2rem' size='sm'
                        icon={ show ? <ViewOffIcon /> : <ViewIcon /> }
                        onClick={() => setShow(!show)}
                        variant='ghost'
                     />
                  </InputRightElement>
               </InputGroup>
            </FormControl>

            <Button
               width='full'
               size='lg'
               type='submit'
               isLoading={isLoading}
            >
               Iniciar sesión
            </Button>
         </VStack>
      </form>
   );
};

export default LoginForm;
