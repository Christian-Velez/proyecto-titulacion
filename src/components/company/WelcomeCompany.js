import React from 'react';
import { useSelector } from 'react-redux';


import {
   Heading,
   Image,
   Text,
   VStack,
} from '@chakra-ui/react';
import Layout from 'components/layout';


const WelcomeCompany = () => {
   const { name } = useSelector(state => state.companyInfo);

   return (
      <Layout
         alignItems='center'
         textAlign='center'
         minH='100vh'
      >
         <Heading> Bienvenido { name } </Heading> 
         <VStack
            width={{ base: 'full', lg: '50%' }}
            spacing={5}
            alignItems='center'
            textAlign='center'
            fontSize='lg'
            color='gray.600'
         >
            <Image
               src='/static/Company.svg'
               alt='Company image'
            />

            <Text w={{ base:'80%', lg: '50%' }}>
               Publica vacantes y contacta con programadores que faciliten
               el desarrollo de tu proyecto.
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

export default WelcomeCompany;
