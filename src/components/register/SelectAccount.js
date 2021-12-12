import {
   Box,
   Heading,
   Image,
   Stack,
   VStack,
} from '@chakra-ui/react';
import React from 'react';

const SelectAccount = () => {
   return (
      <VStack
         padding={{ base: 10, lg: 40 }}
         w='full'
         spacing={50}
      >
      

         <Heading>
            Elige el tipo de cuenta
         </Heading>
         <Stack
            direction={{
               base: 'column',
               lg: 'row',
            }}
            w='full'
            justifyContent='center'
            alignItems='center'
            spacing='10%'
         >
            <VStack
               as='button'
               width='30em'
               height='30em'
               padding={10}
               borderRadius={10}
            >
               <Heading> Programador </Heading>
               <Box boxSize='xs'>
                  <Image src='/static/programmer.png' />
               </Box>
            </VStack>
            
            <VStack
               as='button'
               borderRadius={10}
               width='30em'
               height='30em'
               padding={10}
            >
               <Heading> Empresa </Heading>

               <Box boxSize='xs'>
                  <Image src='/static/empresa.png' />
               </Box>
            </VStack>
         </Stack>
      </VStack>
   );
};

export default SelectAccount;
