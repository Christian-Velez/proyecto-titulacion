

import { Heading, VStack } from '@chakra-ui/react';
import React from 'react';

const ApplicationsScreen = () => {
   return (
      <VStack
         padding={{ base: 7, lg: 20}}

         spacing={20}
         alignItems='flex-start'
         w='full'
         className='animate__animated animate__fadeIn animate__faster'
      >
         <Heading fontSize={{ base: '2xl', lg: '3xl'}}> Mis postulaciones </Heading>


      </VStack>
   );
};

export default ApplicationsScreen;
