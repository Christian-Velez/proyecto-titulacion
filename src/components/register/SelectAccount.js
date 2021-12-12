import {
   Box,
   Heading,
   Stack,
   VStack,
} from '@chakra-ui/react';
import React from 'react';

const SelectAccount = () => {
   return (
      <VStack padding={{ base: 10, lg: 40}}>
         <Heading> Elige el tipo de cuenta </Heading>
         <Stack
            direction={{
               base: 'column',
               lg: 'row',
            }}
         >
            <Box
               bgColor='purple.200'
               width='50%'
               height='auto'
            >
            </Box>

            <Box
               bgColor='purple.200'
               width='50%'
               height='auto'
            >
            </Box>
         </Stack>
      </VStack>
   );
};

export default SelectAccount;
