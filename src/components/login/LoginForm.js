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
import BasicInput from 'components/forms/BasicInput';

const LoginForm = () => {
   const { loading } = useSelector(state => state.ui);
   const dispatch = useDispatch();
   const [show, setShow] = useState(false);

   const [error, setError ] = useState('');


   const [formValues, handleInputChange] =
      useForm({
         username: '',
         password: '',
      });
   const { username, password } = formValues;

   const handleSubmit = async (e) => {
      e.preventDefault();

      const user = {
         username,
         password
      };

      try {
         await dispatch(startLogging(user));
      } catch(err) {
         setError('Nombre de usuario o contraseña incorrectos.');
      }
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
            <BasicInput
               text='Nombre de usuario'
               minLength={3}
               size='lg'
               name='username'
               value={username}
               onChange={handleInputChange}
            />

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

                     //minLength={8}
                     
                     
                     onChange={handleInputChange}
                  />

                  <ShowHideButton show={show} setShow={setShow}/>
               </InputGroup>
            </FormControl>

            <Text color='red'> { error } </Text>

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
