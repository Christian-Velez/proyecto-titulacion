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
   const [show, setShow] = useState(false);
   const [error, setError] = useState('');

   const [formValues, handleInputChange] =
      useForm({
         name: '',
         username: '',
         age: '',
         password: '',
      });
   const { name, username, age, password } = formValues;

      
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

   const date = new Date();
   const maxDate = `${date.getFullYear() - 16}-${date.getMonth() + 1}-${date.getDate()}`;

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
               type='date'
               min='1950-01-01'
               max={maxDate}
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
