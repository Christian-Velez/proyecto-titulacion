import {
   Divider,
   Heading,
   HStack,
   Link as ChakraLink,
   Stack,
   Text,
   VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import LoginForm from './LoginForm';

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cleanRegisterState } from 'actions/register';
import IconImg from 'components/IconImg';

const LoginScreen = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(cleanRegisterState());
   }, [dispatch]);

   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   return (
      <Stack
         direction={{ base: 'column', lg: 'row' }}
         w='full'
         minH='100vh'
         className='animate__animated animate__fadeIn animate__faster'
         padding={{ lg: 10 }}
      >
         

         {/*Disponible en movil*/}
         <HStack
            display={{ base: 'flex', lg: 'none' }}
            bgColor='brand.500'
            style={{ marginTop: 0 }}
            padding={3}
            color='white'
            
            justifyContent='center'
         >
               <IconImg
                  alt='Logo'
                  src='/static/logo.png'
                  boxSize={{ base: '30px'}}
               />
               <Heading letterSpacing={-1}>devconnect</Heading>

         </HStack>

        

         <VStack
            w={{ base: 'full', lg: '60%' }}
            padding={{ base: 10, lg: 40 }}
            alignItems='flex-start'
            spacing={10}
         >
            <Heading pt={20}>Bienvenido</Heading>
            <LoginForm />

            <Divider />
            <HStack
               zIndex={1000}
               justifyContent='center'
               w='full'
               fontSize='lg'
               fontWeight='medium'
            >
               <Text>¿No tienes una cuenta?</Text>

               <ChakraLink
                  as={Link}
                  to='/register'
                  color='brand.500'
               >
                  Regístrate
               </ChakraLink>
            </HStack>
         </VStack>
      </Stack>
   );
};

export default LoginScreen;
