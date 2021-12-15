import {
   Box,
   Heading,
   Image,
   Stack,
   VStack,
} from '@chakra-ui/react';
import React from 'react';
import DeveloperForm from './DeveloperForm';

const DeveloperRegister = () => {
   return (
      <Stack
         direction={{ base: 'column', lg: 'row' }}
         w='full'
         minH='100vh'
         margin={0}
         padding='0'
         className='animate__animated animate__fadeIn animate__faster'
      >

        

         {/*Navbar solo disponible en movil*/}
         <VStack
            display={{ base: 'flex', lg: 'none' }}
            bgColor='brand.500'
            style={{ marginTop: 0 }}
            padding={5}
            color='brand.100'
         >
            <Heading fontSize='xs'> TIPO DE CUENTA </Heading>
            <Heading fontSize='xl'> Programador </Heading>
         </VStack>


         {/*Parte izquierda, formulario */}
         <VStack
            w={{ base: 'full', lg: '70%' }}
            p={{ base: 10, lg: 40 }}
            alignItems='flex-start'
            spacing={10}
         >
            <Heading>Ingresa tus datos</Heading>

            <DeveloperForm />

            
         </VStack>



          {/*Parte derecha, imagen*/}
          <VStack
            w='30%'
            pt='10%'
            paddingX={10}
            bgColor='brand.500'
            display={{ base: 'none', lg: 'flex' }}

            alignItems='center'
            boxShadow='dark-lg'
            spacing='5'
         >
           <Heading
               fontSize='md'
               color='brand.100'
            >
               TIPO DE CUENTA
            </Heading>
            <Heading
               fontSize='5xl'
               color='brand.100'
            >
               Programador
            </Heading>

          

            <Box boxSize='xs'>
               <Image src='/static/programmer.png' />
            </Box>
         </VStack>

      </Stack>
   );
};

export default DeveloperRegister;
