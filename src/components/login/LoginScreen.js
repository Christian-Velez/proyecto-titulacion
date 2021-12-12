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
import React from 'react';
import LoginForm from './LoginForm';

import { Link } from 'react-router-dom'

const LoginScreen = () => {
   return (
      <Stack
         direction={{ base: 'column', lg: 'row' }}
         w='full'
         minH='100vh'
         margin={0}
         padding='0'
      >
         <VStack
            w='40%'
            pt='10%'
            paddingX={10}
            bgColor='purple.500'
            display={{ base: 'none', lg: 'flex' }}
            justifyContent='flex-start'
            alignItems='flex-start'
            boxShadow='dark-lg'
            spacing='30'
         >
            <Heading
               fontSize='5xl'
               color='purple.100'
            >
               Nombre
            </Heading>

            <Heading
               pt='55'
               color='purple.100'
            >
               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            </Heading>
         </VStack>

         <Box w={{ base:'0', lg:'60vw'}}
            position='absolute'
            bottom='0'
            left='0'
         >
            <Image src='/static/WebDevelopment.svg' />
         </Box>




         <VStack
            display={{ base: 'flex', lg:'none'}}
            bgColor='purple.500'
            style={{ marginTop: 0}}
            padding={5}
            color='white'
         >
            <Heading> Nombre </Heading>
         </VStack>

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
               <ChakraLink color='purple.600'>
                  Regístrate
               </ChakraLink>

               <Link to='/auth/register'> IR A REGISTER PA</Link>

            </HStack>
         </VStack>
      </Stack>
   );
};

export default LoginScreen;
