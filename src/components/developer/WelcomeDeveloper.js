import React from 'react';
import { useSelector } from 'react-redux';


import {
   Heading,
   Image,
   Text,
   VStack,
} from '@chakra-ui/react';


const WelcomeDeveloper = () => {
   const { name } = useSelector(state => state.devInfo);


   return (
      <VStack
         padding={{ base: 7, lg: 20 }}
         spacing={20}
         alignItems='center'
         w='full'
         className='animate__animated animate__fadeIn animate__faster'
         minH='100vh'  
      >
         <Heading fontSize={{ base: '2xl', lg: '3xl'}}>
            Bienvenido/a { name }
         </Heading>

         <VStack
            width={{ base: 'full', lg: '50%' }}
            spacing={5}
            alignItems='center'
            textAlign='center'
            fontSize='lg'
            color='gray.600'
         >
            <Image
               src='/static/WebDevelopment.svg'
               alt='Web development image'
            />

            <Text w={{ base:'80%', lg: '50%' }}>
               
               Comienza a enviar postulaciones para así encontrar
               el trabajo de tus sueños. Contacta con las mejores empresas del rubro.

            </Text>

            <Text color='brand.500'>
               Puedes cambiar entre las distintas
               secciones utilizando el menú de
               navegación.
            </Text>
         </VStack>
      </VStack>
   );
};

export default WelcomeDeveloper;
