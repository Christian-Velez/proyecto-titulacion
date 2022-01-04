import React, { useState } from 'react';
import {
   FormControl,
   FormHelperText,
   FormLabel,
   IconButton,
   Input,
   InputGroup,
   InputRightElement,
   VStack,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useForm } from 'hooks/useForm';
import BasicInput from 'components/forms/BasicInput';
import {
   ViewIcon,
   ViewOffIcon,
} from '@chakra-ui/icons';
import { isRegisterFormValid } from 'helpers/isRegisterFormValid';
import { startRegisterNewAccount } from 'actions/register';
import Buttons from 'components/forms/Buttons';

const CompanyForm = () => {
   const dispatch = useDispatch();

   const [show, setShow] = useState(false);
   const [isLoading, setIsLoading] =
      useState(false);
   const [formValues, handleInputChange] =
      useForm({
         name: '',
         username: '',
         location: '',
         password: '',
      });
   const { name, username, location, password } =
      formValues;

   const handleSubmit = (e) => {
      e.preventDefault();

      if (isRegisterFormValid(formValues)) {
         dispatch(
            startRegisterNewAccount(
               {
                  ...formValues,
               },
               setIsLoading
            )
         );
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

                  <InputRightElement
                     width='4.5rem'
                     marginTop='.25rem'
                  >
                     <IconButton
                        aria-label='Show/Hide'
                        h='2rem'
                        size='sm'
                        icon={
                           show ? (
                              <ViewOffIcon />
                           ) : (
                              <ViewIcon />
                           )
                        }
                        onClick={() =>
                           setShow(!show)
                        }
                        variant='ghost'
                     />
                  </InputRightElement>
               </InputGroup>
               <FormHelperText>
                  Incluye al menos 8 caracteres, 1
                  letra mayúsculas, 1 minúscula, 1
                  número y 1 símbolo especial (.
                  /).
               </FormHelperText>
            </FormControl>

            <Buttons
               isLoading={isLoading}
               cancelRoute='/login'
               actionText='Registrar'
            />
         </VStack>
      </form>
   );
};

export default CompanyForm;
