import React from 'react';
import { useSelector } from 'react-redux';


import {
   Heading,
   Image,
   Text,
   VStack,
} from '@chakra-ui/react';
import Layout from 'components/layout';


const WelcomeDeveloper = () => {
   const { name } = useSelector(state => state.devInfo);


   return (
      <Layout
         alignItems='center'
         minH='100vh'  
      >
         <Heading>
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

            <Text color='brandPrimary.500'>
               Puedes cambiar entre las distintas
               secciones utilizando el menú de
               navegación.
            </Text>
         </VStack>
      </Layout>
   );
};

export default WelcomeDeveloper;
