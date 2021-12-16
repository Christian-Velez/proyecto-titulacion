import React from 'react';
import {
   Button,
   FormControl,
   FormLabel,
   Input,
   InputGroup,
   VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const DeveloperForm = () => {
   const navigate = useNavigate();

   const handleSubmit = (e) => {
      e.preventDefault();
   };

   const handleCancelRegister = () => {
      navigate('/login');
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
                  Nombre completo
               </FormLabel>
               <Input type='text' size='lg' />
            </FormControl>

            <FormControl isRequired>
               <FormLabel fontSize='lg'>
                  Nombre de usuario
               </FormLabel>
               <Input type='text' size='lg' />
            </FormControl>

            <FormControl isRequired>
               <FormLabel fontSize='lg'>
                  Edad
               </FormLabel>
               <Input
                  type='number'
                  size='lg'
                  min={16}
                  max={70}
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

            <VStack w='full' spacing={3}>
            <Button
                  variant='outline'
                  width='full'
                  size='lg'
                  onClick={handleCancelRegister}
               >
                  Cancelar
               </Button>
               <Button
                  width='full'
                  size='lg'
                  type='submit'
               >
                  Siguiente
               </Button>

             
            </VStack>
         </VStack>
      </form>
   );
};

export default DeveloperForm;
