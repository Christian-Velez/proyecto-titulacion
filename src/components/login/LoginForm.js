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
import { useForm } from '../../hooks/useForm';
import { startLogging } from '../../actions/login';

const LoginForm = () => {
   const dispatch = useDispatch();
   const [formValues, handleInputChange] =
      useForm({
         username: '',
         password: '',
      });
   const { username, password } = formValues;

   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(startLogging(username, password));
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
                     type='password'
                     size='lg'
                     value={password}
                     name='password'
                     onChange={handleInputChange}
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
