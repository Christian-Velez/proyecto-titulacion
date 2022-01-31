import React, { useState } from 'react';
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

import { useDispatch } from 'react-redux';
import { useForm } from 'hooks/useForm';
import BasicInput from 'components/forms/BasicInput';

import { isRegisterFormValid } from 'helpers/isRegisterFormValid';
import { setAccountType, startRegisterNewAccount } from 'actions/register';
import ShowHideButton from 'components/forms/ShowHideButton';
import { successAlert } from 'helpers/SwalAlerts';

const CompanyForm = () => {
   const dispatch = useDispatch();

   const [error, setError ] = useState('');
   const [show, setShow] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [formValues, handleInputChange] =
      useForm({
         name: '',
         username: '',
         location: '',
         password: '',
      });
   const { name, username, location, password } =
      formValues;

   const handleSubmit = async (e) => {
      e.preventDefault();

      const { isValid, msg } = isRegisterFormValid(formValues);

      if(!isValid) {
         return setError(msg);
      }

      setIsLoading(true);

      try {
         await dispatch(startRegisterNewAccount(formValues));
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
               text='Nombre de la empresa'
               placeholder='Microsoft'
               size='lg'
               name='name'
               minLength={3}
               value={name}
               onChange={handleInputChange}
            />

            <BasicInput
               text='Localización'
               size='lg'
               name='location'
               placeholder='Guadalajara, Jalisco'
               value={location}
               onChange={handleInputChange}
            />

            <BasicInput
               text='Nombre de usuario'
               size='lg'
               placeholder='example123'
               helperText='Lo utilizarás después para iniciar sesión en la plataforma'
               name='username'
               minLength={3}
               value={username}
               onChange={handleInputChange}
            />

            <FormControl isRequired>
               <FormLabel fontSize='lg'>
                  Contraseña
               </FormLabel>

               <InputGroup>
                  <Input
                     type={
                        show ? 'text' : 'password'
                     }
                     size='lg'
                     name='password'
                     placeholder='********'
                     minLength={8}
                     value={password}
                     onChange={handleInputChange}
                  />

                  <ShowHideButton show={show} setShow={setShow}/>
               </InputGroup>
               <FormHelperText>
                  Incluye al menos 8 caracteres, 1
                  letra mayúsculas, 1 minúscula, 1
                  número y 1 símbolo especial (.
                  /).
               </FormHelperText>
            </FormControl>

            <Text color='red'> { error } </Text>

            <HStack>
               <Button variant='outline' onClick = { handleCancelRegister } isDisabled={ isLoading }>
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

export default CompanyForm;
