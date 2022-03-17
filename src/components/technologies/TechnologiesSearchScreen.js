// Hooks
import React, { useEffect } from 'react';

// Componentes
import Search from './Search';
import TopTechnologies from './TopTechnologies';
import {
   Text,
   VStack,
   Divider,
} from '@chakra-ui/react';
import Layout from 'components/layout';
import { useDispatch } from 'react-redux';
import { startLoadingTechnologies } from 'actions/admin/technologies';

const TechnologiesSearchScreen = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(startLoadingTechnologies());
   }, [dispatch]);

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
