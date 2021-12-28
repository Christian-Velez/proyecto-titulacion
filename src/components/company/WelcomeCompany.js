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

            <Text>
               La cuenta de tipo empresa te permite publicar tus vacantes para contactar con los programadores adecuados
               que ayuden a desarrollar tu proyecto.
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
