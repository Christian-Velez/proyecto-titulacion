import React, { useState } from 'react';
import {
   Button,
   FormControl,
   FormLabel,
   Input,
   InputGroup,
   Text,
   VStack,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'hooks/useForm';
import { startLogging } from 'actions/auth';
import ShowHideButton from 'components/forms/ShowHideButton';

const LoginForm = () => {
   const { loading } = useSelector(state => state.ui);
   const dispatch = useDispatch();
   const [show, setShow] = useState(false);


   // importante manejar los erroeres en el login
   const [error ] = useState('');


   const [formValues, handleInputChange] =
      useForm({
         username: '',
         password: '',
      });
   const { username, password } = formValues;

   const handleSubmit = (e) => {
      e.preventDefault();

      const user = {
         username,
         password
      };
      dispatch(startLogging(user));
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
            <Text color='red'> { error } </Text>


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

                  <ShowHideButton show={show} setShow={setShow}/>
               </InputGroup>
            </FormControl>


            <Button
               width='full'
               size='lg'
               type='submit'
               isLoading={loading}
            >
               Iniciar sesión
            </Button>
         </VStack>
      </form>
   );
};

export default LoginForm;
