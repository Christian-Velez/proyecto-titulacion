// Hooks
import React from 'react';

// Componentes
import Search from './Search';
import TopTechnologies from './TopTechnologies';
import {
   Text,
   VStack,
   Divider,
} from '@chakra-ui/react';
import Layout from 'components/layout';

const TechnologiesSearchScreen = () => {
   return (
      <Layout title='Tecnologías'>
         {/* Top */}
         <TopTechnologies />

         {/*Buscador  y resultados*/}
         <VStack
            w='full'
            alignItems='flex-start'
            spacing={10}
         >
            <Divider id='results' />

            <Text>
               Consulta las tecnologías
               disponibles en el sitio.
            </Text>
            <Search />
         </VStack>
      </Layout>
   );
};

export default TechnologiesSearchScreen;
