// Hooks
import React, { useState } from 'react';
import { useForm } from 'hooks/useForm';
import { useDispatch } from 'react-redux';

// Info
import { startRegisterNewAccount } from 'actions/register';

// Componentes
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
import {
   ViewIcon,
   ViewOffIcon,
} from '@chakra-ui/icons';
import BasicInput from 'components/BasicInput';
import { isRegisterFormValid } from 'helpers/isRegisterFormValid';
import Buttons from 'components/Buttons';

const DeveloperForm = () => {
   const dispatch = useDispatch();
   const [isLoading, setIsLoading] =
      useState(false);

   const [show, setShow] = useState(false);

   const [formValues, handleInputChange] =
      useForm({
         name: '',
         username: '',
         age: '',
         password: '',
      });
   const { name, username, age, password } =
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

   const date = new Date();
   const today = `${date.getFullYear() - 16}-${
      date.getMonth() + 1
   }-${date.getDate()}`;

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
               type='date'
               min='1950-01-01'
               max={today}
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
               cancelRoute='/login'
               isLoading={isLoading}
               actionText='Registrar'
            />
         </VStack>
      </form>
   );
};

export default DeveloperForm;
