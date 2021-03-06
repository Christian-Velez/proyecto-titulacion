import React from 'react';
import {
   Heading,
   Image,
   Text,
   VStack,
} from '@chakra-ui/react';
import Layout from 'components/layout';

const WelcomeAdmin = () => {
   return (
      <Layout
         alignItems='center'
         minH='100vh'
      >
         <Heading>
            Bienvenido administrador
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
               src='/static/BigDataAnalysis.svg'
               alt='Admin image'
            />

            <Text>
               Desde este panel podrás agregar y
               editar las tecnologías y soft
               skills que estarán disponibles para
               los usuarios de tipo programador y
               empresa.
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

export default WelcomeAdmin;
