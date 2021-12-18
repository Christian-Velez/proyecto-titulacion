import {
   Heading,
   Image,
   Text,
   VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';

const WelcomeDeveloper = () => {
   const { name } = useSelector(state => state.devInfo);


   return (
      <VStack
         padding={{ base: 7, lg: 20 }}
         spacing={20}
         alignItems='center'
         w='full'
         className='animate__animated animate__fadeIn animate__faster'         
      >
         <Heading>
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
               src='/static/WebDevelopment.svg'
               alt='Web development image'
            />

            <Text>
               La cuenta de tipo programador te permite contactar con empresas y postularte a sus ofertas para así poder obtener tu empleo soñado a través de esta plataforma.
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
