import {
   Box,
   Heading,
   Image,
   Stack,
   VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setAccountType } from '../../actions/register';

const SelectAccount = () => {
   const dispatch = useDispatch();

   const handleSetAccountType = (type) => {
      dispatch(setAccountType(type))
   }

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
            spacing={{ base: '25em', lg: '10%'}}
         >
            <VStack
               as='button'
               width={{ base: '10em', lg: '30em'}}
               onClick={() => { handleSetAccountType('Programmer') }}
               height={{ base: '10em', lg: '30em'}}
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
               onClick={() => { handleSetAccountType('Business') }}
               width={{ base: '10em', lg: '30em'}}
               height={{ base: '10em', lg: '30em'}}
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
