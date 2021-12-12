import React from 'react';
import {
   Button,
   FormControl,
   FormLabel,
   Input,
   InputGroup,
   Select,
   Textarea,
   VStack,
} from '@chakra-ui/react';



const LoginForm = () => {


   const handleSubmit = (e) => {
      e.preventDefault();
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
