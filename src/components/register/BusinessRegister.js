import {
   Box,
   Heading,
   Image,
   Stack,
   VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import BusinessForm from './BusinessForm';

const BusinessRegister = () => {
   return (
      <Stack
         direction={{ base: 'column', lg: 'row' }}
         w='full'
         minH='100vh'
         margin={0}
         padding='0'
      >

        

         {/*Navbar solo disponible en movil*/}
         <VStack
            display={{ base: 'flex', lg: 'none' }}
            bgColor='purple.500'
            style={{ marginTop: 0 }}
            padding={5}
            color='white'
         >
            <Heading> Nombre </Heading>
         </VStack>


         {/*Parte izquierda, formulario */}
         <VStack
            w={{ base: 'full', lg: '70%' }}
            p={{ base: 10, lg: 40 }}
            alignItems='flex-start'
            spacing={10}
         >
            <Heading>Ingresa tus datos</Heading>

            <BusinessForm />

            <Link to='/login'> IR A LOGIN PA</Link>
         </VStack>



          {/*Parte derecha, imagen*/}
          <VStack
            w='30%'
            pt='10%'
            paddingX={10}
            bgColor='purple.500'
            display={{ base: 'none', lg: 'flex' }}

            alignItems='center'
            boxShadow='dark-lg'
            spacing='5'
         >
           <Heading
               fontSize='md'
               color='purple.100'
            >
               TIPO DE CUENTA
            </Heading>
            <Heading
               fontSize='5xl'
               color='purple.100'
            >
               Empresa
            </Heading>

          

            <Box boxSize='xs'>
               <Image src='/static/empresa.png' />
            </Box>
         </VStack>

      </Stack>
   );
};

export default BusinessRegister;
