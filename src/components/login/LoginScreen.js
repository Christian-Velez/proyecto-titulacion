import {
   Box,
   Divider,
   Heading,
   HStack,
   Image,
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

   return (
      <Stack
         direction={{ base: 'column', lg: 'row' }}
         w='full'
         minH='100vh'
         margin={0}
         className='animate__animated animate__fadeIn animate__faster'
         padding='0'
      >
         <VStack
            w='40%'
            pt='10%'
            paddingX={20}
            bgColor='brand.500'
            display={{ base: 'none', lg: 'flex' }}
            justifyContent='flex-start'
            alignItems='flex-start'
            spacing='30'
         >
            <HStack>
               <IconImg
                  alt='Logo'
                  src='/static/logo.png'
                  boxSize={{ base: '60px'}}

               />
               <Heading
                  fontSize='5xl'
                  color='white'
               >
                  devconnect
               </Heading>

            </HStack>


            <VStack spacing={10} pt={55} alignItems='flex-start' w='full'>
               <Heading color='brand.100' alignSelf='flex-start'>
                  Publica{' '}
                  <span
                     style={{
                        color: 'var(--chakra-colors-green-300)',
                     }}
                  >
                     ofertas.
                  </span>
               </Heading>
               <Heading color='brand.100' alignSelf='center'>
                  Contacta {' '}
                  <span
                     style={{
                        color: 'var(--chakra-colors-green-300)',
                     }}
                  >
                     empresas.
                  </span>
               </Heading>
               <Heading color='brand.100' alignSelf='flex-end' w={{md: 'full', xl:'60%'}}>
                  Establece tu primera{' '}
                  <span
                     style={{
                        color: 'var(--chakra-colors-green-300)',
                     }}
                  >
                     relación laboral.
                  </span>
               </Heading>
            </VStack>

         </VStack>

         <Box
            w={{ base: '0', lg: '65vw' }}
            position='absolute'
            bottom='0'
            left='0'
         >
            <Image src='/static/Creative-Process.svg' />
         </Box>


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
  
               <Heading> devconnect </Heading>
         </HStack>

         <VStack
            w={{ base: 'full', lg: '60%' }}
            p={{ base: 10, lg: 40 }}
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
