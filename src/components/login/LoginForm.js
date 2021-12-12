import React from 'react';
import {
   Button,
   FormControl,
   FormLabel,
   Input,
   InputGroup,
   VStack,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { types } from '../../types/types';



const LoginForm = () => {
   const dispatch = useDispatch();

   const handleSubmit = (e) => {
      e.preventDefault();  
      
      dispatch({
         type:  types.login
      })

      localStorage.setItem('logged', true);


   }

   return (
      <form style={{ width: '100%' }} method='POST' onSubmit={ handleSubmit }>
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
               />

               
            </FormControl>

            <FormControl isRequired>
               <FormLabel fontSize='lg'>
                  Contraseña
               </FormLabel>

               <InputGroup>
                  <Input
                     type='password'
                     size='lg'
                  />
                  
               </InputGroup>
            </FormControl>

            <Button
               width='full'
               size='lg'
               type='submit'
               
            >
               Iniciar sesion
            </Button>

          
         </VStack>
      </form>
   );
};

export default LoginForm;
