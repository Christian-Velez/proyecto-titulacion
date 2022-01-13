import { Spinner, VStack } from '@chakra-ui/react';
import React from 'react';

const LoadingScreen = () => {
   return (
      <VStack
         padding={{ base: 7, lg: 20 }}
         spacing={20}
         alignItems='center'
         justifyContent='center'
         w='full'
         className='animate__animated animate__fadeIn animate__faster'      
      >
         <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='brandPrimary.500' size='xl' />
      </VStack>
   );
};

export default LoadingScreen;
