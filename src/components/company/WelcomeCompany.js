import React from 'react';
import { useSelector } from 'react-redux';


import {
   Heading,
   Image,
   Text,
   VStack,
} from '@chakra-ui/react';


const WelcomeCompany = () => {
   const { name } = useSelector(state => state.companyInfo);

   return (
      <VStack
         padding={{ base: 7, lg: 20 }}
         spacing={20}
         alignItems='center'
         w='full'
         className='animate__animated animate__fadeIn animate__faster'         
      >
         <Heading fontSize={{ base: '2xl', lg: '3xl'}}>
            Bienvenido { name }
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
               src='/static/Company.svg'
               alt='Company image'
            />

            <Text w={{ base:'80%', lg: '50%' }}>
               Publica vacantes y contacta con programadores que faciliten
               el desarrollo de tu proyecto.
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

export default WelcomeCompany;
