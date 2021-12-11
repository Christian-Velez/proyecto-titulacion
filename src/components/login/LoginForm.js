import React from 'react';
import {
   Button,
   FormControl,
   FormLabel,
   Input,
   InputGroup,
   VStack,
} from '@chakra-ui/react';

const LoginForm = () => {
   return (
      <form style={{ width: '100%' }}>
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
                  focusBorderColor='purple.500'
                  size='lg'
                  variant='filled'
               />
            </FormControl>

            <FormControl isRequired>
               <FormLabel fontSize='lg'>
                  Contraseña
               </FormLabel>

               <InputGroup>
                  <Input
                     type='password'
                     focusBorderColor='purple.500'
                     size='lg'
                     variant='filled'
                  />
                  
               </InputGroup>
            </FormControl>

            <Button
               colorScheme='purple'
               width='full'
               size='lg'
            >
               Iniciar sesion
            </Button>
         </VStack>
      </form>
   );
};

export default LoginForm;
