// Hooks
import React, { useState } from 'react';
import { useForm } from 'hooks/useForm';
import { useDispatch } from 'react-redux';

// Info
import { setAccountType, startRegisterNewAccount } from 'actions/register';
import { isRegisterFormValid } from 'helpers/isRegisterFormValid';

// Componentes
import BasicInput from 'components/forms/BasicInput';
import ShowHideButton from 'components/forms/ShowHideButton';
import {
   Button,
   FormControl,
   FormHelperText,
   FormLabel,
   HStack,
   Input,
   InputGroup,
   Text,
   VStack,
} from '@chakra-ui/react';
import { successAlert } from 'helpers/SwalAlerts';


const DeveloperForm = () => {
   const dispatch = useDispatch();
   const [isLoading, setIsLoading] = useState(false);
   const [showPass1, setShowPass1] = useState(false);
   const [showPass2, setShowPass2] = useState(false);

   const [error, setError] = useState('');

   const [formValues, handleInputChange] =
      useForm({
         name: '',
         username: '',
         age: '',
         password: '',
         confirmPassword: '',
      });
   const { name, username, age, password, confirmPassword } = formValues;

      
   const handleSubmit =  async (e) => {
      e.preventDefault();

      const { isValid, msg } = isRegisterFormValid(formValues);
      if(!isValid) {
         return setError(msg);
      }

      setIsLoading(true);

      try {
         await dispatch(startRegisterNewAccount({ ...formValues }));
         setTimeout(() => {
            successAlert({ title:'Registrado!', message: 'No te olvides de completar tu perfil para llegar a más personas!' });
         }, 1000);
      }
      catch(err) {
         setError(err.message);
         setIsLoading(false);
      }
   };

   const handleCancelRegister = () => {
      dispatch(setAccountType('')); 
   };

   return (
      <form
         style={{ width: '100%' }}
         onSubmit={handleSubmit}
      >
         <VStack
            spacing={10}
            alignItems='flex-start'
         >
            <BasicInput
               text='Nombre completo'
               placeholder='Daniel Hernandez...'
               size='lg'
               name='name'
               value={name}
               onChange={handleInputChange}
            />

            <BasicInput
               text='Nombre de usuario'
               placeholder='example123'
               minLength={3}
               size='lg'
               helperText='Lo utilizarás después para iniciar sesión en la plataforma'
               name='username'
               value={username}
               onChange={handleInputChange}
            />

            <BasicInput
               text='Edad'
               type='number'
               min='16'
               max='90'
               placeholder='21'
               helperText='
                  Necesitas mínimo 16 años
                  cumplidos para hacer uso de la
                  plataforma.
               '
               name='age'
               value={age}
               onChange={handleInputChange}
            />

            {/*Contraseña*/}
            <FormControl isRequired>
               <FormLabel fontSize='lg'>
                  Contraseña
               </FormLabel>

               <InputGroup>
                  <Input
                     type={
                        showPass1 ? 'text' : 'password'
                     }
                     size='lg'
                     name='password'
                     placeholder='********'
                     minLength={8}
                     value={password}
                     onChange={handleInputChange}
                  />

                  <ShowHideButton show={showPass1} setShow={setShowPass1}/>
               </InputGroup>

               <FormHelperText>
                  Incluye al menos 8 caracteres, 1
                  letra mayúsculas, 1 minúscula, 1
                  número y 1 símbolo especial (.
                  /).
               </FormHelperText>
            </FormControl>


            <FormControl isRequired>
               <FormLabel fontSize='lg'>
                  Confirma tu contraseña
               </FormLabel>

               <InputGroup>
                  <Input
                     type={
                        showPass1 ? 'text' : 'password'
                     }
                     size='lg'
                     name='confirmPassword'
                     placeholder='********'
                     minLength={8}
                     value={confirmPassword}
                     onChange={handleInputChange}
                  />
                  <ShowHideButton show={showPass2} setShow={setShowPass2}/>
               </InputGroup>
            </FormControl>

            <Text color='red'> { error } </Text>

            <HStack>
               <Button variant='outline' onClick = { handleCancelRegister } isDisabled={ isLoading} >
                  Cancelar
               </Button>

               <Button type='submit' isLoading={ isLoading }>
                     Registrar
               </Button>
            </HStack>
         </VStack>
      </form>
   );
};

export default DeveloperForm;
