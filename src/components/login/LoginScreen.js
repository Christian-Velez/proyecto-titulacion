import {
   Box,
   Divider,
   Heading,
   HStack,
   Image,
   Link,
   Stack,
   Text,
   VStack,
} from '@chakra-ui/react';
import React from 'react';
import LoginForm from './LoginForm';

const LoginScreen = () => {
   return (
      <Stack
         direction={{ base: 'column', lg: 'row' }}
         w='full'
      >
         <VStack
            w='40%'
            h='100vh'
            bgColor='purple.200'
            display={{ base: 'none', lg: 'flex' }}
            justifyContent='flex-start'
            alignItems='flex-start'
            boxShadow='2xl'
         >
            <Heading
               mt={100}
               ml={10}
               color='purple.600'
               fontSize='5xl'
            >
            </Heading>
         </VStack>

         <Box
            w={{ base: '0',  lg:'60%'}}
            pos='absolute'
            bottom={20}
            left={0}
            display={{ base: 'none', lg: 'flex' }}
         >
            <Image src='/static/WebDevelopment.svg' />
         </Box>

         <VStack
            w={{ base: 'full', lg: '60%' }}
            p={{ base: 10, lg: 40 }}
            alignItems='flex-start'
            spacing={10}
         >
            <Heading>Bienvenido</Heading>
            <LoginForm />


            <Divider />
            <HStack zIndex={1000} justifyContent='center' w='full' fontSize='lg' fontWeight='medium'>
               <Text>
                  ¿No tienes una cuenta?
               </Text>
               <Link
                  color='purple.600'
               >
                  Regístrate
               </Link>
            </HStack>
         </VStack>
      </Stack>
   );
};

export default LoginScreen;
