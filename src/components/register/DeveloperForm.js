// Hooks
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'hooks/useForm';
import { useDispatch } from 'react-redux';

// Info
import validator from 'validator';
import { startRegisterNewAccount } from 'actions/register';


// Componentes
import Swal from 'sweetalert2';
import {
   Button,
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


const DeveloperForm = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
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

      let regExp =
         /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;

      if (!regExp.test(name)) {
         return Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Utiliza solo letras y espacios en tu nombre',
            confirmButtonColor:
               'var(--chakra-colors-brand-500)',
         });
      }

      if (!validator.isAlphanumeric(username)) {
         return Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Utiliza solo caracteres alfanumericos en tu nombre de usuario',
            confirmButtonColor:
               'var(--chakra-colors-brand-500)',
         });
      }

      if (!validator.isStrongPassword(password)) {
         return Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Proporciona una contraseña lo suficientemente segura',
            confirmButtonColor:
               'var(--chakra-colors-brand-500)',
         });
      }

      dispatch(
         startRegisterNewAccount({...formValues})
      );
   };

   const handleCancelRegister = () => {
      navigate('/login');
   };


   const date = new Date();
   const today = `${date.getFullYear() - 16}-${date.getMonth()+1}-${date.getDate()}`;

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
               <Input
                  type='text'
                  size='lg'
                  name='name'
                  onChange={handleInputChange}
                  minLength={6}
                  placeholder='Daniel...'
                  value={name}
               />
            </FormControl>

            <FormControl isRequired>
               <FormLabel fontSize='lg'>
                  Nombre de usuario
               </FormLabel>
               <Input
                  type='text'
                  size='lg'
                  name='username'
                  placeholder='example123'
                  minLength={6}
                  value={username}
                  onChange={handleInputChange}
               />
            </FormControl>

            <FormControl isRequired>
               <FormLabel fontSize='lg'>
                  Edad
               </FormLabel>
               <Input
                  type='date'

                  min='1950-01-01' 
                  max={today}
                  size='lg'
                  name='age'
                  placeholder='21'
                  value={age}
                  onChange={handleInputChange}
               />
               <FormHelperText>
                  Necesitas mínimo 16 años cumplidos para hacer uso de la plataforma.
               </FormHelperText>
            </FormControl>

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
